<script lang="ts">
	import { getGlobalContext } from '$lib/website/contexts/global.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();

	let globalContext = getGlobalContext();

	let dragging = $state(false);

	const defaultWidth = '100%';
	let width = $state(defaultWidth);
	let verticalMaxWidth: number | null = null;
	let verticalHandleDownClientX: number;
	let verticalHandleDownWidth: number;

	const defaultHeight = '400px';
	let height = $state(defaultHeight);
	let horizontalMaxHeight: number | null = 1000;
	let horizontalHandleDownClientY: number;
	let horizontalHandleDownHeight: number;

	const verticalHandleAction = (node: HTMLElement, callback: (event: PointerEvent) => void) => {
		const pointerdown = (event: PointerEvent) => {
			if (
				(event.pointerType === 'mouse' && event.button === 2) ||
				(event.pointerType !== 'mouse' && !event.isPrimary)
			)
				return;

			verticalHandleDownClientX = event.clientX;
			verticalHandleDownWidth = (node.parentNode as HTMLElement).getBoundingClientRect().width;
			if (verticalMaxWidth === null) verticalMaxWidth = verticalHandleDownWidth;

			node.setPointerCapture(event.pointerId);
			event.preventDefault();
			dragging = true;

			const onpointerup = () => {
				dragging = false;
				node.setPointerCapture(event.pointerId);
				window.removeEventListener('pointermove', callback, false);
				window.removeEventListener('pointerup', onpointerup, false);
			};

			window.addEventListener('pointermove', callback, false);
			window.addEventListener('pointerup', onpointerup, false);
		};

		node.addEventListener('pointerdown', pointerdown, { capture: true, passive: false });

		return {
			destroy() {
				node.removeEventListener('pointerdown', pointerdown);
			}
		};
	};

	const verticalHandleResizeUpdate = (event: PointerEvent) => {
		const calcWidth = verticalHandleDownWidth + (event.clientX - verticalHandleDownClientX);
		if (verticalMaxWidth === null || calcWidth >= verticalMaxWidth || calcWidth < 200) {
			return;
		}
		width = `${calcWidth}px`;
	};

	const horizontalHandleAction = (node: HTMLElement, callback: (event: PointerEvent) => void) => {
		const pointerdown = (event: PointerEvent) => {
			if (
				(event.pointerType === 'mouse' && event.button === 2) ||
				(event.pointerType !== 'mouse' && !event.isPrimary)
			)
				return;

			horizontalHandleDownClientY = event.clientY;
			horizontalHandleDownHeight = (node.parentNode as HTMLElement).getBoundingClientRect().height;
			// if (horizontalMaxHeight === null) horizontalMaxHeight = horizontalHandleDownHeight;

			node.setPointerCapture(event.pointerId);
			event.preventDefault();
			dragging = true;

			const onpointerup = () => {
				dragging = false;
				node.setPointerCapture(event.pointerId);
				window.removeEventListener('pointermove', callback, false);
				window.removeEventListener('pointerup', onpointerup, false);
			};

			window.addEventListener('pointermove', callback, false);
			window.addEventListener('pointerup', onpointerup, false);
		};

		node.addEventListener('pointerdown', pointerdown, { capture: true, passive: false });

		return {
			destroy() {
				node.removeEventListener('pointerdown', pointerdown);
			}
		};
	};

	const horizontalHandleResizeUpdate = (event: PointerEvent) => {
		const calcHeight = horizontalHandleDownHeight + (event.clientY - horizontalHandleDownClientY);
		if (horizontalMaxHeight === null || calcHeight >= horizontalMaxHeight || calcHeight < 105) {
			return;
		}
		height = `${calcHeight}px`;
	};

	$effect(() => {
		if (globalContext.data.currentScreen) {
			width = defaultWidth;
			height = defaultHeight;
			verticalMaxWidth = null;
			// horizontalMaxHeight = null;
		}
	});
</script>

<div
	data-component="TableShowCase"
	class="relative mt-2 rounded-sm border-8 border-surface-300 bg-transparent"
	style:height
	style:width
>
	{#if children}
		{@render children?.()}
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<p>No content</p>
		</div>
	{/if}
	<!-- Size Handle -->
	<div
		use:verticalHandleAction={(e) => verticalHandleResizeUpdate(e)}
		class:vertical-handle-position={true}
		class="absolute z-30 inline-flex h-16 w-2 cursor-col-resize !touch-none select-none items-center justify-center rounded-full bg-secondary-400"
	></div>
	<div
		use:horizontalHandleAction={(e) => horizontalHandleResizeUpdate(e)}
		class:horizonral-handle-position={true}
		class="absolute z-30 inline-flex h-2 w-16 cursor-row-resize !touch-none select-none items-center justify-center rounded-full bg-secondary-400"
	></div>
</div>

<style lang="postcss">
	.vertical-handle-position {
		@apply right-0 top-1/2 -translate-y-1/2 translate-x-full;
	}
	.horizonral-handle-position {
		@apply bottom-0 left-1/2 -translate-x-1/2 translate-y-full;
	}
	.horizonral-title-position {
		@apply left-16 top-0 -translate-x-1/2 -translate-y-full;
	}
</style>
