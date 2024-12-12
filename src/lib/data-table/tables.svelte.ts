import type { Settings, DefaultSettings, Row, FocucedCell, Footer } from './types';
import { getContext, setContext } from 'svelte';

class Table<TData extends Row> {
	private readonly defaultSettings: DefaultSettings<TData> = {
		id: '',
		data: [],
		width: '100%',
		height: '100%',
		overscanThreshold: 4,
		selectionColumn: false,
		actionColumn: false,
		theadRowHeight: 35,
		tbodyRowHeight: 35,
		tfootRowHeight: 35,
		columns: [],
		footers: []
	};

	// ################################## BEGIN Constructor ###############################################################
	element!: HTMLDivElement;
	setSettings: Settings<TData> = $state({ id: '', data: [], columns: [] }); // orjinal settings. ayarları değiştirirken bu değişken kullanılacak. `table.setSettings`
	constructor(settings: Settings<TData>) {
		this.setSettings = settings;
	}
	// ################################## END Constructor ###############################################################

	// ################################## BEGIN Properties ###############################################################
	// derived settings. ayarları okurken bu değişken kullanılacak. `table.settings`
	settings = $derived({ ...this.defaultSettings, ...this.setSettings });
	// derived columns. kolon bilgileri okurken bu değişken kullanılacak. `table.columns`
	columns = $derived(
		this.settings.columns
			.map((col, index) => {
				return {
					...col,
					oi: index // original column index
				};
			})
			.filter((column) => !column.hidden)
	);
	// derived footers. alt bilgi satırı bilgilerini okurken bu değişken kullanılacak. `table.footers`
	footers = $derived.by(() => {
		const footers = this.settings.footers;
		const columns = this.columns;
		return footers.map((footer) => {
			const footerRow: Footer<TData> = {};
			columns.forEach((column) => {
				footerRow[column.field] = footer[column.field];
			});
			return footerRow as Footer<TData>;
		});
	});
	// derived data. verileri okurken bu değişken kullanılacak. `table.data`
	data = $derived.by(() => {
		const rowHeight = this.settings.tbodyRowHeight;
		const overscanThreshold = this.settings.overscanThreshold;
		const clientHeight = this.clientHeight;
		const scrollTop = this.scrollTop;
		const dataLength = this.settings.data.length;

		const rowVisibleStartIndex = Math.floor(scrollTop / rowHeight);
		const rowVisibleEndIndex = Math.min(
			dataLength - 1,
			Math.floor((scrollTop + clientHeight) / rowHeight)
		);
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
		const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold);

		return this.settings.data
			.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)
			.map((row, index) => {
				return {
					...row,
					oi: rowOverscanStartIndex + index // original row index
				};
			});
	});
	// ################################## END Properties ###############################################################

	scrollTop = $state(0);
	lastScrollTop = 0;
	clientHeight = $state(0);
	focusedCell?: FocucedCell<TData> = $state();
	gridTemplateRows: string = $derived.by(() => {
		const headerCount = 1;
		const repeatThead =
			headerCount >= 1 ? `repeat(${headerCount}, ${this.settings.theadRowHeight}px)` : ``;
		const repeatTbody =
			this.settings.data.length > 0
				? `repeat(${this.settings.data.length}, ${this.settings.tbodyRowHeight}px)`
				: ``;
		const repeatTfoot =
			this.footers.length > 0
				? `repeat(${this.footers.length}, ${this.settings.tfootRowHeight}px)`
				: ``;
		return `${repeatThead} ${repeatTbody} ${repeatTfoot}`;
	});
	gridTemplateColumns: string = $derived(
		this.columns.map((col) => (col.width ? col.width : `150px`)).join(' ')
	);
	setAllData = (data: TData[]) => {
		this.settings.data = data;
	};
	setAllSettings = (settings: Settings<TData>) => {
		this.setSettings = settings;
	};
}

// ################################## BEGIN Export Table Context ###############################################################
export function setTable<TData extends Row>(settings: Settings<TData>): Table<TData> {
	const table = new Table<TData>(settings);
	setContext(settings.id, table);
	return table;
}
export function getTable<TData extends Row>(id: string) {
	return getContext<ReturnType<typeof setTable<TData>>>(id);
}
// ################################## END Export Table Context #################################################################
export type { Settings, Row };
