<script lang="ts" generics="TData extends Row">
	/**
	 *
	 * Support;
	 * Browser support for anchor positioning:	https://caniuse.com/css-anchor-positioning
	 * Browser support for popover:				https://caniuse.com/mdn-api_htmlelement_popover
	 * Polyfill;
	 * Popover Polyfill:						https://github.com/oddbird/popover-polyfill
	 * Anchor positioning polyfill:				https://github.com/oddbird/css-anchor-positioning
	 *
	 */
	import { fly } from 'svelte/transition';
	import type { Row, Sources, Column, Footer } from './types';
	import { getTable } from './tables.svelte';
	import { Th, Td, Tf } from '.';

	type Props = {
		src: Sources<TData>;
		row?: TData;
		ri?: number;
		foot?: Footer<TData>;
		fi?: number;
		type?: 'header' | 'cell' | 'footer';
	};
	const { src, row, ri, foot, fi, type = 'cell' }: Props = $props();

	const table = getTable<TData>(src.id);

	const row_oi = $derived(table.get.enableVirtualization === false ? ri : row?.oi);

	const action = (buttonNode: HTMLButtonElement) => {
		const handleClick = async (e: MouseEvent) => {
			alert('Row action clicked ' + row_oi);
		};

		buttonNode.addEventListener('click', handleClick);

		return {
			destroy() {
				buttonNode.removeEventListener('click', handleClick);
			}
		};
	};

	const col: Column<TData> = { field: '_action', align: 'center' };

	let isDropdownOpen = $state(false);

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const handleItemClick = (item: { label: string; icon: string; action: () => {} }) => {
		item.action();
		isDropdownOpen = false; // Menüyü kapat
	};

	const data = [
		{ label: 'Düzenle', icon: '✏️', action: () => {} },
		{ label: 'Sil', icon: '🗑️', action: () => {} },
		{ label: 'Detay', icon: 'ℹ️', action: () => {} }
	];

	function hide() {
		if (!isDropdownOpen) return; // already hidden
		isDropdownOpen = false;
	}
</script>

<svelte:window onmousedown={hide} />

{#if table.get.rowAction === true}
	{#if type === 'header'}
		<Th {src} {col} ci={table.visibleColumns.length}>
			{@html ``}
		</Th>
	{:else if type === 'cell' && row != null && ri != null}
		<Td {src} {col} ci={table.visibleColumns.length} {row} {ri}>
			<div class="slc-action" tabindex="-1" role="menu">
				<button class="slc-action-button" onclick={toggleDropdown} type="button" aria-haspopup="true" tabindex="0">
					<span>
						{@html `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`}
					</span>
				</button>
				{#if isDropdownOpen}
					<div class="slc-action-popup" transition:fly={{ y: 0, duration: 200 }}>
						<div style:display="grid">
							{#each data as item}
								<button type="button" role="menuitem" tabindex="0">
									<span>{item.icon}</span>
									<span>{item.label + ' - ' + row_oi}</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</Td>
	{:else if type === 'footer' && foot != null && fi != null}
		<Tf {src} {col} ci={table.visibleColumns.length} {foot} {fi}>
			{@html ``}
		</Tf>
	{:else}
		{@html ``}
	{/if}
{:else}
	{@html ``}
{/if}

<style>
	.slc-action-button {
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		border-radius: 9999px;
		padding: 4px;
		margin: 0;
		outline: none;
		cursor: pointer;
	}
	.slc-action-popup {
		display: block;
		position: absolute;
		/* z-index: 1; */
		cursor: default;
		width: auto;
		min-width: 140px;
		max-width: 450px;
		max-height: 330px;
		overflow-x: hidden;
		overflow-y: auto;
		border-radius: 4px;

		top: 0;
		right: 100%;
		bottom: auto;
		left: auto;
	}
</style>
