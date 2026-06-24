import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fortnite-api.com" },
      { protocol: "https", hostname: "**.fortnite-api.com" },
      { protocol: "https", hostname: "**.epicgames.com" },
      { protocol: "https", hostname: "**.unrealengine.com" },
      { protocol: "https", hostname: "fntracker.pp.ua" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/compare-maps",
        destination: "/map",
        permanent: true,
      },
      {
        source: "/battle-pass/:season",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
