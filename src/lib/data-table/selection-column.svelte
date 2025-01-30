<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from './tables.svelte';

	type Props = { src: Sources<TData>; row?: TData; ri?: number; type?: 'header' | 'cell' };
	const { src, row, ri, type = 'cell' }: Props = $props();

	const table = getTable<TData>(src.id);

	const row_oi = $derived(table.get.enableVirtualization === false ? ri : row?.oi);
	const isChecked = $derived(typeof row_oi === 'number' ? (table.selectedRows.indexOf(row_oi) === -1 ? false : true) : false);

	const action = (buttonNode: HTMLButtonElement) => {
		const handleClick = (e: MouseEvent) => {
			if (type === 'header') {
				const allSelected = table.selectedRows.length === table.get.data.length;
				table.toggleAllRows(!allSelected);
			} else if (row_oi !== undefined) {
				table.toggleRowSelection(row_oi);
			}
		};

		buttonNode.addEventListener('click', handleClick);

		return {
			destroy() {
				buttonNode.removeEventListener('click', handleClick);
			}
		};
	};
</script>

<button type="button" tabindex="0" use:action>
	{isChecked ? '✓' : 'x'}
</button>
