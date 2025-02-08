<script lang="ts">
	import type { ProducedGrapes } from '$lib/dev/schemaProducedGrapes';
	import common from '$lib/website/utils/common';
	import { getTable, type Sources } from '$lib/data-table/tables.svelte';

	const { sources: src }: { sources: Sources<ProducedGrapes> } = $props();

	const table = getTable<ProducedGrapes>(src.id);

	const setPageData = (count: number) => {
		const data = common.generateExampleData(count);
		table.data(data);
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-2">
		<button onclick={() => setPageData(0)} class="bg-surface-200 p-1">0</button>
		<button onclick={() => setPageData(3)} class="bg-surface-200 p-1">3</button>
		<button onclick={() => setPageData(5)} class="bg-surface-200 p-1">5</button>
		<button onclick={() => setPageData(10)} class="bg-surface-200 p-1">10</button>
		<button onclick={() => setPageData(100)} class="bg-surface-200 p-1">100</button>
		<button onclick={() => setPageData(1000)} class="bg-surface-200 p-1">1.000</button>
		<button onclick={() => setPageData(10000)} class="bg-surface-200 p-1">10.000</button>
		<button onclick={() => setPageData(100000)} class="bg-surface-200 p-1">100.000</button>
	</div>
	<div class="flex flex-col items-center gap-2">
		<p>Current Count:{table.get.data.length}</p>
		<button
			type="button"
			class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			onclick={() => table.toggleRowSelection(2)}
		>
			3. Satırı Seç/Kaldır
		</button>

		<button
			type="button"
			class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			onclick={() => table.enableVirtualization(!table.get.enableVirtualization)}
		>
			enableVirtualization = {table.get.enableVirtualization}
		</button>

		<button
			type="button"
			class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			onclick={() => table.rowSelection(table.get.rowSelection === 'none' ? 'multiple' : 'none')}
		>
			rowSelection = {table.get.rowSelection}
		</button>

		<button
			type="button"
			class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			onclick={() => table.rowAction(!table.get.rowAction)}
		>
			rowAction = {table.get.rowAction}
		</button>
	</div>
</div>
