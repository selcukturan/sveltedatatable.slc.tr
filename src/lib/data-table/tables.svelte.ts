import type { Sources, RequiredSources, Row, FocucedCell, Footer, Field } from './types';
import { getContext, setContext } from 'svelte';

class Table<TData extends Row> {
	// ################################## BEGIN Default Sources ############################################################
	private readonly defaultSources: RequiredSources<TData> = {
		id: '',
		data: [],
		width: '100%',
		height: '100%',
		enableVirtualization: true,
		theadRowHeight: 35,
		tbodyRowHeight: 35,
		tfootRowHeight: 35,
		columns: [],
		footers: []
	};
	// ################################## END Default Sources ##############################################################

	// ################################## BEGIN Set Sources ################################################################
	set_sources = (value: Sources<TData>) => (this.set = value);
	set_id = (value: RequiredSources<TData>['id']) => (this.set.id = value);
	set_data = (value: RequiredSources<TData>['data']) => (this.set.data = value);
	set_width = (value: RequiredSources<TData>['width']) => (this.set.width = value);
	set_height = (value: RequiredSources<TData>['height']) => (this.set.height = value);
	set_enableVirtualization = (value: RequiredSources<TData>['enableVirtualization']) => (this.set.enableVirtualization = value);
	set_theadRowHeight = (value: RequiredSources<TData>['theadRowHeight']) => (this.set.theadRowHeight = value);
	set_tbodyRowHeight = (value: RequiredSources<TData>['tbodyRowHeight']) => (this.set.tbodyRowHeight = value);
	set_tfootRowHeight = (value: RequiredSources<TData>['tfootRowHeight']) => (this.set.tfootRowHeight = value);
	set_columns = (value: RequiredSources<TData>['columns']) => (this.set.columns = value);
	set_footers = (value: RequiredSources<TData>['footers']) => (this.set.footers = value);
	// ################################## END Set Sources ##################################################################

	// ################################## BEGIN Constructor ################################################################
	element?: HTMLDivElement = $state();
	private set: Sources<TData> = $state({ id: '', columns: [] }); // orjinal sources. kaynaklar/sources değiştirilirken bu değişken kullanılacak. `table.set`
	constructor(sources: Sources<TData>) {
		this.set_sources(sources);
	}
	// ################################## END Constructor #################################################################

	// ################################## BEGIN Properties ################################################################
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

	// ################################## BEGIN Variables ##############################################################
	test = $state('test');
	headerRowsCount = $state(1);
	scrollTop?: number = $state();
	clientHeight?: number = $state();
	overscanThreshold = 0;
	focusedCell?: FocucedCell<TData> = $state();
	gridTemplateRows = $derived.by(() => {
		const repeatThead = this.headerRowsCount >= 1 ? `repeat(${this.headerRowsCount}, ${this.get.theadRowHeight}px)` : ``;
		const repeatTbody = this.get.data.length > 0 ? `repeat(${this.get.data.length}, ${this.get.tbodyRowHeight}px)` : ``;
		const repeatTfoot = this.get.footers.length > 0 ? `repeat(${this.get.footers.length}, ${this.get.tfootRowHeight}px)` : ``;
		return `${repeatThead} ${repeatTbody} ${repeatTfoot}`;
	});
	gridTemplateColumns = $derived(this.columns.map((col) => (col.width ? col.width : `150px`)).join(' '));
	// ################################## END Variables ################################################################

