<script lang="ts">
	import { getTabs } from '.';
	import type { Snippet } from 'svelte';

	const { value, children }: { value: string; children: Snippet } = $props();
	const api = getTabs();
</script>

{#if children}
	<div {...api.getContentProps({ value: value })}>
		{@render children?.()}
	</div>
{:else}
	<p>No content</p>
{/if}

<style lang="postcss">
	[data-scope='tabs'][data-part='content'] {
		@apply py-4;
	}
	[data-scope='tabs'][data-part='content'][data-selected] {
		/* Styles for selected tab content */
	}
</style>
