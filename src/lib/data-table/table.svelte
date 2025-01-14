<script lang="ts" generics="TData extends Row">
	import type { Row, Footer, Sources } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
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
	const { src, toolbar, thead, tbody, tfoot, statusbar, class: tableClass, tableContainerClass, containerClass, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);

	const virtualScrollAction = (tableNode: HTMLDivElement) => {
		if (table.get.enableVirtualization === false) return;

		let calculatingVirtualData = false;

		const setScrollTop = async () => {
			if (calculatingVirtualData) return;

			const { scrollTop, clientHeight } = tableNode;
			if (clientHeight === 0) return;

			calculatingVirtualData = true;
			table.virtualDataTrigger = `scroll_${scrollTop}`;
			await tick();
			calculatingVirtualData = false;
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
				const clientHeight = entry.contentRect.height;
				if (clientHeight === 0) return;
				table.virtualDataTrigger = `height_${clientHeight}`;
				await tick();
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
			use:virtualScrollAction
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
				{#each table.virtualData as row, rowindex (row.oi)}
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
