<!-- BaseDataTableView.svelte -->
<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf } from '..';
	import SelectionColumn from '../selection-column.svelte';

	const { sources: src }: { sources: Sources<TData> } = $props();
	const table = getTable<TData>(src.id);
	// $inspect('$inspect-virtualData', table.virtualData);
	// $inspect('$inspect-focusedCell', table.focusedCell);
	$inspect('$inspect-selectedRows', table.selectedRows);
</script>

<Table {src} class="bg-zinc-50 dark:bg-zinc-950">
	{#snippet thead()}
		<Trh {src}>
			<Th {src} col={{ field: '_selection', width: '50px' }} ci={-1} class="border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
				{#snippet children()}
					<!-- Başlık hücresi boş bırakılıyor -->
				{/snippet}
			</Th>
			{#each table.columns as col, ci (col.oi)}
				{@const header = col.label}
				<Th {src} {col} {ci} class="border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
					{header}
				</Th>
			{/each}
		</Trh>
	{/snippet}
	{#snippet tbody(row, ri)}
		<Trd {src} {row} {ri}>
			<Td {src} col={{ field: '_selection', width: '50px' }} ci={-1} {row} {ri} class="border-zinc-200 dark:border-zinc-700">
				{#snippet children()}
					<SelectionColumn tableId={src.id} rowIndex={table.get.enableVirtualization ? (row.oi ?? ri) : ri} />
				{/snippet}
			</Td>
			{#each table.columns as col, ci (col.oi)}
				{@const cell = row[col.field]}
				<Td {src} {col} {ci} {row} {ri} class="border-zinc-200 dark:border-zinc-700">
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
			<Tf {src} col={{ field: '_selection', width: '50px' }} ci={-1} {foot} {fi} class="border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
				{#snippet children()}
					<!-- Footer hücresi boş bırakılıyor -->
				{/snippet}
			</Tf>
			{#each table.columns as col, ci (col.oi)}
				{@const footer = foot[col.field]}
				<Tf {src} {col} {ci} {foot} {fi} class="border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
					{footer}
				</Tf>
			{/each}
		</Trf>
	{/snippet}
</Table>
