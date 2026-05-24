'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { CheckCircle, Hammer, Ruler, Truck, PenTool, ArrowRight } from 'lucide-react';
import { services } from '@/lib/servicesData';

const ServicesClient = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-4 pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="AGS Services"
              className="w-full h-full object-cover object-center"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[#090909]/80 z-10"></div>
          
          <div className="container mx-auto max-w-7xl relative z-20 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-secondary/80 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 transition-transform hover:scale-105">
                  Premium Solutions
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-[1.1] tracking-tight">Our <span className="italic font-light text-secondary">Services.</span></h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                Comprehensive stone and cabinetry solutions for your dream home, fabricated with precision and installed with care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List - Light Premium */}
        <section className="py-24 relative bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 gap-12 lg:gap-16">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                      href={`/services/${service.slug}`}
                      className={`group flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 border border-gray-100`}
                  >
                    <div className="h-64 sm:h-80 lg:h-auto lg:w-1/2 relative overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                      <div className="absolute bottom-6 left-6 flex items-center gap-4">
                          <div className="bg-white/90 backdrop-blur-md p-3 rounded-full text-secondary shadow-lg">
                              {service.icon}
                          </div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center relative bg-white">
                      <h3 className="text-3xl lg:text-4xl font-serif font-medium text-primary mb-4">{service.title}</h3>
                      <p className="text-gray-500 mb-8 text-lg font-light leading-relaxed">{service.longDesc}</p>
                      
                      <ul className="space-y-4 mb-10">
                        {service.features.slice(0, 3).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-4 text-gray-600 font-light">
                            <CheckCircle size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between text-primary font-bold group-hover:text-secondary transition-colors uppercase tracking-widest text-sm">
                          <span>Explore Details</span>
                          <ArrowRight size={20} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Light Architecture */}
        <section className="py-24 relative bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-4 relative z-10 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 inline-flex items-center gap-2">
                <span className="w-8 h-px bg-secondary"></span> The Pipeline <span className="w-8 h-px bg-secondary"></span>
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary mb-6 leading-[1.1]">
                Flawless <span className="italic font-light text-secondary">Execution.</span>
              </h3>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                From slab selection to the final silicone bead, our proprietary workflow guarantees zero errors, exact color-matching, and completely invisible seams.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-[3.5rem] left-0 w-full h-px bg-gray-200 -z-10"></div>
              
              {[
                { icon: <PenTool size={24} />, title: "Precision Design", desc: "Detailed CAD mockups and curation." },
                { icon: <Ruler size={24} />, title: "Digital Templating", desc: "Laser-guided millimeter-exact fit." },
                { icon: <Hammer size={24} />, title: "Fabrication", desc: "CNC-machined for perfect edges." },
                { icon: <Truck size={24} />, title: "Installation", desc: "Rapid, immaculate placement." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center relative z-10 group hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-colors duration-500">
                    {step.icon}
                  </div>
                  <div className="text-secondary font-serif italic text-sm mb-2">Phase 0{idx + 1}</div>
                  <h4 className="text-xl font-bold text-primary mb-3 font-serif">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Elite CTA */}
        <section className="py-24 relative bg-primary text-center overflow-hidden text-white">
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 relative z-10 max-w-4xl"
            >
              <h2 className="text-4xl md:text-6xl font-serif font-medium mb-8 leading-tight">
                Ready to <span className="italic text-secondary">Elevate</span> Your Space?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Connect with our senior designers today for a complimentary blueprint review and access our factory-direct pricing.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(193,161,104,0.4)]"
              >
                Request a Quote <ArrowRight size={18} />
              </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesClient;
