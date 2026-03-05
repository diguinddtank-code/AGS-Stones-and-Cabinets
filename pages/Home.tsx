import React, { Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MobileBottomNav from '../components/MobileBottomNav';
import StickyCta from '../components/StickyCta';
import ExitIntentPopup from '../components/ExitIntentPopup';
import { Loader2 } from 'lucide-react';

// Lazy Load components
const Services = lazy(() => import('../components/Services'));
const ProcessTimeline = lazy(() => import('../components/ProcessTimeline'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const StoneGallery = lazy(() => import('../components/StoneGallery'));
const MaterialMatchmaker = lazy(() => import('../components/MaterialMatchmaker'));
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const Showroom = lazy(() => import('../components/Showroom'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
const Faq = lazy(() => import('../components/Faq'));

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-gray-50">
    <Loader2 className="animate-spin text-secondary opacity-50" size={32} />
  </div>
);

function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('page_id') || params.has('wpr_templates')) {
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
      <Helmet>
        <title>Granite Countertops Near Me | Atlanta & Duluth's #1 Local Fabricator | AGS Stones</title>
        <meta name="description" content="Looking for granite countertops near you? AGS Stones is your local factory-direct fabricator in Duluth, GA. Serving Atlanta, Alpharetta, and Roswell. Save 30% today." />
        <link rel="canonical" href="https://agsstonefabricators.com" />
      </Helmet>
      <Header />

      <main className="flex-grow">
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProcessTimeline />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WhyChooseUs />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StoneGallery />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <MaterialMatchmaker />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BeforeAfter />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Showroom />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Faq />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-16" />}>
        <Footer />
      </Suspense>

      <MobileBottomNav />
      <StickyCta />
      <ExitIntentPopup />
    </div>
  );
}

export default Home;
