<script lang="ts">
	import { getTabs } from '.';
	import type { Snippet } from 'svelte';

	const { value, children }: { value: string; children: Snippet } = $props();
	const api = getTabs();
</script>

{#if children}
	<button {...api.getTriggerProps({ value: value })}>
		{@render children?.()}
	</button>
{:else}
	<span>default</span>
{/if}

<style lang="postcss">
	[data-scope='tabs'][data-part='trigger'] {
		@apply border-b-2 border-b-transparent px-4 py-2 font-semibold;
	}
	[data-scope='tabs'][data-part='trigger'][data-selected] {
		@apply border-b-tertiary-800 text-tertiary-800;
	}
</style>
