import { MetadataRoute } from 'next';

// Canonical host. Hardcoded on purpose so an env var can never put the
// non-www host into the sitemap or robots.txt.
const baseUrl = 'https://www.agsstonefabricators.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
