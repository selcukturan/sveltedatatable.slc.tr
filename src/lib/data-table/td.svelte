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
		const handleClick = async (e: Event) => {
			if (row_oi == null) return;
			const cellToFocus: Required<FocucedCell> = { rowIndex: row_oi, colIndex: ci, originalCell: `${row_oi}_${ci}`, tabIndex: 0 };
			if (cellToFocus.originalCell === table.getFocusedCell()?.originalCell) return;
			await table.focusCell({ cellToFocus });
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
			const { rowIndex, colIndex, originalCell } = table.getFocusedCell() ?? {};
			if (rowIndex == null || colIndex == null || originalCell == null) return;

			let cellToFocus: Required<FocucedCell> = { rowIndex, colIndex, originalCell, tabIndex: 0 };
			let initalOriginalCell = cellToFocus.originalCell;

			const { key } = e;

			const typableNumber = '1234567890';
			const typableLower = 'abcdefghijklmnopqrstuvwxyz';
			const typableUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const typableOther = " =-`[\\]';,./ğüşıöçĞÜŞİÖÇ";

			const rowFirstIndex = 0;
			const rowLastIndex = table.get.data.length - 1;
			const colFirstIndex = table.get.rowSelection !== 'none' ? -1 : 0; // Seçim kolonu için -1
			const colLastIndex = table.visibleColumns.length - 1;

			if (key === 'ArrowUp') {
				cellToFocus.rowIndex = Math.max(rowFirstIndex, cellToFocus.rowIndex - 1);
				e.preventDefault();
			} else if (key === 'ArrowDown' || key === 'Enter') {
				cellToFocus.rowIndex = Math.min(rowLastIndex, cellToFocus.rowIndex + 1);
				e.preventDefault();
			} else if (key === 'ArrowLeft' || (e.shiftKey && key === 'Tab')) {
				cellToFocus.colIndex = cellToFocus.colIndex - 1;
				if (key === 'Tab' && cellToFocus.colIndex < colFirstIndex) {
					cellToFocus.rowIndex = Math.max(rowFirstIndex, cellToFocus.rowIndex - 1);
					cellToFocus.colIndex = colLastIndex;
				} else {
					cellToFocus.colIndex = Math.max(colFirstIndex, cellToFocus.colIndex);
				}
				e.preventDefault();
			} else if (key === 'ArrowRight' || (!e.shiftKey && key === 'Tab')) {
				cellToFocus.colIndex = cellToFocus.colIndex + 1;
				if (key === 'Tab' && cellToFocus.colIndex > colLastIndex) {
					cellToFocus.rowIndex = Math.min(rowLastIndex, cellToFocus.rowIndex + 1);
					cellToFocus.colIndex = colFirstIndex;
				} else {
					cellToFocus.colIndex = Math.min(colLastIndex, cellToFocus.colIndex);
				}
				e.preventDefault();
			} else if (key === 'Home') {
				cellToFocus.colIndex = colFirstIndex;
				e.preventDefault();
			} else if (key === 'End') {
				cellToFocus.colIndex = colLastIndex;
				e.preventDefault();
			} else if (key === 'PageUp') {
				cellToFocus.rowIndex = Math.max(rowFirstIndex, table.getPageUpRowIndex() ?? rowFirstIndex);
				e.preventDefault();
			} else if (key === 'PageDown') {
				cellToFocus.rowIndex = Math.min(rowLastIndex, table.getPageDownRowIndex() ?? rowLastIndex);
				e.preventDefault();
			} else if (key === ' ' && cellToFocus.colIndex === -1) {
				// Seçim kolonunda boşluk tuşuna basıldığında satırı seç/kaldır
				// table.toggleRowSelection(cellToFocus.rowIndex);
				// e.preventDefault();
			} else if (key === 'F2') {
				/* e.preventDefault(); createCellInput({ rowIndex, colIndex, originalCell }); */
			} else if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'C')) {
				/* Ctrl + C = Copy */
			} else if ((e.ctrlKey || e.metaKey) && (key === 'v' || key === 'V')) {
				/* Ctrl + V = Paste */
			} else if (!e.ctrlKey && !e.metaKey && (typableNumber.includes(key) || typableLower.includes(key) || typableUpper.includes(key) || typableOther.includes(key))) {
				/* e.preventDefault(); createCellInput({ rowIndex, colIndex, originalCell }); */
			}
			cellToFocus.originalCell = `${cellToFocus.rowIndex}_${cellToFocus.colIndex}`;

			if (initalOriginalCell !== cellToFocus.originalCell) {
				await table.focusCell({ cellToFocus, triggerVirtual: true });
			}
		};

		cellNode.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				cellNode.removeEventListener('keydown', handleKeydown);
			}
		};
	};
	const gridColumn = $derived.by(() => {
		if (table.get.rowSelection !== 'none') {
			return col.field === '_selection' ? '1 / 2' : `${ci + 2} / ${ci + 3}`;
		} else {
			return `${ci + 1} / ${ci + 2}`;
		}
	});
	const freezed = col.field === '_selection';
	const left = freezed ? '0px' : undefined;
</script>

<div
	role="gridcell"
	use:clickAction
	use:keyboardAction
	style:grid-row={`${gridRowStart} / ${gridRowStart + 1}`}
	style:grid-column={gridColumn}
	class:slc-td={true}
	class:slc-freezed={freezed}
	class:slc-freezed-shadow={freezed}
	style:left
	class={classes}
	data-cell={originalCell}
	tabindex={table.getFocusedCell()?.originalCell === originalCell && typeof table.getFocusedCell()?.tabIndex !== 'undefined' ? table.getFocusedCell()?.tabIndex : -1}
	aria-selected={table?.getFocusedCell()?.originalCell === originalCell ? 'true' : 'false'}
	data-focused={table?.getFocusedCell()?.originalCell === originalCell ? 'true' : 'false'}
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
	.slc-td {
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
		/* background-color: color-mix(in srgb, currentColor 100%, transparent 0%); */
	}
	.slc-freezed {
		z-index: 3;
		position: sticky;
	}
	.slc-freezed-shadow {
		box-shadow: 2px 0 5px -2px color-mix(in srgb, currentColor 30%, transparent 70%);
	}
	/* .slc-table-td:nth-last-child(1) {
		border-left-width: 1px;
	}
	.slc-table-td:nth-last-child(2) {
		border-right-width: 0px;
	} */
	/* [aria-selected='true'] {
		background-color: #ffdca0cb;
	} */
	[data-focused='true'] {
		outline: 2px solid #f59e0b;
		outline-offset: -2px;
	}
</style>
