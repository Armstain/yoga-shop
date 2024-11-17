import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['scontent.cdninstagram.com', 'www.instagram.com', 'i.ibb.co.com'],
  },
};

export default nextConfig;
