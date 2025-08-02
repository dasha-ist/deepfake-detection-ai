/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the optimized standalone output for Docker
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;