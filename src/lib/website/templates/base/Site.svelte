<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<!-- Header height'i değiştirmek için `SidebarLeft`, `SidebarRight` ve ``Site`da değişiklik yapılacak -->
<div data-component="Site" class="grid grid-rows-[var(--slc-site-header-size)_1fr_auto]">
	{@render children?.()}
</div>
