<script lang="ts">
	import { Page, Main, MainContent } from '$lib/website/templates/base';
	import { PreviewAndCode, LandingPageLogo, LandingPageTableSettings, Lorem1000, TableTestVariable } from '$lib/website/templates/sections';
	import common from '$lib/website/utils/common';
	import { DataTableAll, DataTableBase, type Sources } from '$lib/data-table/views';
	import { createTable } from '$lib/data-table/tables.svelte';
	import Code from '$lib/website/contents/Code.md';
	import type { ProducedGrapes } from '$lib/dev/schemaProducedGrapes';

	// initial sources setup
	const sources: Sources<ProducedGrapes> = {
		id: 'table1',
		data: common.generateExampleData(100),
		enableVirtualization: true,
		rowSelection: 'single',
		rowAction: true,
		actions: {
			tableActions: [
				{ label: 'Ekle', action: 'add' },
				{ label: 'Seçili Satırları Sil', action: 'delete_all' },
				{ label: 'Excel', action: 'excel' }
			],
			rowActions: [
				{ label: 'Düzenle', action: 'edit' },
				{ label: 'Sil', action: 'delete' },
				{ label: 'Detay', action: 'detail' }
			]
		},
		columns: [
			{ field: 'order', label: 'Order', width: '75px' },
			{ field: 'producer', label: 'Producer', width: '150px', hidden: false },
			{ field: 'province', label: 'Province', width: '90px' },
			{ field: 'district', label: 'District', width: '100px' },
			{ field: 'village', label: 'Village', width: '120px' },
			{ field: 'grape', label: 'Grape', width: '160px' },
			{ field: 'grapeColor', label: 'Grape Color', width: '110px', hidden: false },
			{ field: 'quantity', label: 'Quantity', align: 'right', width: '100px' },
			{ field: 'price', label: 'Price', align: 'right', width: '100px' },
			{ field: 'amount', label: 'Amount', align: 'right', width: '100px' }
		],
		footers: [{ order: 'f1' }, { quantity: 'sum' }]
	};

	const table = createTable<ProducedGrapes>(sources);

	const sources2: Sources<ProducedGrapes> = {
		id: 'table2',
		data: common.generateExampleData(100),
		enableVirtualization: true,
		rowSelection: 'single',
		rowAction: true,
		actions: {
			tableActions: [
				{ label: 'Ekle', action: 'add' },
				{ label: 'Seçili Satırları Sil', action: 'delete_all' },
				{ label: 'Excel', action: 'excel' }
			],
			rowActions: [
				{ label: 'Düzenle', action: 'edit' },
				{ label: 'Sil', action: 'delete' },
				{ label: 'Detay', action: 'detail' }
			]
		},
		columns: [
			{ field: 'order', label: 'Order', width: '75px' },
			{ field: 'producer', label: 'Producer', width: '150px', hidden: false },
			{ field: 'province', label: 'Province', width: '90px' },
			{ field: 'district', label: 'District', width: '100px' },
			{ field: 'village', label: 'Village', width: '120px' },
			{ field: 'grape', label: 'Grape', width: '160px' },
			{ field: 'grapeColor', label: 'Grape Color', width: '110px', hidden: false },
			{ field: 'quantity', label: 'Quantity', align: 'right', width: '100px' },
			{ field: 'price', label: 'Price', align: 'right', width: '100px' },
			{ field: 'amount', label: 'Amount', align: 'right', width: '100px' }
		],
		footers: [{ order: 'f1' }, { quantity: 'sum' }]
	};
	const table2 = createTable<ProducedGrapes>(sources2);

	/* table.onCellFocusChange((params) => {
		const { rowIndex, colIndex } = params;
		console.log('onCellFocusChange', rowIndex, colIndex);
	}); */
	/* table.onRowSelectionChange((params) => {
		const { selectedRows } = params;
		console.log('onRowSelectionChange', selectedRows);
	}); */
	table.onTableAction((params) => {
		const { action } = params;
		console.log('onTableAction', action);
	});
	table.onRowAction((params) => {
		const { rowIndex, action } = params;
		console.log('onRowAction', rowIndex, action);
	});
</script>

<Page>
	<Main>
		<LandingPageLogo />
		<TableTestVariable text={table.test} />
		<MainContent>
			<PreviewAndCode>
				{#snippet preview()}
					<DataTableAll {sources} />
				{/snippet}
				{#snippet code()}
					<Code />
				{/snippet}
			</PreviewAndCode>
		</MainContent>
		<MainContent>
			<LandingPageTableSettings {sources} />
		</MainContent>
		<MainContent>
			<PreviewAndCode>
				{#snippet preview()}
					<DataTableBase sources={sources2} />
				{/snippet}
				{#snippet code()}
					<Code />
				{/snippet}
			</PreviewAndCode>
		</MainContent>
	</Main>
</Page>
