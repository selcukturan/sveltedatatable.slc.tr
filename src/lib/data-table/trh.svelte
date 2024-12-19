<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { Row, Sources } from './types';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		class?: string;
	};
	const { src, children, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);
</script>

<div
	role="row"
	class:slc-table-trh={true}
	class={classes}
	style:--slc-grid-row-start={table.headerCount}
	{...attributes}
>
	{@render children?.()}
</div>

<style>
	.slc-table-trh {
		display: contents;
	}
</style>