	// ################################## BEGIN Vertical Virtual Data ##################################################
	lastCurrentClientHeight = 0;
	// derived virtualData. Virtual veriler okurken bu değişken kullanılacak. `table.data`
	virtualData = $derived.by(() => {
		if (this.get.enableVirtualization === false) return [];

		if (typeof this.element === 'undefined') return []; // Henüz tablo elementi bind edilmedi. `bind:this={table.element}`

		const clientHeight = this.clientHeight;
		if (typeof clientHeight === 'undefined') return []; // Henüz ilk tablo clientHeight değeri atanmadı.

		const scrollTop = this.lastCurrentClientHeight === 0 ? this.element.scrollTop : this.scrollTop || 0;

		this.lastCurrentClientHeight = clientHeight;

		const headerRowsHeight = this.headerRowsCount * this.get.theadRowHeight;
		const footerRowsHeight = this.get.footers.length * this.get.tfootRowHeight;
		const dataRowHeight = this.get.tbodyRowHeight;
		const overscanThreshold = this.overscanThreshold;
		const dataLength = this.get.data.length;

		const { rowOverscanStartIndex, rowOverscanEndIndex } = this.findVirtualRowIndex({
			scrollTop,
			clientHeight,
			headerRowsHeight,
			footerRowsHeight,
			dataRowHeight,
			overscanThreshold,
			dataLength
		});
		if (typeof rowOverscanStartIndex === 'undefined' || typeof rowOverscanEndIndex === 'undefined') return [];

		this.test = `startIndex:${rowOverscanStartIndex} - endIndex:${rowOverscanEndIndex} - clientHeight:${clientHeight} - scrollTop:${scrollTop}`;
		const slicedData = $state.snapshot(this.get.data.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)) as TData[];
		return slicedData.map((row, index) => {
			return {
				...row,
				oi: rowOverscanStartIndex + index // original row index
			};
		});
	});
	// ################################## END Vertical Virtual Data ####################################################

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

	findVirtualRowIndex = ({
		scrollTop,
		clientHeight,
		headerRowsHeight,
		footerRowsHeight,
		dataRowHeight,
		overscanThreshold,
		dataLength
	}: {
		scrollTop?: number;
		clientHeight?: number;
		headerRowsHeight?: number;
		footerRowsHeight?: number;
		dataRowHeight?: number;
		overscanThreshold?: number;
		dataLength?: number;
	}) => {
		if (typeof this.element === 'undefined') {
			return {
				rowVisibleStartIndex: undefined,
				rowVisibleEndIndex: undefined,
				rowOverscanStartIndex: undefined,
				rowOverscanEndIndex: undefined
			};
		}

		const xScrollTop = scrollTop || this.element.scrollTop;
		const xClientHeight = clientHeight || this.element.clientHeight;
		const xHeaderRowsHeight = headerRowsHeight || this.headerRowsCount * this.get.theadRowHeight;
		const xFooterRowsHeight = footerRowsHeight || this.get.footers.length * this.get.tfootRowHeight;
		const xDataRowHeight = dataRowHeight || this.get.tbodyRowHeight;
		const xOverscanThreshold = overscanThreshold || this.overscanThreshold;
		const xDataLength = dataLength || this.get.data.length;

		const currentHeight = xClientHeight - xHeaderRowsHeight - xFooterRowsHeight;

		const rowVisibleStartIndex = Math.floor(xScrollTop / xDataRowHeight);
		const rowVisibleEndIndex = Math.min(xDataLength - 1, Math.floor((xScrollTop + currentHeight) / xDataRowHeight));
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - xOverscanThreshold);
		const rowOverscanEndIndex = Math.min(xDataLength - 1, rowVisibleEndIndex + xOverscanThreshold);

		return { rowVisibleStartIndex, rowVisibleEndIndex, rowOverscanStartIndex, rowOverscanEndIndex };
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	throttle = (func: Function, delay: number) => {
		let timeoutId: number;
		let lastRunTime = 0;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function (this: any, ...args: Array<any>) {
			const currentTime = Date.now(); // şu anki zaman
			const elapsedTime = currentTime - lastRunTime; // geçen zaman

			if (elapsedTime > delay) {
				func.apply(this, args);
				lastRunTime = currentTime;
			} else {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					func.apply(this, args);
					lastRunTime = Date.now();
				}, delay - elapsedTime);
			}
		};
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
