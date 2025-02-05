import type { Sources, RequiredSources, Row, FocucedCell, Footer, Field, OnCellFocusChange, OnRowSelectionChange } from './types';
import { getContext, setContext, untrack } from 'svelte';
import { tick } from 'svelte';

class Table<TData extends Row> {
	// ################################## BEGIN Constructor ################################################################
	element?: HTMLDivElement = $state();
	private set: Sources<TData> = $state({ id: '', columns: [] }); // orjinal sources. kaynaklar/sources değiştirilirken bu değişken kullanılacak. `table.set`
	sources = (value: Sources<TData>) => (this.set = value); // Set All Sources Method
	constructor(sources: Sources<TData>) {
		this.sources(sources);
	}
	// ################################## END Constructor #################################################################

	// ################################## BEGIN Default Sources ############################################################
	private readonly defaultSources: RequiredSources<TData> = {
		id: '',
		data: [],
		width: '100%',
		height: '100%',
		enableVirtualization: true,
		rowSelection: 'none',
		rowSelectionColumnWidth: 50,
		theadRowHeight: 35,
		tbodyRowHeight: 35,
		tfootRowHeight: 35,
		columns: [],
		footers: []
	};
	// ################################## END Default Sources ##############################################################

	// ################################## BEGIN Set Sources ################################################################
	id = (value: RequiredSources<TData>['id']) => (this.set.id = value);
	data = (value: RequiredSources<TData>['data']) => {
		this.clearSelectedRows();
		this.clearFocusedCell();
		this.set.data = value;
	};
	width = (value: RequiredSources<TData>['width']) => (this.set.width = value);
	height = (value: RequiredSources<TData>['height']) => (this.set.height = value);
	enableVirtualization = (value: RequiredSources<TData>['enableVirtualization']) => {
		this.clearSelectedRows();
		this.clearFocusedCell();
		this.set.enableVirtualization = value;
	};
	rowSelection = (value: RequiredSources<TData>['rowSelection']) => {
		this.clearSelectedRows();
		this.clearFocusedCell();
		this.set.rowSelection = value;
	};
	rowSelectionColumnWidth = (value: RequiredSources<TData>['rowSelectionColumnWidth']) => (this.set.rowSelectionColumnWidth = value);
	theadRowHeight = (value: RequiredSources<TData>['theadRowHeight']) => (this.set.theadRowHeight = value);
	tbodyRowHeight = (value: RequiredSources<TData>['tbodyRowHeight']) => (this.set.tbodyRowHeight = value);
	tfootRowHeight = (value: RequiredSources<TData>['tfootRowHeight']) => (this.set.tfootRowHeight = value);
	columns = (value: RequiredSources<TData>['columns']) => (this.set.columns = value);
	footers = (value: RequiredSources<TData>['footers']) => (this.set.footers = value);
	// ################################## END Set Sources ##################################################################

