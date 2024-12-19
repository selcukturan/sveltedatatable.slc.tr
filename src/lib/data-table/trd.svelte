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

	const indexToRow = 1;
	const gridRowStart =
		typeof row.oi === 'number' ? row.oi + table.headerCount + indexToRow : undefined;
</script>

<div
	role="row"
	class:slc-table-trd={true}
	class={classes}
	style:--slc-grid-row-start={gridRowStart}
	aria-rowindex={ri}
	data-originalrowindex={row.oi}
	{...attributes}
>
	{@render children?.()}
</div>

<style>
	.slc-table-trd {
		display: contents;
	}
</style>
