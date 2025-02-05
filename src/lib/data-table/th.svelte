<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Column, Row, Sources } from './types';
	import { type Snippet } from 'svelte';
	import { getTable } from './tables.svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		ci: number;
		col: Column<TData>;
		class?: string;
	};

	const { src, children, ci, col, class: classes, ...attributes }: Props = $props();

	const table = getTable<TData>(src.id);

	const gridColumn = $derived.by(() => {
		if (table.get.rowSelection !== 'none') {
			return col.field === '_selection' ? '1 / 2' : `${ci + 2} / ${ci + 3}`;
		} else {
			return `${ci + 1} / ${ci + 2}`;
		}
	});
	const freezed = col.field === '_selection';
	const left = freezed ? '0px' : undefined;
</script>

<div
	role="columnheader"
	style:grid-row={`${table.headerRowsCount} / ${table.headerRowsCount + 1}`}
	style:grid-column={gridColumn}
	class:slc-th={true}
	class:slc-freezed={freezed}
	class:slc-freezed-shadow={freezed}
	style:left
	class={classes}
	aria-colindex={ci + 1}
	data-col={ci}
	{...attributes}
>
	<div style="display: flex; height: 100%; width: 100%; justify-content: space-between;">
		<div style="display: none; align-items: center;">x</div>
		<div
			style="display: flex; min-width: 0px; flex: 1 1 0%; align-items: center;"
			style:justify-content={col.alignHeader
				? col.alignHeader === 'center'
					? 'center'
					: col.alignHeader === 'right'
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
	.slc-th {
		position: sticky;
		top: 0px;
		z-index: 4;
		overflow: hidden;
		padding: 0px;
		padding-left: 0.5rem; /* 8px */
		padding-right: 0.5rem; /* 8px */
		outline: 2px solid transparent;
		outline-offset: 2px;
		user-select: none;
		border-bottom-width: 1px;
		border-right-width: 1px;
		border-style: solid;
	}
	.slc-freezed {
		z-index: 5;
		position: sticky;
	}
	.slc-freezed-shadow {
		box-shadow: 2px 0 5px -2px color-mix(in srgb, currentColor 30%, transparent 70%);
	}
	/* .slc-table-th:nth-last-child(1) {
		border-left-width: 1px;
	}
	.slc-table-th:nth-last-child(2) {
		border-right-width: 0px;
	} */
</style>
