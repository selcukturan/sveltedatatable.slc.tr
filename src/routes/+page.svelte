<script lang="ts">
	import { TableShowCase } from '$lib/website/components/base/table-showcase';
	import { Page, Main, MainContent } from '$lib/website/templates/base';
	import { BaseDataTableProvider, type Settings } from '$lib/data-table/providers';
	import common from '$lib/website/utils/common';

	type DataType = {
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

	let data: DataType[] = $state(common.generateExampleData(10));

	let settings: Settings<DataType> = $state({
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
		footers: [{ order: 'f1' }, { quantity: 'f2' }]
	});

	const setPageData = (count: number) => {
		data = common.generateExampleData(count);
	};
	const setFirstRow = () => {
		data[0] = {
			order: 0,
			producer: 'Mustahsil',
			province: 'Tip',
			district: 'Bölge',
			village: 'İl',
			grape: 'İlçe',
			grapeColor: '0',
			quantity: 0,
			price: 0,
			amount: 0
		};
	};
	const hiddenSecondColumn = () => {
		if (typeof settings.columns === 'undefined') return;
		settings.columns[1].hidden = !settings.columns[1].hidden;
	};
</script>

<Page>
	<Main>
		<MainContent>
			<a href="/docs">Documentation</a>
			<a href="/dev/theme">Theme</a>
			<TableShowCase>
				<BaseDataTableProvider {data} {settings} />
			</TableShowCase>
		</MainContent>
		<MainContent>
			<div>
				<button onclick={() => setPageData(0)} class="bg-surface-200 p-1">0</button>
				<button onclick={() => setPageData(3)} class="bg-surface-200 p-1">3</button>
				<button onclick={() => setPageData(5)} class="bg-surface-200 p-1">5</button>
				<button onclick={() => setPageData(10)} class="bg-surface-200 p-1">10</button>
				<button onclick={() => setPageData(100)} class="bg-surface-200 p-1">100</button>
				<button onclick={() => setPageData(1000)} class="bg-surface-200 p-1">1000</button>
				<button onclick={() => setPageData(10000)} class="bg-surface-200 p-1">10000</button>
				<button onclick={() => setPageData(100000)} class="bg-surface-200 p-1">100000</button>
				<button onclick={() => setFirstRow()} class="bg-surface-200 p-1">setFirstRow</button>
				<button onclick={() => hiddenSecondColumn()} class="bg-surface-200 p-1"
					>hiddenSecondColumn</button
				>
				<p>Current Count:{data.length}</p>
			</div>
		</MainContent>
		<MainContent>Paragraph 3</MainContent>
	</Main>
</Page>
