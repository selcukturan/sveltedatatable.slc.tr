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

<div role="row" class:slc-trh={true} class={classes} aria-rowindex={table.headerRowsCount} {...attributes}>
	{@render children?.()}
</div>

<style>
	.slc-trh {
		display: contents;
	}
</style>
