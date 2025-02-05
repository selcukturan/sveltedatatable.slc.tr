<script lang="ts" generics="TData extends Row">
	import { getTable, type Sources, type Row } from './tables.svelte';

	type Props = { src: Sources<TData>; row?: TData; ri?: number; type?: 'header' | 'cell' };
	const { src, row, ri, type = 'cell' }: Props = $props();

	const table = getTable<TData>(src.id);

	const row_oi = $derived(table.get.enableVirtualization === false ? ri : row?.oi);

	const isChecked = $derived.by(() => {
		const selectedRows = table.getSelection();
		if (type === 'header') {
			if (selectedRows.length > 0) {
				const allSelected = selectedRows.length === table.get.data.length;
				if (allSelected) return true;
				return false;
			}
		} else if (row_oi !== undefined) {
			return typeof row_oi === 'number' ? (selectedRows.indexOf(row_oi) === -1 ? false : true) : false;
		}
	});

	const isIntermediate = $derived.by(() => {
		const selectedRows = table.getSelection();
		if (type === 'header' && selectedRows.length > 0) {
			return selectedRows.length < table.get.data.length;
		}
		return false;
	});

	const action = (buttonNode: HTMLButtonElement) => {
		const handleClick = async (e: MouseEvent) => {
			const selectedRows = table.getSelection();
			if (type === 'header') {
				const allSelected = selectedRows.length === table.get.data.length;
				await table.toggleAllRows(!allSelected);
			} else if (row_oi !== undefined) {
				await table.toggleRowSelection(row_oi);
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

<button role="checkbox" use:action tabindex="0" aria-checked={isIntermediate ? 'mixed' : isChecked} aria-label="Select row">
	<span>
		{#if isIntermediate}
			{@html `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8" /></svg>`}
		{:else if isChecked}
			{@html `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`}
		{:else}
			{@html ``}
		{/if}
	</span>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		border-radius: 4px;
		padding: 0;
		margin: 0;
		outline: none;
		cursor: pointer;
		color: currentColor;
		background-color: color-mix(in srgb, currentColor 15%, transparent 85%);
	}
	button:focus-visible {
		background-color: color-mix(in srgb, currentColor 30%, transparent 70%);
	}
	button span {
		height: 1rem;
		width: 1rem;
		user-select: none;
		padding: 0;
		margin: 0;
		color: color-mix(in srgb, currentColor 85%, transparent 15%); /* change currentColor for svg color */
	}
</style>
