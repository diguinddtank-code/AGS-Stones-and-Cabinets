'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Calendar, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  PenTool, 
  Hammer, 
  Truck, 
  HeartHandshake, 
  MapPin,
  Lock,
  CheckCircle2,
  Loader2,
  Sparkles,
  Clock,
  ChevronDown,
  User,
  Mail,
  MessageSquare,
  X,
  Layers,
  Box
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import { GoogleGLogo, YelpLogo, ThumbtackLogo, NextdoorLogo } from '@/components/BrandLogos';

const promoGallery = [
  {
    src: '/images/projects/kitchen-white-cabinets-island-quartz-countertop-atlanta.jpg',
    title: 'Custom White Shaker Cabinets & Quartz Island',
    location: 'Atlanta, GA'
  },
  {
    src: '/images/projects/kitchen-island-white-quartz-waterfall-edge-atlanta.jpg',
    title: 'Calacatta Quartz Island Remodel',
    location: 'Alpharetta, GA'
  },
  {
    src: '/images/projects/kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg',
    title: 'Waterfall Quartz Island & Navy Cabinets',
    location: 'Buckhead, GA'
  },
  {
    src: '/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg',
    title: 'Classic White Shaker Kitchen & Island',
    location: 'Duluth, GA'
  },
  {
    src: '/images/projects/bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg',
    title: 'Navy Double Vanity & Quartz Top',
    location: 'Johns Creek, GA'
  },
  {
    src: '/images/projects/bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg',
    title: 'Lighted Marble Shower Niche',
    location: 'Roswell, GA'
  },
  {
    src: '/images/projects/kitchen-vaulted-ceiling-wood-beams-quartz-island-atlanta.jpg',
    title: 'Vaulted Ceiling Remodel with Custom Cabinets',
    location: 'Sandy Springs, GA'
  },
  {
    src: '/images/projects/cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg',
    title: 'Custom Wet Bar & Wine Storage',
    location: 'Buckhead, GA'
  },
  {
    src: '/images/projects/bathroom-freestanding-tub-glass-shower-walnut-vanity-atlanta.jpg',
    title: 'Freestanding Tub & Walnut Vanity',
    location: 'Suwanee, GA'
  },
  {
    src: '/images/projects/kitchen-white-cabinets-island-open-concept-living-room-atlanta.jpg',
    title: 'Open Concept Kitchen & Island Setup',
    location: 'Milton, GA'
  }
];

