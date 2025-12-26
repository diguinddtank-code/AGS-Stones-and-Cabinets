import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import AiVisualizer from './components/AiVisualizer';
import BeforeAfter from './components/BeforeAfter';
import Showroom from './components/Showroom';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyCta from './components/StickyCta';
import ProcessTimeline from './components/ProcessTimeline';
import MaterialMatchmaker from './components/MaterialMatchmaker';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <MaterialMatchmaker />
        <ProcessTimeline />
        <WhyChooseUs />
        <AiVisualizer />
        <BeforeAfter />
        <Showroom />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}

export default App;