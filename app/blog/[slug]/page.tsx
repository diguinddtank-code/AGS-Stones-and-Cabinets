import type { Metadata } from "next";
import Script from "next/script";
import BlogPostClient from "../../../components/BlogPostClient";
import { blogContent } from "../../../lib/blogData";

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogContent[params.slug];
  
  if (!post) {
    return { title: 'Guide Not Found | AGS Stones & Cabinets' };
  }

  const canonicalUrl = `https://www.agsstonefabricators.com/blog/${params.slug}`;
  const imageUrl = `https://www.agsstonefabricators.com${post.image}`;
  const pageTitle = `${post.title} | Atlanta & Duluth, GA | AGS Stones`;

  return {
    title: pageTitle,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      siteName: "AGS Stones & Cabinets",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug];

  if (!post) {
    return <BlogPostClient slug={params.slug} />;
  }

  const canonicalUrl = `https://www.agsstonefabricators.com/blog/${params.slug}`;
  const imageUrl = `https://www.agsstonefabricators.com${post.image}`;

  // Complete Schema Graph (Inspired by top-ranking local home service sites)
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.agsstonefabricators.com/#website",
        "url": "https://www.agsstonefabricators.com",
        "name": "AGS Stones & Cabinets",
        "description": "Factory-direct granite, quartz, and custom cabinetry fabrication in Duluth, GA and Metro Atlanta"
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": "https://www.agsstonefabricators.com/#localbusiness",
        "name": "AGS Stones & Cabinets",
        "url": "https://www.agsstonefabricators.com",
        "image": "https://www.agsstonefabricators.com/images/projects/kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg",
        "telephone": "+14049524534",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4579 Abbotts Bridge Rd Suite -10",
          "addressLocality": "Duluth",
          "addressRegion": "GA",
          "postalCode": "30097",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "34.0276",
          "longitude": "-84.1678"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "128"
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#blogposting`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "headline": post.title,
        "description": post.excerpt,
        "image": imageUrl,
        "datePublished": post.date,
        "dateModified": post.modifiedDate,
        "author": {
          "@type": "Organization",
          "name": "AGS Stones and Cabinets",
          "url": "https://www.agsstonefabricators.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "AGS Stones & Cabinets",
          "logo": {
            "@type": "ImageObject",
            "url": "https://i.imgur.com/B0ZaBpN.png"
          }
        },
        "articleSection": post.category
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.agsstonefabricators.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog & Guides",
            "item": "https://www.agsstonefabricators.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": canonicalUrl
          }
        ]
      },
      ...(post.faqs && post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              "mainEntity": post.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            }
          ]
        : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <BlogPostClient slug={params.slug} />
    </>
  );
}
