import type { Sources, RequiredSources, Row, FocucedCell, Footer, Field } from './types';
import { getContext, setContext } from 'svelte';

class Table<TData extends Row> {
	private readonly defaultSources: RequiredSources<TData> = {
		id: '',
		data: [],
		width: '100%',
		height: '100%',
		overscanThreshold: 4,
		theadRowHeight: 35,
		tbodyRowHeight: 35,
		tfootRowHeight: 35,
		columns: [],
		footers: []
	};

	// ################################## BEGIN Constructor ###############################################################
	element!: HTMLDivElement;
	private set: Sources<TData> = $state({ id: '', columns: [] }); // orjinal sources. kaynaklar/sources değiştirilirken bu değişken kullanılacak. `table.set`
	constructor(sources: Sources<TData>) {
		this.set = sources;
	}
	// ################################## END Constructor ###############################################################

	// ################################## BEGIN Properties ###############################################################
	// derived sources. kaynaklar/sources okunurken bu değişken kullanılacak. `table.get`
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
	// ################################## END Properties ###############################################################

	// ################################## BEGIN Variables ###############################################################
	test = $state('test');
	headerCount = $state(1);
	scrollTop = $state(1);
	clientWidth = $state(1);
	clientHeight = $state(1);
	offsetWidth = $state(1);
	offsetHeight = $state(1);
	contentRect = $state({
		x: 0,
		y: 0,
		width: 1,
		height: 1,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	});
	horizontalScrollbarHeight = $derived(this.offsetHeight - this.clientHeight);
	inlineSize = $derived(this.contentRect.width - this.offsetWidth + this.clientWidth); // table width without scrollbar and border
	blockSize = $derived(this.contentRect.height - this.horizontalScrollbarHeight); // table height without scrollbar and border
	scrollHeight = $derived(
		this.headerCount * this.get.theadRowHeight +
			this.get.data.length * this.get.tbodyRowHeight +
			this.footers.length * this.get.tfootRowHeight +
			this.horizontalScrollbarHeight
	);

	focusedCell?: FocucedCell<TData> = $state();
	gridTemplateRows: string = $derived.by(() => {
		const repeatThead =
			this.headerCount >= 1 ? `repeat(${this.headerCount}, ${this.get.theadRowHeight}px)` : ``;
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
	// ################################## END Variables ###############################################################

	// ################################## BEGIN Vertical Virtual Data ##################################################
	// derived data. verileri okurken bu değişken kullanılacak. `table.data`
	data = $derived.by(() => {
		const rowHeight = this.get.tbodyRowHeight;
		const overscanThreshold = this.get.overscanThreshold;
		const clientHeight =
			this.blockSize /* table height */ -
			this.headerCount * this.get.theadRowHeight /* headers row height */ -
			this.footers.length * this.get.tfootRowHeight; /* footers row height */
		const scrollTop = this.scrollTop;
		const dataLength = this.get.data.length;

		const rowVisibleStartIndex = Math.floor(scrollTop / rowHeight);
		const rowVisibleEndIndex = Math.min(
			dataLength - 1,
			Math.floor((scrollTop + clientHeight) / rowHeight)
		);
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
		const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold);

		return this.get.data.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1).map((row, index) => {
			return {
				...row,
				oi: rowOverscanStartIndex + index // original row index
			};
		});
	});
	// ################################## END Vertical Virtual Data ####################################################

	setAllData = (data: TData[]) => {
		this.set.data = data;
	};
	setAllSources = (sources: Sources<TData>) => {
		this.set = sources;
	};
	setFocusedCell = (cell: FocucedCell<TData>) => {
		this.focusedCell = cell;
	};
	getFooter = ({ field, foot }: { field: Field<TData>; foot: Footer<TData> }): number | string => {
		const footer = foot[field]; // sum, avg, count or footer content
		if (typeof footer === 'undefined') return '';

		return footer === 'count'
			? this.get.data.length
			: footer === 'avg'
				? 11
				: footer === 'sum'
					? this.get.data.reduce((acc, row) => {
							const value = row[field];
							return typeof value === 'number' ? acc + value : acc;
						}, 0)
					: footer;
	};
}

// ################################## BEGIN Export Table Context ###############################################################
export function createTable<TData extends Row>(sources: Sources<TData>) {
	return setContext(sources.id, new Table<TData>(sources));
}
export function getTable<TData extends Row>(id: string) {
	return getContext<ReturnType<typeof createTable<TData>>>(id);
}
// ################################## END Export Table Context #################################################################
export type { Sources, Row };
