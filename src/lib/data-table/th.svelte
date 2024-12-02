<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Column, Row } from './types';
	import { type Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		data: TData[];
		children: Snippet;
		ci: number;
		col: Column<TData>;
		class?: string;
	};

	const { data, children, ci, col, class: classes, ...attributes }: Props = $props();
</script>

<div
	role="columnheader"
	class:slc-table-th={true}
	class={classes}
	style:grid-row-start="var(--slc-grid-row-start)"
	data-col={ci}
	data-originalcolindex={col.originalColIndex}
	{...attributes}
>
	<div class="flex h-full w-full justify-between">
		<div class="hidden items-center">x</div>
		<div
			style:justify-content={col.alignHeader
				? col.alignHeader === 'center'
					? 'center'
					: col.alignHeader === 'right'
						? 'flex-end'
						: 'flex-start'
				: col.align === 'center'
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
	.slc-table-th {
		@apply sticky;
		@apply top-0;
		@apply z-[4];
		@apply overflow-hidden;
		@apply px-2;
		@apply outline-none;
		@apply select-none;
		@apply border-b;
		@apply border-r;
		@apply [&:nth-last-child(1)]:border-l;
		@apply [&:nth-last-child(2)]:border-r-0;
	}
</style>
