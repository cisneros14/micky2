import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // ppr has been merged into cacheComponents or other flags in this version
  },
  reactCompiler: true,
};

export default nextConfig;
