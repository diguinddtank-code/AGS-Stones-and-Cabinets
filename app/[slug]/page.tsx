import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { services, ServiceDetail } from "@/lib/servicesData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDynamicContent from "@/components/ServiceDynamicContent";
import React, { Suspense } from "react";

const locations = ['atlanta', 'duluth', 'alpharetta', 'roswell', 'johns-creek', 'suwanee', 'marietta', 'sandy-springs', 'buckhead'];

interface PrefixMapping {
  baseSlug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  keywords: string[];
}

const prefixMappings: Record<string, PrefixMapping> = {
  'countertops': {
    baseSlug: 'countertops',
    title: 'Quartz & Granite Countertops',
    shortDesc: 'Stunning premium quartz, granite, and marble surfaces custom-fabricated for your kitchen or bath.',
    longDesc: "Elevate your home with top-tier kitchen countertops and master bath vanities. We source premium quartz, natural granite, and exotic quartzite slabs directly, then custom fab in our local Duluth facility. Get high-end luxury finishes at factory-direct pricing with flawless installation guaranteed.",
    features: ["Premium Non-Porous Quartz & Hardwood Granite Slabs", "Precision Edge Profiling & High-Polished Joint Seams", "Direct Sourcing (No Retail Markups or Middlemen)", "Digital Laser Templating for 100% Flawless Fit"],
    keywords: ["kitchen countertops", "countertop installation", "granite fabricators", "quartz countertops ga"]
  },
  'granite-countertops': {
    baseSlug: 'countertops',
    title: 'Premium Granite Countertops',
    shortDesc: 'Natural, factory-direct granite countertops fabricated and installed to absolute perfection.',
    longDesc: "As Atlanta's premier stone installers, we offer stunning natural granite slabs hand-picked from the world's finest quarries. Every countertop is custom-fabricated in our local Duluth facility using state-of-the-art CNC machinery to ensure your seams are virtually invisible and the edge profiles look flawless.",
    features: ["Hand-Picked Premium Natural Granite Slabs", "Custom Edge Profiles & Precision Polishing", "Highly Resistant to Heat, Cuts, and Scratches", "Duluth-Based In-House Master Fabricators"],
    keywords: ["granite countertops", "granite slab fabrication", "local granite installers", "kitchen granite installation"]
  },
  'quartz-countertops': {
    baseSlug: 'countertops',
    title: 'Premium Quartz Countertops',
    shortDesc: 'Stunning, low-maintenance quartz surfaces customized for your modern kitchen or bath.',
    longDesc: "Choose from a massive, curated collection of top-rated Quartz countertops. Because we buy directly from the manufacturer and fabricate in-house in Duluth, you save 30% or more compared to retail. Our quartz is 100% non-porous, highly sanitary, stain-proof, and requires absolutely zero sealing.",
    features: ["Premium Non-Porous & Stain-Proof Surfaces", "Never Needs Sealing or Resurfacing", "Factory-Direct Pricing (No Markup)", "Precision Digital Laser Templating"],
    keywords: ["quartz countertops", "custom quartz installers", "quartz slab yards", "quartz counter installation"]
  },
  'cabinets': {
    baseSlug: 'cabinets',
    title: 'Custom Kitchen Cabinets',
    shortDesc: 'Premium all-wood cabinetry designed to complement your custom stone surfaces perfectly.',
    longDesc: "Get durable, solid-wood custom and semi-custom kitchen cabinets built to last. Our cabinetry features high-quality premium plywood boxes, hardwood face frames and doors, and premium steel soft-close hardware.",
    features: ["Heavy-Duty Plywood Boxes & All-Wood Frames (Zero Cheap MDF)", "Smooth European Soft-Close Hinges & Undermount Slides", "Professional 3D Layout Planning & Design Assistance", "Flawless On-Site Calibration & Expert Trim Assembly"],
    keywords: ["kitchen cabinets", "custom cabinets", "semi custom cabinetry", "wood cabinet installer"]
  },
  'custom-cabinets': {
    baseSlug: 'cabinets',
    title: 'Custom Kitchen Cabinets',
    shortDesc: 'Solid wood cabinetry hand-built to maximize storage, style, and resale value.',
    longDesc: "Bypass flat-pack fiberboard cabinets. We build custom and semi-custom solid-wood and premium plywood cabinetry using durable dovetail drawer construction and smooth European soft-close hinges. Measured to fit every corner of your home perfectly.",
    features: ["100% Plywood Core & Solid Hardwood Doors (Zero MDF)", "German Soft-Close Undermount Drawer Slides", "Virtual 3D Kitchen Design & Space Optimization", "Masterful Duluth-made In-house Finishes"],
    keywords: ["custom cabinets", "shaker kitchen cabinets", "cabinet replacement", "kitchen cabinets installer"]
  },
  'outdoor-kitchens': {
    baseSlug: 'outdoor-kitchens',
    title: 'Custom Outdoor Kitchens',
    shortDesc: 'High-end, weather-proof outdoor BBQ stations and luxury patio entertainment bars.',
    longDesc: "Bring luxury dining to your backyard with countertops built to survive the elements. We fabricate and install outdoor islands using UV-stable and temperature shock-resistant materials like Leathered Granite, Quartzite, or Dekton, backed by strong heavy-duty outdoor-rated framing.",
    features: ["UV-Stable & Temperature-Resistant Slabs", "Durable Heavy-Duty Outdoor Grade Support", "Surgical Precision Cutouts for Grills & Fridges", "Backyard Entertainment & Custom Bar Creation"],
    keywords: ["outdoor kitchen builder", "outdoor granite BBQ counter", "backyard patio kitchen", "outdoor bbq station"]
  },
  'kitchen-remodeling': {
    baseSlug: 'kitchen-remodeling',
    title: 'Full Kitchen Remodeling',
    shortDesc: 'Complete stress-free turnkey kitchen renovations from professional design to final clean up.',
    longDesc: "Why coordinate five different subcontractors? We manage your kitchen makeover from A to Z. Our turnkey remodeling handles tear-out, structural layout design, custom cabinetry, premium stone fabrication, tile backsplashes, and professional finishing plumbing.",
    features: ["Dedicated Single-Point Project Management", "In-House Cabinets and Stone Layout matching", "Full Plumbing, Backsplash and Electrical Finishing", "Guaranteed Start-to-Finish Timeline Precision"],
    keywords: ["kitchen remodeling contractor", "turnkey kitchen renovation", "luxury kitchen remodelers", "kitchen remodeling company"]
  },
  'bathroom-remodeling': {
    baseSlug: 'bathroom-remodeling',
    title: 'Bathroom Renovations',
    shortDesc: 'Spa-like master bath retreats, curbless custom showers, and luxury double vanities.',
    longDesc: "Turn your bathroom into a luxury retreat. We specialize in curbless walk-in showers, freestanding tubs, intricate custom tile work, and custom vanity tops. All fabricated in-house to make absolute beauty affordable.",
    features: ["Custom Walk-In Showers & Tiling", "High-End Freestanding Tubs", "Custom Double Vanity Slabs", "Waterproof Plumbing & Setup"],
    keywords: ["bathroom remodel contractor", "master bathroom renovation", "custom shower designer", "bathroom vanity tops"]
  },
  'vanity-tops': {
    baseSlug: 'vanity-tops',
    title: 'Premium Vanity Tops',
    shortDesc: 'Affordable, premium stone vanity tops cut from high-quality remnants.',
    longDesc: "Perfect for secondary bathrooms, laundry rooms, and fireplaces. Save big by ordering your vanity top from our Duluth showroom remnant yard. You get top-tier granite or quartz at a fraction of the full slab cost, with quick 3-day turnaround.",
    features: ["Discounted Premium Stone Remnants Yard", "Ultra-Quick Duluth Fabricators Turnaround", "Includes Custom Undermount Sink Cutout", "Excellent Value for Powder Rooms"],
    keywords: ["bathroom vanity tops", "countertop remnants near me", "granite remnants", "quartz remnants"]
  },
  'backsplash-tile': {
    baseSlug: 'backsplash-tile',
    title: 'Backsplash & Tile Installers',
    shortDesc: 'Expert tile installation of classic subway paths, mosaic backslashes, and custom styling.',
    longDesc: "Complete your premium kitchen or master bath remodel with hand-laid backsplash detailing. Our expert tilers execute incredibly clean mosaic joints, custom brick overlays, and luxury full-height stone slabs matching.",
    features: ["Clean Mosaic & Subway Tile Inlays", "Full-Height Stone Slab Backsplashes", "Waterproof Bathroom Wall Styling", "Pristine Tile-Set Finishing Work"],
    keywords: ["backsplash installers", "kitchen backsplash installation", "tile contractors", "tile installers"]
  }
};

