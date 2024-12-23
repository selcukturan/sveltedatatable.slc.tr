<script lang="ts" generics="TData extends Row">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Column, Row, Sources } from './types';
	import { type Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		src: Sources<TData>;
		children: Snippet;
		ci: number;
		col: Column<TData>;
		class?: string;
	};

	const { src, children, ci, col, class: classes, ...attributes }: Props = $props();
</script>

<div
	role="columnheader"
	class:slc-table-th={true}
	class={classes}
	style:grid-row-start="var(--slc-grid-row-start)"
	data-col={ci}
	data-originalcolindex={col.oi}
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
			<p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
				{@render children?.()}
			</p>
		</div>
		<div style="display: none; align-items: center;">x</div>
	</div>
</div>

<style>
	.slc-table-th {
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
	/* .slc-table-th:nth-last-child(1) {
		border-left-width: 1px;
	}
	.slc-table-th:nth-last-child(2) {
		border-right-width: 0px;
	} */
</style>