	// ################################## BEGIN Properties ################################################################
	// derived sources. kaynaklar/sources okunurken bu değişken kullanılacak. `table.get`
	get = $derived({ ...this.defaultSources, ...this.set });
	// derived columns. kolon bilgileri okunurken bu değişken kullanılacak. `table.columns`
	visibleColumns = $derived(
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

	// ################################## BEGIN General Variables ######################################################
	test = $state('test');
	headerRowsCount = $state(1);
	defaultOverscanThreshold = 4;
	gridTemplateRows = $derived.by(() => {
		const repeatThead = this.headerRowsCount >= 1 ? `repeat(${this.headerRowsCount}, ${this.get.theadRowHeight}px)` : ``;
		const repeatTbody = this.get.data.length > 0 ? `repeat(${this.get.data.length}, ${this.get.tbodyRowHeight}px)` : ``;
		const repeatTfoot = this.get.footers.length > 0 ? `repeat(${this.get.footers.length}, ${this.get.tfootRowHeight}px)` : ``;
		return `${repeatThead} ${repeatTbody} ${repeatTfoot}`;
	});
	gridTemplateColumns = $derived(`${this.get.rowSelection !== 'none' ? this.get.rowSelectionColumnWidth + 'px' : ''} ${this.visibleColumns.map((col) => col.width ?? `150px`).join(' ')}`);
	// ################################## END General Variables ########################################################

	// ################################## BEGIN Events ##########################################################
	// ***** onCellFocusChange Event *****
	onCellFocusChange = (fn: OnCellFocusChange) => (this.onCellFocusChangeRun = fn);
	private onCellFocusChangeRun?: OnCellFocusChange;
	private onCellFocusChangeThis: OnCellFocusChange = (params) => {
		if (this.onCellFocusChangeRun != null) this.onCellFocusChangeRun(params);
	};
	onRowSelectionChange = (fn: OnRowSelectionChange) => (this.onRowSelectionChangeRun = fn);
	private onRowSelectionChangeRun?: OnRowSelectionChange;
	private onRowSelectionChangeThis: OnRowSelectionChange = (params) => {
		if (this.onRowSelectionChangeRun != null) this.onRowSelectionChangeRun(params);
	};
	// ################################## END Events ############################################################

	// ################################## BEGIN Vertical Virtual Data ##################################################
	private calculatingVirtualData = false;
	virtualDataDerivedTrigger?: string = $state();
	// derived virtualData. Virtual veriler okurken bu değişken kullanılacak. `table.data`
	virtualData = $derived.by(() => {
		if (this.get.enableVirtualization === false || this.element == null || this.virtualDataDerivedTrigger == null) return [];

		const headerRowsHeight = this.headerRowsCount * this.get.theadRowHeight;
		const footerRowsHeight = this.get.footers.length * this.get.tfootRowHeight;
		const dataRowHeight = this.get.tbodyRowHeight;
		const dataLength = this.get.data.length;

		const { rowOverscanStartIndex, rowOverscanEndIndex } = this.findVisibleRowIndexs({ headerRowsHeight, footerRowsHeight, dataRowHeight, dataLength });
		if (rowOverscanStartIndex == null || rowOverscanEndIndex == null) return [];

		const slicedData = $state.snapshot(this.get.data.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)) as TData[];

		const processedData = slicedData.map((row: TData, index: number): TData => {
			return { ...row, oi: rowOverscanStartIndex + index }; // oi = original row index
		});

		const focusedCell = untrack(() => this.getFocusedCell);
		const focusedCellRowIndex = focusedCell?.rowIndex;
		if (typeof focusedCellRowIndex === 'number' && focusedCellRowIndex < dataLength) {
			const isAboveOverscanStart = focusedCellRowIndex < rowOverscanStartIndex ? true : false;
			const isBelowOverscanEnd = focusedCellRowIndex >= rowOverscanEndIndex + 1 ? true : false;
			if (isAboveOverscanStart || isBelowOverscanEnd) {
				const focusedCellRow: TData = $state.snapshot(this.get.data[focusedCellRowIndex]) as TData;
				focusedCellRow.oi = focusedCellRowIndex;
				if (isAboveOverscanStart) processedData.unshift(focusedCellRow);
				if (isBelowOverscanEnd) processedData.push(focusedCellRow);
			}
		}

		return processedData;
	});

	setVirtualDataDerivedTrigger = async (virtualDataDerivedTrigger: string) => {
		if (this.calculatingVirtualData) return;

		this.calculatingVirtualData = true;
		this.virtualDataDerivedTrigger = virtualDataDerivedTrigger;
		await tick();
		this.calculatingVirtualData = false;
	};
	// ################################## END Vertical Virtual Data ####################################################

	// ################################## BEGIN Keyboard Navigation Methods ############################################
	getPageUpRowIndex = () => {
		const { rowVisibleStartIndex, currentHeight, dataRowHeight } = this.findVisibleRowIndexs({});
		if (rowVisibleStartIndex == null || currentHeight == null || dataRowHeight == null) return undefined;

		return rowVisibleStartIndex - Math.floor(currentHeight / dataRowHeight) + 1;
	};
	getPageDownRowIndex = () => {
		const { rowVisibleEndIndex, currentHeight, dataRowHeight } = this.findVisibleRowIndexs({});
		if (rowVisibleEndIndex == null || currentHeight == null || dataRowHeight == null) return undefined;

		return rowVisibleEndIndex + Math.floor(currentHeight / dataRowHeight) - 1;
	};
	// ################################## END Keyboard Navigation Methods ###############################################

