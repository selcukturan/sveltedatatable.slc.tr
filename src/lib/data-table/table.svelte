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

	if (!src.id) throw new Error('Sources not found');
	const table = getTable<TData>(src.id);
	const headerCount = 1;

	const scrollAction = (tableNode: HTMLDivElement) => {
		let isScrolling: boolean = false;

		const setScrollTop = /* async */ () => {
			// if (isScrolling) return; // Eğer fonksiyon zaten çalışıyorsa, yeni çağrıları reddeder.
			console.log(1);
			const { scrollTop } = tableNode;
			// if (scrollTop === table.lastScrollTop) return; // virtual scroll özelliği sadece dikey scroll'da çalışır.

			// isScrolling = true;
			// table.lastScrollTop = scrollTop;
			// await tick(); // `table.scrollTop` state'i değiştiğinde, dom'da yapılacak tüm değişiklikleri bekler.
			// table.scrollTop = table.lastScrollTop; // `table.scrollTop` değiştiğinde `table.data` yeniden hesaplanır.
			// await tick(); // `table.scrollTop` state'i değiştiğinde, dom'da yapılacak tüm değişiklikleri bekler.
			// isScrolling = false;

			const rowHeight = table.get.tbodyRowHeight;
			const overscanThreshold = table.get.overscanThreshold;
			const clientHeight = table.clientHeight;
			// const scrollTop = table.scrollTop;
			const dataLength = table.get.data.length;

			const rowVisibleStartIndex = Math.floor(scrollTop / rowHeight);
			const rowVisibleEndIndex = Math.min(
				dataLength - 1,
				Math.floor((scrollTop + clientHeight) / rowHeight)
			);
			const rowOverscanStartIndex = Math.max(0, rowVisibleStartIndex - overscanThreshold);
			const rowOverscanEndIndex = Math.min(dataLength - 1, rowVisibleEndIndex + overscanThreshold);

			table.data = table.get.data
				.slice(rowOverscanStartIndex, rowOverscanEndIndex + 1)
				.map((row, index) => {
					return {
						...row,
						oi: rowOverscanStartIndex + index // original row index
					};
				});
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
			No data to display
		</div>
		<div
			role="grid"
			bind:this={table.element}
			bind:clientHeight={table.clientHeight}
			use:scrollAction
			class:slc-table={true}
			class={tableClass}
			style:grid-template-rows={table.gridTemplateRows}
			style:grid-template-columns={table.gridTemplateColumns}
			style:scroll-padding-block={`${headerCount * table.get.theadRowHeight}px ${table.footers.length * table.get.tfootRowHeight}px`}
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
