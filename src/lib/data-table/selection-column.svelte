<script lang="ts">
	import type { Row } from './types';
	import { getTable } from './tables.svelte';

	type Props = {
		tableId: string;
		rowIndex: number;
	};

	const { tableId, rowIndex }: Props = $props();
	const table = getTable<Row>(tableId);

	function handleInteraction() {
		table.toggleRowSelection(rowIndex);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			handleInteraction();
		}
	}
</script>

<div class="selection-cell">
	<button type="button" onclick={handleInteraction} onkeydown={handleKeyDown} aria-label="Satır seçimi" aria-pressed={table.isRowSelected(rowIndex)}>
		<input type="checkbox" checked={table.isRowSelected(rowIndex)} readonly tabindex="-1" />
	</button>
</div>

<style>
	.selection-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		width: 100%;
		height: 100%;
	}

	button:focus {
		outline: 2px solid var(--focus-color, #4f46e5);
		outline-offset: -2px;
	}

	input[type='checkbox'] {
		pointer-events: none;
	}
</style>
