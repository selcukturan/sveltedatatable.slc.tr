<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Page, SidebarLeft } from '$lib/website/templates/base';
	let { children }: { children?: Snippet } = $props();
</script>

<Page>
	{#snippet sidebarLeft()}
		<SidebarLeft />
	{/snippet}

	{@render children?.()}
</Page>
