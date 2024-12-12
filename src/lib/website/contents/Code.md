---
title: 'My First Post'
date: '2023-10-01'
---

```svelte
<script lang="ts" generics="TData extends Row">
	import { setTable, type Settings, type Row } from '../tables.svelte';
	import { Table, Th, Td, Tf, Trh, Trd, Trf } from '..';

	const { data, settings }: { data: TData[]; settings: Settings<TData> } = $props();
	const table = setTable<TData>(data, settings);

	$effect(() => {
		table.setAllData(data);
		table.setAllSettings(settings);
	});
</script>

<!-- prettier-ignore -->
<Table {data}>
	{#snippet thead()}
		<Trh>
			{#each table.columns as col, ci (col.oi)}
				{@const header = col.label}
				<Th {data} {col} {ci}>
					{header}
				</Th>
			{/each}
		</Trh>
	{/snippet}
	{#snippet tbody(row, ri)}
		<Trd {row} {ri}>
			{#each table.columns as col, ci (col.oi)}
				{@const cell = row[col.field]}
				<Td {col} {ci} {row} {ri}>
					{cell}
				</Td>
			{/each}
		</Trd>
	{/snippet}
	{#snippet tfoot(foot, fi)}
		<Trf {data} {fi}>
			{#each table.columns as col, ci (col.oi)}
				{@const footer = foot[col.field]}
				<Tf {data} {col} {ci} {foot} {fi}>
					{footer}
				</Tf>
			{/each}
		</Trf>
	{/snippet}
</Table>
```
