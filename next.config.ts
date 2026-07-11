import path from "node:path";
import type { NextConfig } from "next";

// Deployed to GitHub Pages as a fully static export. On Pages the site is
// served from a repo sub-path (e.g. https://<user>.github.io/<repo>), so the
// deploy workflow sets PAGES_BASE_PATH to "/<repo>". Locally it's unset, so
// `next dev` and local builds stay at the root path.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit a static site into `out/` — no Node server needed to host it.
  output: "export",
  // Serve every route as a directory with its own index.html; the most
  // robust shape for a static host like GitHub Pages.
  trailingSlash: true,
  basePath,
  // Static export can't use the default (server) image optimizer.
  images: { unoptimized: true },
  // Pin the workspace root: a stray lockfile elsewhere on the machine must
  // not make Turbopack treat the whole home directory as the project.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