export default function PromoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Quick Quote Form State (Identical to /services/countertops)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zip: '',
    material: 'Kitchen',
    scope: 'Countertops + Cabinets',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const yHeroText = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const { scrollY } = useScroll();
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useMotionValueEvent(scrollY, "change", () => {
    if (typeof window === "undefined") return;
    const formEl = document.getElementById("estimate-form");
    if (formEl) {
      const rect = formEl.getBoundingClientRect();
      setShowMobileSticky(rect.bottom < 40);
    } else {
      setShowMobileSticky(window.scrollY > 900);
    }
  });

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleFormSubmit = async (e: React.FormEvent) => {
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
    if (!formData.zip.trim()) {
      setValidationError('Please enter your Zip code.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const submitEventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;

    const fullMessage = [
      `Service: Countertops & Custom Cabinets`,
      `Location: Atlanta Area`,
      `Material/Stone: ${formData.material}`,
      `Project Scope: ${formData.scope}`,
      `Zip Code: ${formData.zip}`,
      formData.notes ? `Notes: ${formData.notes}` : ''
    ].filter(Boolean).join(' | ');

    const submitData = {
      access_key: "8120d187-d8e4-4348-83a8-b0248042becb",
      _subject: `New Lead: Countertops & Custom Cabinets (${formData.material}) - Atlanta Area`,
      _template: 'table',
      'Event ID': submitEventId,
      Name: formData.name,
      Phone: formData.phone,
      ZipCode: formData.zip,
      Email: formData.email || 'N/A',
      Service: 'Countertops & Custom Cabinets',
      Material: formData.material,
      ProjectScope: formData.scope,
      City: 'Atlanta Area',
      Notes: formData.notes || 'None',
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
              zp: formData.zip.trim(),
              country: 'us'
            });
            (window as any).fbq('track', 'Lead', {
              content_name: `Countertops & Custom Cabinets - ${formData.material}`,
              content_category: 'Promo Landing Page',
              value: 0,
              currency: 'USD'
            }, { eventID: submitEventId });
          }
          if ((window as any).gtag) {
            (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
          }
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
        setValidationError('Could not submit request. Please call us at (404) 952-4534.');
      }
    } catch (err) {
      console.error(err);
      setValidationError('Network error. Please try again or call us at (404) 952-4534.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div ref={containerRef} className="font-sans text-gray-900 bg-[#0a0a0a] min-h-screen">
      <Header />

      <main className="relative bg-[#0a0a0a] text-white overflow-hidden selection:bg-secondary/30">
        {/* Smooth Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* 1. Immersive Hero Section - Perfectly Framed Dark Mode Aesthetic */}
        <section ref={heroRef} className="relative min-h-0 lg:min-h-screen pt-36 pb-16 sm:pt-40 sm:pb-18 lg:py-14 xl:py-20 flex flex-col justify-start lg:justify-center items-center overflow-hidden">
          <motion.div 
            style={{ y: yBackground }}
            className="absolute inset-0 w-full h-[130%] -top-[15%] z-0 pointer-events-none"
          >
            <Image 
              src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
              alt="Custom Countertops & Cabinets in Atlanta, GA"
              fill
              className="object-cover opacity-60 brightness-90 contrast-105"
              priority
              sizes="100vw"
            />
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-65"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
            >
              <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none"></div>
          </motion.div>

          <div className="container relative z-10 px-4 sm:px-8 lg:px-10 xl:px-14 mx-auto max-w-7xl xl:max-w-[88rem]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-center">
              
              {/* LEFT COLUMN: Monumental Headline & Authority */}
              <motion.div 
                style={{ y: yHeroText }}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="lg:col-span-7 text-center lg:text-left pt-1 sm:pt-2 lg:pt-0 px-1 sm:px-0"
              >
                {/* Geolocation Tag */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 py-1 px-3 md:px-3.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-[10px] md:text-xs uppercase tracking-widest mb-2.5 lg:mb-3 font-medium text-white shadow-sm mx-auto lg:mx-0">
                  <MapPin size={12} className="text-secondary fill-secondary" />
                  <span>Serving Atlanta, Duluth &amp; Metro Atlanta</span>
                </motion.div>
                
                {/* Huge Monumental H1 */}
                <motion.h1 
                  variants={fadeInUp} 
                  className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif font-bold mb-2.5 lg:mb-3 drop-shadow-2xl leading-[1.12] tracking-tight text-white max-w-3xl mx-auto lg:mx-0 shadow-black/20"
                >
                  Custom <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#fde047] to-[#eab308] drop-shadow-md">
                    Countertops &amp; Custom Cabinets
                  </span>
                  <br />
                  in Atlanta Area
                </motion.h1>

                {/* Subtitle */}
                <motion.p variants={fadeInUp} className="text-xs sm:text-sm lg:text-sm xl:text-base text-white/90 mb-3.5 lg:mb-4 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed drop-shadow-md">
                  Factory-direct stone fabrication &amp; custom cabinetry in Duluth. Save 20–30% with zero retail middlemen &amp; 5-day installation turnaround.
                </motion.p>

                {/* Value Bullets (Desktop) */}
                <motion.div variants={fadeInUp} className="hidden lg:flex flex-col gap-2 mb-4 lg:mb-5 text-white drop-shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-secondary/20 p-1 rounded-full backdrop-blur-sm border border-white/10 shrink-0">
                      <CheckCircle2 className="text-secondary" size={15} />
                    </div>
                    <span className="font-semibold text-xs xl:text-sm">Factory Direct Pricing (Save 20% to 30%)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="bg-secondary/20 p-1 rounded-full backdrop-blur-sm border border-white/10 shrink-0">
                      <CheckCircle2 className="text-secondary" size={15} />
                    </div>
                    <span className="font-semibold text-xs xl:text-sm">Fast 5-Day Turnaround from Digital Laser Measure</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="bg-secondary/20 p-1 rounded-full backdrop-blur-sm border border-white/10 shrink-0">
                      <CheckCircle2 className="text-secondary" size={15} />
                    </div>
                    <span className="font-semibold text-xs xl:text-sm">Free In-Home Laser Templating &amp; 3D Design Layout</span>
                  </div>
                </motion.div>

                {/* CTAs and Direct Click-to-Call */}
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3.5 lg:mb-4">
                  <a 
                    href="tel:4049524534"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
                        if ((window as any).fbq) (window as any).fbq('track', 'Contact');
                      }
                    }}
                    className="w-full sm:w-auto bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs xl:text-sm transition-all shadow-md group"
                  >
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                      <Phone size={13} />
                    </span>
                    <span>Prefer to talk? <strong className="text-secondary underline">(404) 952-4534</strong></span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const formEl = document.getElementById('estimate-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="lg:hidden w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg"
                  >
                    Get Free Estimate <ArrowRight size={15} />
                  </button>
                </motion.div>

                {/* Official Google 5.0 Star Reviews Badge & Trust Platforms */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                  <a 
                    href="https://www.google.com/search?q=AGS+Stones+and+Cabinets"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/15 rounded-full pr-4 pl-1.5 py-1 transition-all group hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                        alt="Google Review" 
                        className="w-4 h-4" 
                        width={16} 
                        height={16} 
                      />
                    </div>
                    <div className="flex flex-col justify-center text-left">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-white text-xs leading-none">5.0</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={11} className="fill-[#FBBC05] text-[#FBBC05]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[9px] font-medium text-gray-300 leading-none mt-0.5 group-hover:text-white transition-colors">
                        120+ Excellent Reviews
                      </p>
                    </div>
                  </a>

                  {/* Clean Trust Logos: Yelp, Thumbtack, Nextdoor */}
                  <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5">
                    <YelpLogo />
                    <ThumbtackLogo />
                    <NextdoorLogo />
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT COLUMN: Identical Quick Quote Card (from /services/countertops) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 w-full relative"
              >
                {/* Floating Guarantee Badge */}
                <div className="hidden lg:flex absolute -top-3 -right-2 z-20 bg-white text-primary py-1.5 px-3 rounded-xl shadow-xl items-center gap-2 border border-gray-100">
                  <ShieldCheck size={18} className="text-secondary" />
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 leading-tight">Guaranteed</p>
                    <p className="font-bold text-[11px] text-primary leading-tight">Best Price in GA</p>
                  </div>
                </div>

                <div 
                  id="estimate-form"
                  className="w-full max-w-[390px] xl:max-w-[410px] mx-auto lg:ml-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 sm:p-5 xl:p-6 border border-white/20 text-gray-900 relative overflow-hidden"
                >
                  {isSuccess ? (
                    /* Success State View */
                    <div className="py-6 text-center space-y-3.5 animate-in fade-in zoom-in duration-300">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 size={32} />
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        Request Received!
                      </span>
                      <h3 className="text-xl font-serif font-bold text-gray-900 leading-snug">
                        You&apos;re On The Schedule!
                      </h3>
                      <p className="text-xs text-gray-600 font-light leading-relaxed max-w-xs mx-auto">
                        Thank you, <strong className="text-gray-900">{formData.name}</strong>. Our Duluth team received your project details and will contact you shortly with direct factory pricing.
                      </p>
                      <div className="pt-1">
                        <a 
                          href="tel:4049524534"
                          className="w-full bg-secondary hover:bg-yellow-600 text-white py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                          <Phone size={15} /> Call (404) 952-4534 Now
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            name: '',
                            phone: '',
                            zip: '',
                            material: 'Kitchen',
                            scope: 'Countertops + Cabinets',
                            email: '',
                            notes: ''
                          });
                        }}
                        className="text-xs text-gray-400 hover:text-primary font-medium underline block mx-auto pt-1 cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    /* Embedded Form View - Identical to Quick Quote */
                    <form onSubmit={handleFormSubmit} className="space-y-2.5 lg:space-y-2.5 xl:space-y-3">
                      <div className="mb-2 lg:mb-2.5">
                        <div className="inline-block bg-secondary/10 text-secondary text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1">
                          Fast Estimate
                        </div>
                        <h3 className="text-xl xl:text-2xl font-serif font-bold text-primary leading-tight">Quick Quote</h3>
                        <p className="text-gray-500 text-[11px]">Direct factory pricing in 60 seconds.</p>
                      </div>

                      {/* Validation Alert */}
                      {validationError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-2.5 py-1.5 rounded-lg">
                          <strong>Notice:</strong> {validationError}
                        </div>
                      )}

                      {/* Name with User Icon */}
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors pointer-events-none">
                          <User size={15} />
                        </div>
                        <input 
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Full Name *"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 font-medium focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                        />
                      </div>

                      {/* Phone & Zip in 2 Columns */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative group">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors pointer-events-none">
                            <Phone size={15} />
                          </div>
                          <input 
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handlePhoneInput}
                            placeholder="Phone *"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-2.5 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 font-medium focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                          />
                        </div>
                        <div className="relative group">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors pointer-events-none">
                            <MapPin size={15} />
                          </div>
                          <input 
                            type="text"
                            required
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            placeholder="Zip Code *"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-2.5 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 font-medium focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Room/Space & Project Scope in 2 Columns */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <select
                            value={formData.material}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-secondary rounded-xl pl-2.5 pr-6 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 font-semibold focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none cursor-pointer truncate"
                          >
                            <option value="Kitchen">Kitchen</option>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Outdoor Kitchen">Outdoor Kitchen</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none stroke-[2]" />
                        </div>
                        <div className="relative">
                          <select
                            value={formData.scope}
                            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-secondary rounded-xl pl-2.5 pr-6 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 font-semibold focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none cursor-pointer truncate"
                          >
                            <option value="Countertops Only">Countertops Only</option>
                            <option value="Countertops + Cabinets">Countertops + Cabinets</option>
                            <option value="Custom Cabinets">Custom Cabinets</option>
                            <option value="Full Remodel">Full Remodel</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none stroke-[2]" />
                        </div>
                      </div>

                      {/* Email (Required *) with Mail Icon */}
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors pointer-events-none">
                          <Mail size={15} />
                        </div>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email Address *"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 font-medium focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                        />
                      </div>

                      {/* Notes / Observation (Optional) */}
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors pointer-events-none">
                          <MessageSquare size={15} />
                        </div>
                        <input 
                          type="text"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Project Notes / Details (Optional)"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 lg:py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 font-medium focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-0.5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-2.5 lg:py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-70 active:scale-[0.99] cursor-pointer group"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={15} className="animate-spin" /> Submitting...
                            </>
                          ) : (
                            <>
                              <span>Claim Free Estimate</span>
                              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-center text-[9px] text-gray-400 flex items-center justify-center gap-1 font-normal pt-0.5">
                        <Lock size={10} className="text-emerald-600 flex-shrink-0" />
                        <span>Confidential • Direct Factory Pricing • No Spam</span>
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Subdued Bottom Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white">Scroll to Explore Slabs &amp; Cabinets</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-6 bg-gradient-to-b from-white to-transparent"
            />
          </div>
        </section>

        {/* 2. The Vision / Overview Section */}
        <section className="py-20 md:py-32 relative bg-white text-gray-900 overflow-hidden rounded-t-3xl md:rounded-t-[3rem] -mt-10 z-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6 md:space-y-8"
              >
                <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                  <span className="w-8 h-px bg-secondary"></span> 
                  The Vision
                </h2>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-primary">
                  Beautiful upgrades that transform your home.
                </h3>
                <div className="text-base md:text-lg leading-relaxed text-gray-600 space-y-4 md:space-y-6 font-light">
                  <p>
                    As Atlanta&apos;s direct stone fabricator and custom cabinetry provider, we eliminate mid-tier showrooms and broker markups to bring you luxurious kitchen and bath upgrades at direct pricing.
                  </p>
                  <p>
                    From natural granite and low-maintenance engineered quartz to dovetail solid-wood cabinets with soft-close hardware, every cut, edge, and cabinet box is crafted in our high-tech Duluth facility with precision digital laser templating.
                  </p>
                  <p>
                    With dedicated crews serving Atlanta, Alpharetta, Duluth, Johns Creek, Roswell, Sandy Springs, and Suwanee, you get a turnkey team handling your project from 3D layout to final installation in under a week.
                  </p>
                </div>

                <ul className="space-y-4 md:space-y-5 pt-6 md:pt-8 border-t border-gray-100">
                  {[
                    "Factory Direct Pricing (Save 20% to 30%)",
                    "Solid Wood & Plywood Cabinets (No Particle Board)",
                    "Digital Laser Templating & CNC Precision Cut",
                    "In-House Duluth Stone Slab Yard & Fabrication",
                    "Soft-Close Hinges, Slides & Dovetail Drawers",
                    "15-Year Stain Protection & Craftsmanship Warranty"
                  ].map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 group cursor-default"
                    >
                      <div className="w-2 h-2 rounded-full border border-secondary/40 bg-secondary/80 group-hover:bg-secondary group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(217,119,6,0.6)] transition-all duration-300"></div>
                      <span className="text-gray-900 font-medium text-base md:text-lg group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <div className="lg:col-span-6 lg:col-start-7 relative">
                <motion.div 
                  style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [50, -50]) }}
                  className="relative rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  <motion.div style={{ scale: scaleImage }} className="w-full h-full relative">
                    <Image 
                      src="/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg"
                      alt="Countertops & Custom Cabinets detail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                  </motion.div>

                  {/* Floating Trust Badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="absolute bottom-8 left-8 bg-white p-6 rounded-3xl shadow-2xl backdrop-blur-md max-w-[220px]"
                  >
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                      <ShieldCheck size={24} />
                    </div>
                    <p className="font-bold text-primary leading-tight">Locally fabricated in Duluth &amp; guaranteed.</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 3 Architectural & Value Advantage Cards */}
        <section className="py-20 bg-[#0c0c0c] text-white relative border-t border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="max-w-3xl mb-16">
              <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-secondary"></span> The Direct Fabrication Advantage
              </h2>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Crafted In-House. Delivered Flawlessly.
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Why Metro Atlanta homeowners choose our local Duluth stone fabrication and custom cabinetry studio over big-box stores and brokers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#121212]/80 border border-white/10 p-8 rounded-3xl hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#888] font-bold">01 / DIRECT</span>
                  <h4 className="text-xl md:text-2xl font-bold font-serif text-white">Save 20–30% Factory Direct</h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    By eliminating retail showrooms, broker commissions, and subcontracted installers, you get premium quartz, granite, and custom solid-wood cabinets fabricated directly by our local team.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#121212]/80 border border-white/10 p-8 rounded-3xl hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#888] font-bold">02 / SPEED</span>
                  <h4 className="text-xl md:text-2xl font-bold font-serif text-white">Fast 5-Day Installation</h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    While traditional contractors take 4 to 8 weeks, our high-precision CNC machinery and dedicated in-house crews template, cut, and install your kitchen in days.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#121212]/80 border border-white/10 p-8 rounded-3xl hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#888] font-bold">03 / TURNKEY</span>
                  <h4 className="text-xl md:text-2xl font-bold font-serif text-white">Single Accountable Team</h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    One experienced partner managing your 3D cabinet design, digital laser templating, slab matching, sink cutouts, and professional installation from start to finish.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Parallax Quote Break */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-primary text-white">
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0.5, 0.9], ["-20%", "20%"]) }}
            className="absolute inset-0 opacity-20 grayscale"
          >
            <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" fill alt="Stone Texture" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
          
          <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Star className="text-secondary w-8 h-8 md:w-12 md:h-12 mx-auto mb-6 md:mb-8 opacity-50" />
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic font-light leading-snug mb-6 md:mb-8">
                &ldquo;Great design is in the details. We take pride in making sure every cut, edge, and finish looks absolutely flawless.&rdquo;
              </h2>
              <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-secondary font-bold">— The AGS Team</p>
            </motion.div>
          </div>
        </section>

        {/* 5. Gallery Section with Click-to-Enlarge Lightbox */}
        <section className="py-24 bg-white text-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Countertops &amp; Cabinets Gallery</h3>
              <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
                Explore real transformations completed by our local team across Metro Atlanta. Click any photo to enlarge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {promoGallery.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.8 }}
                  onClick={() => setSelectedImage(item.src)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200"
                >
                  <Image 
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D9B473] mb-1 block">
                      {item.location}
                    </span>
                    <h4 className="text-base md:text-lg font-serif font-medium leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Showroom Visit Card */}
            <div className="mt-16 md:mt-24 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="inline-flex flex-col items-center p-8 md:p-16 bg-[#f8f9fa] rounded-[2rem] border border-gray-200 w-full max-w-4xl mx-auto shadow-sm"
              >
                <MapPin className="text-secondary w-10 h-10 mb-6 opacity-80" strokeWidth={1.5} />
                <h4 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">Want to see slabs &amp; cabinets in person?</h4>
                <p className="text-gray-600 mb-6 max-w-lg text-lg">
                  Visit our Duluth slab yard &amp; showroom to feel the quartz &amp; granite textures, see cabinet door finishes, and view full slabs before cutting.
                </p>
                <p className="text-gray-900 font-medium mb-8 text-center max-w-sm">
                  AGS STONES &amp; CABINETS<br/>
                  4579 Abbotts Bridge Rd Suite -10<br/>
                  Duluth, GA 30097, United States
                </p>
                <a 
                  href="https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-primary text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-full transition-all duration-500 hover:shadow-xl inline-flex items-center justify-center gap-3"
                >
                  <span className="relative z-10 flex items-center gap-2 text-base md:text-lg transition-transform duration-500 group-hover:-translate-y-[150%]">
                    Get Directions <ArrowRight size={18} />
                  </span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-base md:text-lg text-primary bg-secondary translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500">
                    Get Directions <ArrowRight size={18} />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. Service Areas Section */}
        <section className="py-20 md:py-32 bg-white text-gray-900 border-t border-gray-100 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                  <MapPin size={16} /> 
                  Service Areas
                </h2>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                  Serving All of Metro Atlanta
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                  Based in Duluth, our custom countertops and cabinetry crews deliver precision stone fabrication and flawless installations throughout Georgia.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm font-medium pt-4 border-t border-gray-100">
                  {["Atlanta", "Alpharetta", "Roswell", "Duluth", "Johns Creek", "Marietta", "Suwanee", "Sandy Springs", "Buckhead"].map((city) => (
                    <Link 
                      key={city} 
                      href={`/countertops-${city.toLowerCase().replace(' ', '-')}-ga`}
                      className="flex items-center gap-2 hover:text-secondary transition-colors cursor-pointer group text-gray-600"
                    >
                      <div className="relative flex h-2 w-2 shrink-0">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500/40 group-hover:bg-secondary"></span>
                      </div> 
                      <span className="border-b border-transparent group-hover:border-secondary transition-colors pb-0.5">{city}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="pt-6">
                  <a 
                    href="#estimate-form"
                    onClick={(e) => {
                      e.preventDefault();
                      const formEl = document.getElementById('estimate-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-primary font-bold hover:text-secondary flex items-center gap-2 transition-colors w-fit group cursor-pointer"
                  >
                    <span className="border-b-2 border-primary/20 group-hover:border-secondary pb-0.5">Request your free quote for your area</span> 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group"
              >
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Currently scheduling in Duluth &amp; Metro Atlanta
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105955.0270034237!2d-84.34914101150428!3d34.02059363574005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598c467657571%3A0x6762332675667676!2s4579%20Abbotts%20Bridge%20Rd%20Suite%20-10%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1709867543210!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-1000"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. Seamless Process */}
        <section className="py-20 md:py-32 bg-[#f8f9fa] text-primary relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-end mb-16 md:mb-24">
              <div className="flex-1">
                <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">Our Process</h2>
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-[1.1]">Smooth &amp; stress-free.</h3>
              </div>
              <div className="max-w-md">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  We respect your time and your home. From laser templating and cabinet layout to final stone placement, our team delivers flawlessly.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 relative">
              <div className="hidden md:block absolute top-[28px] left-[10%] w-[80%] h-px bg-gray-300 -z-10"></div>
              
              {[
                { icon: <PenTool />, title: "Accurate Measurements", desc: "Digital 3D laser mapping so your countertops and cabinets fit with millimeter accuracy." },
                { icon: <HeartHandshake />, title: "Hand-Picked Slabs", desc: "Select from over 2,000 quartz, granite, and quartzite slabs directly at our showroom." },
                { icon: <Hammer />, title: "In-House Fabrication", desc: "CNC waterjet cutting, custom edge profiling, and cabinet assembly in our Duluth shop." },
                { icon: <Truck />, title: "Professional Install", desc: "Fast 5-day installation by our certified in-house crew. Clean, on time, and guaranteed." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="w-14 h-14 bg-white border border-gray-200 text-primary rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-secondary group-hover:text-white group-hover:-translate-y-2 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Phase 0{idx + 1}</div>
                  <h4 className="text-2xl font-bold font-serif mb-3 text-primary">{step.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. Scarcity / Urgency Bottom CTA */}
        <section className="relative py-28 md:py-36 bg-[#0a0a0a] overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="container relative z-10 mx-auto px-4 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-4 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs uppercase tracking-widest font-bold mb-6">
                Direct Duluth Fabrication
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Ready to Upgrade Your Countertops &amp; Cabinets?
              </h2>
              <p className="text-base sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Save 20–30% with factory-direct pricing. Contact us today for a free in-home 3D digital laser measurement and estimate.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    const formEl = document.getElementById('estimate-form');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer group"
                >
                  <span>Claim Your Free Quote</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a 
                  href="tel:4049524534"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full border border-white/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                  <Phone size={16} className="text-secondary" />
                  <span>(404) 952-4534</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 10. Mobile Sticky Action Bar */}
        <AnimatePresence>
          {showMobileSticky && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2.5 md:hidden"
            >
              <a
                href="tel:4049524534"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                <Phone size={14} className="text-secondary" />
                <span>(404) 952-4534</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById('estimate-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-yellow-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                <span>Free Quote</span>
                <ArrowRight size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Lightbox / Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/60 p-2 rounded-full cursor-pointer"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] aspect-[16/9] sm:aspect-auto sm:h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged transformation example"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
