<script lang="ts" generics="TData extends Row">
	import type { Row, Sources } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		class?: string;
		ri: number;
		row: TData;
	};
	const { src, children, class: classes, ri, row, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);

	const originalrowindex = $derived(table.get.enableVirtualization === false ? ri : typeof row.oi === 'number' ? row.oi : 0);
	const indexToRow = 1;
	const gridRowStart = $derived(originalrowindex + table.headerRowsCount + indexToRow);
</script>

<div
	role="row"
	class:slc-table-trd={true}
	class={classes}
	style:--slc-grid-row-start={gridRowStart}
	aria-rowindex={gridRowStart}
	data-originalrowindex={originalrowindex}
	{...attributes}
>
	{@render children?.()}
</div>

<style>
	.slc-table-trd {
		display: contents;
	}
</style>
