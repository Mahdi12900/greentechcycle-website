const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_MODE === 'mobile' ? 'export' : 'standalone',
  images: {
    unoptimized: process.env.BUILD_MODE === 'mobile',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
