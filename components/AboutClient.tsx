'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { 
  ArrowRight, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  Gem, 
  Compass, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Maximize2,
  Bookmark
} from 'lucide-react';

const AboutClient = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Elegant local time display for Duluth Showroom status
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

  const steps = [
    {
      title: "Geological Sourcing",
      subtitle: "The Hand-Selected Quarry Slabs",
      desc: "We don't select from low-grade regional yards. Our curators source directly from prestigious quarry blocks in Brazil, Italy, and India. Every quartz, granite, and quartzite slab is thoroughly scanned under custom light rigs for micro-fissures and vein consistency before shipping.",
      stat: "500+ Slabs Handpicked Yearly",
      icon: <Gem className="w-6 h-6 text-secondary" />,
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Mathematical Laser Templating",
      subtitle: "Accuracy Tolerant to 1/16 Inch",
      desc: "Forget manual stick templates that warp. Our team utilizes high-precision LT-2D3D laser templaters to scan your kitchen walls, uneven cabinet levels, and backsplashes. This generates a digital CAD file with micron-level tolerances.",
      stat: "Zero-Gaps Precision Guaranteed",
      icon: <Cpu className="w-6 h-6 text-secondary" />,
      image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Artisanal Waterjet Fabrication",
      subtitle: "Clean Monolithic Cut & Polishing",
      desc: "Our state-of-the-art CNC waterjet cutters pair surgical precision with high-pressure diamond scoring. Every complex curve, sink cutout, and modern mitered waterfall edge profile is executed flawlessly, followed by rigorous diamond hand-polishing.",
      stat: "100% In-House Master Craftsmen",
      icon: <Compass className="w-6 h-6 text-secondary" />,
      image: "https://www.igscountertops.com/wp-content/uploads/2018/01/Statuario-Nuvo-Kitchen-Island.jpg"
    },
    {
      title: "The Signature Seam Installation",
      subtitle: "Virtually Invisible Unifications",
      desc: "The true signature of an elite fabricator is the seam. We use proprietary heavy-duty Gorilla Grip vacuum seam-setters and exact pigment-matched epoxies to pull joints together with extreme force, ensuring water-tight, razor-thin seams.",
      stat: "Atlanta's Tightest Invisible Joints",
      icon: <Sparkles className="w-6 h-6 text-secondary" />,
      image: "https://media.designcafe.com/wp-content/uploads/2024/11/11212229/luxury-modern-kitchen-designs.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0c0c0c] text-white selection:bg-secondary selection:text-white overflow-hidden">
      <Header />
      
      <main className="flex-grow">
        {/* Cinematic Immersive Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="Sovereign Stone Fabrication Facility"
              className="w-full h-full object-cover opacity-35 scale-105"
              fill
              priority
              sizes="100vw"
            />
            {/* Dark abstract radial gradient over background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/85 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0c0c0c]/90 to-[#0c0c0c] z-10"></div>
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
              Sovereign Craftsmanship Since 2009
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 md:mb-8 leading-[1.1] md:leading-[1.05] tracking-tight text-white max-w-5xl mx-auto"
            >
              Where Raw Earth Meets <span className="text-secondary italic font-light">Mathematical Artistry.</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-2 sm:px-0"
            >
              Atlanta's premier family-founded studio bypasses retail markup. We handpick, laser-template, and robotically carve the world's most breathtaking quartz and granite blocks directly for your residence.
            </motion.p>
            
            {/* Hero CTAs */}
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
                Secure Free Estimate <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Bottom subtle scroll anchor */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest font-light">
            <span>EXPLORE LEGACY</span>
            <span className="w-1 h-8 rounded bg-gradient-to-b from-secondary to-transparent animate-pulse"></span>
          </div>
        </section>

        {/* Our Blueprint: Large Horizontal/Responsive Dynamic Process Stage */}
        <section className="py-24 md:py-32 bg-[#0c0c0c] border-y border-white/5 relative">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center md:text-left mb-16 lg:mb-24">
              <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">Uncompromised Fabrication Blueprint</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight">
                No Retail Middlemen. <br className="hidden md:block" />
                <span className="italic font-light text-secondary">Pure Factory-Direct Control.</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Interactive Steps List */}
              <div className="lg:col-span-5 space-y-4">
                {steps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                      activeStep === idx 
                        ? 'bg-white/[0.03] border-secondary/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
                        : 'bg-transparent border-transparent hover:border-white/10 hover:bg-white/[0.01]'
                    }`}
                  >
                    {/* Left amber highlight strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      activeStep === idx ? 'bg-secondary scale-y-100' : 'bg-transparent scale-y-0 group-hover:scale-y-50'
                    }`} />
                    
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        activeStep === idx ? 'bg-secondary/15 text-secondary' : 'bg-white/5 text-gray-500'
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-secondary tracking-widest block mb-1">STAGE 0{idx + 1}</span>
                        <h3 className="text-lg sm:text-xl font-medium text-white mb-2">{step.title}</h3>
                        <p className={`text-sm tracking-tight leading-relaxed transition-all duration-300 ${
                          activeStep === idx ? 'text-gray-350 line-clamp-none' : 'text-gray-500 line-clamp-1 group-hover:line-clamp-none'
                        }`}>
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Visual Showcase Screen */}
              <div className="lg:col-span-7">
                <div className="relative bg-[#111111] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl group min-h-[500px] flex flex-col justify-between">
                  {/* Active Slide Media Container */}
                  <div className="relative h-[280px] sm:h-[350px] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={steps[activeStep].image}
                          alt={steps[activeStep].title}
                          className="w-full h-full object-cover filter brightness-75 contrast-110"
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Active Slide Metadata Details */}
                  <div className="p-8 sm:p-10 relative z-20">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-2 block">{steps[activeStep].subtitle}</span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl sm:text-3xl font-serif font-light text-white mb-4">{steps[activeStep].title}</h3>
                        <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed mb-6">
                          {steps[activeStep].desc}
                        </p>
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-secondary uppercase bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full">
                          <CheckCircle2 size={13} /> {steps[activeStep].stat}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Legacy Timeline - Custom Staggered Panels */}
        <section className="py-24 md:py-32 bg-white text-gray-900 relative">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0c0c0c]/5 to-transparent pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
              <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">THE CHRONICLES OF EXCELLENCE</span>
              <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-primary mb-6">
                From a Single Saw to <span className="italic font-light text-secondary">Atlanta's Elite Benchmark</span>
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                We started with zero advertisement, relying completely on general contractors and homeowners telling their neighbors about our micro-perfect kitchen installations.
              </p>
            </div>

            {/* Timelines Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  year: "2009",
                  title: "Founder's Promise",
                  label: "First Hand Saw",
                  desc: "Fed up with high retail markups and sub-par outsourced installations, AGS Stones starts as a tiny family workshop with one bridge-saw and an absolute obsession for seamless countertop joins."
                },
                {
                  year: "2015",
                  title: "The Duluth Sanctuary",
                  label: "Dedicated Facility",
                  desc: "We scale operations into our master showroom and fabrication plant on Abbotts Bridge Rd, Duluth. Importing full marble, quartzite, and granite slabs directly, bypassing regional brokers completely."
                },
                {
                  year: "2021",
                  title: "Robotic Leap",
                  label: "CNC Waterjet cutters",
                  desc: "We statefully upgrade to 3D laser-guided scanners and computerized CNC waterjet milling machines. Our templating accuracy scales down to fractions of a human hair."
                },
                {
                  year: "2026",
                  title: "Atlanta Sovereign",
                  label: "The Local Authority",
                  desc: "With 2,000+ custom installations completed and a relentless 5-star reputation in Duluth, Buckhead, and Alpharetta, AGS Stones stands as the definitive elite stonecrafter choice."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-150 p-8 rounded-[1.8rem] flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-5xl font-serif font-light text-secondary group-hover:scale-105 transition-transform duration-500 block">{item.year}</span>
                      <Bookmark className="text-gray-300 group-hover:text-secondary transition-colors" size={20} />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#a8a8a8] block mb-2 font-mono font-bold">{item.label}</span>
                    <h3 className="text-xl font-semibold text-primary mb-4">{item.title}</h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sovereign Analytics of Trust: Stats & Guarantees */}
        <section className="py-24 bg-[#111111] border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(209,173,115,0.04),transparent)] pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              {/* Left text column */}
              <div className="lg:col-span-5 text-center lg:text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">ATLANTA'S SOVEREIGN BENCHMARK</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-6">
                  Elite Benchmarks <br />That Back Our <span className="italic font-light text-secondary">Reputation</span>
                </h2>
                <p className="text-gray-400 font-light leading-relaxed max-w-lg mb-8">
                  We maintain total vertical integration. The same hand-picked craftsman who designs and templates your kitchen is the same master artisan who meticulously installs it. No random day-laborers. No subcontracted cutting.
                </p>
                <div className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-secondary" />
                    <span>State-licensed and $2M General Liability Insured</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-secondary" />
                    <span>Comprehensive Lifetime Workmanship Warranty</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-secondary" />
                    <span>Master Gold-Certified Quartz Fabricators</span>
                  </div>
                </div>
              </div>

              {/* Right statistics grid */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 w-full">
                {[
                  { value: "15+", metric: "Years Sovereignty", detail: "Serving Duluth, Alpharetta, Buckhead & beyond." },
                  { value: "2,000+", metric: "Custom Kitchens Built", detail: "From minimalist quartz slabs to exotic quartzite." },
                  { value: "0", metric: "Brokers or Distributors", detail: "We buy directly, saving you up to 30% MSRP." },
                  { value: "5-Star", metric: "Consistently Certified", detail: "Atlanta's highest-voted artisan stone fabricator." }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative group">
                    <div className="text-4xl sm:text-5xl font-serif text-secondary mb-2 font-light">{stat.value}</div>
                    <div className="text-white font-medium text-base mb-1 tracking-tight">{stat.metric}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{stat.detail}</div>
                    <span className="absolute top-4 right-4 text-[10px] text-gray-700 font-mono">AGS // 0{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Showroom Callout - Dual-split Layout */}
        <section className="py-24 md:py-32 bg-white text-gray-900 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="bg-[#0c0c0c] rounded-[2.5rem] text-white overflow-hidden border border-white/10 relative shadow-2xl">
              <div className="absolute top-0 right-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="grid lg:grid-cols-12 items-stretch">
                {/* Visual Side */}
                <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-auto">
                  <Image 
                    src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop"
                    alt="Premium Granite and Cabinet Showroom Duluth"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter contrast-105 brightness-95"
                  />
                  {/* Gentle shadow overlay over image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0c0c0c]/80 to-[#0c0c0c] hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent lg:hidden" />
                </div>

                {/* Consumer Psychology Persuasive Content Side */}
                <div className="lg:col-span-6 p-8 sm:p-14 md:p-20 flex flex-col justify-center relative z-10">
                  <span className="text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Visit the Design Sanctuary</span>
                  <h3 className="text-3xl sm:text-5xl font-serif font-light mb-6 leading-tight">
                    Every Slab Tells a <br />
                    <span className="italic font-light text-secondary">Geological Story.</span>
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                    Your kitchen is the energetic heart of your home. It's where your family gathers and memories are forged. Do not choose the focal point of your entire home from a tiny 2-inch plastic brochure sample. Come run your hand over raw, polished slabs of Brazilian Quartzite and premium Calacatta Quartz in person at our Duluth design center.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8 text-xs border-y border-white/10 py-6">
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest block mb-1 font-mono">Showroom Location</span>
                      <p className="text-white font-medium">4579 Abbotts Bridge Rd Suite -10</p>
                      <p className="text-gray-400">Duluth, GA 30097</p>
                    </div>
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest block mb-1 font-mono">Current Wait Time</span>
                      <p className="text-emerald-400 flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        No Wait ({currentTime || "Open Direct"})
                      </p>
                      <p className="text-gray-400">Walk-Ins Welcome • Mon - Sat</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link 
                      href="/contact" 
                      className="bg-secondary hover:bg-secondary/95 text-white text-center w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-all text-xs uppercase tracking-widest shadow-md hover:-translate-y-0.5"
                    >
                      Plan Your Visit
                    </Link>
                    <a 
                      href="https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest text-[#dcdcdc] hover:text-white border-b border-white/20 hover:border-white transition-all pb-1 flex items-center justify-center gap-2"
                    >
                      Navigate to Duluth Showroom <MapPin size={14} />
                    </a>
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

export default AboutClient;