	// ################################## BEGIN Set Focused Cell State ##################################################
	private focusedCell?: FocucedCell = $state();
	readonly getFocusedCell = $derived(this.focusedCell); // reactive state getter
	private setFocusedCell = (param: FocucedCell) => (this.focusedCell = param);
	private clearFocusedCell = () => (this.focusedCell = undefined);

	private setFocusedCellTabIndex = async (focucedCell: FocucedCell) => {
		// Fokuslanacak hücre elementinin içinde, tabindex'i 0 olan fokuslanılabilir bir element varsa, hücre elementinin tabindex'ini -1 yap.
		if (this.element != null && focucedCell != null && focucedCell.rowIndex != null && focucedCell.colIndex != null) {
			const focusedCellNode = this.element.querySelector<HTMLDivElement>(`:scope > [role="row"] > [data-cell="${focucedCell.rowIndex}_${focucedCell.colIndex}"]`);
			if (focusedCellNode && focusedCellNode.querySelector<Element & HTMLOrSVGElement>('[tabindex="0"]')) {
				this.setFocusedCell({ ...focucedCell, tabIndex: -1 });
			}
		}
		this.setFocusedCell(focucedCell);
		await tick();
	};
	private focusCellNode = () => {
		const nextFocusedCellNode = this.element?.querySelector<HTMLDivElement>(':scope > [role="row"] > [data-focused="true"]');
		if (nextFocusedCellNode == null) return;

		nextFocusedCellNode.scrollIntoView({ block: 'nearest', inline: 'nearest' });
		const elementToFocus = nextFocusedCellNode.querySelector<Element & HTMLOrSVGElement>('[tabindex="0"]') ?? nextFocusedCellNode;
		elementToFocus.focus({ preventScroll: true });
	};

	focusCell = async ({ cellToFocus, triggerVirtual = false }: { cellToFocus: Required<FocucedCell>; triggerVirtual?: boolean }) => {
		await this.setFocusedCellTabIndex(cellToFocus); // tabindex durumunu ve focucedCell state'ini günceller.

		// pageup veya pagedown gibi uzun atlamalar olduğunda, yani scan edilmiş tüm virtual datanın da uzağına gidilmek istendiğinde, virtual data bir kez güncellenir.
		// bu güncelleme setFocusedCellState ile değişen state'i baz alarak focuslanacak hücre bilgilerini virtual dataya pinler ve dom'u günceller.
		// artık uzaktaki hücre dom'da oluşturulmuştur.
		if (this.get.enableVirtualization === true && triggerVirtual === true) {
			const { rowOverscanStartIndex, rowOverscanEndIndex } = this.findVisibleRowIndexs({});
			if ((rowOverscanStartIndex != null && cellToFocus.rowIndex <= rowOverscanStartIndex) || (rowOverscanEndIndex != null && cellToFocus.rowIndex >= rowOverscanEndIndex)) {
				await this.setVirtualDataDerivedTrigger(`focus_${cellToFocus.originalCell}`);
				await this.setFocusedCellTabIndex(cellToFocus); // dom'da yeni görünür olduğundan, tabindex durumunu yeniden güncellemek için.
			}
		}

		// satır başında ve satır sonunda 4'er tane overscan satır olduğu için, scrollIntoView sayesinde scroll tetiklenir ve virtual data bir kez güncellenir.
		this.focusCellNode();

		this.onCellFocusChangeThis({ rowIndex: cellToFocus.rowIndex, colIndex: cellToFocus.colIndex });
	};

	// ################################## END Set Focused Cell State #####################################################

	// ################################## BEGIN Row Selection Methods ##############################################################
	private selectedRows: number[] = $state.raw([]); // Seçili satır indeksleri
	readonly getSelectedRows = $derived(this.selectedRows); // reactive state getter
	private setSelectedRows = (param: number[]) => (this.selectedRows = param);
	private clearSelectedRows = () => (this.selectedRows = []);

