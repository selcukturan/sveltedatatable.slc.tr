<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ShowCase } from '$lib/website/components/base/showcase';
	import { MarkdownContent } from '$lib/website/components/base/markdown-content';
	import { Tabs, Tab, TabContent } from '$lib/website/components/ui/tabs';

	let { preview, code }: { preview?: Snippet; code?: Snippet } = $props();

	let selectedTab = $state('preview');
</script>

<Tabs bind:value={selectedTab}>
	{#snippet tabs()}
		<Tab value="preview">Ön İzleme</Tab>
		<Tab value="code">Kod</Tab>
	{/snippet}
	{#snippet contents()}
		<TabContent value="preview">
			<ShowCase resizeable>
				{@render preview?.()}
			</ShowCase>
		</TabContent>
		<TabContent value="code">
			<ShowCase>
				<MarkdownContent copiable>
					{@render code?.()}
				</MarkdownContent>
			</ShowCase>
		</TabContent>
	{/snippet}
</Tabs>
