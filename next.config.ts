import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 100],
  },
  async rewrites() {
    return {
      // beforeFiles runs ahead of the app router, so /ludhiana is served by the
      // static landing page in public/lp/ludhiana instead of app/[branch]/page.tsx.
      // The React branch page is still there and still builds - drop these two
      // entries to switch back to it.
      beforeFiles: [
        { source: "/ludhiana", destination: "/lp/ludhiana/index.html" },
        { source: "/ludhiana/", destination: "/lp/ludhiana/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
