import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MobileBottomNav from './components/MobileBottomNav';
import StickyCta from './components/StickyCta';
import ExitIntentPopup from './components/ExitIntentPopup';
import { Loader2 } from 'lucide-react';

// Lazy Load components that are not immediately visible "Above the Fold"
// This reduces the initial JavaScript bundle size significantly.
const Services = lazy(() => import('./components/Services'));
const ProcessTimeline = lazy(() => import('./components/ProcessTimeline'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const StoneGallery = lazy(() => import('./components/StoneGallery'));
const MaterialMatchmaker = lazy(() => import('./components/MaterialMatchmaker'));
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const Showroom = lazy(() => import('./components/Showroom'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Faq = lazy(() => import('./components/Faq'));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-gray-50">
    <Loader2 className="animate-spin text-secondary opacity-50" size={32} />
  </div>
);

function App() {
  return (
    // Increased to pb-24 on mobile to account for Nav height (16) + safe area + breathing room
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
      <Header />
      
      <main className="flex-grow">
        {/* Hero loads immediately (Eager) for LCP optimization */}
        <Hero />
        
        {/* Everything else loads on demand */}
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        {/* Stone Gallery (Stones para escolher) moved above Process Timeline (Jornada) */}
        <Suspense fallback={<SectionLoader />}>
          <StoneGallery />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProcessTimeline />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WhyChooseUs />
        </Suspense>

        {/* Testimonials moved above FAQ */}
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        
        {/* New separate FAQ component */}
        <Suspense fallback={<SectionLoader />}>
          <Faq />
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
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <MobileBottomNav />
      <StickyCta />
      <ExitIntentPopup />
    </div>
  );
}

export default App;