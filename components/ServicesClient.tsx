'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { CheckCircle, Hammer, Ruler, Truck, PenTool, ArrowRight } from 'lucide-react';
import { services } from '@/lib/servicesData';

const ServicesClient = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="AGS Services"
              className="w-full h-full object-cover grayscale opacity-60"
              fill
              priority
              sizes="100vw"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20 text-center py-20">
            <div className="inline-block bg-secondary/80 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-in slide-in-from-bottom-2 duration-700">
                Premium Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-4 duration-700">Our Services</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100 font-light leading-relaxed">
              Comprehensive stone and cabinetry solutions for your dream home, fabricated with precision and installed with care.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-gray-50 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, idx) => (
                <Link 
                    href={`/services/${service.slug}`}
                    key={idx} 
                    className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
                >
                  <div className="h-64 md:h-72 w-full relative overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                        <div className="bg-secondary p-3 rounded-full text-white shadow-lg">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center flex-grow">
                    <p className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-3">{service.longDesc}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                          <CheckCircle size={18} className="text-secondary/80 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-primary font-bold group-hover:text-secondary transition-colors">
                        <span>Learn More</span>
                        <ArrowRight size={20} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-3">How We Work</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Process</h3>
              <p className="text-gray-600 text-lg">
                From initial consultation to final installation, we ensure a seamless and transparent experience.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative max-w-6xl mx-auto">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-0.5 bg-gray-100 -z-10 transform -translate-y-1/2"></div>
              
              {[
                { icon: <PenTool size={32} />, title: "1. Consultation", desc: "We discuss your vision, budget, and material preferences." },
                { icon: <Ruler size={32} />, title: "2. Templating", desc: "Precise laser measurements ensure a perfect fit for your space." },
                { icon: <Hammer size={32} />, title: "3. Fabrication", desc: "Our skilled artisans cut and polish your stone to perfection." },
                { icon: <Truck size={32} />, title: "4. Installation", desc: "Professional installation in as little as one day." }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center relative z-10 group">
                  <div className="w-20 h-20 bg-gray-50 border border-gray-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-serif">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Start Your Project Today</h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                Ready to elevate your home? Contact us for a free consultation and personalized estimate.
              </p>
              <Link 
                href="/contact" 
                className="bg-white hover:bg-gray-100 text-primary px-10 py-5 rounded-full font-bold transition-transform hover:-translate-y-1 shadow-2xl inline-block text-lg"
              >
                Schedule Your Free Quote
              </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesClient;
