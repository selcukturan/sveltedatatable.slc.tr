<script lang="ts" generics="TData extends Row">
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

	let isPopoverOpen = $state(false);
	const uuid = `slc_${crypto.randomUUID()}`;
	let myPopover: HTMLDivElement | undefined = $state(undefined);

	const handleSelectOnClick = async (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		isPopoverOpen = !isPopoverOpen;
		/* const target = e.currentTarget as HTMLButtonElement;
		const { slcselectvalue } = target.dataset;
		const val = slcselectvalue || '';
		value = cntrts?.required && val === '' ? undefined : val;
		await tick(); // DOM güncellemelerinin tamamlanmasını bekler */
		if (myPopover) myPopover.hidePopover();
	};

	const data = [
		{ label: 'Düzenle', icon: '✏️', action: () => {} },
		{ label: 'Sil', icon: '🗑️', action: () => {} },
		{ label: 'Detay', icon: 'ℹ️', action: () => {} }
	];
</script>

{#if table.get.rowAction === true}
	{#if type === 'header'}
		<Th {src} {col} ci={table.visibleColumns.length}>
			{@html ``}
		</Th>
	{:else if type === 'cell' && row != null && ri != null}
		<Td {src} {col} ci={table.visibleColumns.length} {row} {ri}>
			<button class="slc-action-button" type="button" aria-expanded={isPopoverOpen} aria-haspopup="true" tabindex="0" popovertarget={`s${uuid}`} style:anchor-name={`--anchor-${uuid}`}>
				<span>
					{@html `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`}
				</span>
			</button>

			<div id={`s${uuid}`} style:position-anchor={`--anchor-${uuid}`} style:top={`anchor(bottom)`} style:right={`anchor(right)`} popover="" bind:this={myPopover} class="slc-action-popup">
				<div>
					{#if data}
						{#each data as item}
							<button onclick={handleSelectOnClick}>
								{item.label}
							</button>
						{/each}
					{:else}
						<div>No data</div>
					{/if}
				</div>
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
	.slc-action-button span {
		height: 1rem;
		width: 1rem;
		user-select: none;
		padding: 0;
		margin: 0;
	}

	.slc-action-popup {
		inset: unset;
		position: absolute;
		margin-top: 5px;
		/* position-try-options: flip-block; */
		position-visibility: anchors-visible;
		min-width: calc(anchor-size(width) * 1);
		max-height: 300px;
	}

	:popover-open {
		animation: slide 0.2s ease-out;
	}

	@keyframes slide {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
