<script lang="ts" generics="TData extends Row">
	import type { Row } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
		class?: string;
	};
	const { children, class: classes, ...attributes }: Props = $props();
	const headerCount = 1;
</script>

<div
	role="row"
	class:slc-table-trh={true}
	class={classes}
	style:--slc-grid-row-start={headerCount}
	{...attributes}
>
	{@render children?.()}
</div>

<style lang="postcss">
	.slc-table-trh {
		@apply contents;
	}
</style>
