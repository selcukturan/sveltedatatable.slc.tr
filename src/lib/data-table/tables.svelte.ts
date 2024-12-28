import type { Sources, RequiredSources, Row, FocucedCell, Footer, Field } from './types';
import { getContext, setContext } from 'svelte';

class Table<TData extends Row> {
	private readonly defaultSources: RequiredSources<TData> = {
		id: '',
		data: [],
		width: '100%',
		height: '100%',
		overscanThreshold: 0,
		theadRowHeight: 35,
		tbodyRowHeight: 35,
		tfootRowHeight: 35,
		columns: [],
		footers: []
	};

	// ################################## BEGIN Constructor ###############################################################
	element: HTMLDivElement | undefined = $state();
	private set: Sources<TData> = $state({ id: '', columns: [] }); // orjinal sources. kaynaklar/sources değiştirilirken bu değişken kullanılacak. `table.set`
	constructor(sources: Sources<TData>) {
		this.set = sources;
	}
	// ################################## END Constructor ###############################################################

	// ################################## BEGIN Properties ###############################################################
	// derived sources. kaynaklar/sources okunurken bu değişken kullanılacak. `table.get`
	get = $derived({ ...this.defaultSources, ...this.set });
	// derived columns. kolon bilgileri okunurken bu değişken kullanılacak. `table.columns`
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
	// ################################## END Properties ###############################################################

	// ################################## BEGIN Variables ###############################################################
	test = $state('test');
	initialOffsetHeight: number | undefined = undefined;
	İnitialClientHeight: number | undefined = undefined;
	headerRowsCount = $state(1);
	scrollTop = $state(0);
	clientHeight = $state(1);
	offsetHeight = $state(1);
	scrollHeight = $derived(
		this.headerRowsCount * this.get.theadRowHeight + // headerRowsHeight
			this.get.data.length * this.get.tbodyRowHeight + // dataRowsHeight
			this.get.footers.length * this.get.tfootRowHeight + // footerRowsHeight
			(this.offsetHeight - this.clientHeight) // horizontalScrollbarHeight
	);

	focusedCell?: FocucedCell<TData> = $state();
	gridTemplateRows: string = $derived.by(() => {
		const repeatThead = this.headerRowsCount >= 1 ? `repeat(${this.headerRowsCount}, ${this.get.theadRowHeight}px)` : ``;
		const repeatTbody = this.get.data.length > 0 ? `repeat(${this.get.data.length}, ${this.get.tbodyRowHeight}px)` : ``;
		const repeatTfoot = this.get.footers.length > 0 ? `repeat(${this.get.footers.length}, ${this.get.tfootRowHeight}px)` : ``;
		return `${repeatThead} ${repeatTbody} ${repeatTfoot}`;
	});
	gridTemplateColumns: string = $derived(this.columns.map((col) => (col.width ? col.width : `150px`)).join(' '));
	// ################################## END Variables ###############################################################

	// ################################## BEGIN Vertical Virtual Data ##################################################
	// derived data. verileri okurken bu değişken kullanılacak. `table.data`
	data = $derived.by(() => {
		if (typeof this.element === 'undefined') return []; // Henüz tablo elementi bind edilmedi. `bind:this={table.element}`

		const offsetHeight = this.offsetHeight;
		const clientHeight = this.clientHeight;

		if (offsetHeight === 1 && clientHeight === 1) return []; // Henüz tablo değerleri bind edilmedi. `bind:clientHeight={table.clientHeight}` ve `bind:offsetHeight={table.offsetHeight}`

		const headerRowsHeight = this.headerRowsCount * this.get.theadRowHeight;
		const footerRowsHeight = this.get.footers.length * this.get.tfootRowHeight;
		const dataRowHeight = this.get.tbodyRowHeight;
		const overscanThreshold = this.get.overscanThreshold;
		const scrollTop = this.scrollTop;
		const dataLength = this.get.data.length;

		const horizontalScrollbarHeight = offsetHeight - clientHeight;
		const tableHeight = offsetHeight - horizontalScrollbarHeight;
		const currentHeight = tableHeight - headerRowsHeight - footerRowsHeight;

		const rowVisibleStartIndex = Math.floor(scrollTop / dataRowHeight);
		const rowVisibleEndIndex = Math.min(dataLength - 1, Math.floor((scrollTop + currentHeight) / dataRowHeight));
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
		const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold);

		const slicedData = $state.snapshot(this.get.data.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)) as TData[];
		for (let index = 0; index < slicedData.length; index++) {
			slicedData[index].oi = rowOverscanStartIndex + index; // original row index
		}
		return slicedData;
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
				? this.get.data.reduce((acc, row) => {
						const value = row[field];
						return typeof value === 'number' ? acc + value : acc;
					}, 0) / this.get.data.length
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
