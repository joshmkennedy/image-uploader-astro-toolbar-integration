# `image-uploader-astro-toolbar-integration`


This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that Allows you to upload images to your public directory via the toolbar

## Usage

### Prerequisites

You are prepared for this package to not change your life in any way.

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add image-uploader-astro-toolbar-integration
```

```bash
npx astro add image-uploader-astro-toolbar-integration
```

```bash
yarn astro add image-uploader-astro-toolbar-integration
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add image-uploader-astro-toolbar-integration
```

```bash
npm install image-uploader-astro-toolbar-integration
```

```bash
yarn add image-uploader-astro-toolbar-integration
```

2. Add the integration to your astro config

```diff
+import imageUploaderDevTooApp from "image-uploader-astro-toolbar-integration";

export default defineConfig({
  integrations: [
+    imageUploaderDevTooApp(),
  ],
});
```

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm:

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

## Acknowledgements

- Created using [astro-integration-template](https://github.com/florian-lefebvre/astro-integration-template).
