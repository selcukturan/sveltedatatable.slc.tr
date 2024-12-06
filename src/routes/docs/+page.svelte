<script lang="ts">
	import Test, { metadata } from '$lib/website/markdowns/Test.md';
	import { Main, MainContent, SidebarRight } from '$lib/website/templates/base';
</script>

<Main>
	<MainContent>
		<p>{metadata.title} - 2</p>
		<p>introduction</p>
		<a href="/docs/installation">installation</a>
		<a href="/">home</a>
		<div class="slc-markdown">
			<Test />
			<Test />
			<Test />
		</div>
	</MainContent>
	{#snippet sidebarRight()}
		<SidebarRight />
	{/snippet}
</Main>
