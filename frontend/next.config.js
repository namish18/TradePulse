/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Webpack configuration for .graphql file imports
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  
  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_GRAPHQL_HTTP_URL: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL,
    NEXT_PUBLIC_GRAPHQL_WS_URL: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL,
    NEXT_PUBLIC_ENABLE_PERSISTED_QUERIES: process.env.NEXT_PUBLIC_ENABLE_PERSISTED_QUERIES,
  },
};

module.exports = nextConfig;
