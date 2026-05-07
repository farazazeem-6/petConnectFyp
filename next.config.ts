import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wasabisys.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mcauto-images-production.sendgrid.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.12'],
};

export default nextConfig;
