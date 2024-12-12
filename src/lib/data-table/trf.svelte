<script lang="ts" generics="TData extends Row">
	import type { Row, Settings } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		settings: Settings<TData>;
		children: Snippet;
		fi: number;
		class?: string;
	};
	const { settings, children, fi, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>(settings.id);

	const headerCount = 1;
	const footerIndexToRow = 1;
	const gridRowStart = $derived(table.settings.data.length + headerCount + fi + footerIndexToRow);
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
