---
name: Next.js conversion from the Vite artifact
description: A Next App Router setup can conflict with the Vite starter's generated Pages Router directory.
---

When converting the selected Vite artifact to a custom Next.js App Router site, remove the generated `src/pages` tree and unused Vite entry files before starting Next with a root-level `app/` directory.

**Why:** Next.js rejects a root `app/` directory paired with `src/pages/` because the App and Pages routers are not under the same folder.

**How to apply:** If Next reports that `pages` and `app` must share a folder, check for leftover Vite scaffold files under `src/` before changing the requested router structure.
