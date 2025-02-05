<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { getTable, type Sources, type Row } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		class?: string;
		ri: number;
		row: TData;
	};
	const { src, children, class: classes, ri, row, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);

	const row_oi = $derived(table.get.enableVirtualization === false ? ri : row.oi);
	const indexToRow = 1;
	const ariaRowIndex = $derived(typeof row_oi === 'number' ? row_oi + table.headerRowsCount + indexToRow : undefined);
</script>

<div role="row" class:slc-trd={true} class={classes} aria-rowindex={ariaRowIndex} {...attributes}>
	{@render children?.()}
</div>

<style>
	.slc-trd {
		display: contents;
	}
</style>
