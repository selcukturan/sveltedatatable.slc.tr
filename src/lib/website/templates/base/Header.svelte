<script lang="ts">
	import { ThemeToggle } from '$lib/website/components/base/theme-toggle';
</script>

<header
	data-component="Header"
	class="sticky top-0 z-50 flex border-b border-border/70 bg-surface-50/60 backdrop-blur supports-[backdrop-filter]:bg-surface-50/30"
>
	<div class="container flex">
		<div class="flex items-center">
			<div data-component="Logo" class="flex h-12 items-center justify-center">
				<a href="/" class="relative mx-2 my-3 flex rounded-sm bg-surface-100">
					<img
						class="object-fit inset-0 h-8 w-8 slc-image-select-none"
						src="/images/logo/logo_512.png"
						alt="SLC Web logo"
					/>
					<div class="flex flex-col">
						<div class="flex items-center justify-center rounded-t-sm bg-surface-200 px-1 text-xs">
							<p class="select-none text-nowrap text-primary-400">svelte</p>
						</div>
						<div class="flex items-center justify-center rounded-b-sm bg-surface-300 px-1 text-xs">
							<p class="select-none text-nowrap text-secondary-400">data table</p>
						</div>
					</div>

					<span
						class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 select-none rounded-sm bg-quaternary-200 px-1 text-[0.50rem]"
						>v0.0.1</span
					>
				</a>
			</div>
		</div>
		<div class="flex flex-1 justify-center">
			<p>2</p>
		</div>
		<div class="flex">
			<ThemeToggle />
		</div>
		<!-- <div class="flex">
			<div data-component="Logo" class="grid w-40">
				<a href="/" class="relative mx-2 my-3 grid grid-cols-2 rounded-sm bg-surface-200">
					<div class="relative flex items-center justify-center">
						<img
							class="object-fit absolute inset-0 h-full w-full slc-image-select-none"
							src="/images/logo/logo_512.png"
							alt="SLC Web logo"
						/>
					</div>
					<div class="grid">
						<div class="flex items-center justify-center rounded-t-md bg-quaternary-300/80 text-xs">
							<p>svelte</p>
						</div>
						<div class="flex items-center justify-center rounded-b-md bg-primary-400/80 text-xs">
							<p>data table</p>
						</div>
					</div>

					<span
						class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-md bg-secondary-200/80"
						>v0.0.1</span
					>
				</a>
			</div>
		</div>
		<div class=" bg-secondary-500">2</div>
		<div><ThemeToggle /></div> -->
		<!-- <div class="grid">
			<div class="grid">
				<a href="/" class="relative mx-2 my-3 grid grid-cols-1 rounded-sm bg-surface-200">
					<div class="flex items-center">
						<img class="h-6 w-6 select-none" src="/images/logo/logo_512.png" alt="SLC Web logo" />
					</div>
					<div class="grid">
						<div
							class="text flex items-center justify-center rounded-t-md bg-quaternary-300/80 px-1 text-xs"
						>
							<p>svelte</p>
						</div>
						<div
							class="flex items-center justify-center rounded-b-md bg-primary-400/80 px-1 text-xs"
						>
							<p>data table</p>
						</div>
					</div>

					<span
						class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-md bg-secondary-200/80 px-1 text-xs"
						>v0.0.1</span
					>
				</a>
			</div>
			<div class=" bg-red-500">2</div>
			<div class="bg-red-500">3</div>
		</div> -->
	</div>

	<!-- <div class="container flex items-center justify-stretch">
		<div>
			<a href="/" class="relative flex items-center justify-center rounded-sm bg-surface-200">
				<div class="px-1">
					<img class="h-6 w-6 select-none" src="/images/logo/logo_512.png" alt="SLC Web logo" />
				</div>
				<div class="flex flex-col">
					<div
						class="text flex w-full items-center justify-center rounded-t-md bg-surface-300/80 px-1 text-xs"
					>
						svelte
					</div>
					<div
						class="flex w-full items-center justify-center rounded-b-md bg-surface-400/80 px-1 text-xs"
					>
						data table
					</div>
				</div>
				<span
					class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-md bg-secondary-200/80 px-1 text-xs"
					>v0.0.1</span
				>
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">2</div>
		<div class="flex gap-3">
			<a href="/">Github</a>
			<ThemeToggle />
		</div>
	</div> -->
</header>
