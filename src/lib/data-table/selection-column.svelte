<script lang="ts">
	import { getTable, type Row } from './tables.svelte';

	type Props = {
		tableId: string;
		rowIndex?: number;
		type?: 'header' | 'cell';
	};

	const { tableId, rowIndex, type = 'cell' }: Props = $props();
	const table = getTable<Row>(tableId);

	const isChecked = $derived(typeof rowIndex === 'number' ? (table.selectedRows.indexOf(rowIndex) === -1 ? false : true) : false);

	const action = (buttonNode: HTMLButtonElement) => {
		const handleClick = (e: MouseEvent) => {
			if (type === 'header') {
				const allSelected = table.selectedRows.length === table.get.data.length;
				table.toggleAllRows(!allSelected);
			} else if (rowIndex !== undefined) {
				table.toggleRowSelection(rowIndex);
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
