<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Footer, Row, Column } from './types';
	import type { Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		data: TData[];
		children: Snippet;
		fi: number;
		foot: Footer<TData>;
		col: Column<TData>;
		ci: number;
		class?: string;
	};
	const { data, children, fi, foot, col, ci, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>();
	const bottom = $derived(`${(table.footers.length - fi - 1) * table.settings.tfootRowHeight}px`);
</script>

<div
	role="gridcell"
	class:slc-table-tf={true}
	class={classes}
	style:grid-row-start="var(--slc-grid-row-start)"
	style:bottom
	data-foot={fi}
	data-col={ci}
	data-originalcolindex={col.originalColIndex}
	{...attributes}
>
	<div class="flex h-full w-full justify-between">
		<div class="hidden items-center">x</div>
		<div
			class="flex min-w-0 flex-1 items-center"
			style:justify-content={col.alignFooter
				? col.alignFooter === 'center'
					? 'center'
					: col.alignFooter === 'right'
						? 'flex-end'
						: 'flex-start'
				: col.align === 'center'
					? 'center'
					: col.align === 'right'
						? 'flex-end'
						: 'flex-start'}
		>
			<p class="overflow-hidden text-ellipsis whitespace-nowrap">
				{@render children?.()}
			</p>
		</div>
		<div class="hidden items-center">x</div>
	</div>
</div>

<style lang="postcss">
	.slc-table-tf {
		@apply sticky;
		/* @apply bottom-0; */
		@apply z-[4];
		@apply select-none;
		@apply overflow-hidden;
		@apply border-b;
		@apply border-r;
		@apply border-solid;
		@apply px-2;
		@apply outline-none;
		@apply [&:nth-last-child(1)]:border-l;
		@apply [&:nth-last-child(2)]:border-r-0;
	}
</style>
