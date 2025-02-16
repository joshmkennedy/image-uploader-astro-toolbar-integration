import { defineToolbarApp } from "astro/toolbar";
import { render } from "preact";
//@ts-ignore
import UploadToolbar from "./ui/upload-toolbar.tsx";

export interface ToolBarServer {
  send: <T>(event: string, payload: T) => void;
  on: <T>(event: string, callback: (data: T) => void) => void;
}

export default defineToolbarApp({
  async init(canvas, _app, server) {
    //styles
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("./ui/toolbar.css", import.meta.url).href;
    canvas.appendChild(link);

    function uploadFile(file: File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        server.send("toolbar-uploader-app:upload-file", {
          name: file.name.replaceAll(" ", "-"),
          file: e.target?.result ?? "",
        });
      };
      reader.readAsDataURL(file);
    }

    render(<UploadToolbar uploadFile={uploadFile} stateChangeListener={server.on} />, canvas);
  },
});
