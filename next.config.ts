import type { NextConfig } from "next";

const IMMUTABLE = "public, max-age=31536000, immutable";
const STATIC_MEDIA = "public, max-age=86400, stale-while-revalidate=604800";

/**
 * Next.js 16 runs Turbopack by default for both `dev` and `build`. The
 * original config carried a `webpack` block (GLB asset rules + a three.js
 * split-chunk group), which now causes the build to fail outright — and it
 * was only there to serve the 3D model, which is gone. The `/models/*`
 * cache header went with it.
 */
const nextConfig: NextConfig = {
  reactStrictMode: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_MEDIA }],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: STATIC_MEDIA },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/team/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_MEDIA }],
      },
    ];
  },
};

export default nextConfig;
