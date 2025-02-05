<!-- BaseDataTableView.svelte -->
<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf, SelectionColumn } from '..';

	const { sources: src }: { sources: Sources<TData> } = $props();
	const table = getTable<TData>(src.id);
	// $inspect('$inspect-virtualData', table.virtualData);
	// $inspect('$inspect-focusedCell', table.focusedCell);
	// $inspect('$inspect-selectedRows', table.selectedRows);
</script>

<section style:display="contents">
	<Table {src}>
		{#snippet thead()}
			<Trh {src}>
				{#if table.get.rowSelection !== 'none'}
					<Th {src} col={{ field: '_selection', align: 'center' }} ci={-1}>
						<SelectionColumn type="header" {src} />
					</Th>
				{/if}

				{#each table.visibleColumns as col, ci (ci)}
					{@const header = col.label}
					<Th {src} {col} {ci}>
						{header}
					</Th>
				{/each}
			</Trh>
		{/snippet}
		{#snippet tbody(row, ri)}
			<Trd {src} {row} {ri}>
				{#if table.get.rowSelection !== 'none'}
					<Td {src} col={{ field: '_selection', align: 'center' }} ci={-1} {row} {ri}>
						<SelectionColumn type="cell" {src} {row} {ri} />
					</Td>
				{/if}

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
			</Trd>
		{/snippet}
		{#snippet tfoot(foot, fi)}
			<Trf {src} {fi}>
				{#if table.get.rowSelection !== 'none'}
					<Tf {src} col={{ field: '_selection' }} ci={-1} {foot} {fi}>
						{''}
					</Tf>
				{/if}

				{#each table.visibleColumns as col, ci (ci)}
					{@const footer = foot[col.field]}
					<Tf {src} {col} {ci} {foot} {fi}>
						{footer}
					</Tf>
				{/each}
			</Trf>
		{/snippet}
	</Table>
</section>

<style>
	section :global(.slc-table) {
		background-color: hsl(var(--surface-50));
	}
	section :global(.slc-th) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-100));
	}
	section :global(.slc-td) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-50));
	}
	section :global(.slc-tf) {
		border-right: 1px solid hsl(var(--surface-200));
		border-bottom: 1px solid hsl(var(--surface-200));
		background-color: hsl(var(--surface-100));
	}
</style>
