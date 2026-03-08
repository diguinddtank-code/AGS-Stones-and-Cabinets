import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Faq from '../components/Faq';

const FaqPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Helmet>
        <title>Frequently Asked Questions | Granite & Cabinet Installation | AGS Stones</title>
        <meta name="description" content="Find answers to common questions about granite countertops, quartz installation, cabinet refacing, and more. AGS Stones is here to help." />
        <link rel="canonical" href="https://agsstonefabricators.com/faq" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221639263-d656c1f52576?q=80&w=1920&fm=webp&fit=crop")' }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-20 text-center py-20">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100">
              Everything you need to know about your stone and cabinet project.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Faq />
            
            <div className="mt-16 bg-gray-50 p-8 rounded-2xl text-center border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <a 
                href="/contact" 
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-full font-bold transition-transform hover:-translate-y-1 shadow-lg inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
