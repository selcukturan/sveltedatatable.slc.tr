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
	const uuid = `${crypto.randomUUID()}`;
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
			<button class="slc-action-button" popovertarget={`s${uuid}`} style:anchor-name={`--anchor-${uuid}`} aria-expanded={isPopoverOpen} type="button" aria-haspopup="true" tabindex="0">
				<span>
					{@html `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`}
				</span>
			</button>

			<div class="slc-action-popup" id={`s${uuid}`} bind:this={myPopover} style:position-anchor={`--anchor-${uuid}`} style:top={`anchor(bottom)`} style:right={`anchor(right)`} popover="">
				{#if data}
					{#each data as item}
						<button onclick={handleSelectOnClick}>
							{item.label + ' ' + row_oi}
						</button>
					{/each}
				{:else}
					<div>No data</div>
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
	.slc-action-button span {
		height: 1rem;
		width: 1rem;
		user-select: none;
		padding: 0;
		margin: 0;
	}

	.slc-action-popup {
		display: none;
		position: absolute;
		inset: auto;
		opacity: 0;
		transition:
			opacity 0.15s,
			display 0.15s,
			overlay 0.15s;

		transition-behavior: allow-discrete;

		animation: slide 0.15s ease-out;
		position-visibility: anchors-visible;

		position-try-fallbacks: --left;

		margin-left: 0.25rem;

		& > * {
			padding: 0.5rem;
		}

		&:popover-open {
			display: grid;
			opacity: 1;

			@starting-style {
				display: grid;
				opacity: 0;
			}
		}
	}

	@position-try --left {
		inset: auto;
		top: anchor(bottom);
		right: anchor(right);
	}

	@keyframes slide {
		from {
			transform: translateY(8px);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
