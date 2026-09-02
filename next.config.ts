import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [50, 75, 90],
  },
};

export default nextConfig;
