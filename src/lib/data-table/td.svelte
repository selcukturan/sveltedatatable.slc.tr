<script lang="ts" generics="TData extends Row">
	import type { Row, Column } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		row: TData;
		children: Snippet;
		ri: number;
		ci: number;
		col: Column<TData>;
		class?: string;
	};
	const { row, children, ri, ci, col, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>();

	const cellReferance = `r${ri}c${ci}`;
	const focusedCellReferance =
		typeof row.originalRowIndex === 'number' && typeof col.originalColIndex === 'number'
			? `r${row.originalRowIndex}c${col.originalColIndex}`
			: '';

	const focusAction = (cellNode: HTMLDivElement) => {
		const handleFocus = () => {
			table.focusedCell = undefined;

			const { row, col, originalrowindex, originalcolindex, field } = cellNode.dataset;

			const rowIndex = row ? +row : undefined;
			const colIndex = col ? +col : undefined;
			const originalRowIndex = originalrowindex ? +originalrowindex : undefined;
			const originalColIndex = originalcolindex ? +originalcolindex : undefined;

			if (
				typeof field === 'undefined' ||
				typeof rowIndex === 'undefined' ||
				typeof colIndex === 'undefined' ||
				typeof originalRowIndex === 'undefined' ||
				typeof originalColIndex === 'undefined'
			) {
				return;
			}

			const cell = `r${rowIndex}c${colIndex}`;
			const originalCell = `r${originalRowIndex}c${originalColIndex}`;

			table.focusedCell = {
				rowIndex,
				colIndex,
				cell,
				originalCell,
				originalRowIndex,
				originalColIndex,
				field
			};
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
	class:slc-table-td-focusedCell={table?.focusedCell?.originalCell === focusedCellReferance
		? true
		: false}
	tabindex={table?.focusedCell?.originalCell === focusedCellReferance ? 0 : -1}
	aria-selected={table?.focusedCell?.originalCell === focusedCellReferance ? 'true' : 'false'}
	aria-colindex={ci}
	data-col={ci}
	data-row={ri}
	data-cell={cellReferance}
	data-originalrowindex={row.originalRowIndex}
	data-originalcolindex={col.originalColIndex}
	data-originalcell={focusedCellReferance}
	data-field={col?.field}
	spellcheck="false"
	{...attributes}
>
	<div class="flex h-full w-full justify-between">
		<div class="hidden items-center">x</div>
		<div
			style:justify-content={col.align === 'center'
				? 'center'
				: col.align === 'right'
					? 'flex-end'
					: 'flex-start'}
			class="flex min-w-0 flex-1 items-center"
		>
			<p class="overflow-hidden text-ellipsis whitespace-nowrap">
				{@render children?.()}
			</p>
		</div>
		<div class="hidden items-center">x</div>
	</div>
</div>

<style lang="postcss">
	.slc-table-td {
		@apply relative;
		@apply z-[2];
		@apply select-none;
		@apply overflow-hidden;
		@apply border-b;
		@apply border-r;
		@apply p-0;
		@apply px-2;
		@apply outline-none;
		@apply [&:nth-last-child(1)]:border-l;
		@apply [&:nth-last-child(2)]:border-r-0;
	}
	.slc-table-td-focusedCell {
		@apply outline-2;
		@apply -outline-offset-2;
		@apply outline-amber-500;
	}
</style>
