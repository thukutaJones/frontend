import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  eslint: {
    // ✅ Never run ESLint during build or dev
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Never block build on TS errors
    ignoreBuildErrors: true,
  },
  experimental: {
    // other experimental options if needed
  },
};

export default nextConfig;
