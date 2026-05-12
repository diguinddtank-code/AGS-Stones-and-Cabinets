import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      {
        userAgent: 'Google-Extended', // explicitly allow Vertex AI / Gemini crawlers
        allow: '/',
      },
      {
        userAgent: 'GPTBot', // allow OpenAI
        allow: '/',
      },
      {
        userAgent: 'CCBot', // allow Anthropic / general AI crawling
        allow: '/',
      }
    ],
    sitemap: 'https://www.agsstonefabricators.com/sitemap.xml',
  };
}
