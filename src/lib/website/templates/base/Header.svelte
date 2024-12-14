<script lang="ts">
	import { ThemeToggle } from '$lib/website/components/base/theme-toggle';
	import { Icon } from '$lib/website/components/icons';
</script>

<header
	data-component="Header"
	class="sticky top-0 z-50 flex border-b border-border/30 bg-surface-50/30 backdrop-blur supports-[backdrop-filter]:bg-surface-50/30"
>
	<div class="container flex">
		<div class="flex items-center">
			<div data-component="Logo" class="flex items-center justify-center bg-red-500">
				<a href="/" class="relative flex bg-surface-100">
					<div class="flex items-center border-b border-l border-t border-surface-200">
						<img
							class="object-fit inset-0 h-8 w-8 slc-image-select-none"
							src="/images/logo/logo_512.png"
							alt="SLC Web logo"
						/>
					</div>
					<div class="flex flex-col">
						<div
							class="flex items-center justify-center border-l border-r border-t border-surface-200 bg-surface-200/40 px-1"
						>
							<p class="select-none text-nowrap text-sm font-bold leading-4 text-primary-800">
								svelte
							</p>
						</div>
						<div
							class="flex items-center justify-center border-2 border-primary-token-500 bg-surface-300/40 px-1"
						>
							<p class="select-none text-nowrap text-sm font-bold text-secondary-800">data table</p>
						</div>
					</div>

					<span
						class="absolute right-0 top-0 -translate-y-1/3 translate-x-2/3 select-none rounded-sm bg-quaternary-400 px-0.5 py-0.5 text-[0.625rem] font-semibold leading-none text-quaternary-token-950"
					>
						build.26
					</span>
				</a>
			</div>
		</div>
		<div class="flex flex-1 justify-center"></div>
		<div class="flex items-center gap-4">
			<a
				class="flex gap-1 rounded-full border border-surface-800 bg-surface-100 p-2 text-surface-800 hover:bg-surface-200 active:bg-surface-100"
				href="https://github.com/selcukturan/sveltedatatable.slc.tr"
				target="_blank"
			>
				<Icon id={`github`} />
				<span class="hidden select-none text-sm font-semibold sm:block">Github</span>
			</a>
			<ThemeToggle />
		</div>
	</div>
</header>
