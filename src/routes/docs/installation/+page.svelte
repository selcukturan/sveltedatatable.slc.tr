<script lang="ts">
	import { MarkdownContent } from '$lib/website/components/base/markdown-content';
	import Installation, { metadata } from '$lib/website/contents/docs/installation/Installation.md';
	import { Main, MainContent, SidebarRight } from '$lib/website/templates/base';
</script>

<Main>
	<MainContent>
		<p>{metadata.title} - 2</p>
		<MarkdownContent {metadata}>
			<Installation />
		</MarkdownContent>
	</MainContent>
	{#snippet sidebarRight()}
		<SidebarRight />
	{/snippet}
</Main>
