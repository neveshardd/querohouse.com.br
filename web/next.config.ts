import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // Cloudflare R2 endpoints
      process.env.NEXT_PUBLIC_R2_HOSTNAME
        ? {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_R2_HOSTNAME,
            port: '',
            pathname: '/**',
          }
        : undefined,
      process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_HOSTNAME
        ? {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_HOSTNAME,
            port: '',
            pathname: '/**',
          }
        : undefined,
    ].filter(Boolean) as any,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
