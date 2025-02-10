<!-- BaseDataTableView.svelte -->
<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf, SelectionColumn, ActionColumn } from '..';

	const { sources: src }: { sources: Sources<TData> } = $props();
	const table = getTable<TData>(src.id);
	// $inspect('$inspect-virtualData', table.virtualData);
	// $inspect('$inspect-focusedCell', table.focusedCell);
	// $inspect('$inspect-selectedRows', table.selectedRows);
</script>

<div class="slc-view" style:display="contents">
	<Table {src}>
		{#snippet thead()}
			<Trh {src}>
				<SelectionColumn type="header" {src} />
				{#each table.visibleColumns as col, ci (ci)}
					{@const header = col.label}
					<Th {src} {col} {ci}>
						{header}
					</Th>
				{/each}
				<ActionColumn type="header" {src} />
			</Trh>
		{/snippet}
		{#snippet tbody(row, ri)}
			<Trd {src} {row} {ri}>
				<SelectionColumn type="cell" {src} {row} {ri} />
				{#each table.visibleColumns as col, ci (ci)}
					{@const cell = row[col.field]}
					<Td {src} {col} {ci} {row} {ri}>
						{#if col.field === 'grapeColor'}
							<input type="checkbox" name={`name_${ri}_${ci}`} id={`id_${ri}_${ci}`} tabindex="0" />
							{cell}
						{:else}
							{cell}
						{/if}
					</Td>
				{/each}
				<ActionColumn type="cell" {src} {row} {ri} />
			</Trd>
		{/snippet}
		{#snippet tfoot(foot, fi)}
			<Trf {src} {fi}>
				<SelectionColumn type="footer" {src} {foot} {fi} />
				{#each table.visibleColumns as col, ci (ci)}
					{@const footer = foot[col.field]}
					<Tf {src} {col} {ci} {foot} {fi}>
						{footer}
					</Tf>
				{/each}
				<ActionColumn type="footer" {src} {foot} {fi} />
			</Trf>
		{/snippet}
	</Table>
</div>

<style>
	/**
	* Herhangi bir bileşende, bu bileşene ait `.slc-view` öğelerinin içinde bulunan tüm `:global(.xxx)` öğeleri için geçerlidir.
	*/
	.slc-view :global(.slc-table) {
		background-color: hsl(var(--surface-50));
	}
	.slc-view :global(.slc-th) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-100));
	}
	.slc-view :global(.slc-td) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-50));
	}
	.slc-view :global(.slc-td[data-focused='true']) {
		outline-color: #f59e0b;
	}
	.slc-view :global(.slc-tf) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-100));
	}

	.slc-view :global(.slc-selection) {
		background-color: color-mix(in srgb, currentColor 15%, transparent 85%);
	}
	.slc-view :global(.slc-selection:focus-visible) {
		background-color: color-mix(in srgb, currentColor 30%, transparent 70%);
	}

	.slc-view :global(.slc-action-button) {
		background-color: color-mix(in srgb, currentColor 10%, transparent 90%);
	}
	.slc-view :global(.slc-action-button:focus-visible) {
		background-color: color-mix(in srgb, currentColor 25%, transparent 75%);
	}
	.slc-view :global(.slc-action-button:hover) {
		background-color: color-mix(in srgb, currentColor 20%, transparent 80%);
	}
	.slc-view :global(.slc-action-popup) {
		border: 1px solid hsl(var(--surface-300));
		background-color: hsl(var(--surface-50));
		color: currentColor;
	}
	.slc-view :global(.slc-action-popup-item:hover) {
		background-color: hsl(var(--surface-200));
	}
	/* .slc-view :global(.slc-action-popup-item[data-type='table'][data-action='add']) {
		background-color: red;
	} */
</style>
