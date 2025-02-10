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

<div class="s" style:display="contents">
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
	* https://svelte.dev/docs/svelte/global-styles#:global()
	* 
	* p:global(.big.red) { ... } 
	* Bu, bu bileşenin içindeki <p> etiketlerine, eğer bu etiketler class="big red" niteliklerine sahipse, stil uygular. 
	* :global(.big.red) ifadesi, bu sınıfların global olarak tanımlanmış olmasını gerektirmez.
	* Yani, bu sınıflar başka bir yerde tanımlanmış olsa bile, bu bileşenin içindeki <p> etiketleri bu stilleri alacaktır.
	*
	* .s.s-hOumoZ895V2d.s .slc-table
	*/
	.s:global(.s .slc-table) {
		background-color: hsl(var(--surface-50));
	}
	.s:global(.s .slc-th) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-100));
	}
	.s:global(.s .slc-td) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-50));
	}
	.s:global(.s .slc-td[data-focused='true']) {
		outline-color: #f59e0b;
	}
	.s:global(.s .slc-tf) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-100));
	}

	.s:global(.s .slc-selection) {
		background-color: color-mix(in srgb, currentColor 15%, transparent 85%);
	}
	.s:global(.s .slc-selection:focus-visible) {
		background-color: color-mix(in srgb, currentColor 30%, transparent 70%);
	}

	.s:global(.s .slc-action [data-part='trigger']) {
		background-color: color-mix(in srgb, currentColor 10%, transparent 90%);
	}
	.s:global(.s .slc-action [data-part='trigger']:focus-visible) {
		background-color: color-mix(in srgb, currentColor 25%, transparent 75%);
	}
	.s:global(.s .slc-action [data-part='trigger']:hover) {
		background-color: color-mix(in srgb, currentColor 20%, transparent 80%);
	}
	.s:global(.s .slc-action [data-part='popup']) {
		border: 1px solid hsl(var(--surface-300));
		background-color: hsl(var(--surface-50));
		color: currentColor;
	}
	.s:global(.s .slc-action [data-part='popup-item']:hover) {
		background-color: hsl(var(--surface-200));
	}
	.s:global(.s .slc-action[data-scope='table'] [data-part='popup-item'][data-action='delete_all']) {
		background-color: red;
	}
	.s:global(.s .slc-action[data-scope='row'] [data-part='popup-item'][data-action='delete']) {
		background-color: brown;
	}
</style>
