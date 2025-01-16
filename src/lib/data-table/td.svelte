<script lang="ts" generics="TData extends Row">
	import type { Row, Column, Sources, FocucedCell } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		row: TData;
		children: Snippet;
		ri: number;
		ci: number;
		col: Column<TData>;
		class?: string;
	};
	const { src, row, children, ri, ci, col, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);

	const row_oi = $derived(table.get.enableVirtualization === false ? ri : row.oi);
	const originalCell = $derived(`${row_oi}_${ci}`);
	const indexToRow = 1;
	const gridRowStart = $derived(typeof row_oi === 'number' ? row_oi + table.headerRowsCount + indexToRow : 0);

	const clickAction = (cellNode: HTMLDivElement) => {
		const handleClick = async () => {
			if (typeof row_oi === 'undefined') return;
			const focusedCell: FocucedCell = { rowIndex: row_oi, colIndex: ci, originalCell: `${row_oi}_${ci}`, tabIndex: 0 };
			await table.focusCell({ cellToFocus: focusedCell });
		};

		cellNode.addEventListener('click', handleClick);

		return {
			destroy() {
				cellNode.removeEventListener('click', handleClick);
			}
		};
	};

	const keyboardAction = (cellNode: HTMLDivElement) => {
		const handleKeydown = async (e: KeyboardEvent) => {
			const focusedCell = table.focusedCell;
			const focusedRowIndex = focusedCell?.rowIndex;
			const focusedColIndex = focusedCell?.colIndex;
			if (typeof focusedRowIndex === 'undefined' || typeof focusedColIndex === 'undefined') return;

			const { key } = e;

			const typableNumber = '1234567890';
			const typableLower = 'abcdefghijklmnopqrstuvwxyz';
			const typableUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const typableOther = " =-`[\\]';,./ğüşıöçĞÜŞİÖÇ";

			const rowFirstIndex = 0;
			const rowLastIndex = table.get.data.length - 1;
			const colFirstIndex = 0;
			const colLastIndex = table.columns.length - 1;

			let nextFocusedCell: FocucedCell | undefined = undefined;

			if (key === 'ArrowUp') {
				const rowIndex = focusedRowIndex - 1;
				const colIndex = focusedColIndex;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			} else if (key === 'ArrowDown' || key === 'Enter') {
				const rowIndex = focusedRowIndex + 1;
				const colIndex = focusedColIndex;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			} else if (key === 'ArrowLeft' || (e.shiftKey && key === 'Tab')) {
				const rowIndex = focusedRowIndex;
				const colIndex = focusedColIndex - 1;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
				if (key === 'Tab' && colIndex < colFirstIndex) {
					const rowIndex = focusedRowIndex - 1;
					const colIndex = colLastIndex;
					const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
					nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
				}
			} else if (key === 'ArrowRight' || (!e.shiftKey && key === 'Tab')) {
				const rowIndex = focusedRowIndex;
				const colIndex = focusedColIndex + 1;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
				if (key === 'Tab' && colIndex > colLastIndex) {
					const rowIndex = focusedRowIndex + 1;
					const colIndex = colFirstIndex;
					const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
					nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
				}
			} else if (key === 'Home') {
				const rowIndex = focusedRowIndex;
				const colIndex = colFirstIndex;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			} else if (key === 'End') {
				const rowIndex = focusedRowIndex;
				const colIndex = colLastIndex;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			} else if (key === 'PageUp') {
				const pageUpRowIndex = table.getPageUpRowIndex();
				const rowIndex = pageUpRowIndex < rowFirstIndex ? rowFirstIndex : pageUpRowIndex;
				const colIndex = focusedColIndex;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			} else if (key === 'PageDown') {
				const pageDownRowIndex = table.getPageDownRowIndex();
				const rowIndex = pageDownRowIndex > rowLastIndex ? rowLastIndex : pageDownRowIndex;
				const colIndex = focusedColIndex;
				const originalCell: FocucedCell['originalCell'] = `${rowIndex}_${colIndex}`;
				nextFocusedCell = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			} else if (key === 'F2') {
				/* e.preventDefault(); createCellInput({ rowIndex, colIndex, originalCell }); */
			} else if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'C')) {
				/* Ctrl + C = Coppy */
			} else if ((e.ctrlKey || e.metaKey) && (key === 'v' || key === 'V')) {
				/* Ctrl + V = Paste */
			} else if (!e.ctrlKey && !e.metaKey && (typableNumber.includes(key) || typableLower.includes(key) || typableUpper.includes(key) || typableOther.includes(key))) {
				/* e.preventDefault(); createCellInput({ rowIndex, colIndex, originalCell }); */
			}

			const nextRowIndex = nextFocusedCell?.rowIndex;
			const nextColIndex = nextFocusedCell?.colIndex;
			const nextOriginalCell = nextFocusedCell?.originalCell;
			const nextTabIndex = nextFocusedCell?.tabIndex;
			if (typeof nextRowIndex === 'undefined' || typeof nextColIndex === 'undefined' || typeof nextOriginalCell === 'undefined' || typeof nextTabIndex === 'undefined') {
				return;
			}

			e.preventDefault();
			await table.focusCell({ cellToFocus: nextFocusedCell, triggerVirtual: true });
		};

		cellNode.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				cellNode.removeEventListener('keydown', handleKeydown);
			}
		};
	};
</script>

<div
	role="gridcell"
	use:clickAction
	use:keyboardAction
	style:grid-row={`${gridRowStart} / ${gridRowStart + 1}`}
	style:grid-column={`${ci + 1} / ${ci + 2}`}
	class:slc-table-td={true}
	data-cell={originalCell}
	class={classes}
	tabindex={table.focusedCell?.originalCell === originalCell && typeof table.focusedCell.tabIndex !== 'undefined' ? table.focusedCell.tabIndex : -1}
	aria-selected={table?.focusedCell?.originalCell === originalCell ? 'true' : 'false'}
	aria-colindex={ci + 1}
	spellcheck="false"
	{...attributes}
>
	<div style="display: flex; height: 100%; width: 100%; justify-content: space-between;">
		<div style="display: none; align-items: center;">x</div>
		<div
			style="display: flex; min-width: 0px; flex: 1 1 0%; align-items: center;"
			style:justify-content={col.align === 'center' ? 'center' : col.align === 'right' ? 'flex-end' : 'flex-start'}
		>
			<span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
				{@render children?.()}
			</span>
		</div>
		<div style="display: none; align-items: center;">x</div>
	</div>
</div>

<style>
	.slc-table-td {
		position: relative;
		z-index: 2;
		user-select: none;
		overflow: hidden;
		border-bottom-width: 1px;
		border-right-width: 1px;
		border-style: solid;
		padding: 0px;
		padding-left: 0.5rem; /* 8px */
		padding-right: 0.5rem; /* 8px */
		outline: none;
	}
	/* .slc-table-td:nth-last-child(1) {
		border-left-width: 1px;
	}
	.slc-table-td:nth-last-child(2) {
		border-right-width: 0px;
	} */
	[aria-selected='true'] {
		outline: 2px solid #f59e0b;
		outline-offset: -2px;
	}
</style>
