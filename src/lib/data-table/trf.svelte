<script lang="ts" generics="TData extends Row">
	import type { Row, Sources } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		fi: number;
		class?: string;
	};
	const { src, children, fi, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);

	const headerCount = 1;
	const footerIndexToRow = 1;
	const gridRowStart = $derived(table.get.data.length + headerCount + fi + footerIndexToRow);
</script>

<div
	role="row"
	class:slc-table-trf={true}
	class={classes}
	style:--slc-grid-row-start={gridRowStart}
	data-originalrowindex={fi}
	{...attributes}
>
	{@render children?.()}
</div>

<style>
	.slc-table-trf {
		display: contents;
	}
</style>
