import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/jacob-portfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
