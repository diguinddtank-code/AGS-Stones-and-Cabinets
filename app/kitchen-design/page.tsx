import type { Metadata } from 'next';
import Script from 'next/script';
import KitchenDesignClient from '../../components/kitchen-design/KitchenDesignClient';

export const metadata: Metadata = {
  title: '3D Kitchen Design Studio | Design Your Kitchen Online | AGS Stones',
  description: 'Design your dream kitchen in 3D. Choose from three luxury layouts, compare quartz, quartzite and granite countertops, cabinet colors and hardware, then get pricing from AGS Stones in Duluth, GA.',
  alternates: { canonical: 'https://www.agsstonefabricators.com/kitchen-design' },
  openGraph: {
    title: '3D Kitchen Design Studio | AGS Stones & Cabinets',
    description: 'Try quartz, quartzite and granite countertops on three luxury kitchens in 3D, then get pricing for your design.',
    url: 'https://www.agsstonefabricators.com/kitchen-design',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '3D Kitchen Design Studio',
  url: 'https://www.agsstonefabricators.com/kitchen-design',
  description: 'Interactive 3D kitchen designer with quartz, quartzite and granite countertops by AGS Stones & Cabinets.',
  provider: { '@type': 'HomeAndConstructionBusiness', name: 'AGS Stones & Cabinets', telephone: '+1-404-952-4534', areaServed: 'Metro Atlanta, GA' },
};

export default function Page() {
  return (
    <>
      <Script id="kitchen-design-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <KitchenDesignClient />
    </>
  );
}
