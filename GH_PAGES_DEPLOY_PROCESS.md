# GitHub Pages Deployment Process

This document outlines the steps taken to configure and deploy this Vite/React project to GitHub Pages. This process can be generalized to create templates for quick setup of similar projects.

## 1. Initial Assessment

Upon receiving the request to deploy the repository to GitHub Pages, the following project aspects were examined:

*   **`package.json`**: Checked for existing `gh-pages` dependency, and identified the need for a `homepage` field and a `deploy` script.
*   **`vite.config.ts`**: Checked for existing configuration, specifically noting the absence of a `base` property.
*   **Git Remote**: Used `git remote -v` to determine the GitHub repository URL, which is crucial for constructing the `homepage` URL and the `base` path for Vite.
    *   Repository URL format: `https://github.com/<username>/<repo-name>.git`
    *   In this case: `https://github.com/willemhelmet/still-life-with-a-skull-and-writing-quill.git`
    *   Derived `homepage`: `https://willemhelmet.github.io/still-life-with-a-skull-and-writing-quill`
    *   Derived `base` path for Vite: `/still-life-with-a-skull-and-writing-quill/`

## 2. Project Configuration Modifications

Based on the initial assessment, the following files were modified:

### `vite.config.ts`

The `base` property was added to the `defineConfig` object to specify the base URL for the deployed application. This is essential for assets and routing to work correctly when hosted on a subpath (i.e., `/<repo-name>/`) of GitHub Pages.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/still-life-with-a-skull-and-writing-quill/", // Added this line
});
```

### `package.json`

Two key additions were made:

*   **`homepage` field**: This field specifies the URL where the deployed application will be hosted. It's used by the `gh-pages` package to correctly configure deployment.
*   **`deploy` script**: A new script named `deploy` was added to automate the deployment process. It utilizes the `gh-pages` package to push the contents of the build output directory (`dist`) to the `gh-pages` branch of the repository.

```json
{
  "name": "still-life-sam-3d",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "homepage": "https://willemhelmet.github.io/still-life-with-a-skull-and-writing-quill", // Added this line
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "deploy": "gh-pages -d dist", // Added this line
    "lint": "eslint .",
    "preview": "vite preview"
  },
  // ... rest of package.json
}
```

## 3. Execution Steps

1.  **Build the Project**: The standard build command was executed to create a production-ready bundle in the `dist` directory.
    ```bash
    npm run build
    ```
2.  **Deploy to GitHub Pages**: The newly added `deploy` script was run, which triggered the `gh-pages` tool to push the `dist` directory content to the `gh-pages` branch.
    ```bash
    npm run deploy
    ```

## 4. Troubleshooting & Common Pitfalls

### Asset Paths in Code
When referencing assets in JavaScript/TypeScript (e.g., textures, models), string literals like `"/model.glb"` will resolve to the domain root, which fails on GitHub Pages project sites.

**Fix:** Use `import.meta.env.BASE_URL` to prepend the correct base path.

```typescript
// BAD
const url = "/still-life.sog";

// GOOD
const url = import.meta.env.BASE_URL + "still-life.sog";
```

### Missing Favicon/Assets
If `index.html` references non-existent files (e.g., `<link href="/vite.svg">` but the file is missing), it will cause 404 errors in the console. Remove these references or ensure the files exist in the `public/` directory.

## 5. Verification

After deployment, the presence of the `dist` folder and its contents was confirmed to ensure a successful build. The GitHub Pages URL was provided for direct access and verification of the live application.

## 6. Committing Changes

Finally, the configuration changes made to `vite.config.ts`, `package.json`, and source code were committed to the `main` branch.

This structured approach ensures that all necessary configurations are in place for a successful GitHub Pages deployment of a Vite/React application.