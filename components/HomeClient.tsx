'use client';

import React, { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Hero from './Hero';
import StickyCta from './StickyCta';
import ExitIntentPopup from './ExitIntentPopup';
import { Loader2 } from 'lucide-react';

const Services = dynamic(() => import('./Services'));
const ProcessTimeline = dynamic(() => import('./ProcessTimeline'));
const WhyChooseUs = dynamic(() => import('./WhyChooseUs'));
const StoneGallery = dynamic(() => import('./StoneGallery'));
const MaterialMatchmaker = dynamic(() => import('./MaterialMatchmaker'));
const BeforeAfter = dynamic(() => import('./BeforeAfter'));
const Showroom = dynamic(() => import('./Showroom'));
const Testimonials = dynamic(() => import('./Testimonials'), { ssr: false });
const Contact = dynamic(() => import('./Contact'));
const Footer = dynamic(() => import('./Footer'));
const Faq = dynamic(() => import('./Faq'));
const LocalSEOSection = dynamic(() => import('./LocalSEOSection'));

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-gray-50">
    <Loader2 className="animate-spin text-secondary opacity-50" size={32} />
  </div>
);

function HomeClient() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('page_id') || params.has('wpr_templates')) {
        window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header />

      <main className="flex-grow">
        <Hero />
        <Services />
        <Testimonials />
        <ProcessTimeline />
        <WhyChooseUs />
        <StoneGallery />
        <MaterialMatchmaker />
        <BeforeAfter />
        <Showroom />
        <LocalSEOSection />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <StickyCta />
      <ExitIntentPopup />
    </div>
  );
}

export default HomeClient;
