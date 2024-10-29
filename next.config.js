/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.piemultilingual.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000'
      }
    ]
  },
  trailingSlash: true,
  compress: true
  // reactStrictMode: false,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(nextConfig);
