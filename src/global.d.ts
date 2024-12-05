declare module '*.md' {
	import type { SvelteComponent } from 'svelte';
	export default class Comp extends SvelteComponent {}
	export const metadata: Record<string, unknown>;
}

/* declare module 'mdsvex' {
	import { CompileOptions, PreprocessorGroup } from 'svelte/types/compiler/preprocess';

	export function compile(
		markdown: string,
		options?: CompileOptions
	): Promise<{ code: string; map: string }>;

	export function mdsvex(options?: CompileOptions): PreprocessorGroup;
} */
