<!-- BaseDataTableView.svelte -->
<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf, SelectionColumn } from '..';

	const { sources: src }: { sources: Sources<TData> } = $props();
	const table = getTable<TData>(src.id);
	// $inspect('$inspect-virtualData', table.virtualData);
	// $inspect('$inspect-focusedCell', table.focusedCell);
	// $inspect('$inspect-selectedRows', table.selectedRows);

	const tableClass = 'bg-zinc-50 dark:bg-zinc-950';
	const thClass = 'border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800';
	const tdClass = 'border-zinc-200 dark:border-zinc-700';
	const tfClass = 'border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800';
</script>

<Table {src} class={tableClass}>
	{#snippet thead()}
		<Trh {src}>
			{#if table.get.rowSelection !== 'none'}
				<Th {src} col={{ field: '_selection', align: 'center' }} ci={-1} class={thClass}>
					<SelectionColumn type="header" {src} />
				</Th>
			{/if}

			{#each table.visibleColumns as col, ci (ci)}
				{@const header = col.label}
				<Th {src} {col} {ci} class={thClass}>
					{header}
				</Th>
			{/each}
		</Trh>
	{/snippet}
	{#snippet tbody(row, ri)}
		<Trd {src} {row} {ri}>
			{#if table.get.rowSelection !== 'none'}
				<Td {src} col={{ field: '_selection', align: 'center' }} ci={-1} {row} {ri} class={tdClass}>
					<SelectionColumn type="cell" {src} {row} {ri} />
				</Td>
			{/if}

			{#each table.visibleColumns as col, ci (ci)}
				{@const cell = row[col.field]}
				<Td {src} {col} {ci} {row} {ri} class={tdClass}>
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
				<Tf {src} col={{ field: '_selection' }} ci={-1} {foot} {fi} class={tfClass}>
					{''}
				</Tf>
			{/if}

			{#each table.visibleColumns as col, ci (ci)}
				{@const footer = foot[col.field]}
				<Tf {src} {col} {ci} {foot} {fi} class={tfClass}>
					{footer}
				</Tf>
			{/each}
		</Trf>
	{/snippet}
</Table>
