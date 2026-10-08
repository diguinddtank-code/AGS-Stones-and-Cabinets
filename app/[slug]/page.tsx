import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { services, ServiceDetail } from "@/lib/servicesData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDynamicContent from "@/components/ServiceDynamicContent";
import React, { Suspense } from "react";
import Link from "next/link";
import {
  isMaterialPrefix,
  materialSection,
  materialFaqs,
  countertopComparison,
} from "@/lib/cityMaterialContent";

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
    shortDesc: 'Compare granite, quartz, quartzite and marble side by side, then see every option in person at our Duluth showroom.',
    longDesc: "Every countertop material has a trade-off. Granite handles heat and lasts for decades but needs sealing. Quartz never needs sealing and keeps a uniform color, but it does not like hot pans or direct sun. Quartzite and marble bring natural veining with their own care routines. We fabricate all of them in our Duluth shop, so we can recommend what fits how you cook and clean.",
    features: ["Granite, Quartz, Quartzite & Marble Under One Roof", "Side-by-Side Slab Comparison in Our Duluth Showroom", "Digital Laser Templating for Any Material", "Factory-Direct Pricing on Every Stone"],
    keywords: ["kitchen countertops", "countertop installation", "countertop materials", "countertop fabricators"]
  },
  'granite-countertops': {
    baseSlug: 'countertops',
    title: 'Premium Granite Countertops',
    shortDesc: 'Natural granite that handles heat and daily wear, with a slab that is truly one of a kind. Cut and sealed in our Duluth shop.',
    longDesc: "Granite is natural stone formed under heat and pressure, so no two slabs look the same. It stands up to hot cookware, knives and daily wear, and with a fresh seal it resists stains for years. Walk our slab yard to choose your exact piece, from classic Uba Tuba and Absolute Black to exotic slabs with bold movement. We cut, polish and seal every slab in-house.",
    features: ["Natural Stone: Every Slab Is One of a Kind", "Handles Hot Pans, Knives and Daily Wear", "Sealed at Installation, Easy to Reseal", "Classic and Exotic Colors You Pick in Person"],
    keywords: ["granite countertops", "natural granite slabs", "exotic granite countertops", "granite countertop installation"]
  },
  'quartz-countertops': {
    baseSlug: 'countertops',
    title: 'Premium Quartz Countertops',
    shortDesc: 'Engineered quartz that never needs sealing, resists stains and keeps a consistent color from slab to slab.',
    longDesc: "Quartz is engineered from ground natural quartz bound with resin, which makes it non-porous. Coffee, wine and oil wipe off without soaking in, and it never needs a sealer. Because it is made in a factory, color and pattern stay consistent across slabs, so long runs and islands match. Our Duluth shop fabricates quartz with tight, color-matched seams.",
    features: ["Non-Porous: No Sealing, Ever", "Resists Coffee, Wine and Oil Stains", "Consistent Color Across Every Slab", "Wipe-Clean Care with Mild Soap and Water"],
    keywords: ["quartz countertops", "engineered quartz countertops", "low maintenance countertops", "quartz countertop installation"]
  },
  'cabinets': {
    baseSlug: 'cabinets',
    title: 'Custom Kitchen Cabinets',
    shortDesc: 'Premium all-wood cabinetry designed to complement your custom stone surfaces perfectly.',
    longDesc: "Get durable, solid-wood custom and semi-custom kitchen cabinets built to last. Our cabinetry features high-quality premium plywood boxes, hardwood face frames and doors, and premium steel soft-close hardware.",
    features: ["Heavy-Duty Plywood Boxes & All-Wood Frames (Zero Cheap MDF)", "Smooth European Soft-Close Hinges & Undermount Slides", "Professional 3D Layout Planning & Design Assistance", "Flawless On-Site Calibration & Expert Trim Assembly"],
    keywords: ["kitchen cabinets", "custom cabinets", "semi custom cabinetry", "wood cabinet installer"]
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

// Only "/{service}-{city}-ga" is built. Versions without "-ga" and the old
// custom-cabinets pages 301 to these (see next.config.js); any other slug 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  locations.forEach((city) => {
    Object.keys(prefixMappings).forEach((prefix) => {
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

  const canonicalSlug = `${prefix}-${city}-ga`;

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
  const { city, prefix, mapping } = parseSlug(params.slug);

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

  const material = isMaterialPrefix(prefix) ? materialSection(prefix, city, formattedCity) : null;
  const localFaqs = isMaterialPrefix(prefix) ? materialFaqs(prefix, formattedCity) : buildLocalFaqs(mapping, formattedCity);
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

        {/* Material guide (countertops / granite / quartz pages only): plain
            server-rendered content that makes each of the three pages distinct */}
        {material && (
          <section className="py-20 md:py-28 bg-[#f8f9fa] text-gray-900">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="max-w-3xl mb-10 md:mb-14">
                <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">{material.eyebrow}</h2>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-5 leading-tight">{material.heading}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{material.intro}</p>
              </div>

              {prefix === 'countertops' && (
                <div className="overflow-x-auto mb-10 md:mb-14 rounded-2xl border border-gray-200 bg-white">
                  <table className="w-full text-left text-sm min-w-[640px]">
                    <thead className="bg-primary text-white">
                      <tr>
                        {['Material', 'Made of', 'Sealing', 'Heat', 'Stains', 'Look'].map(h => (
                          <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {countertopComparison.map(row => (
                        <tr key={row.material} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-bold text-primary">{row.material}</td>
                          <td className="px-4 py-3 text-gray-600">{row.madeOf}</td>
                          <td className="px-4 py-3 text-gray-600">{row.sealing}</td>
                          <td className="px-4 py-3 text-gray-600">{row.heat}</td>
                          <td className="px-4 py-3 text-gray-600">{row.stains}</td>
                          <td className="px-4 py-3 text-gray-600">{row.look}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {material.points.map(p => (
                  <div key={p.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-primary mb-2">{p.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>

              {material.goodToKnow && (
                <div className="mt-5 md:mt-6 rounded-2xl border border-secondary/30 bg-secondary/5 p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Good to know</p>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {material.goodToKnow.map(g => (
                      <li key={g.title}>
                        <p className="font-bold text-primary mb-1">{g.title}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{g.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {material.links.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-secondary text-primary font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                  >
                    {l.label} <span aria-hidden="true" className="text-secondary">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
