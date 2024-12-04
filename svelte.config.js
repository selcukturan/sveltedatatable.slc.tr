import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md', '.svx'] })],
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
