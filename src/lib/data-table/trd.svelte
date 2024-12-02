<script lang="ts" generics="TData extends Row">
	import type { Row } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	// import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
		class?: string;
		ri: number;
		row: TData;
	};
	const { children, class: classes, ri, row, ...attributes }: Props = $props();

	// const table = getTable<TData>();

	const headerCount = 1;
	const indexToRow = 1;
	const gridRowStart =
		typeof row.originalRowIndex === 'number'
			? row.originalRowIndex + headerCount + indexToRow
			: undefined;
</script>

<div
	role="row"
	class:slc-table-trd={true}
	class={classes}
	style:--slc-grid-row-start={gridRowStart}
	aria-rowindex={ri}
	data-originalrowindex={row.originalRowIndex}
	{...attributes}
>
	{@render children?.()}
</div>

<style lang="postcss">
	.slc-table-trd {
		@apply contents;
	}
</style>
