'use client';

import React, { Suspense, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import MobileBottomNav from './MobileBottomNav';
import StickyCta from './StickyCta';
import ExitIntentPopup from './ExitIntentPopup';
import { Loader2 } from 'lucide-react';

// Direct imports instead of lazy for simplicity in migration, 
// or keep lazy if performance is critical, but Next.js handles code splitting well.
// For "SITE IGUAL", I'll keep lazy if possible, but Next.js lazy is 'dynamic'.
// Let's switch to direct imports to avoid SSR issues with React.lazy in Client Components (it works but dynamic is preferred).
// Actually, let's use direct imports for stability.
import Services from './Services';
import ProcessTimeline from './ProcessTimeline';
import WhyChooseUs from './WhyChooseUs';
import StoneGallery from './StoneGallery';
import MaterialMatchmaker from './MaterialMatchmaker';
import BeforeAfter from './BeforeAfter';
import Showroom from './Showroom';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import Faq from './Faq';

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
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
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
        <Faq />
        <Contact />
      </main>

      <Footer />
      <MobileBottomNav />
      <StickyCta />
      <ExitIntentPopup />
    </div>
  );
}

export default HomeClient;
