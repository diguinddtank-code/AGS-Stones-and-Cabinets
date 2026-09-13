import type { Metadata } from "next";
import Script from "next/script";
import ProjectsGallery from "../../components/ProjectsGallery";

export const metadata: Metadata = {
  title: "Real Countertop & Cabinet Projects in Atlanta & Duluth, GA | AGS Stones",
  description: "Browse real, completed countertop and cabinet projects from AGS Stones and Cabinets — kitchens, bathrooms, and custom cabinetry installed across Atlanta and Duluth, GA.",
  alternates: {
    canonical: "https://www.agsstonefabricators.com/projects",
  },
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "AGS Stones and Cabinets Project Gallery",
  "description": "Real completed granite, quartz, and cabinet projects fabricated and installed by AGS Stones and Cabinets in the greater Atlanta, GA area.",
  "url": "https://www.agsstonefabricators.com/projects",
  "about": {
    "@type": "Organization",
    "name": "AGS Stones and Cabinets",
    "url": "https://www.agsstonefabricators.com"
  }
};

export default function Page() {
  return (
    <>
      <Script
        id="projects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <ProjectsGallery />
    </>
  );
}
