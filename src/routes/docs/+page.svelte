<script lang="ts">
	import Test from '$lib/website/markdowns/Test.md';
	import { Main, MainContent, SidebarRight } from '$lib/website/templates/base';
</script>

<Main>
	<MainContent>
		## Other typical markdown text
		<p>introduction</p>
		<a href="/docs/installation">installation</a>
		<a href="/">home</a>

		<Test />
		<Test />
		<Test />
	</MainContent>
	{#snippet sidebarRight()}
		<SidebarRight />
	{/snippet}
</Main>
