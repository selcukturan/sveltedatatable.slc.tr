import type { Sources, RequiredSources, Row, FocucedCell, Footer, Field } from './types';
import { getContext, setContext } from 'svelte';

class Table<TData extends Row> {
	private readonly defaultSources: RequiredSources<TData> = {
		id: '',
		data: [],
		width: '100%',
		height: '100%',
		enableVirtualization: true,
		overscanThreshold: 4,
		theadRowHeight: 35,
		tbodyRowHeight: 35,
		tfootRowHeight: 35,
		columns: [],
		footers: []
	};

	// ################################## BEGIN Constructor ###############################################################
	element?: HTMLDivElement = $state();
	set: Sources<TData> = $state({ id: '', columns: [] }); // orjinal sources. kaynaklar/sources değiştirilirken bu değişken kullanılacak. `table.set`
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
	headerRowsCount = $state(1);
	scrollTop?: number = $state();
	clientHeight?: number = $state();
	offsetHeight?: number = $state();
	scrollHeight = $derived.by(() => {
		const offsetHeight = this.offsetHeight || 0;
		const clientHeight = this.clientHeight || 0;
		return (
			this.headerRowsCount * this.get.theadRowHeight + // headerRowsHeight
			this.get.data.length * this.get.tbodyRowHeight + // dataRowsHeight
			this.get.footers.length * this.get.tfootRowHeight + // footerRowsHeight
			(offsetHeight - clientHeight) // horizontalScrollbarHeight
		);
	});

	focusedCell?: FocucedCell<TData> = $state();
	gridTemplateRows = $derived.by(() => {
		const repeatThead = this.headerRowsCount >= 1 ? `repeat(${this.headerRowsCount}, ${this.get.theadRowHeight}px)` : ``;
		const repeatTbody = this.get.data.length > 0 ? `repeat(${this.get.data.length}, ${this.get.tbodyRowHeight}px)` : ``;
		const repeatTfoot = this.get.footers.length > 0 ? `repeat(${this.get.footers.length}, ${this.get.tfootRowHeight}px)` : ``;
		return `${repeatThead} ${repeatTbody} ${repeatTfoot}`;
	});
	gridTemplateColumns = $derived(this.columns.map((col) => (col.width ? col.width : `150px`)).join(' '));
	// ################################## END Variables ###############################################################

	// ################################## BEGIN Vertical Virtual Data ##################################################
	private lastCurrentOffsetHeight?: number;
	private lastCurrentClientHeight?: number;
	// derived virtualData. Virtual veriler okurken bu değişken kullanılacak. `table.data`
	virtualData = $derived.by(() => {
		if (this.get.enableVirtualization === false) return [];

		if (typeof this.element === 'undefined') return []; // Henüz tablo elementi bind edilmedi. `bind:this={table.element}`

		let offsetHeight = this.offsetHeight;
		let clientHeight = this.clientHeight;
		if (offsetHeight === 0) offsetHeight = this.lastCurrentOffsetHeight; // tablo görünür olmadığında değerler sıfırlanıyor. sıfır olamaz.
		if (clientHeight === 0) clientHeight = this.lastCurrentClientHeight; // tablo görünür olmadığında değerler sıfırlanıyor. sıfır olamaz.

		if (typeof offsetHeight === 'undefined' || typeof clientHeight === 'undefined') return []; // Henüz tablo height değerleri bind edilmedi. `bind:clientHeight={table.clientHeight}` ve `bind:offsetHeight={table.offsetHeight}`

		this.lastCurrentOffsetHeight = offsetHeight;
		this.lastCurrentClientHeight = clientHeight;

		const scrollTop = this.scrollTop || 0;
		const headerRowsHeight = this.headerRowsCount * this.get.theadRowHeight;
		const footerRowsHeight = this.get.footers.length * this.get.tfootRowHeight;
		const dataRowHeight = this.get.tbodyRowHeight;
		const overscanThreshold = this.get.overscanThreshold;
		const dataLength = this.get.data.length;

		const horizontalScrollbarHeight = offsetHeight - clientHeight;
		const tableHeight = offsetHeight - horizontalScrollbarHeight;
		const currentHeight = tableHeight - headerRowsHeight - footerRowsHeight;

		const rowVisibleStartIndex = Math.floor(scrollTop / dataRowHeight);
		const rowVisibleEndIndex = Math.min(dataLength - 1, Math.floor((scrollTop + currentHeight) / dataRowHeight));
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
		const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold);

		this.test = `startIndex:${rowOverscanStartIndex} - endIndex:${rowOverscanEndIndex} - offsetHeight:${offsetHeight} - clientHeight:${clientHeight} - scrollTop:${scrollTop}`;
		const slicedData = $state.snapshot(this.get.data.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)) as TData[];
		return slicedData.map((row, index) => {
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
