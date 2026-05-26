import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone produces a self-contained `.next/standalone` tree that the
  // Dockerfile copies into a minimal node image — no node_modules at runtime.
  output: "standalone",
};

export default nextConfig;
