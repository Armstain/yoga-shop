import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['scontent.cdninstagram.com', 'www.instagram.com'],
  },
};

export default nextConfig;
