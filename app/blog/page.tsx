import type { Metadata } from "next";
import BlogClient from "../../components/BlogClient";

export const metadata: Metadata = {
  title: "WikiHow Guides & Knowledge Base | AGS Stones & Cabinets Atlanta",
  description: "Step-by-step homeowner guides, maintenance checklists, stone comparisons, and cost breakdowns from AGS Stones & Cabinets in Duluth and Metro Atlanta, GA.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/blog",
  },
  openGraph: {
    title: "WikiHow Guides & Knowledge Base | AGS Stones & Cabinets",
    description: "Step-by-step homeowner guides, maintenance checklists, stone comparisons, and cost breakdowns from AGS Stones & Cabinets.",
    url: "https://www.agsstonefabricators.com/blog",
    siteName: "AGS Stones & Cabinets",
    images: [
      {
        url: "https://www.agsstonefabricators.com/images/blog/clean-granite-countertops.jpg",
        width: 1200,
        height: 675,
        alt: "AGS Stones WikiHow Homeowner Guides",
      },
    ],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://www.agsstonefabricators.com/blog#blog",
      "name": "AGS Stones Homeowner Guides & Knowledge Base",
      "description": "Step-by-step illustrated guides, stone comparison breakdowns, and expert checklists for granite, quartz, and custom cabinetry.",
      "url": "https://www.agsstonefabricators.com/blog",
      "publisher": {
        "@type": "HomeAndConstructionBusiness",
        "name": "AGS Stones & Cabinets",
        "url": "https://www.agsstonefabricators.com"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.agsstonefabricators.com/blog#breadcrumb",
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
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient />
    </>
  );
}
