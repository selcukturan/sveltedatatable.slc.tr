<script lang="ts">
	import { ShowCase } from '$lib/website/components/base/showcase';
	import { Page, Main, MainContent } from '$lib/website/templates/base';
	import { Tabs, Tab, TabContent } from '$lib/website/components/ui/tabs';
	import { MarkdownContent } from '$lib/website/components/base/markdown-content';
	import common from '$lib/website/utils/common';
	import { BaseDataTableView, type Sources } from '$lib/data-table/views';
	import { createTable } from '$lib/data-table/tables.svelte';
	import Code from '$lib/website/contents/Code.md';

	let selectedTab = $state('preview');

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
		id: `slc_${crypto.randomUUID()}`,
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
	const table2 = createTable<ProducedGrapes>({ ...sources, id: `slc_${crypto.randomUUID()}` });

	const setPageData = (count: number) => {
		table.setAllData(common.generateExampleData(count));
	};
	const setFirstRow = () => {
		/* if (!table.set.data) return;

		table.set.data[0] = {
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
		}; */
	};
	const hideSecondColumn = () => {
		/* table.set.columns[1].hidden = !table.get.columns[1].hidden; */
	};
</script>

<Page>
	<Main>
		<div class="flex select-none items-center justify-center gap-4 rounded-full p-2">
			<div class="flex items-center gap-1">
				<img
					src="/images/svelte-logo.png"
					alt="Svelte Logo"
					class="h-8 w-8 slc-image-select-none"
				/>
				<p class=" text-lg font-semibold">Svelte</p>
			</div>
			<div class="flex items-center gap-1">
				<img
					src="/images/ts-logo-512.png"
					alt="TypeScript Logo"
					class="h-8 w-8 slc-image-select-none"
				/>
				<p class=" text-lg font-semibold">TypeScript</p>
			</div>
		</div>
		<div>{table.test}</div>
		<MainContent>
			<Tabs bind:value={selectedTab}>
				{#snippet tabs()}
					<Tab value="preview">Preview</Tab>
					<Tab value="code">Code</Tab>
				{/snippet}
				{#snippet contents()}
					<TabContent value="preview">
						<ShowCase>
							<BaseDataTableView sources={table.get} />
						</ShowCase>
					</TabContent>
					<TabContent value="code">
						<ShowCase>
							<MarkdownContent>
								<Code />
							</MarkdownContent>
						</ShowCase>
					</TabContent>
				{/snippet}
			</Tabs>
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
				<button onclick={() => hideSecondColumn()} class="bg-surface-200 p-1"
					>hiddenSecondColumn</button
				>
				<p>Current Count:{table.get.data.length}</p>
			</div>
		</MainContent>
		<MainContent>
			<Tabs bind:value={selectedTab}>
				{#snippet tabs()}
					<Tab value="preview">Preview</Tab>
					<Tab value="code">Code</Tab>
				{/snippet}
				{#snippet contents()}
					<TabContent value="preview">
						<ShowCase>
							<BaseDataTableView sources={table2.get} />
						</ShowCase>
					</TabContent>
					<TabContent value="code">
						<ShowCase>
							<MarkdownContent>
								<Code />
							</MarkdownContent>
						</ShowCase>
					</TabContent>
				{/snippet}
			</Tabs>
		</MainContent>
	</Main>
</Page>
