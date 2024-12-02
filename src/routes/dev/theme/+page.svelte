<script lang="ts">
	import { Page, Main, MainContent } from '$lib/website/templates/base';
	import { getGlobalContext } from '$lib/website/contexts/global.svelte';
	const globalContext = getGlobalContext();
</script>

<Page>
	<Main>
		<MainContent>
			<div class="flex h-full w-full flex-col overflow-hidden">
				<div class="bg-success-100 p-2.5">
					<a href="/">Home</a>
				</div>
				<div class="relative flex-1 overflow-y-auto overflow-x-hidden p-1">
					<div class="p-4">
						<div class="flex flex-col p-4">
							<span>JS Screen Size: {globalContext.data.currentScreen}</span>
							<span class="slc-screen-test"></span>
						</div>

						<span class="p-4 text-surface-950">surface</span>
						<div class="m-4 flex flex-row border border-surface-950 text-sm">
							<div class="whitespace-nowrap bg-surface-50 p-4 text-surface-950">50</div>
							<div class="whitespace-nowrap bg-surface-100 p-4 text-surface-900">100</div>
							<div class="whitespace-nowrap bg-surface-200 p-4 text-surface-900">200</div>
							<div class="whitespace-nowrap bg-surface-300 p-4 text-surface-900">300</div>
							<div class="whitespace-nowrap bg-surface-400 p-4 text-surface-900">400</div>
							<div class="whitespace-nowrap bg-surface-500 p-4 text-surface-950">500</div>
							<div class="whitespace-nowrap bg-surface-600 p-4 text-surface-100">600</div>
							<div class="whitespace-nowrap bg-surface-700 p-4 text-surface-100">700</div>
							<div class="whitespace-nowrap bg-surface-800 p-4 text-surface-100">800</div>
							<div class="whitespace-nowrap bg-surface-900 p-4 text-surface-100">900</div>
							<div class="whitespace-nowrap bg-surface-950 p-4 text-surface-50">950</div>
						</div>

						<span class="p-4 text-primary-950">primary</span>
						<div class="m-4 flex flex-row border border-primary-950 text-sm">
							<div class="whitespace-nowrap bg-primary-50 p-4 text-primary-950">50</div>
							<div class="whitespace-nowrap bg-primary-100 p-4 text-primary-900">100</div>
							<div class="whitespace-nowrap bg-primary-200 p-4 text-primary-800">200</div>
							<div class="whitespace-nowrap bg-primary-300 p-4 text-primary-800">300</div>
							<div class="whitespace-nowrap bg-primary-400 p-4 text-primary-800">400</div>
							<div class="whitespace-nowrap bg-primary-500 p-4 text-primary-950">500</div>
							<div class="whitespace-nowrap bg-primary-600 p-4 text-primary-200">600</div>
							<div class="whitespace-nowrap bg-primary-700 p-4 text-primary-200">700</div>
							<div class="whitespace-nowrap bg-primary-800 p-4 text-primary-200">800</div>
							<div class="whitespace-nowrap bg-primary-900 p-4 text-primary-100">900</div>
							<div class="whitespace-nowrap bg-primary-950 p-4 text-primary-50">950</div>
						</div>

						<span class="p-4 text-secondary-950">secondary</span>
						<div class="m-4 flex flex-row border border-secondary-950 text-sm">
							<div class="whitespace-nowrap bg-secondary-50 p-4 text-secondary-950">50</div>
							<div class="whitespace-nowrap bg-secondary-100 p-4 text-secondary-900">100</div>
							<div class="whitespace-nowrap bg-secondary-200 p-4 text-secondary-800">200</div>
							<div class="whitespace-nowrap bg-secondary-300 p-4 text-secondary-800">300</div>
							<div class="whitespace-nowrap bg-secondary-400 p-4 text-secondary-800">400</div>
							<div class="whitespace-nowrap bg-secondary-500 p-4 text-secondary-950">500</div>
							<div class="whitespace-nowrap bg-secondary-600 p-4 text-secondary-200">600</div>
							<div class="whitespace-nowrap bg-secondary-700 p-4 text-secondary-200">700</div>
							<div class="whitespace-nowrap bg-secondary-800 p-4 text-secondary-200">800</div>
							<div class="whitespace-nowrap bg-secondary-900 p-4 text-secondary-100">900</div>
							<div class="whitespace-nowrap bg-secondary-950 p-4 text-secondary-50">950</div>
						</div>

						<span class="p-4 text-tertiary-950">tertiary</span>
						<div class="m-4 flex flex-row border border-tertiary-950 text-sm">
							<div class="whitespace-nowrap bg-tertiary-50 p-4 text-tertiary-950">50</div>
							<div class="whitespace-nowrap bg-tertiary-100 p-4 text-tertiary-900">100</div>
							<div class="whitespace-nowrap bg-tertiary-200 p-4 text-tertiary-800">200</div>
							<div class="whitespace-nowrap bg-tertiary-300 p-4 text-tertiary-800">300</div>
							<div class="whitespace-nowrap bg-tertiary-400 p-4 text-tertiary-800">400</div>
							<div class="whitespace-nowrap bg-tertiary-500 p-4 text-tertiary-950">500</div>
							<div class="whitespace-nowrap bg-tertiary-600 p-4 text-tertiary-200">600</div>
							<div class="whitespace-nowrap bg-tertiary-700 p-4 text-tertiary-200">700</div>
							<div class="whitespace-nowrap bg-tertiary-800 p-4 text-tertiary-200">800</div>
							<div class="whitespace-nowrap bg-tertiary-900 p-4 text-tertiary-100">900</div>
							<div class="whitespace-nowrap bg-tertiary-950 p-4 text-tertiary-50">950</div>
						</div>

						<span class="p-4 text-quaternary-950">quaternary</span>
						<div class="m-4 flex flex-row border border-quaternary-950 text-sm">
							<div class="whitespace-nowrap bg-quaternary-50 p-4 text-quaternary-950">50</div>
							<div class="whitespace-nowrap bg-quaternary-100 p-4 text-quaternary-900">100</div>
							<div class="whitespace-nowrap bg-quaternary-200 p-4 text-quaternary-800">200</div>
							<div class="whitespace-nowrap bg-quaternary-300 p-4 text-quaternary-800">300</div>
							<div class="whitespace-nowrap bg-quaternary-400 p-4 text-quaternary-800">400</div>
							<div class="whitespace-nowrap bg-quaternary-500 p-4 text-quaternary-950">500</div>
							<div class="whitespace-nowrap bg-quaternary-600 p-4 text-quaternary-200">600</div>
							<div class="whitespace-nowrap bg-quaternary-700 p-4 text-quaternary-200">700</div>
							<div class="whitespace-nowrap bg-quaternary-800 p-4 text-quaternary-200">800</div>
							<div class="whitespace-nowrap bg-quaternary-900 p-4 text-quaternary-100">900</div>
							<div class="whitespace-nowrap bg-quaternary-950 p-4 text-quaternary-50">950</div>
						</div>
					</div>
				</div>
				<div class="bg-warning-100 p-1">
					<h6>Dev Root Footer</h6>
				</div>
			</div>
		</MainContent>
	</Main>
</Page>
