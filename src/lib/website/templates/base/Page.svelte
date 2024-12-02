<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, sidebarLeft }: { children?: Snippet; sidebarLeft?: Snippet } = $props();
</script>

<section data-component="Page" class:base={true} class:visible-left-sidebar={sidebarLeft}>
	{@render sidebarLeft?.()}
	{@render children?.()}
</section>

<style lang="postcss">
	.base {
		@apply container mx-auto grid grid-cols-1;
	}
	.visible-left-sidebar {
		@apply lg:grid-cols-[auto_minmax(0px,1fr)];
	}
</style>
