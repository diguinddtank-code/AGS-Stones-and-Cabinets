import { MetadataRoute } from 'next';
import { services } from '@/lib/servicesData';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agsstones.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fast-quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add other static routes as they are created
  ];

  // Dynamic Service Routes
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
