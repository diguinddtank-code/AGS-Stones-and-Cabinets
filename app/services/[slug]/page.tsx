import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { services } from '@/lib/servicesData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import ServiceDynamicContent from '@/components/ServiceDynamicContent';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find(s => s.slug === params.slug);
  
  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} in Atlanta, GA | Factory Direct | AGS Stones`,
    description: `Get factory-direct ${service.title.toLowerCase()} in Atlanta & Duluth, GA. AGS Stones provides custom fabrication and flawless professional installation. Get a free estimate today!`,
    keywords: service.keywords.join(', '),
    openGraph: {
      title: `${service.title} in Atlanta, GA | AGS Stones`,
      description: `Get factory-direct ${service.title.toLowerCase()} in Atlanta & Duluth, GA. AGS Stones provides custom fabrication and flawless professional installation. Get a free estimate today!`,
      images: [{ url: service.image }]
    }
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="font-sans text-gray-900 bg-[#0a0a0a] min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<div className="h-screen bg-[#0a0a0a]"></div>}>
          <ServiceDynamicContent service={service} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

