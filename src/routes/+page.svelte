<script lang="ts">
	import { Page, Main, MainContent } from '$lib/website/templates/base';
	import { PreviewAndCode, LandingPageLogo, LandingPageTableSettings, Lorem1000, TableTestVariable } from '$lib/website/templates/sections';
	import common from '$lib/website/utils/common';
	import { BaseDataTableView, type Sources } from '$lib/data-table/views';
	import { createTable } from '$lib/data-table/tables.svelte';
	import Code from '$lib/website/contents/Code.md';

	type ProducedGrapes = {
		order: number;
		producer: string;
		province: string;
		district: string;
		village: string;
		grape: string;
		grapeColor: string;
		quantity: number;
		price: number;
		amount: number;
	};

	// initial sources setup
	let sources: Sources<ProducedGrapes> = {
		id: 'table1',
		data: common.generateExampleData(100),
		columns: [
			{ field: 'order', label: 'Order', width: '75px' },
			{ field: 'producer', label: 'Producer', width: '150px' },
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
</script>

<Page>
	<Main>
		<LandingPageLogo />
		<TableTestVariable text={table.test} />
		<MainContent>
			<PreviewAndCode>
				{#snippet preview()}
					<BaseDataTableView {sources} />
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
			<Lorem1000 />
		</MainContent>
	</Main>
</Page>
