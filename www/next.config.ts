import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      // Google profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Facebook profile images
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      // Wix static images (for scraped listings)
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.welkomhome.eu",
      },
    ],
    // Optimisation des formats et qualités d'image
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimisations de build
  experimental: {
    optimizeCss: true,
  },
  // Compression des réponses
  compress: true,
};

export default nextConfig;
