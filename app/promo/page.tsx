'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Phone,
  CheckCircle2,
  Star,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  PenTool,
  X,
  Layers,
  Box,
  ChefHat,
  Bath,
  Flame,
  Calendar,
  MapPin,
  Check,
  Lock,
  User
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import BeforeAfter from '../../components/BeforeAfter';
import PromoRealWork from '../../components/PromoRealWork';
import { GoogleGLogo, YelpLogo, ThumbtackLogo, NextdoorLogo } from '../../components/BrandLogos';

const recentProjects = [
  {
    src: '/images/projects/kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg',
    title: 'Waterfall Quartz Island',
    location: 'Atlanta, GA'
  },
  {
    src: '/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg',
    title: 'White Shaker Kitchen',
    location: 'Atlanta, GA'
  },
  {
    src: '/images/projects/bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg',
    title: 'Navy Double Vanity',
    location: 'Atlanta, GA'
  },
  {
    src: '/images/projects/bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg',
    title: 'Calacatta Marble Shower',
    location: 'Atlanta, GA'
  },
  {
    src: '/images/projects/kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg',
    title: 'Vaulted Ceiling Remodel',
    location: 'Atlanta, GA'
  }
];

export default function PromoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    project: 'Countertops',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== 'undefined') {
      setShowStickyBar(latest > 520);
    }
  });

  useEffect(() => {
    // Safely fire PageView and ViewContent explicitly for this promo route on mount
    try {
      if (typeof window !== 'undefined') {
        const fireMetaEvents = () => {
          if ((window as any).fbq) {
            (window as any).fbq('track', 'PageView');
            (window as any).fbq('track', 'ViewContent', {
              content_name: 'Promo Turnkey Estimator',
              content_category: 'Countertops & Cabinets Installation'
            });
          }
        };

        if ((window as any).fbq) {
          fireMetaEvents();
        } else {
          const timer = setTimeout(fireMetaEvents, 1000);
          return () => clearTimeout(timer);
        }
      }
    } catch (e) {
      console.warn("Meta pixel error:", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setValidationError('Please enter a valid phone number for quote delivery.');
      return;
    }
    if (!formData.city.trim()) {
      setValidationError('Please enter your Zip code.');
      return;
    }

    setIsSubmitting(true);

    const submitEventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;

    const fullMessage = [
      `Project: ${formData.project}`,
      `Zip Code: ${formData.city}`,
      formData.message ? `Notes: ${formData.message}` : ''
    ].filter(Boolean).join(' | ');

    const submitData = {
      access_key: "8120d187-d8e4-4348-83a8-b0248042becb",
      _subject: `New Lead: ${formData.project} - Free Estimate Request`,
      _template: 'table',
      'Event ID': submitEventId,
      Name: formData.name,
      Email: formData.email || 'N/A',
      Phone: formData.phone,
      ZipCode: formData.city,
      Project: formData.project,
      Notes: formData.message || 'None',
      Message: fullMessage
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (res.ok) {
        if (typeof window !== 'undefined') {
          if ((window as any).fbq) {
            const names = formData.name.trim().split(' ');
            const firstName = names[0] || '';
            const lastName = names.slice(1).join(' ') || '';

            (window as any).fbq('init', '1660874861583892', {
              em: (formData.email || '').trim().toLowerCase(),
              ph: formData.phone.replace(/\D/g, ''),
              fn: firstName.toLowerCase(),
              ln: lastName.toLowerCase(),
              zp: formData.city.trim(),
              country: 'us'
            });
            (window as any).fbq('track', 'Lead', {
              content_name: formData.project,
              content_category: 'Turnkey Installation',
              value: 0,
              currency: 'USD'
            }, { eventID: submitEventId });
          }
          if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
        }

        try {
          fetch("https://webhook.infra-remakingautomacoes.cloud/webhook/meta-capi-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          }).catch(() => {});
        } catch(e) {}

        setIsSuccess(true);
      } else {
        setValidationError('We could not send your request. Please call us directly at (404) 952-4534.');
      }
    } catch (error) {
      console.error(error);
      setValidationError('Network error. Please try again or call us at (404) 952-4534.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    let formatted = val;
    if (val.length > 6) {
      formatted = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
    } else if (val.length > 3) {
      formatted = `(${val.slice(0, 3)}) ${val.slice(3)}`;
    } else if (val.length > 0) {
      formatted = `(${val}`;
    }
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleReset = () => {
    setIsSuccess(false);
    setValidationError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      project: 'Countertops',
      message: ''
    });
  };

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formSection = document.getElementById('estimate-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header lightNav />

      <main className="flex-grow">
        {/* 1. Hero Section - Refined 21st.dev / Awwwards Editorial Luxury */}
        <section className="relative px-4 sm:px-6 pt-32 sm:pt-36 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-[#FAF8F5] border-b border-stone-200/80 overflow-hidden">
          {/* Ambient luxury light aura */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,180,115,0.16),transparent_70%)] pointer-events-none" />

          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Desktop: 2-column layout. Mobile: clean mobile-first stack */}
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-center">

              {/* LEFT SIDE (Desktop: Col 1-5, Mobile: Steps 1, 2, 3) */}
              <div className="lg:col-span-5 xl:col-span-5 text-left">
                {/* 1. Headline - Kitchen & Bath */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-serif font-normal text-stone-900 leading-[1.1] tracking-tight mb-3 sm:mb-4 pt-1">
                  YOUR KITCHEN &amp; BATH.<br />
                  <span className="font-light italic text-[#9E7D47]">DONE RIGHT.</span>
                </h1>

                {/* 2. Subheading & Supporting copy */}
                <p className="text-lg sm:text-xl font-medium text-stone-900 mb-3 tracking-tight">
                  Beautiful spaces. Built around the way you live.
                </p>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-6 lg:mb-7 max-w-lg">
                  From custom countertops and cabinetry to complete kitchen &amp; bath remodeling, our local team handles your project from design to fabrication and installation.
                </p>

                {/* Unified Luxury Social Proof & Platform Trust Card */}
                <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm w-full max-w-sm sm:max-w-md">
                  <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                    {/* Official Google G Logo Icon */}
                    <GoogleGLogo />
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-900">
                        <span className="text-amber-500 tracking-wider">★★★★★</span>
                        <span>5.0 Google Rating</span>
                      </div>
                      <span className="text-[11px] sm:text-xs text-stone-500 font-normal">120+ Metro Atlanta Homeowners Served</span>
                    </div>
                  </div>

                  {/* Razor-Sharp Brand Trust Logos: Yelp, Thumbtack, Nextdoor (Fully Responsive) */}
                  <div className="flex items-center justify-between gap-1.5 sm:gap-3 pt-3 px-0.5">
                    <YelpLogo />
                    <ThumbtackLogo />
                    <NextdoorLogo />
                  </div>
                </div>

                {/* 4. Compact Horizontal Work Strip ("Recent Projects" - Tamanhozinho que estava com as melhores fotos) */}
                <div className="lg:hidden my-5">
                  <div className="flex items-center justify-between mb-2.5 px-0.5">
                    <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Recent Projects</span>
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">Swipe to explore →</span>
                  </div>

                  <div className="-mx-4 px-4 flex gap-2.5 overflow-x-auto snap-x snap-mandatory py-1 scrollbar-none">
                    {recentProjects.map((project, idx) => (
                      <div
                        key={idx}
                        className="w-[190px] h-[120px] shrink-0 rounded-2xl overflow-hidden relative snap-start shadow-xs border border-stone-200/90 group"
                      >
                        <Image
                          src={project.src}
                          alt={project.title}
                          fill
                          sizes="190px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2.5 right-2 text-left">
                          <span className="text-[9px] uppercase tracking-wider text-[#D9B473] font-semibold block leading-tight">
                            {project.location}
                          </span>
                          <p className="text-[11px] font-medium text-white truncate leading-snug">
                            {project.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT SIDE (Desktop: Col 6-12, ~50–55% visual area with real kitchen photo + floating form card) */}
              <div className="lg:col-span-7 xl:col-span-7 w-full">
                <div className="relative lg:rounded-3xl lg:overflow-hidden lg:shadow-[0_25px_70px_-15px_rgba(28,24,20,0.12)] lg:border lg:border-stone-200/80 lg:min-h-[660px] flex items-center lg:justify-end lg:p-8 xl:p-10">
                  
                  {/* Desktop Background Kitchen Photograph */}
                  <div className="hidden lg:block absolute inset-0 z-0">
                    <Image
                      src="/images/projects/kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg"
                      alt="Kitchen & Bath Remodel in Atlanta, GA"
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover object-center pointer-events-none"
                      priority
                    />
                    {/* Gentle warm vignette overlay for clean legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/10 via-transparent to-stone-900/25 pointer-events-none" />

                    {/* Floating Awwwards Location Chip */}
                    <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-stone-200/90 px-4 py-2 rounded-2xl shadow-lg pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-stone-900 leading-tight">Atlanta, GA</p>
                        <p className="text-[10px] text-stone-500 font-medium">Kitchen & Bath Remodel</p>
                      </div>
                    </div>
                  </div>

                  {/* Prominent High-Converting Estimate Form Card (High Contrast, Bold Crown & Deep Glow) */}
                  <div
                    id="estimate-form"
                    className="relative z-10 w-full lg:max-w-[440px] bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-12px_rgba(28,24,20,0.22),0_0_0_1px_rgba(217,180,115,0.45)] border-t-4 border-t-[#C1A168] border-x border-b border-stone-200/90 text-stone-900"
                  >
                    {isSuccess ? (
                      /* Clean, Low-Friction Confirmation State */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="text-center py-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#FAF7F0] text-[#8F703E] border border-[#EAE4D6] flex items-center justify-center mx-auto mb-3">
                          <Check size={22} className="stroke-[2.5]" />
                        </div>

                        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1D20] mb-2 leading-snug">
                          Thank You, {formData.name}
                        </h3>

                        <p className="text-sm text-[#555A60] font-light leading-relaxed mb-6">
                          We received your request for <strong className="font-medium text-[#1A1D20]">{formData.project}</strong>. Our local Atlanta team will prepare your estimate and be in touch shortly.
                        </p>

                        <a
                          href="tel:4049524534"
                          className="w-full inline-block bg-[#1A1D20] hover:bg-[#8F703E] text-white font-medium py-3.5 px-6 rounded-xl transition-colors text-xs sm:text-sm uppercase tracking-wider text-center"
                        >
                          Call Us Directly: (404) 952-4534
                        </a>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-xs text-[#7B828A] hover:text-[#1A1D20] font-medium mt-4 block mx-auto cursor-pointer"
                        >
                          ← Submit another request
                        </button>
                      </motion.div>
                    ) : (
                      /* The High-Converting Low-Friction Form */
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Heading & Subheading */}
                        <div>
                          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 leading-snug tracking-tight uppercase">
                            LET’S TALK ABOUT YOUR PROJECT
                          </h2>
                          <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 leading-relaxed">
                            Tell us a little about your remodel. We’ll take it from there.
                          </p>
                        </div>

                        {/* Error Notice */}
                        {validationError && (
                          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2 rounded-xl">
                            {validationError}
                          </div>
                        )}

                        {/* 1. Full Name */}
                        <div>
                          <label htmlFor="hero-name" className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1">
                            FULL NAME *
                          </label>
                          <input
                            id="hero-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#9E7D47] focus:ring-2 focus:ring-[#9E7D47]/20 transition-all outline-none font-medium"
                            required
                          />
                        </div>

                        {/* 2. Phone Number */}
                        <div>
                          <label htmlFor="hero-phone" className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1">
                            PHONE NUMBER *
                          </label>
                          <input
                            id="hero-phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="(404) 555-1234"
                            className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#9E7D47] focus:ring-2 focus:ring-[#9E7D47]/20 transition-all outline-none font-medium"
                            required
                          />
                        </div>

                        {/* 3. ZIP Code & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="hero-zip" className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1">
                              ZIP CODE *
                            </label>
                            <input
                              id="hero-zip"
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="30097"
                              className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#9E7D47] focus:ring-2 focus:ring-[#9E7D47]/20 transition-all outline-none font-medium"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="hero-email" className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1">
                              EMAIL
                            </label>
                            <input
                              id="hero-email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john.smith@gmail.com"
                              className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#9E7D47] focus:ring-2 focus:ring-[#9E7D47]/20 transition-all outline-none font-medium"
                            />
                          </div>
                        </div>

                        {/* 4. What are you remodeling? (Comprehensive Project Options) */}
                        <div>
                          <label htmlFor="hero-project" className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                            WHAT ARE YOU REMODELING? *
                          </label>
                          <div className="relative">
                            <select
                              id="hero-project"
                              name="project"
                              value={formData.project}
                              onChange={handleChange}
                              className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-[#9E7D47] focus:ring-2 focus:ring-[#9E7D47]/20 transition-all outline-none appearance-none cursor-pointer pr-10 font-medium"
                              required
                            >
                              <option value="Full Kitchen Remodel">Full Kitchen Remodel (Cabinets + Countertops)</option>
                              <option value="Countertops Only">Kitchen Countertops Only (Quartz / Granite / Marble)</option>
                              <option value="Custom Cabinets">Custom Kitchen Cabinets</option>
                              <option value="Master Bathroom">Master Bathroom Remodel</option>
                              <option value="Bathroom Vanity">Bathroom Vanity & Countertops</option>
                              <option value="Full Kitchen & Bath">Full Kitchen & Bath Package</option>
                              <option value="Other Project">Other Custom Stone / Remodel Project</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 1.75L6 6.25L10.5 1.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Primary CTA Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#1C1917] via-[#2A231C] to-[#1C1917] hover:from-[#9E7D47] hover:to-[#B89255] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_10px_25px_rgba(28,24,20,0.25)] hover:shadow-[0_12px_30px_rgba(158,125,71,0.35)] text-xs sm:text-sm uppercase tracking-wider disabled:opacity-70 cursor-pointer text-center flex items-center justify-center gap-2 group border border-[#D9B473]/30"
                          >
                            {isSubmitting ? (
                              'Sending Request...'
                            ) : (
                              <>
                                <span>GET MY FREE ESTIMATE</span>
                                <ArrowRight size={16} className="text-[#D9B473] group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Reassuring Text Under CTA */}
                        <div className="flex items-center justify-center gap-2 text-center text-xs text-stone-500 pt-1 font-light">
                          <Lock size={12} className="text-[#9E7D47] shrink-0" />
                          <span>No obligation • Your information is kept private</span>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Dynamic Editorial Bento Advantages Grid (Unique & Non-Generic) */}
        <section className="bg-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/90 relative z-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-2xs text-[11px] font-semibold text-stone-800 uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D47]"></span>
                <span>The AGS Direct Fabrication Advantage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.15] mb-4">
                Crafted In-House.<br />
                <span className="font-light italic text-[#9E7D47]">Delivered Flawlessly.</span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                Why Metro Atlanta homeowners choose our local stone fabrication studio over middleman retailers and brokers.
              </p>
            </div>

            {/* Asymmetric Dynamic Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
              
              {/* Card 1: Featured 20-30% Savings (Spans 7 cols on Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-7 bg-[#1C1917] text-white p-7 sm:p-9 rounded-3xl border border-stone-800 shadow-[0_20px_50px_rgba(28,24,20,0.18)] flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Ambient gold glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,115,0.18),transparent_70%)] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#D9B473] tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Duluth In-House Facility</span>
                    </span>
                    <span className="text-xs font-mono font-medium text-stone-500">01 / DIRECT</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white mb-3 leading-snug">
                    Save 20–30% Factory Direct.
                  </h3>
                  <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
                    By eliminating third-party showrooms, broker commissions, and subcontracted installers, you get premium quartz, granite, and cabinetry fabricated and installed directly by our team.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                    <Check size={14} className="text-[#D9B473] shrink-0 stroke-[2.5]" />
                    <span>Zero Middlemen</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                    <Check size={14} className="text-[#D9B473] shrink-0 stroke-[2.5]" />
                    <span>CNC Waterjet Cut</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                    <Check size={14} className="text-[#D9B473] shrink-0 stroke-[2.5]" />
                    <span>Direct Slab Yard</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: 5-Day Turnaround (Spans 5 cols on Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#9E7D47]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D6] flex items-center justify-center text-[#9E7D47] group-hover:scale-110 transition-transform duration-300">
                      <Clock size={22} className="stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-400">02 / SPEED</span>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-[11px] mb-2.5">
                    ⚡ Fast 5-Day Turnaround
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mb-2 leading-snug">
                    From Laser Measure to Finished Stone
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-4">
                    While typical contractors take 3 to 6 weeks, our dedicated digital machinery allows us to template, fabricate, and install your project in days.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-medium text-stone-500 pt-3 border-t border-stone-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Average 5 Business Days in Metro Atlanta</span>
                </div>
              </motion.div>

              {/* Card 3: Free 3D Measure (Spans 4 cols on Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="md:col-span-4 bg-white p-7 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#9E7D47]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D6] flex items-center justify-center text-[#9E7D47] group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 size={22} className="stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-400">03 / PRECISION</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-2 leading-snug">
                    Free In-Home 3D Laser Measure
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                    Precise digital CAD laser templating right in your home. Millimeter-level accuracy ensures seamless seams and flawless waterfall edges.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#9E7D47] pt-4 block">100% Free · No Obligation</span>
              </motion.div>

              {/* Card 4: 100% Turnkey Guarantee (Spans 4 cols on Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-4 bg-white p-7 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#9E7D47]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D6] flex items-center justify-center text-[#9E7D47] group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck size={22} className="stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-400">04 / GUARANTEE</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-2 leading-snug">
                    100% Turnkey Accountability
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                    One single accountable team handling cabinets, countertops, sinks, plumbing, and demolition from start to finish.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#9E7D47] pt-4 block">Full Craftsmanship Warranty</span>
              </motion.div>

              {/* Card 5: 5.0 Google Rating & Local Atlanta Trust (Spans 4 cols on Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="md:col-span-4 bg-gradient-to-br from-white to-[#FAF7F0] p-7 sm:p-8 rounded-3xl border border-[#EAE4D6] shadow-sm hover:shadow-md hover:border-[#9E7D47]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                      ★★★★★
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-400">05 / REVIEWS</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-2 leading-snug">
                    5.0 Star Google Rating
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                    Over 120+ verified 5-star reviews from homeowners across Atlanta, Alpharetta, Johns Creek, Duluth, and Roswell.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-semibold text-stone-800">120+ Metro Atlanta Homeowners Served</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 5. Stunning Kitchens Gallery */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary mb-6 tracking-tight">
                Recent <span className="italic font-light text-secondary">Masterpieces</span>
              </h2>
              <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto">
                Get inspired by some of our recent premium kitchen and bathroom transformations across Metro Atlanta.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-6">
              {/* Item 1 - Wide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedImage("/images/projects/kitchen-island-white-quartz-waterfall-edge-atlanta.jpg")}
                className="col-span-2 md:col-span-8 group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer border border-stone-200/60"
              >
                <Image
                  src="/images/projects/kitchen-island-white-quartz-waterfall-edge-atlanta.jpg"
                  alt="Seamless Island Waterfall"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-5 left-5 text-white z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D9B473] mb-1 block">Custom Kitchen Island</span>
                  <h4 className="text-xl md:text-2xl font-serif">Seamless Calacatta Quartz Waterfall</h4>
                </div>
              </motion.div>

              {/* Item 2 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setSelectedImage("/images/projects/bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer border border-stone-200/60"
              >
                <Image
                  src="/images/projects/bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg"
                  alt="Master Bathroom Vanity"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 text-white z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D9B473] mb-1 block">Master Bathroom</span>
                  <h4 className="text-base md:text-xl font-serif leading-tight">Navy Shaker Double Vanity</h4>
                </div>
              </motion.div>

              {/* Item 3 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                onClick={() => setSelectedImage("/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer border border-stone-200/60"
              >
                <Image
                  src="/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg"
                  alt="White Shaker Cabinets & Island"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 text-white z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D9B473] mb-1 block">Full Remodel</span>
                  <h4 className="text-base md:text-xl font-serif leading-tight">Classic White Kitchen & Island</h4>
                </div>
              </motion.div>

              {/* Item 4 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => setSelectedImage("/images/projects/bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer border border-stone-200/60"
              >
                <Image
                  src="/images/projects/bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg"
                  alt="Calacatta Marble Shower Niche"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 text-white z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D9B473] mb-1 block">Bathroom Detail</span>
                  <h4 className="text-base md:text-xl font-serif leading-tight">Lighted Marble Shower Niche</h4>
                </div>
              </motion.div>

              {/* Item 5 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                onClick={() => setSelectedImage("/images/projects/cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-square md:aspect-auto md:h-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer border border-stone-200/60"
              >
                <Image
                  src="/images/projects/cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg"
                  alt="Custom Wet Bar & Wine Nook"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 text-white z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D9B473] mb-1 block">Custom Millwork</span>
                  <h4 className="text-base md:text-xl font-serif leading-tight">Custom Wet Bar & Wine Storage</h4>
                </div>
              </motion.div>

              {/* Item 6 - Wide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => setSelectedImage("/images/projects/kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg")}
                className="col-span-2 md:col-span-12 group relative overflow-hidden rounded-2xl aspect-[16/9] md:h-[480px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer mt-0 sm:mt-3 md:mt-0 border border-stone-200/60"
              >
                <Image
                  src="/images/projects/kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg"
                  alt="Vaulted Ceiling Kitchen Transformation"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D9B473] mb-2 block">Full Transformation</span>
                  <h4 className="text-2xl md:text-4xl font-serif leading-tight">Vaulted Ceiling Quartz Island Remodel</h4>
                  <p className="text-sm md:text-base text-stone-300 mt-2 max-w-lg hidden sm:block">
                    In-house digital laser templating, custom fabrication, and turnkey installation by our Atlanta team.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-14 text-center">
              <a
                href="#estimate-form"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:text-[#9E7D47] transition-colors uppercase tracking-widest text-xs sm:text-sm border-b-2 border-stone-900 hover:border-[#9E7D47] pb-1"
              >
                <span>Request your free custom project estimate</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* 5b. Real Work Gallery */}
        <PromoRealWork />

        {/* 2. Visual Results (Before/After) */}
        <BeforeAfter />

        {/* 3. Social Proof (Testimonials) */}
        <Testimonials />

        {/* Final CTA Bar - Warm, Luminous Editorial Luxury (No Black Background) */}
        <section className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#EAE3D5] text-center px-4 relative overflow-hidden border-t border-stone-200/80">
          {/* Subtle warm light ambient aura */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(217,180,115,0.18),transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            {/* Subtle luxury badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-xs backdrop-blur-md text-xs font-semibold text-stone-800 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#9E7D47]"></span>
              <span>Metro Atlanta Kitchen & Bathroom Remodeling</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-stone-900 mb-5 leading-[1.15] tracking-tight">
              Transform Your Kitchen & Bath.<br />
              <span className="font-light italic text-[#9E7D47]">Built Around Your Home.</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-stone-600 mb-8 sm:mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Join over 120+ homeowners in Metro Atlanta who upgraded their spaces with local stone fabrication, custom cabinetry, and factory-direct savings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto mb-6">
              <a
                href="#estimate-form"
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1C1917] hover:bg-[#9E7D47] text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl text-xs sm:text-sm uppercase tracking-wider group cursor-pointer"
              >
                <span>GET MY FREE ESTIMATE</span>
                <ArrowRight size={16} className="ml-2.5 transform group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:4049524534"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium py-4 px-7 rounded-xl transition-all duration-200 shadow-xs text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <Phone size={15} className="mr-2 text-[#9E7D47]" />
                <span>(404) 952-4534</span>
              </a>
            </div>

            <p className="text-xs text-stone-500 font-light">
              Free 3D digital laser estimate • No obligation • Factory-direct pricing in Duluth, GA
            </p>
          </motion.div>
        </section>

        {/* Mobile Sticky Quick Action Bar (Reveals on scroll, under 54px height) */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2.5 md:hidden"
            >
              <a
                href="tel:4049524534"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                <Phone size={14} className="text-[#9E7D47]" />
                <span>(404) 952-4534</span>
              </a>
              <a
                href="#estimate-form"
                onClick={scrollToForm}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1C1917] hover:bg-[#9E7D47] text-white font-semibold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wide transition-colors"
              >
                <span>Free Estimate</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="https://i.imgur.com/B0ZaBpN.png"
            alt="AGS Stones & Cabinets Logo"
            width={180}
            height={60}
            className="h-8 w-auto mx-auto mb-6 grayscale opacity-80"
          />
          <p className="text-gray-500 text-sm mb-2">© {new Date().getFullYear()} AGS Stones & Cabinets. All rights reserved.</p>
          <p className="text-xs text-gray-400">Serving Metro Atlanta • Professional Stone Fabrication & Installation</p>
        </div>
      </footer>

      {/* Lightbox / Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-2 rounded-full"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] aspect-[16/9] sm:aspect-auto sm:h-[85vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery implementation"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
