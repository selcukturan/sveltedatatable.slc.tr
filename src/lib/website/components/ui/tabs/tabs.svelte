<script lang="ts">
	import { setTabs } from './context.svelte';
	import type { Snippet } from 'svelte';

	const {
		value = $bindable(),
		contents,
		tabs
	}: { value: string; contents: Snippet; tabs: Snippet } = $props();
	const api = setTabs({ value });
</script>

<div {...api.getRootProps()}>
	<div {...api.getListProps()}>
		{@render tabs?.()}
	</div>
	{@render contents?.()}
</div>
