export default function UploadStatus({
  status,
}: {
  status: "idle" | "uploading" | "complete";
}) {
  if (status === "idle") {
    return null;
  }
  if (status === "uploading") {
    return (
      <p className="status status--uploading">
        <span className="status__spinner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                dur="1560ms"
                from="0,12,12"
                repeatCount="indefinite"
                to="360,12,12"
                type="rotate"
              />
            </path>
          </svg>
        </span>
        Uploading
      </p>
    );
  }
  if (status === "complete") {
    return (
      <p className="status status--complete">
        <span className="status__checkmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        Complete
      </p>
    );
  }
	return null;
}
