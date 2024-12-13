<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf } from '..';

	const { sources: src }: { sources: Sources<TData> } = $props();
	if (!src.id) throw new Error('Sources not found');
	const table = getTable<TData>(src.id);
</script>

<!-- prettier-ignore -->
<Table {src} class="bg-zinc-50 dark:bg-zinc-950" >
	{#snippet thead()}
		<Trh>
			{#each table.columns as col, ci (col.oi)}
				{@const header = col.label}
				<Th {src} {col} {ci} class="border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
					{header}
				</Th>
			{/each}
		</Trh>
	{/snippet}
	{#snippet tbody(row, ri)}
		<Trd {row} {ri}>
			{#each table.columns as col, ci (col.oi)}
				{@const cell = row[col.field]}
				<Td {src} {col} {ci} {row} {ri} class="border-zinc-200 dark:border-zinc-700">
					{cell}
				</Td>
			{/each}
		</Trd>
	{/snippet}
	{#snippet tfoot(foot, fi)}
		<Trf {src} {fi}>
			{#each table.columns as col, ci (col.oi)}
				<!-- {@const footer = foot[col.field]} -->
				<Tf {src} {col} {ci} {foot} {fi} class="border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
					{table.get.data.reduce((acc, row) => {
                        const value = row[col.field];
                        return typeof value === 'number' ? acc + value : acc;
                    }, 0)}
				</Tf>
			{/each}
		</Trf>
	{/snippet}
</Table>