	// Bir satırın seçimini değiştirir
	toggleRowSelection = async (rowIndex: number) => {
		if (this.get.rowSelection === 'none') return;

		const selectedRows = this.getSelectedRows;
		const index = selectedRows.indexOf(rowIndex);

		if (this.get.rowSelection === 'single') {
			this.setSelectedRows(index === -1 ? [rowIndex] : []);
		} else if (this.get.rowSelection === 'multiple') {
			if (index === -1) {
				this.setSelectedRows([...selectedRows, rowIndex]);
			} else {
				this.setSelectedRows(selectedRows.filter((idx) => idx !== rowIndex));
			}
		}

		await tick();
		this.onRowSelectionChangeThis({ selectedRows: this.getSelectedRows });
	};
	// Bir satırın seçimini değiştirir
	/* toggleRowSelection = async (rowIndex: number) => {
		if (this.get.rowSelection === 'none') return;

		const selectedRows = this.getSelectedRows;
		const index = selectedRows.indexOf(rowIndex);
		if (index === -1) {
			this.setSelectedRows([...selectedRows, rowIndex]); // Yeni seçim eklerken yeni bir array oluştur
		} else {
			this.setSelectedRows(selectedRows.filter((idx) => idx !== rowIndex)); // Seçimi kaldırırken filter kullan
		}
		await tick();
		this.onRowSelectionChangeThis({ selectedRows: this.getSelectedRows });
	}; */

	// Tüm satırları seçer veya seçimi kaldırır
	toggleAllRows = async (select: boolean) => {
		if (this.get.rowSelection !== 'multiple') return;

		if (select) {
			this.setSelectedRows(Array.from({ length: this.get.data.length }, (_, i) => i)); // Tüm satırları seç
		} else {
			this.clearSelectedRows(); // Tüm seçimleri kaldır
		}
		await tick();
		this.onRowSelectionChangeThis({ selectedRows: this.getSelectedRows });
	};
	// ################################## END Row Selection Methods ################################################################

	// ################################## BEGIN General Methods ##############################################################
	getFooter = ({ field, foot }: { field: Field<TData>; foot: Footer<TData> }): number | string => {
		const footer = foot[field]; // sum, avg, count or footer content
		if (footer == null) return '';

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

	private findVisibleRowIndexs: (params: {
		scrollTop?: number;
		clientHeight?: number;
		headerRowsHeight?: number;
		footerRowsHeight?: number;
		dataRowHeight?: number;
		overscanThreshold?: number;
		dataLength?: number;
	}) => {
		rowVisibleStartIndex?: number;
		rowVisibleEndIndex?: number;
		rowOverscanStartIndex?: number;
		rowOverscanEndIndex?: number;
		overscan: number;
		currentHeight?: number;
		dataRowHeight?: number;
	} = ({ scrollTop, clientHeight, headerRowsHeight, footerRowsHeight, dataRowHeight, overscanThreshold, dataLength }) => {
		const defaultOverscanThreshold = this.defaultOverscanThreshold;

		if (this.element == null) return { overscan: defaultOverscanThreshold };

		const xScrollTop = scrollTop ?? this.element.scrollTop;
		const xClientHeight = clientHeight ?? this.element.clientHeight;
		const xHeaderRowsHeight = headerRowsHeight ?? this.headerRowsCount * this.get.theadRowHeight;
		const xFooterRowsHeight = footerRowsHeight ?? this.get.footers.length * this.get.tfootRowHeight;
		const xDataRowHeight = dataRowHeight ?? this.get.tbodyRowHeight;
		const xOverscanThreshold = typeof overscanThreshold !== 'undefined' && overscanThreshold >= defaultOverscanThreshold ? overscanThreshold : defaultOverscanThreshold;
		const xDataLength = dataLength ?? this.get.data.length;

		const currentHeight = xClientHeight - xHeaderRowsHeight - xFooterRowsHeight;

		const rowVisibleStartIndex = Math.floor(xScrollTop / xDataRowHeight);
		const rowVisibleEndIndex = Math.min(xDataLength - 1, Math.floor((xScrollTop + currentHeight) / xDataRowHeight));
		const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - xOverscanThreshold);
		const rowOverscanEndIndex = Math.min(xDataLength - 1, rowVisibleEndIndex + xOverscanThreshold);

		return {
			rowVisibleStartIndex,
			rowVisibleEndIndex,
			rowOverscanStartIndex,
			rowOverscanEndIndex,
			overscan: xOverscanThreshold,
			currentHeight: currentHeight,
			dataRowHeight: xDataRowHeight
		};
	};
	// ################################## END General Methods ################################################################
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
