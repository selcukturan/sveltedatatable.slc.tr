<script lang="ts">
	import '$lib/website/postcss/main.postcss';
	import { Icons } from '$lib/website/components/icons';
	import type { Snippet } from 'svelte';
	import { setGlobalContext } from '$lib/website/contexts/global.svelte';
	import { afterNavigate } from '$app/navigation';
	import { Site, Header, Footer } from '$lib/website/templates/base';
	let { children }: { children?: Snippet } = $props();

	const globalContext = setGlobalContext();

	afterNavigate(() => {
		globalContext.data.windowWidth = window.innerWidth;
	});

	$effect(() => {
		// CSS medya sorguları ile yapamadığımız şeyler için kullanılabilir JAVASCRIPT ekran ölçüleri
		const size = globalContext.data.screens;
		const w = globalContext.data.windowWidth;

		if (
			typeof w === 'undefined' ||
			typeof size === 'undefined' ||
			typeof size.sm === 'undefined' ||
			typeof size.md === 'undefined' ||
			typeof size.lg === 'undefined' ||
			typeof size.xl === 'undefined'
		) {
			return;
		}

		globalContext.data.currentScreen =
			w < size.sm
				? 'xs'
				: w >= size.sm && w < size.md
					? 'sm'
					: w >= size.md && w < size.lg
						? 'md'
						: w >= size.lg && w < size.xl
							? 'lg'
							: 'xl';
	});
</script>

<svelte:window bind:innerWidth={globalContext.data.windowWidth} />

<Icons />

<Site>
	<Header />
	{@render children?.()}
	<Footer />
</Site>