/**
 * Safely parses the route slug into a service prefix and city name.
 */
function parseSlug(slug: string): { city: string; prefix: string; mapping: PrefixMapping | null } {
  let tempSlug = slug.toLowerCase();
  
  if (tempSlug.endsWith('-ga')) {
    tempSlug = tempSlug.slice(0, -3); // Strip the "-ga" suffix
  }
  
  let matchedCity = '';
  let matchedPrefix = '';

  for (const loc of locations) {
    if (tempSlug.endsWith(`-${loc}`)) {
      matchedCity = loc;
      matchedPrefix = tempSlug.slice(0, -(loc.length + 1));
      break;
    }
  }

  const mapping = prefixMappings[matchedPrefix] || null;
  return { city: matchedCity, prefix: matchedPrefix, mapping };
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  locations.forEach((city) => {
    Object.keys(prefixMappings).forEach((prefix) => {
      // Build both with and without -ga to ensure static pages compile properly
      params.push({ slug: `${prefix}-${city}` });
      params.push({ slug: `${prefix}-${city}-ga` });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { city, prefix, mapping } = parseSlug(params.slug);

  if (!city || !mapping) {
    return { title: 'Service Not Found | AGS Stones' };
  }

  const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const pageTitle = `${mapping.title} in ${formattedCity}, GA | Factory Direct | AGS Stones`;
  const pageDesc = `Looking for a licensed ${mapping.title.toLowerCase()} contractor in ${formattedCity}? AGS Stones offers factory-direct pricing on custom fabrication and installation. Get a free estimate today.`;

  // Canonicalize to the "-ga" variant so the with/without-"-ga" duplicate
  // pages consolidate ranking signals into a single indexed URL, matching
  // what's actually submitted in sitemap.ts.
  const canonicalSlug = params.slug.toLowerCase().endsWith('-ga') ? params.slug : `${prefix}-${city}-ga`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: mapping.keywords.map(kw => `${kw} ${city}, ${kw} ${formattedCity} ga`).join(', '),
    alternates: {
      canonical: `https://www.agsstonefabricators.com/${canonicalSlug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.agsstonefabricators.com/${canonicalSlug}`,
      siteName: 'AGS Stones & Cabinets',
      locale: 'en_US',
      type: 'website'
    }
  };
}

/**
 * City + service specific FAQs. Deliberately works in phrasing people
 * actually search for ("cost", "contractor", "slabs", "installation") that
 * the rest of the templated copy doesn't naturally use, and doubles as
 * visible content backing the FAQPage schema below.
 */
function buildLocalFaqs(mapping: PrefixMapping, formattedCity: string) {
  const serviceLower = mapping.title.toLowerCase();
  return [
    {
      q: `How much does ${serviceLower} cost in ${formattedCity}, GA?`,
      a: `Pricing depends on the material, square footage, and edge profile you choose. Because we fabricate everything factory-direct at our Duluth facility, most ${formattedCity} homeowners save 20-30% versus big-box retail pricing. Request a free in-home estimate for an exact quote.`,
    },
    {
      q: `How long does ${serviceLower} installation take?`,
      a: `Most projects in ${formattedCity} are templated within a few days of your estimate and installed within 1-2 weeks after your slab is selected, thanks to our in-house digital laser templating and fabrication.`,
    },
    {
      q: `Are you a licensed countertop contractor serving ${formattedCity}, GA?`,
      a: `Yes. AGS Stones & Cabinets is a fully licensed and insured countertop contractor based in Duluth, GA, serving ${formattedCity} and the greater Metro Atlanta area with in-house fabrication and installation crews.`,
    },
    {
      q: `Can I see the actual granite or quartz slabs before they're cut for my project?`,
      a: `Absolutely. We encourage every ${formattedCity} customer to visit our Duluth showroom and slab yard to hand-select the exact granite, quartz, or quartzite slabs used for their project before fabrication begins.`,
    },
  ];
}

export default function Page({ params }: { params: { slug: string } }) {
  const { city, mapping } = parseSlug(params.slug);

  if (!city || !mapping) {
    notFound();
  }

  // Find the base service from our servicesData
  const baseService = services.find(s => s.slug === mapping.baseSlug);
  if (!baseService) {
    notFound();
  }

  const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Overlay localized copywriting onto our service entity
  const customizedService: ServiceDetail = {
    ...baseService,
    title: `${mapping.title}`,
    slug: params.slug, // Pass the specific slug
    shortDesc: mapping.shortDesc,
    longDesc: mapping.longDesc,
    features: mapping.features,
    keywords: mapping.keywords
  };

  // Inject localized Service Schema for Google SEO & SGE
  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${mapping.title} in ${formattedCity}, GA`,
    "serviceType": mapping.title,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "AGS Stones & Cabinets",
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
      }
    },
    "areaServed": {
      "@type": "City",
      "name": formattedCity,
      "addressRegion": "GA"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "128"
    },
    "description": `Premium custom ${mapping.title.toLowerCase()} fabrication and installation services in ${formattedCity}, Georgia, by AGS Stones.`
  };

  const localFaqs = buildLocalFaqs(mapping, formattedCity);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": localFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  return (
    <div className="font-sans text-gray-900 bg-[#0a0a0a] min-h-screen">
      <Script
        id={`slug-local-service-schema-${city}-${mapping.baseSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
      />
      <Script
        id={`slug-local-faq-schema-${city}-${mapping.baseSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        <Suspense fallback={<div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-serif">Loading elegant local experience...</div>}>
          <ServiceDynamicContent service={customizedService} cityOverride={city} />
        </Suspense>

        {/* Local FAQ — plain server-rendered <details>/<summary>, no client JS,
            backs the FAQPage schema above with matching visible content and
            naturally covers "cost", "contractor" and "slabs" query phrasing. */}
        <section className="py-20 md:py-28 bg-white text-gray-900 border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">FAQ</h2>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                Common Questions in {formattedCity}
              </h3>
            </div>
            <div className="space-y-4">
              {localFaqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group border border-gray-200 rounded-2xl px-6 py-5 open:shadow-sm transition-shadow"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-lg md:text-xl font-medium text-primary">
                    {faq.q}
                    <span className="shrink-0 text-secondary text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed font-light">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
