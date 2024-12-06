<script lang="ts" generics="TData extends Row">
	import type { Row, Footer } from './types';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { tick } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		data: TData[];
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
		data,
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

	const table = getTable<TData>();
	const headerCount = 1;

	const scrollAction = (tableNode: HTMLDivElement) => {
		let isScrolling: boolean = false;

		const setScrollTop = async () => {
			if (isScrolling) return; // Eğer fonksiyon zaten çalışıyorsa, yeni çağrıyı atlar
			const { scrollTop } = tableNode;
			if (scrollTop === table.lastScrollTop) return; // virtual scroll özelliği sadece dikey scroll'da çalışır

			isScrolling = true;
			table.lastScrollTop = scrollTop;
			table.scrollTop = table.lastScrollTop; // scrollTop değiştiğinde `data` yeniden hesaplanır
			await tick(); // table.scrollTop state'i değiştiğinde, dom'da yapılacak tüm değişiklikleri bekler.
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
	style:width={table.settings.width}
	style:height={table.settings.height}
>
	{@render toolbar?.()}
	<div class:slc-table-container={true} class={tableContainerClass}>
		<div style:display={table.setData.length > 0 ? 'none' : 'flex'} class:slc-no-data={true}>
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
			style:scroll-padding-block={`${headerCount * table.settings.theadRowHeight}px ${table.footers.length * table.settings.tfootRowHeight}px`}
			{...attributes}
		>
			{@render thead?.()}

			{#each table.data as row, rowindex (row.originalIndex)}
				{@render tbody?.(row, rowindex)}
			{/each}

			{#if table.setData.length > 0}
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
	.slc-no-data {
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
