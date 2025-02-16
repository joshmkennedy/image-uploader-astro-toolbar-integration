import { defineIntegration } from "astro-integration-kit";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

export const integration = defineIntegration({
	name: "image-uploader-astro-toolbar-app",
	setup() {
		return {
			hooks: {
				"astro:config:setup": ({ addDevToolbarApp }) => {
					addDevToolbarApp({
						id: "toolbar-uploader-app",
						name: "Image Uploader",
						icon: "📷",
						entrypoint: fileURLToPath(new URL("./app/app.js", import.meta.url)),
					});
				},

				"astro:server:setup": ({ toolbar }) => {
					toolbar.on("toolbar-uploader-app:upload-file", (data: any) => {
						toolbar.send(
							"toolbar-uploader-app:upload-status-update",
							"uploading",
						);
						writeFileSync(
							"./public/" + data.name,
							data.file.replaceAll("data:image/png;base64,", ""),
							{ encoding: "base64" },
						);

						toolbar.send(
							"toolbar-uploader-app:upload-status-update",
							"complete",
						);

						setTimeout(() => {
							toolbar.send("toolbar-uploader-app:upload-status-update", "idle");
						}, 5000);
					});
				},
			},
		};
	},
});
