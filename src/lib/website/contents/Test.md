---
title: 'My First Post'
date: '2023-10-01'
---

# { title }

[An Internal Link](/)

# Başlık 1

## Başlık 2

### Başlık 3

#### Başlık 4

##### Başlık 5

###### Başlık 6

---

**Kalın metin**

_İtalik metin_

~~Üstü çizili metin~~

---

> Bu bir blok alıntıdır.
>
> İkinci satır.

---

- Liste öğesi 1
- Liste öğesi 2
  1. Alt liste öğesi 1
  2. Alt liste öğesi 2

1. Numaralı liste öğesi 1
2. Numaralı liste öğesi 2
   - Alt numaralı liste öğesi 1
   - Alt numaralı liste öğesi 2

---

1. First Item
   - Subitem A
   - Subitem B
     1. Sub-subitem I
     2. Sub-subitem II
   - Subitem C

---

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | selçuk |
| col 2 is      |   centered    |        |
| zebra stripes |   are neat    |        |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

---

`inline code`

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
