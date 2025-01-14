<script lang="ts" generics="TData extends Row">
	import type { Row, Column, Sources, FocucedCell } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Snippet } from 'svelte';
	import { tick, flushSync } from 'svelte';
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

	const mouseAction = (cellNode: HTMLDivElement) => {
		const handleMouseDown = async () => {
			if (typeof row_oi === 'undefined') return;
			await table.setFocusedCell({ rowIndex: row_oi, colIndex: ci, originalCell: `${row_oi}_${ci}` });
		};

		cellNode.addEventListener('mousedown', handleMouseDown);

		return {
			destroy() {
				cellNode.removeEventListener('mousedown', handleMouseDown);
			}
		};
	};

	const keyboardAction = (cellNode: HTMLDivElement) => {
		const handleKeydown = async (e: KeyboardEvent) => {
			// console.log('object');
			const focusedCell = table.focusedCell;
			const focusedRowIndex = focusedCell?.rowIndex;
			const focusedColIndex = focusedCell?.colIndex;
			if (typeof focusedRowIndex === 'undefined' || typeof focusedColIndex === 'undefined') return;

			const { key } = e;

			const typableNumber = '1234567890';
			const typableLower = 'abcdefghijklmnopqrstuvwxyz';
			const typableUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const typableOther = " =-`[\\]';,./ğüşıöçĞÜŞİÖÇ";

			// Kullanılabilir olduğunda hücrenin kendisi yerine hücre içeriğine odaklanma
			// const elementToFocus = cell.querySelector<Element & HTMLOrSVGElement>('[tabindex="0"]') ?? cell;
			// elementToFocus.focus({ preventScroll: true });

			let nextFocusedCell: FocucedCell | undefined = undefined;
			if (key === 'ArrowUp') {
				nextFocusedCell = { rowIndex: focusedRowIndex - 1, colIndex: focusedColIndex, originalCell: `${focusedRowIndex - 1}_${focusedColIndex}` };
			} else if (key === 'ArrowDown' || key === 'Enter') {
				nextFocusedCell = { rowIndex: focusedRowIndex + 1, colIndex: focusedColIndex, originalCell: `${focusedRowIndex + 1}_${focusedColIndex}` };
			} else if (key === 'ArrowLeft' || (e.shiftKey && key === 'Tab')) {
				nextFocusedCell = { rowIndex: focusedRowIndex, colIndex: focusedColIndex - 1, originalCell: `${focusedRowIndex}_${focusedColIndex - 1}` };
			} else if (key === 'ArrowRight' || (!e.shiftKey && key === 'Tab')) {
				nextFocusedCell = { rowIndex: focusedRowIndex, colIndex: focusedColIndex + 1, originalCell: `${focusedRowIndex}_${focusedColIndex + 1}` };
			} else if (key === 'F2') {
				/* e.preventDefault();
				table.createCellInput({ rowIndex, colIndex, originalCell }); */
			} else if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'C')) {
				/* Ctrl + C = Kopyala */
			} else if ((e.ctrlKey || e.metaKey) && (key === 'v' || key === 'V')) {
				/* Ctrl + V = Yapistir */
			} else if (!e.ctrlKey && !e.metaKey && (typableNumber.includes(key) || typableLower.includes(key) || typableUpper.includes(key) || typableOther.includes(key))) {
				/* e.preventDefault();
				table.createCellInput({ rowIndex, colIndex, originalCell }); */
			}

			if (typeof nextFocusedCell?.rowIndex !== 'undefined' && typeof nextFocusedCell?.colIndex !== 'undefined' && typeof table.element !== 'undefined') {
				e.preventDefault();
				const dataRowLength = table.get.data.length;
				const dataColLength = table.columns.length;
				if (nextFocusedCell.colIndex >= 0 && nextFocusedCell.colIndex < dataColLength && nextFocusedCell.rowIndex >= 0 && nextFocusedCell.rowIndex < dataRowLength) {
					await table.setFocusedCell(nextFocusedCell);
				}
			}
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
	use:mouseAction
	use:keyboardAction
	style:grid-row={`${gridRowStart} / ${gridRowStart + 1}`}
	style:grid-column={`${ci + 1} / ${ci + 2}`}
	class:slc-table-td={true}
	class={classes}
	tabindex={table?.focusedCell?.originalCell === originalCell ? 0 : -1}
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
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	/* .slc-table-td:nth-last-child(1) {
		border-left-width: 1px;
	}
	.slc-table-td:nth-last-child(2) {
		border-right-width: 0px;
	} */
	[aria-selected='true'] {
		outline-width: 2px;
		outline-offset: -2px;
		outline-color: #f59e0b;
	}
</style>
