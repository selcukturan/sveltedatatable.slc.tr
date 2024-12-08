<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, metadata }: { children?: Snippet; metadata?: Record<string, unknown> } = $props();
</script>

<div class="slc-markdown">
	{#if children}
		{@render children?.()}
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<div>İçerik Yok</div>
		</div>
	{/if}
	{JSON.stringify(metadata)}
</div>
