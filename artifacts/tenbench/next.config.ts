import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Not a static export any more: /admin needs server routes to sign in and save SEO settings.
  // Public pages are still pre-rendered as static HTML at build time.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*.replit.dev", "*.sisko.replit.dev", "localhost", "127.0.0.1"],
  poweredByHeader: false,
};

export default nextConfig;
