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
      { protocol: 'https', hostname: 'www.agsstonefabricators.com' },
      { protocol: 'https', hostname: 'dam.thdstatic.com' },
      { protocol: 'https', hostname: '21stcenturycd.com' },
      { protocol: 'https', hostname: 'hamishmurray.com' },
      { protocol: 'https', hostname: 'www.dfwimproved.com' },
      { protocol: 'https', hostname: 'rtaoutdoorliving.com' },
      { protocol: 'https', hostname: 'howtonestforless.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'www.cdgranite.com' },
      { protocol: 'https', hostname: 'royalmarbleandgranitenj.com' },
      { protocol: 'https', hostname: 'foxcustomcabinets.com' },
      { protocol: 'https', hostname: 'www.omegacabinetry.com' },
      { protocol: 'https', hostname: 'images.seattletimes.com' },
      { protocol: 'https', hostname: 'st.hzcdn.com' },
      { protocol: 'https', hostname: 'bluestemremodeling.com' },
      { protocol: 'https', hostname: 'www.jkath.com' },
      { protocol: 'https', hostname: 'www.rebath.com' },
      { protocol: 'https', hostname: 'www.wolfhomeproducts.com' },
      { protocol: 'https', hostname: 'kitchenconceptsplus.com' },
      { protocol: 'https', hostname: 'nativetrailshome.com' },
      { protocol: 'https', hostname: 'trex-outdoorkitchens.com' },
      { protocol: 'https', hostname: 'sunslifestyle.com' },
      { protocol: 'https', hostname: 'livetteswallpaper.com' },
      { protocol: 'https', hostname: 'cdn11.bigcommerce.com' },
      { protocol: 'https', hostname: 'justagirlandherblog.com' },
      { protocol: 'https', hostname: 'media.designcafe.com' },
    ],
  },
  // City pages: only "/{service}-{city}-ga" exists. Must match the service
  // prefixes and cities in app/[slug]/page.tsx.
  async redirects() {
    const cities = 'atlanta|duluth|alpharetta|roswell|johns-creek|suwanee|marietta|sandy-springs|buckhead';
    const services = 'countertops|granite-countertops|quartz-countertops|cabinets|outdoor-kitchens|kitchen-remodeling|bathroom-remodeling|vanity-tops|backsplash-tile';
    return [
      // custom-cabinets-{city}[-ga] merged into cabinets-{city}-ga (near-duplicate pages)
      { source: `/custom-cabinets-:city(${cities})`, destination: '/cabinets-:city-ga', statusCode: 301 },
      { source: `/custom-cabinets-:city(${cities})-ga`, destination: '/cabinets-:city-ga', statusCode: 301 },
      // Any {service}-{city} without "-ga" goes to its "-ga" URL
      { source: `/:page((?:${services})-(?:${cities}))`, destination: '/:page-ga', statusCode: 301 },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
