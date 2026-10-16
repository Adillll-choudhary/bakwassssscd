import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // Ensure all assets load using absolute root paths for Hostinger root deployment
  assetPrefix: "/",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Experimental optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
