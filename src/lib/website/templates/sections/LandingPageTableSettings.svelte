<script lang="ts">
	import type { ProducedGrapes } from '$lib/dev/schemaProducedGrapes';
	import common from '$lib/website/utils/common';
	import { getTable, type Sources } from '$lib/data-table/tables.svelte';

	const { sources: src }: { sources: Sources<ProducedGrapes> } = $props();

	const table = getTable<ProducedGrapes>(src.id);

	const setPageData = (count: number) => {
		const data = common.generateExampleData(count);
		table.set_data(data);
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
