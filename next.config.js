const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_MODE === 'mobile' ? 'export' : 'standalone',
  images: {
    unoptimized: process.env.BUILD_MODE === 'mobile',
  },
};

module.exports = withNextIntl(nextConfig);
