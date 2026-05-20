import { MetadataRoute } from 'next';
import { services } from '@/lib/servicesData';
import { blogContent } from '@/lib/blogData';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.agsstonefabricators.com';

const locations = ['atlanta', 'duluth', 'alpharetta', 'roswell', 'johns-creek', 'suwanee', 'marietta', 'sandy-springs'];

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

  // Location Routes
  const locationRoutes: MetadataRoute.Sitemap = locations.map((city) => ({
    url: `${baseUrl}/granite-countertops-${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Blog Routes
  const blogRoutes: MetadataRoute.Sitemap = Object.keys(blogContent).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
