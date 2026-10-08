import { MetadataRoute } from 'next';
import { services } from '@/lib/servicesData';
import { blogContent } from '@/lib/blogData';

// Canonical host. Hardcoded on purpose so an env var can never put the
// non-www host into the sitemap or robots.txt.
const baseUrl = 'https://www.agsstonefabricators.com';

const locations = ['atlanta', 'duluth', 'alpharetta', 'roswell', 'johns-creek', 'suwanee', 'marietta', 'sandy-springs', 'buckhead'];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static Routes
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/fast-quote',
    '/privacy-policy',
    '/quote',
    '/services',
    '/showroom',
    '/projects',
    '/blog',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service Routes
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // City landing pages: only the "-ga" URLs exist (others 301, see next.config.js).
  // Must match prefixMappings in app/[slug]/page.tsx.
  const localServicePrefixes = [
    'countertops',
    'granite-countertops',
    'quartz-countertops',
    'cabinets',
    'outdoor-kitchens',
    'kitchen-remodeling',
    'bathroom-remodeling',
    'vanity-tops',
    'backsplash-tile'
  ];

  const locationRoutes: MetadataRoute.Sitemap = [];
  locations.forEach((city) => {
    localServicePrefixes.forEach((prefix) => {
      locationRoutes.push({
        url: `${baseUrl}/${prefix}-${city}-ga`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    });
  });

  // Blog Routes with High SEO Priority
  const blogRoutes: MetadataRoute.Sitemap = Object.keys(blogContent).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
