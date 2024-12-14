<script lang="ts">
	/* let { children } = $props(); */
</script>

<footer
	data-component="Footer"
	class="flex border-t border-border/60 bg-surface-50/30 backdrop-blur supports-[backdrop-filter]:bg-surface-50/30"
>
	<div class="container flex">
		<div class="hidden">1</div>
		<div class="flex flex-1 justify-center p-4">
			<div class="flex items-center justify-center gap-1">
				<img
					class="object-fit brightness-55 inset-0 h-6 w-6 contrast-125 grayscale filter slc-image-select-none dark:contrast-0"
					src="/images/logo/logo_512.png"
					alt="SLC Web logo"
				/>
				<p class="select-none text-surface-400">SLC Web Dev © 2010-{new Date().getFullYear()}</p>
			</div>
		</div>
		<div class="hidden">
			<p>build.22</p>
		</div>
	</div>
</footer>
