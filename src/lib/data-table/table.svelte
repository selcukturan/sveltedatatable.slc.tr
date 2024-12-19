<script lang="ts" generics="TData extends Row">
	import type { Row, Footer, Sources } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
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

	const scrollAction = (tableNode: HTMLDivElement) => {
		let isScrolling = false;
		let lastScrollTop: number | undefined = undefined;

		const setScrollTop = async () => {
			if (isScrolling) return;
			const { scrollTop } = tableNode;
			if (typeof lastScrollTop === 'undefined') lastScrollTop = scrollTop;
			if (scrollTop === lastScrollTop) return; // only vertical scroll

			isScrolling = true;
			lastScrollTop = scrollTop;
			table.scrollTop = lastScrollTop;
			await tick();
			isScrolling = false;
		};

		tableNode.addEventListener('scroll', setScrollTop, { passive: true });

		return {
			destroy() {
				tableNode.removeEventListener('scroll', setScrollTop);
			}
		};
	};
</script>

<div
	class:slc-table-main={true}
	class={containerClass}
	style:width={table.get.width}
	style:height={table.get.height}
>
	{@render toolbar?.()}
	<div class:slc-table-container={true} class={tableContainerClass}>
		<div style:display={table.get.data.length > 0 ? 'none' : 'flex'} class:slc-table-no-data={true}>
			Gösterilecek veri yok
		</div>
		<div
			role="grid"
			bind:this={table.element}
			bind:clientWidth={table.clientWidth}
			bind:clientHeight={table.clientHeight}
			bind:offsetWidth={table.offsetWidth}
			bind:offsetHeight={table.offsetHeight}
			bind:contentRect={table.contentRect}
			use:scrollAction
			data-id={src.id}
			class:slc-table={true}
			class={tableClass}
			style:grid-template-rows={table.gridTemplateRows}
			style:grid-template-columns={table.gridTemplateColumns}
			style:scroll-padding-block={`${table.headerCount * table.get.theadRowHeight}px ${table.footers.length * table.get.tfootRowHeight}px`}
			style:--slc-header-row-height={`${table.get.theadRowHeight}px`}
			style:--slc-scroll-height={`${table.scrollHeight}px`}
			aria-colcount={table.columns.length}
			aria-rowcount={table.get.data.length + table.footers.length + table.headerCount}
			{...attributes}
		>
			{@render thead?.()}

			{#each table.data as row, rowindex (row.oi)}
				{@render tbody?.(row, rowindex)}
			{/each}

			{#if table.get.data.length > 0}
				{#each table.footers as foot, footerindex (footerindex)}
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
