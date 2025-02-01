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

<button role="checkbox" use:action tabindex="0" aria-checked={isIntermediate ? 'mixed' : isChecked} aria-label="Satır seç">
	<section>
		{#if isIntermediate}
			<!-- {'-'} -->
			{@html `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>`}
		{:else if isChecked}
			<!-- {'x'} -->
			{@html `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`}
		{:else}
			<!-- {''} -->
			{@html ``}
		{/if}
	</section>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		padding: 0.25rem;
		margin: 0;
		border: none;
		cursor: pointer;
		border-radius: 0.25rem;
		color: currentColor;
	}
	button:focus-visible {
		outline: 0.125rem solid #71717a87; /* zinc-500 */
		outline-offset: -0.125rem;
		border-radius: 0.5rem;
	}
	section {
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		padding: 0;
		margin: 0;
		border-radius: 0.25rem;
		border: 0.0625rem solid #71717a; /* zinc-500 */
		width: 1rem;
		height: 1rem;
	}

	:global(.dark) section {
		border-color: #71717a; /* zinc-500 */
	}
</style>
