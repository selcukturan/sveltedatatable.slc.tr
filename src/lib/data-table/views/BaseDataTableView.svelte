<!-- BaseDataTableView.svelte -->
<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf } from '..';

	const { sources: src }: { sources: Sources<TData> } = $props();
	const table = getTable<TData>(src.id);
	$inspect(table.virtualData);
	// $inspect(table.focusedCell);
</script>

<Table {src} class="bg-zinc-50 dark:bg-zinc-950">
	{#snippet thead()}
		<Trh {src}>
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
			{#each table.columns as col, ci (col.oi)}
				{@const cell = row[col.field]}
				<Td {src} {col} {ci} {row} {ri} class="border-zinc-200 dark:border-zinc-700">
					{#if ci === 5}
						<input type="checkbox" name="sssss" id="ssss" tabindex="0" />
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
			{#each table.columns as col, ci (col.oi)}
				{@const footer = foot[col.field]}
				<Tf {src} {col} {ci} {foot} {fi} class="border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
					{footer}
				</Tf>
			{/each}
		</Trf>
	{/snippet}
</Table>
