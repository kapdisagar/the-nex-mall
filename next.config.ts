import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow network access from other devices on the same network
  allowedDevOrigins: ["192.168.1.8", "localhost"],

  // Enable experimental features
  experimental: {
    // Server actions config (object required in Next.js 16+)
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.1.8:3000"],
    },
  },

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
};

export default nextConfig;