import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationClient from "../../components/LocationClient";

const locations = ['atlanta', 'duluth', 'alpharetta', 'roswell', 'johns-creek', 'suwanee', 'marietta', 'sandy-springs'];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  
  if (!slug.startsWith('granite-countertops-')) {
    return {};
  }

  const city = slug.replace('granite-countertops-', '');
  
  if (!locations.includes(city.toLowerCase())) {
    return { title: 'Location Not Found' };
  }

  const formattedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `Granite Countertops in ${formattedCity}, GA | AGS Stones`,
    description: `Looking for granite countertops in ${formattedCity}? AGS Stones is your local factory-direct fabricator. Save 30% today on premium stone surfaces.`,
    alternates: {
      canonical: `https://agsstonefabricators.com/${slug}`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  if (!slug.startsWith('granite-countertops-')) {
    notFound();
  }

  const city = slug.replace('granite-countertops-', '');
  
  // Optional: Check if city is valid, or let LocationClient handle it (it handles invalid city gracefully)
  // But for 404 correctness, we should check here.
  if (!locations.includes(city.toLowerCase())) {
    notFound();
  }

  return <LocationClient city={city} />;
}
