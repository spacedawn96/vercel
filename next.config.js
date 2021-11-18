const path = require('path');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // distDir: 'build',
  webpack: config => {
    return config;
  },
};
module.exports = withPlugins(
  [
    withImages,
    {
      inlineImageLimit: 16384,
      exclude: path.resolve(__dirname, 'src/svgs'),
    },
  ],
  [
    [withBundleAnalyzer],
    [
      withImages,
      {
        inlineImageLimit: 16384,
        exclude: path.resolve(__dirname, 'src/assets/png'),
      },
    ],
  ],

  nextConfig,
);
