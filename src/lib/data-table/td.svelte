<script lang="ts" generics="TData extends Row">
	import type { Row, Column, Sources, Field } from './types';
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

	const cell = `r${ri}c${ci}`;
	const originalCell = typeof row.oi === 'number' && typeof col.oi === 'number' ? `r${row.oi}c${col.oi}` : '';

	const focusAction = (cellNode: HTMLDivElement) => {
		const handleFocus = () => {
			table.focusedCell = undefined;

			const { row, col, originalrowindex, originalcolindex, field } = cellNode.dataset;
			const typedField = field as Field<TData>;

			if (
				typeof typedField === 'undefined' ||
				typeof row === 'undefined' ||
				typeof col === 'undefined' ||
				typeof originalrowindex === 'undefined' ||
				typeof originalcolindex === 'undefined'
			) {
				return;
			}
			table.setFocusedCell({
				field: typedField,
				rowIndex: +row,
				colIndex: +col,
				cell: `r${row}c${col}`,
				originalRowIndex: +originalrowindex,
				originalColIndex: +originalcolindex,
				originalCell: `r${originalrowindex}c${originalcolindex}`
			});
		};

		cellNode.addEventListener('focus', handleFocus);

		return {
			destroy() {
				cellNode.removeEventListener('focus', handleFocus);
			}
		};
	};
</script>

<div
	role="gridcell"
	use:focusAction
	style:grid-row-start="var(--slc-grid-row-start)"
	class:slc-table-td={true}
	class={classes}
	class:slc-table-td-focusedCell={table?.focusedCell?.originalCell === originalCell ? true : false}
	tabindex={table?.focusedCell?.originalCell === originalCell ? 0 : -1}
	aria-selected={table?.focusedCell?.originalCell === originalCell ? 'true' : 'false'}
	aria-colindex={ci}
	data-col={ci}
	data-row={ri}
	data-cell={cell}
	data-originalrowindex={row.oi}
	data-originalcolindex={col.oi}
	data-originalcell={originalCell}
	data-field={col.field}
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
	.slc-table-td-focusedCell {
		outline-width: 2px;
		outline-offset: -2px;
		outline-color: #f59e0b;
	}
</style>
