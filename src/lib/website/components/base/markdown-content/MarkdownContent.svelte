<script lang="ts">
	import type { Snippet } from 'svelte';
	import tooltip from '$lib/website/actions/tooltip';
	import Icon from '../../icons/Icon.svelte';

	let { children, metadata }: { children?: Snippet; metadata?: Record<string, unknown> } = $props();

	export const isBrowser = typeof document !== 'undefined';
	let copied = $state(false);
	let copyTimeout = 0;

	let markdownElement: HTMLDivElement | undefined = undefined;
	const handleCopy = () => {
		if (typeof markdownElement === 'undefined' || !isBrowser) return;
		navigator.clipboard.writeText(markdownElement.innerText.trim() ?? '');
		copied = true;
		clearTimeout(copyTimeout);
		copyTimeout = window.setTimeout(() => {
			copied = false;
		}, 2500);
	};
</script>

<div class="relative contents">
	<div bind:this={markdownElement} class="slc-markdown contents">
		{#if children}
			{@render children?.()}
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<div>İçerik Yok</div>
			</div>
		{/if}
	</div>
	<button
		use:tooltip={{ text: copied ? 'Kopyalandı' : 'Kopyala', position: 'top' }}
		class="absolute right-0 top-0 mx-6 my-2 flex gap-1 rounded-sm bg-transparent px-2 py-1 text-surface-token-300 hover:bg-surface-token-400/40 active:bg-surface-token-400/50"
		onclick={handleCopy}
	>
		<Icon id={copied ? 'check' : 'copy'} />
	</button>
</div>
