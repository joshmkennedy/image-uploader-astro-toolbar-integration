import tailwind from "@astrojs/tailwind";
import tailwindcss from "@tailwindcss/vite";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";
import { defineConfig } from "astro/config";

const { default: imageUploaderDevTooApp } = await import("image-uploader-astro-toolbar-integration");

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		packageName(),
		hmrIntegration({
			directory: createResolver(import.meta.url).resolve("../package/dist"),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
