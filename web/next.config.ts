import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  turbopack: {
    root: '.',
  },
  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc'],
  },
};

export default nextConfig;
