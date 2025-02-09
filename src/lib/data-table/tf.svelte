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
	const gridColumn = $derived.by(() => {
		if (table.get.rowSelection !== 'none') {
			return col.field === '_selection' ? '1 / 2' : `${ci + 2} / ${ci + 3}`;
		} else {
			return `${ci + 1} / ${ci + 2}`;
		}
	});
	const leftFreezed = col.field === '_selection';
	const left = leftFreezed ? '0px' : undefined;

	const rightFreezed = col.field === '_action';
	const right = rightFreezed ? '0px' : undefined;
</script>

<div
	role="gridcell"
	style:grid-row={`${gridRowStart} / ${gridRowStart + 1}`}
	style:grid-column={gridColumn}
	class:slc-tf={true}
	class:slc-freezed-left={leftFreezed}
	class:slc-freezed-left-shadow={leftFreezed}
	style:left
	class:slc-freezed-right={rightFreezed}
	class:slc-freezed-right-shadow={rightFreezed}
	style:right
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
			<span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
				{@render children?.()}
			</span>
		</div>
		<div style="display: none; align-items: center;">x</div>
	</div>
</div>

<style>
	.slc-tf {
		position: sticky;
		user-select: none;
		padding: 0px;
		padding-left: 0.5rem; /* 8px */
		padding-right: 0.5rem; /* 8px */
		outline: none;
	}
	.slc-freezed-right,
	.slc-freezed-left {
		z-index: 1;
	}
	.slc-freezed-left-shadow {
		box-shadow: 2px 0 5px -2px color-mix(in srgb, currentColor 30%, transparent 70%);
	}
	.slc-freezed-right-shadow {
		box-shadow: -2px 0 5px -2px color-mix(in srgb, currentColor 30%, transparent 70%);
	}
</style>
