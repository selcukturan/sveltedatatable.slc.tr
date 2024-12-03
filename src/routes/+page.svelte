<script lang="ts">
	import { TableShowCase } from '$lib/website/components/base/table-showcase';
	import { Page, Main, MainContent } from '$lib/website/templates/base';
	import { BaseDataTable, type Settings } from '$lib/data-table/providers';
	import { browser } from '$app/environment';

	type DataType = {
		sira: string;
		id: string;
		mustahsil: string;
		tip: string;
		bolge: string;
		il: string;
		ilce: string;
		tutar: string;
	};

	function generateData(count: number): DataType[] {
		if (!browser) return [];
		const data: DataType[] = [];
		for (let i = 1; i <= count; i++) {
			data.push({
				sira: i.toString(),
				id: (31000 + i).toString(),
				mustahsil: `Mustahsil ${i}`,
				tip: 'AVANS_ODEME',
				bolge: 'IC EGE',
				il: 'DENIZLI',
				ilce: 'CAL',
				tutar: (Math.random() * 100000).toFixed(2)
			});
		}
		return data;
	}

	let data: DataType[] = $state(generateData(10));
	let settings: Settings<DataType> = $state({
		columns: [
			{ field: 'sira', label: 'Sıra' },
			{ field: 'id', label: 'ID', hidden: true },
			{ field: 'mustahsil', label: 'Mustahsil' },
			{ field: 'tip', label: 'Tip' },
			{ field: 'bolge', label: 'Bölge' },
			{ field: 'il', label: 'İl' },
			{ field: 'ilce', label: 'İlçe' },
			{ field: 'tutar', label: 'Tutar' }
		],
		footers: [
			{ sira: 'F2', id: '2', mustahsil: '3', tip: '4', bolge: '5', il: '6', ilce: '7', tutar: '8' },
			{ sira: 'F2', id: '2', mustahsil: '3', tip: '4', bolge: '5', il: '6', ilce: '7', tutar: '8' }
		]
	});

	const setPageData = (count: number) => {
		data = generateData(count);
	};
	const setFirstRow = () => {
		data[0] = {
			sira: '0',
			id: '0',
			mustahsil: 'New 0',
			tip: 'AVANS_ODEME',
			bolge: 'IC EGE',
			il: 'DENIZLI',
			ilce: 'CAL',
			tutar: (Math.random() * 100000).toFixed(2)
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
				<BaseDataTable {data} {settings} />
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
