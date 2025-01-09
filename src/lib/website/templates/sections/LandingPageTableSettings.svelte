<script lang="ts" generics="TData extends Row">
	import common from '$lib/website/utils/common';
	import { getTable, type Sources, type Row } from '$lib/data-table/tables.svelte';

	const { sources: src }: { sources: Sources<TData> } = $props();

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

	const table = getTable<ProducedGrapes>(src.id);

	const setPageData = (count: number) => {
		table.set_data(common.generateExampleData(count));
	};
</script>

<div>
	<button onclick={() => setPageData(0)} class="bg-surface-200 p-1">0</button>
	<button onclick={() => setPageData(3)} class="bg-surface-200 p-1">3</button>
	<button onclick={() => setPageData(5)} class="bg-surface-200 p-1">5</button>
	<button onclick={() => setPageData(10)} class="bg-surface-200 p-1">10</button>
	<button onclick={() => setPageData(100)} class="bg-surface-200 p-1">100</button>
	<button onclick={() => setPageData(1000)} class="bg-surface-200 p-1">1.000</button>
	<button onclick={() => setPageData(10000)} class="bg-surface-200 p-1">10.000</button>
	<button onclick={() => setPageData(100000)} class="bg-surface-200 p-1">100.000</button>
	<p>Current Count:{table.get.data.length}</p>
</div>
