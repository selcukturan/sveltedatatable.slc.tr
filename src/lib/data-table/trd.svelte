<script lang="ts" generics="TData extends Row">
	import type { Row } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
		class?: string;
		ri: number;
		row: TData;
	};
	const { children, class: classes, ri, row, ...attributes }: Props = $props();

	const headerCount = 1;
	const indexToRow = 1;
	const gridRowStart = typeof row.oi === 'number' ? row.oi + headerCount + indexToRow : undefined;
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
