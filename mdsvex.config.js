import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const theme = 'one-dark-pro';
const highlighter = await createHighlighter({
    themes: [theme],
    langs: ['javascript', 'typescript', 'svelte']
});

const config = defineConfig({
    extensions: ['.svx', '.md'],
    smartypants: { dashes: 'oldschool' },
    highlight: {
        highlighter: async (code, lang = 'text') => {
            const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
            return `{@html \`${html}\` }`;
        }
    }
});

export default config;