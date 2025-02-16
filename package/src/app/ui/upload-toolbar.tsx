import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";

//@ts-ignore
import UploadStatus from "./upload-status.tsx";

export default function UploadToolbar({
  uploadFile,
  stateChangeListener,
}: {
  uploadFile: (notSureYet: any) => void;
  stateChangeListener: any; // bc I JUST DON'T CARE RIGHT NOW
}) {
  const [dragging, setDragging] = useState(false);
  const [uploadedImg, setUploadedImg] = useState<ArrayBuffer | string | null>(
    null,
  );
  const [uploaderStatus, setUploaderStatus] = useState<
    "idle" | "uploading" | "complete"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateStatus = useCallback(
    (status: "idle" | "uploading" | "complete") => {
      setUploaderStatus(status);
      if (status === "idle") {
        setUploadedImg(null);
      }
    },
    [setUploaderStatus, setUploadedImg],
  );

  useEffect(() => {
    stateChangeListener(
      "toolbar-uploader-app:upload-status-update",
      updateStatus,
    );
  }, [updateStatus]);

  async function handleFile(file: File) {
    const reader = new FileReader();
    uploadFile(file);

		const name = file.name.replaceAll(" ", "-")
		window.navigator.clipboard.writeText(`<img src="/${name}" />`)

    reader.onload = (e) => {
      setUploadedImg(e.target?.result ?? null);
    };
    reader.readAsDataURL(file);
  }

  function handleFileInputChange(e: JSX.TargetedEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    handleFile(file);
  }

  function handleFileDrop(e: JSX.TargetedDragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    handleFile(file);
  }

  useEffect(() => {
    console.log("dragging", dragging);
    return () => {
      console.log("unmounting");
    };
  }, [dragging]);

  return (
    <div
      className={`root-toolbar-uploader-app ${dragging ? "dragging" : ""}`}
      onClick={() => {
        fileInputRef.current?.click();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragging(true);
        return;
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!dragging) setDragging(true);
        return;
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
        return;
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFileDrop(e);
        return;
      }}
    >
      {uploadedImg ? (
        <img
          src={uploadedImg as string}
          alt="uploaded image"
          className="uploaded-image"
        />
      ) : (
        <h1 style={{ pointerEvents: "none" }}>UploadToolbar</h1>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <UploadStatus status={uploaderStatus} />
    </div>
  );
}
