<script lang="ts" generics="TData extends Row">
	import { getTable, type Settings, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf } from '..';

	const { settings }: { settings: Settings<TData> } = $props();
	const table = getTable<TData>(settings.id);
</script>

<!-- prettier-ignore -->
<Table {settings} class="bg-zinc-50 dark:bg-zinc-950" >
	{#snippet thead()}
		<Trh>
			{#each table.columns as col, ci (col.oi)}
				{@const header = col.label}
				<Th {settings} {col} {ci} class="border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
					{header}
				</Th>
			{/each}
		</Trh>
	{/snippet}
	{#snippet tbody(row, ri)}
		<Trd {row} {ri}>
			{#each table.columns as col, ci (col.oi)}
				{@const cell = row[col.field]}
				<Td {settings} {col} {ci} {row} {ri} class="border-zinc-200 dark:border-zinc-700">
					{cell}
				</Td>
			{/each}
		</Trd>
	{/snippet}
	{#snippet tfoot(foot, fi)}
		<Trf {settings} {fi}>
			{#each table.columns as col, ci (col.oi)}
				{@const footer = foot[col.field]}
				<Tf {settings} {col} {ci} {foot} {fi} class="border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800">
					{footer}					
				</Tf>
			{/each}
		</Trf>
	{/snippet}
</Table>
