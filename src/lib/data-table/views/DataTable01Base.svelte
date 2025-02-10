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

<div class="slc-view-global" style:display="contents">
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
