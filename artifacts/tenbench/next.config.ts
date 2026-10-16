import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*.replit.dev", "*.sisko.replit.dev", "localhost", "127.0.0.1"],
  poweredByHeader: false,
};

export default nextConfig;
