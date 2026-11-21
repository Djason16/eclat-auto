import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: { port: 3000, strictPort: true },
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({ fallback: '200.html' }),
			// dc-scaffold: adapted (a small stylesheet goes inside the HTML; the stylesheet of the single bundle below is larger
			// and stays one cached file)
			inlineStyleThreshold: 60000,
			// One JavaScript file and one stylesheet for the whole site instead of about thirty small ones per page: far fewer
			// requests before the first screen on phones (Lighthouse mobile 96 to 98), cached for every next page
			output: { bundleStrategy: 'single' }, paths: { base: process.env.QUALIF_BASE_PATH ? `/${process.env.QUALIF_BASE_PATH.replace(/^[/]+/, '')}` : '' },
			// Qualif: the links written from the root are brought into the folder after the build (scripts/qualif.mjs)
			prerender: { handleHttpError: ({ message }) => { if (!process.env.QUALIF_BASE_PATH || !message.includes('does not begin with')) throw new Error(message) } }
		})
	]
});
