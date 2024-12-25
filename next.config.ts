import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add the Cloudinary domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during builds
  },
};

export default nextConfig;
