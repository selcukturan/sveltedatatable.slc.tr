<script lang="ts" generics="TData extends Row">
	import type { Row, Footer, Sources } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { tick, flushSync } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		toolbar?: Snippet;
		thead: Snippet;
		tbody: Snippet<[TData, number]>;
		tfoot?: Snippet<[Footer<TData>, number]>;
		statusbar?: Snippet;
		class?: string;
		tableContainerClass?: string;
		containerClass?: string;
	};
	const {
		src,
		toolbar,
		thead,
		tbody,
		tfoot,
		statusbar,
		class: tableClass,
		tableContainerClass,
		containerClass,
		...attributes
	}: Props = $props();

	const table = getTable<TData>(src.id);

	const virtualScrollAction = (tableNode: HTMLDivElement) => {
		if (table.get.enableVirtualization === false) return;

		let isScrolling = false;
		let lastScrollTop = 0;

		const setScrollTop = async () => {
			if (isScrolling) return;

			const runTime = Date.now();

			const { scrollTop, clientHeight } = tableNode;
			if (clientHeight === 0) return;
			if (scrollTop === lastScrollTop) return; // sadece dikey scroll işleminde sanallaştırma yapılır
			isScrolling = true;
			lastScrollTop = scrollTop;
			table.scrollTop = lastScrollTop; // trigger virtualization
			await tick();
			isScrolling = false;

			const runEndTime = Math.round((Date.now() - runTime) * 100) / 100;
			const resultFpsPercentage = runEndTime / 16;
			console.info(
				`%c⏱ ${runEndTime} ms`,
				`font-size: 1rem;
                font-weight: bold;
                color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`,
				'setScrollTop'
			);
		};

		// const throttledSetScrollTop = table.throttle(setScrollTop, 50);

		tableNode.addEventListener('scroll', setScrollTop, { passive: true });

		return {
			destroy() {
				tableNode.removeEventListener('scroll', setScrollTop);
			}
		};
	};

	const virtualScrollAction1 = (tableNode: HTMLDivElement) => {
		if (table.get.enableVirtualization === false) return;

		let isScrolling = false;
		let lastScrollTop = 0;

		const setScrollTop = async (e: Event) => {
			if (isScrolling) return;
			if (!tableNode) return;

			const { scrollTop, clientHeight, offsetParent } = tableNode;
			// if (offsetParent === null) return;
			if (scrollTop === lastScrollTop) return; // sadece dikey scroll işleminde sanallaştırma yapılır
			const runTime = Date.now();
			isScrolling = true;
			lastScrollTop = scrollTop;

			const headerRowsHeight = table.headerRowsCount * table.get.theadRowHeight;
			const footerRowsHeight = table.get.footers.length * table.get.tfootRowHeight;
			const dataRowHeight = table.get.tbodyRowHeight;
			const overscanThreshold = table.overscanThreshold;
			const dataLength = table.get.data.length;

			const currentHeight = clientHeight - headerRowsHeight - footerRowsHeight;

			const rowVisibleStartIndex = Math.floor(scrollTop / dataRowHeight);
			const rowVisibleEndIndex = Math.min(dataLength - 1, Math.floor((scrollTop + currentHeight) / dataRowHeight));
			const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
			const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold);

			table.test = `startIndex:${rowOverscanStartIndex} - endIndex:${rowOverscanEndIndex} - clientHeight:${clientHeight} - scrollTop:${scrollTop}`;
			const slicedData = $state.snapshot(table.get.data.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)) as TData[];
			const processedData = slicedData.map((row, index) => {
				return {
					...row,
					oi: rowOverscanStartIndex + index // original row index
				};
			});
			// await tick();
			// flushSync();
			table.virtualData1 = processedData;
			// flushSync();
			await tick();

			//return processedData;
			/* if (scrollTop === lastScrollTop) return; // sadece dikey scroll işleminde sanallaştırma yapılır
			isScrolling = true;
			lastScrollTop = scrollTop;
			table.scrollTop = lastScrollTop; // trigger virtualization
			await tick();
			isScrolling = false; */

			const runEndTime = Math.round((Date.now() - runTime) * 100) / 100;
			const resultFpsPercentage = runEndTime / 16;
			console.info(
				`%c⏱ ${runEndTime} ms`,
				`font-size: 1rem;
                font-weight: bold;
                color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`,
				'setScrollTop'
			);
			isScrolling = false;
		};

		// const throttledSetScrollTop = table.throttle(setScrollTop, 50);

		tableNode.addEventListener('scroll', setScrollTop, { passive: true });
		return {
			destroy() {
				tableNode.removeEventListener('scroll', setScrollTop);
			}
		};
	};

	onMount(() => {
		if (table.get.enableVirtualization === false) return;
		const observer = new ResizeObserver(async (entries) => {
			for (let entry of entries) {
				const newClientHeight = entry.contentRect.height;
				if (newClientHeight === 0) return;
				if (newClientHeight !== table.clientHeight) {
					table.clientHeight = newClientHeight; // trigger virtualization
					await tick();
				}
			}
		});
		if (table.element) observer.observe(table.element);
		return () => {
			if (table.element) observer.unobserve(table.element);
		};
	});
</script>

<div class:slc-table-main={true} class={containerClass} style:width={table.get.width} style:height={table.get.height}>
	{@render toolbar?.()}
	<div class:slc-table-container={true} class={tableContainerClass}>
		<div style:display={table.get.data.length > 0 ? 'none' : 'flex'} class:slc-table-no-data={true}>Gösterilecek veri yok</div>
		<div
			role="grid"
			bind:this={table.element}
			use:virtualScrollAction1
			data-id={src.id}
			data-scope="slc-table"
			class:slc-table={true}
			class={tableClass}
			style:grid-template-rows={table.gridTemplateRows}
			style:grid-template-columns={table.gridTemplateColumns}
			style:scroll-padding-block={`${table.headerRowsCount * table.get.theadRowHeight}px ${table.get.footers.length * table.get.tfootRowHeight}px`}
			aria-colcount={table.columns.length}
			aria-rowcount={table.get.data.length + table.get.footers.length + table.headerRowsCount}
			{...attributes}
		>
			{@render thead?.()}

			{#if table.get.enableVirtualization === true}
				{#each table.virtualData1 as row, rowindex (row.oi)}
					{@render tbody?.(row, rowindex)}
				{/each}
			{:else}
				{#each table.get.data as row, rowindex (rowindex)}
					{@render tbody?.(row, rowindex)}
				{/each}
			{/if}

			{#if table.get.data.length > 0}
				{#each table.get.footers as foot, footerindex (footerindex)}
					{@render tfoot?.(foot, footerindex)}
				{/each}
			{/if}
		</div>
	</div>
	{@render statusbar?.()}
</div>

<style>
	.slc-table-main {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.slc-table-container {
		position: relative;
		flex: 1 1 0%;
		overflow: hidden;
	}
	.slc-table {
		display: grid;
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.slc-table-no-data {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		height: 100%;
		width: 100%;
		pointer-events: none;
		position: absolute;
		z-index: 50;
	}
</style>
