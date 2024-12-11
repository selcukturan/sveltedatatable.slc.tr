<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<div data-component="MainContent" class="rounded-md bg-tertiary-100/20 p-4">
	{@render children?.()}
</div>
