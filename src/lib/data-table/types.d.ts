export type RowValue = unknown | object | any[];
export type Row = {
	[key: string]: RowValue;
	originalRowIndex?: number;
};

export type Field<TData> = keyof TData;

// 100px | 1.25fr | minmax(100px,1.25fr) | minmax(1.25fr,100px) | minmax(1fr,1.25fr) | minmax(100px,200px)
export type Width =
	| `${number}px`
	| `${number}fr`
	| `minmax(${number}px,${number}fr)`
	| `minmax(${number}fr,${number}px)`
	| `minmax(${number}fr,${number}fr)`
	| `minmax(${number}px,${number}px)`;

export type Column<TData> = {
	field: Field<TData>; // field required
	label?: string;
	hidden?: boolean;
	resizeable?: boolean;
	editable?: boolean;
	align?: 'left' | 'center' | 'right';
	alignHeader?: 'left' | 'center' | 'right';
	alignFooter?: 'left' | 'center' | 'right';
	width?: Width;
	originalColIndex?: number;
};

export type Footer<TData> = {
	[K in keyof TData]?: string;
};

export type DefaultSettings<TData> = {
	selectionColumn: boolean;
	actionColumn: boolean;
	theadRowHeight: number;
	tbodyRowHeight: number;
	tfootRowHeight: number;
	columns: Column<TData>[];
	footers: Footer<TData>[];
};
export type Settings<TData> = Partial<DefaultSettings<TData>>;

export type FocucedCell<TData> = {
	rowIndex: number;
	colIndex: number;
	cell: string;
	originalCell: string;
	originalRowIndex: number;
	originalColIndex: number;
	field: Field<TData>;
};
