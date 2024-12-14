import type { Sources, DefaultSources, Row, FocucedCell, Footer } from './types';
import { getContext, setContext } from 'svelte';

class Table<TData extends Row> {
	private readonly defaultSources: DefaultSources<TData> = {
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
	set: Sources<TData> = $state({ id: '', data: [], columns: [] }); // orjinal settings. ayarları değiştirirken bu değişken kullanılacak. `table.setSettings`
	constructor(sources: Sources<TData>) {
		this.set = sources;
	}
	// ################################## END Constructor ###############################################################

	// ################################## BEGIN Properties ###############################################################
	// derived settings. ayarları okurken bu değişken kullanılacak. `table.settings`
	get = $derived({ ...this.defaultSources, ...this.set });
	// derived columns. kolon bilgileri okurken bu değişken kullanılacak. `table.columns`
	columns = $derived(
		this.get.columns
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
		const footers = this.get.footers;
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
	rowOverscanStartIndex = $state(0);
	rowOverscanEndIndex = $state(0);
	data = $derived.by(() => {
		/* const rowHeight = this.get.tbodyRowHeight;
		const overscanThreshold = this.get.overscanThreshold;
		const clientHeight = this.clientHeight;
		const scrollTop = this.scrollTop;
		const dataLength = this.get.data.length;

		const rowVisibleStartIndex = Math.floor(scrollTop / rowHeight);
		const rowVisibleEndIndex = Math.min(
			dataLength - 1,
			Math.floor((scrollTop + clientHeight) / rowHeight)
		);
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
		const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold); */

		return this.get.data
			.slice(this.rowOverscanStartIndex, this.rowOverscanEndIndex + 1)
			.map((row, index) => {
				return {
					...row,
					oi: this.rowOverscanStartIndex + index // original row index
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
			headerCount >= 1 ? `repeat(${headerCount}, ${this.get.theadRowHeight}px)` : ``;
		const repeatTbody =
			this.get.data.length > 0
				? `repeat(${this.get.data.length}, ${this.get.tbodyRowHeight}px)`
				: ``;
		const repeatTfoot =
			this.footers.length > 0 ? `repeat(${this.footers.length}, ${this.get.tfootRowHeight}px)` : ``;
		return `${repeatThead} ${repeatTbody} ${repeatTfoot}`;
	});
	gridTemplateColumns: string = $derived(
		this.columns.map((col) => (col.width ? col.width : `150px`)).join(' ')
	);
	setAllData = (data: TData[]) => {
		this.set.data = data;
	};
	setAllSources = (sources: Sources<TData>) => {
		this.set = sources;
	};
}

// ################################## BEGIN Export Table Context ###############################################################
export function setTable<TData extends Row>(sources: Sources<TData>): Table<TData> {
	sources.id = sources.id || `slc_${crypto.randomUUID()}`;
	const table = new Table<TData>(sources);
	setContext(sources.id, table);
	return table;
}
export function getTable<TData extends Row>(id: string) {
	return getContext<ReturnType<typeof setTable<TData>>>(id);
}
// ################################## END Export Table Context #################################################################
export type { Sources, Row };
