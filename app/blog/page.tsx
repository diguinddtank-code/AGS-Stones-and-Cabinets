import type { Metadata } from "next";
import BlogClient from "../../components/BlogClient";

export const metadata: Metadata = {
  title: "Our Work in Your Neighborhood | AGS Stones Portfolio",
  description: "Browse our portfolio of stone countertops and custom cabinets completed across Metro Atlanta. Real results from recent months.",
  alternates: {
    canonical: "https://agsstonefabricators.com/blog",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "AGS Stones Kitchen & Bath Portfolio",
  "description": "Showcase of recent granite and quartz countertop installations in Metro Atlanta.",
  "publisher": {
    "@type": "HomeAndConstructionBusiness",
    "name": "AGS Stones",
    "url": "https://agsstonefabricators.com"
  }
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
