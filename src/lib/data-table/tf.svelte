<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Footer, Row, Column, Sources } from './types';
	import type { Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		fi: number;
		foot: Footer<TData>;
		col: Column<TData>;
		ci: number;
		class?: string;
	};
	const { src, children, fi, foot, col, ci, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);
	const bottom = $derived(`${(table.get.footers.length - fi - 1) * table.get.tfootRowHeight}px`);
	const footerIndexToRow = 1;
	const gridRowStart = $derived(table.get.data.length + table.headerRowsCount + fi + footerIndexToRow);
</script>

<div
	role="gridcell"
	style:grid-row={`${gridRowStart} / ${gridRowStart + 1}`}
	style:grid-column={col.field === '_selection' ? '1 / 2' : `${ci + 2} / ${ci + 3}`}
	class:slc-table-tf={true}
	class={classes}
	style:bottom
	aria-colindex={ci + 1}
	data-foot={fi}
	data-col={ci}
	{...attributes}
>
	<div style="display: flex; height: 100%; width: 100%; justify-content: space-between;">
		<div style="display: none; align-items: center;">x</div>
		<div
			style="display: flex; min-width: 0px; flex: 1 1 0%; align-items: center;"
			style:justify-content={col.alignFooter
				? col.alignFooter === 'center'
					? 'center'
					: col.alignFooter === 'right'
						? 'flex-end'
						: 'flex-start'
				: col.align === 'center'
					? 'center'
					: col.align === 'right'
						? 'flex-end'
						: 'flex-start'}
		>
			<p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
				{@render children?.()}
			</p>
		</div>
		<div style="display: none; align-items: center;">x</div>
	</div>
</div>

<style>
	.slc-table-tf {
		position: sticky;
		/* bottom: 0px; */
		z-index: 4;
		user-select: none;
		overflow: hidden;
		border-bottom-width: 1px;
		border-right-width: 1px;
		border-style: solid;
		padding: 0px;
		padding-left: 0.5rem; /* 8px */
		padding-right: 0.5rem; /* 8px */
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	/* .slc-table-tf:nth-last-child(1) {
		border-left-width: 1px;
	}
	.slc-table-tf:nth-last-child(2) {
		border-right-width: 0px;
	} */
</style>
