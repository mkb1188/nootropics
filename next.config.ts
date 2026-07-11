import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile elsewhere on the machine must
  // not make Turbopack treat the whole home directory as the project.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
