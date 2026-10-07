'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import TrustBadges from './TrustBadges';
import ReviewsMarquee from './ReviewsMarquee';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Gem, 
  Compass, 
  Clock, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { services } from '@/lib/servicesData';

const ServicesClient = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Elegant local time for Dululth fabrication queue status
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-secondary selection:text-white overflow-hidden">
      <Header />
      
      <main className="flex-grow">
        {/* Cinematic Immersive Hero Section */}
        <section className="relative min-h-0 lg:min-h-[70vh] flex flex-col justify-start lg:justify-center items-center overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-36 lg:pb-28">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="Sovereign Stone Fabrication Facility"
              className="w-full h-full object-cover opacity-35 scale-105 filter brightness-50 contrast-120"
              fill
              priority
              sizes="100vw"
            />
            {/* Dark abstract radial gradient over background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 z-10"></div>
                      </div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-20 text-center">
            {/* Top glass badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#dcdcdc] text-xs font-semibold uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
              Family-Owned Direct Fabrication
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 md:mb-8 leading-[1.1] md:leading-[1.05] tracking-tight text-white max-w-5xl mx-auto"
            >
              Architectural Slabs & <span className="text-secondary italic font-light">Precision Cabinetry.</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-2 sm:px-0"
            >
              We bypass third-party showrooms and regional broker commissions. From raw Brazilian Quartzite curation to exact 3D laser-guided installation, we engineer perfect spaces.
            </motion.p>
            
            {/* Hero CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <Link 
                href="/#contact" 
                className="bg-secondary hover:bg-secondary/95 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(209,173,115,0.25)] flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider w-full sm:w-auto"
              >
                Secure Free Estimate & 3D Design <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Bottom subtle scroll anchor */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden flex-col items-center gap-2 text-white/50 text-xs tracking-widest font-light">
            <span>OUR SOLUTIONS</span>
            <span className="w-1 h-8 rounded bg-gradient-to-b from-secondary to-transparent animate-pulse"></span>
          </div>
        </section>

        <TrustBadges overlap />

        {/* Premium Immersive Services Directory */}
        <section className="py-16 md:py-20 bg-white relative">
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">HIGH-FIDELITY SERVICES</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-primary tracking-tight">
                Crafted for Breathtaking <br className="hidden md:block" />
                <span className="italic font-light text-secondary">Spatial Transformations</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-light mt-4 leading-relaxed max-w-xl mx-auto">
                No outsourcing. No quick-dry shortcuts. Every single service is handled exclusively by AGS Stones' hand-picked specialists under rigid quality tolerances.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 xl:[&>*:last-child:nth-child(3n+1)]:col-start-2">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-secondary/40 transition-all duration-500 shadow-sm hover:shadow-lg flex flex-col h-full"
                >
                  {/* Image Container with Custom Glow Layer */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-all duration-700 ease-out filter brightness-90 contrast-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                    
                    {/* Floating Level Marker */}
                    <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-widest text-secondary font-bold">
                      AGS // 0{idx + 1}
                    </div>

                    {/* Floating Service Icon */}
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-3">
                      <div className="bg-secondary/90 backdrop-blur-md p-2.5 rounded-xl text-white shadow-xl border border-secondary/25">
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Service Metadata / Copy */}
                  <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-light text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-light leading-relaxed mb-4 block">
                        {service.longDesc}
                      </p>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-2 border-t border-gray-100 pt-4 mb-5">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-light leading-snug">
                            <CheckCircle2 size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive CTA Anchor */}
                    <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-primary group-hover:text-secondary font-bold transition-all duration-300 pb-0.5 border-b border-transparent group-hover:border-secondary"
                      >
                        Explore Fabrication Specifications <ChevronRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Execution Pipeline - Custom Interactive Stage Cards */}
        <section className="py-16 md:py-20 bg-gray-50 text-gray-900 relative">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">OUR MONOLITHIC FLOW</span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-primary">
                Flawless Execution. <br />
                <span className="italic font-light text-secondary">From Slab to Silicon Joint.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-light mt-4 leading-relaxed max-w-xl mx-auto">
                We've spent 20 years eliminating gaps, uneven miters, and structural cracking. Here is the proprietary system that separates AGS Stones from typical installers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  step: "01", 
                  title: "Slab Custom Scanning", 
                  desc: "We measure thickness consistency, micro-fracture probability, and vein alignment on full-scale raw slabs." 
                },
                { 
                  step: "02", 
                  title: "LT-2D3D Laser Templating", 
                  desc: "Laser trackers register cabinet level irregularities to generate precise digital CAD blueprints." 
                },
                { 
                  step: "03", 
                  title: "Computerized Waterjet", 
                  desc: "Mitered waterfall edges, cookout notches, and sink under-mount openings cut on dynamic CNC waterjets." 
                },
                { 
                  step: "04", 
                  title: "Invisible Seaming Setters", 
                  desc: "High-vacuum Gorilla Grips pull slab seams together with intense mechanical lock and matched pigment epoxy." 
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                  <div>
                    <span className="text-3xl font-serif font-light text-secondary mb-4 block">{item.step}</span>
                    <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                    <p className="text-gray-650 text-xs sm:text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono mt-5 block">STAGE PROGRESSION</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Persuasive Showroom Direct Consumer Psychology Block */}
        <section className="py-16 md:py-20 bg-white border-gray-100 border-y relative overflow-hidden">
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Text */}
              <div className="lg:col-span-5 text-center lg:text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">WHY ATLANTA CHOOSES AGS</span>
                <h2 className="text-3xl md:text-5xl font-serif text-primary tracking-tight mb-6">
                  Direct Factory Curation. <br />
                  <span className="italic font-light text-secondary">Zero Retail Markups.</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  Most design centers simply broker regional stonework yards and charge you an extra 25% to 35% commission. AGS Stones imports, crafts, and configures directly. Your estimate is the pure, raw fabrication value.
                </p>
                <div className="space-y-4 max-w-md mx-auto lg:mx-0 text-left">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span>Gold-Certified Cambria & Silestone Fabricators</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span>$2 Million General Liability Insured</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span>Comprehensive Lifetime Installation Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right Dual Showroom Visual Blocks */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 w-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-colors relative">
                  <div className="text-4xl font-serif text-secondary mb-2 font-light">20+</div>
                  <div className="text-primary font-medium text-base mb-1">Years of Local Quality</div>
                  <div className="text-gray-500 text-xs leading-relaxed">Serving duluth, alpharetta, buckhead, and greater metro atlanta.</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-colors relative">
                  <div className="text-4xl font-serif text-secondary mb-2 font-light">0%</div>
                  <div className="text-primary font-medium text-base mb-1">Middlemen Commission</div>
                  <div className="text-gray-500 text-xs leading-relaxed">Everything is sourced and processed under one facility roof.</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-colors relative">
                  <div className="text-4xl font-serif text-secondary mb-2 font-light">2,000+</div>
                  <div className="text-primary font-medium text-base mb-1">Slabs Hand-Selected</div>
                  <div className="text-gray-500 text-xs leading-relaxed">Direct imports of unique Brazilian Quartzite and Italian Marble.</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-colors relative">
                  <div className="text-4xl font-serif text-secondary mb-2 font-light">5-Star</div>
                  <div className="text-primary font-medium text-base mb-1">Reputation of Trust</div>
                  <div className="text-gray-500 text-xs leading-relaxed">Highly rated over consecutive years of spotless work.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsMarquee className="bg-white" />

        {/* Luxury CTA section */}
        <section className="py-16 md:py-20 bg-white text-gray-900 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-primary rounded-3xl text-white overflow-hidden border border-primary relative shadow-2xl">
                            
              <div className="grid lg:grid-cols-12 items-stretch">
                {/* Visual Side */}
                <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-auto">
                  <Image 
                    src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop"
                    alt="Premium Granite and Cabinet Showroom Duluth"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter contrast-105 brightness-95"
                  />
                  {/* Gentle shadow overlay over image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/80 to-primary hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent lg:hidden" />
                </div>

                {/* Consumer Psychology Persuasive Content Side */}
                <div className="lg:col-span-6 p-7 sm:p-10 md:p-12 flex flex-col justify-center relative z-10">
                  <span className="text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block font-mono">Transform Your Environment</span>
                  <h3 className="text-3xl sm:text-4xl font-serif font-light mb-5 leading-tight">
                    Every Slab Tells a <br />
                    <span className="italic font-light text-secondary">Geological Story.</span>
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                    Do not choose the focal point of your entire home from a tiny plastic brochure sample. Come run your hand over raw, polished slabs of Brazilian Quartzite and Calacatta Quartz in person at our Duluth design center. Let's draft your dream kitchen blueprint today.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8 text-xs border-y border-white/10 py-6">
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest block mb-1 font-mono">Showroom Location</span>
                      <p className="text-white font-medium">4579 Abbotts Bridge Rd Suite -10</p>
                      <p className="text-gray-400 font-light">Duluth, GA 30097</p>
                    </div>
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest block mb-1 font-mono">Live Showroom Wait</span>
                      <p className="text-emerald-400 flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        No Wait ({currentTime || "Open Custom"})
                      </p>
                      <p className="text-gray-400 font-light">Walk-Ins Welcome • Mon - Sat</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link 
                      href="/contact" 
                      className="bg-secondary hover:bg-secondary/95 text-white text-center w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-all text-xs uppercase tracking-widest shadow-md hover:-translate-y-0.5"
                    >
                      Plan Your Estimate
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesClient;
