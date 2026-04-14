/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.msisurfaces.com' },
      { protocol: 'https', hostname: 'terrastone.gallery' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'assetstools.cosentino.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'www.igscountertops.com' },
      { protocol: 'https', hostname: 'images.squarespace-cdn.com' },
      { protocol: 'https', hostname: 'marbleunlimited.com' },
      { protocol: 'https', hostname: 'dropinblog.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'kitchenandbathshop.com' },
      { protocol: 'https', hostname: 'agsstonefabricators.com' },
      { protocol: 'https', hostname: 'dam.thdstatic.com' },
      { protocol: 'https', hostname: '21stcenturycd.com' },
      { protocol: 'https', hostname: 'hamishmurray.com' },
      { protocol: 'https', hostname: 'www.dfwimproved.com' },
      { protocol: 'https', hostname: 'rtaoutdoorliving.com' },
      { protocol: 'https', hostname: 'howtonestforless.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
