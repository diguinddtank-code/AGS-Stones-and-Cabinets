import { MetadataRoute } from 'next';
import { services } from '@/lib/servicesData';
import { blogContent } from '@/lib/blogData';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.agsstonefabricators.com';

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

  // Localized Service Landing Pages Combinations (SEO city pages, including -ga suffix)
  const localServicePrefixes = [
    'countertops',
    'granite-countertops',
    'quartz-countertops',
    'cabinets',
    'custom-cabinets',
    'outdoor-kitchens',
    'kitchen-remodeling',
    'bathroom-remodeling',
    'vanity-tops',
    'backsplash-tile'
  ];

  const locationRoutes: MetadataRoute.Sitemap = [];
  locations.forEach((city) => {
    localServicePrefixes.forEach((prefix) => {
      // We generate the version with -ga because it is the target SEO focus
      locationRoutes.push({
        url: `${baseUrl}/${prefix}-${city}-ga`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    });
  });

  // Blog Routes
  const blogRoutes: MetadataRoute.Sitemap = Object.keys(blogContent).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
