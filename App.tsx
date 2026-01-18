import React, { Suspense, lazy, useEffect } from 'react'; // <--- ADICIONEI O useEffect AQUI
import Header from './components/Header';
import Hero from './components/Hero';
import MobileBottomNav from './components/MobileBottomNav';
import StickyCta from './components/StickyCta';
import ExitIntentPopup from './components/ExitIntentPopup';
import { Loader2 } from 'lucide-react';

// Lazy Load components (mantive igual ao seu)
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

// Simple loading fallback (mantive igual)
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-gray-50">
    <Loader2 className="animate-spin text-secondary opacity-50" size={32} />
  </div>
);

function App() {
  
  // --- INÍCIO DO CÓDIGO NOVO PARA CORRIGIR O LOOP ---
  // Isso roda assim que o site abre no navegador do cliente
  useEffect(() => {
    // Verifica se a URL tem parâmetros antigos do WordPress
    const params = new URLSearchParams(window.location.search);
    if (params.has('page_id') || params.has('wpr_templates')) {
      // Se tiver, limpa tudo e deixa só a raiz do site
      window.history.replaceState({}, '', '/');
      // Opcional: recarrega para garantir renderização limpa se necessário
      // window.location.href = '/'; 
    }
  }, []);
  // --- FIM DO CÓDIGO NOVO ---

  return (
    // Increased to pb-24 on mobile to account for Nav height (16) + safe area + breathing room
    <div className="min-h-screen flex flex-col font-sans pb-24 md:pb-0 relative">
      <Header />

      <main className="flex-grow">
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        {/* MOVED TESTIMONIALS HERE AS REQUESTED */}
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

export default App;