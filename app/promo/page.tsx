'use client';

import React, { useState, useEffect } from 'react';
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
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import BeforeAfter from '../../components/BeforeAfter';
import PromoRealWork from '../../components/PromoRealWork';

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
      <Header />

      <main className="flex-grow">
        {/* 1. Hero Section with Video & Dynamic Multi-Step Estimator */}
        <section className="relative px-3 sm:px-6 pt-[128px] pb-10 sm:pt-36 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover bg-black"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://www.igscountertops.com/wp-content/uploads/2018/01/Statuario-Nuvo-Kitchen-Island.jpg"
            >
              <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/95 via-[#090909]/85 to-black/80"></div>
          </div>

          <div className="container mx-auto max-w-lg lg:max-w-7xl relative z-10">
            {/* Mobile-Only Headline - Untouched & perfectly tailored for small screens */}
            <div className="text-center mb-3.5 sm:mb-5 px-2 lg:hidden">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/35 mb-2 backdrop-blur-sm shadow-xs">
                Turnkey Full-Service • We Fabricate & Install
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-tight drop-shadow-md mb-2">
                Custom Countertops & Cabinets: <span className="text-secondary italic font-light">Complete Turnkey Installation</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 font-light max-w-lg mx-auto leading-relaxed">
                From precision laser templating to custom in-house fabrication and seamless professional installation across Metro Atlanta.
              </p>
            </div>

            {/* Responsive Dual Column Container (Mobile: single column centered, Desktop: 12-col grid) */}
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:items-center">

              {/* DESKTOP-ONLY LEFT CONTENT COLUMN */}
              <div className="hidden lg:block lg:col-span-7 xl:col-span-7 text-left text-white pr-4">
                {/* Badge & Social Proof Rating */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/40 backdrop-blur-md shadow-xs">
                    <ShieldCheck size={14} className="text-secondary" />
                    Turnkey Full-Service • We Fabricate & Install
                  </span>
                  <div className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium">
                    <div className="flex text-amber-400 text-xs">
                      {"★★★★★"}
                    </div>
                    <span className="text-white font-bold">5.0</span>
                    <span className="text-gray-300 font-light">(128+ Google Reviews)</span>
                  </div>
                </div>

                {/* Desktop High-Impact Headline */}
                <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-serif font-medium text-white leading-[1.15] tracking-tight mb-4 drop-shadow-lg">
                  Custom Countertops & Cabinets: <span className="text-secondary italic font-light block mt-1.5">Complete Turnkey Installation</span>
                </h1>

                <p className="text-base xl:text-lg text-gray-200 font-light leading-relaxed mb-6 max-w-xl">
                  Metro Atlanta&apos;s premier stone & cabinetry fabrication shop. We handle your entire project end-to-end: precision laser templating, in-house cutting, old countertop removal, and white-glove installation.
                </p>

                {/* 4 Feature Pillars Grid */}
                <div className="grid grid-cols-2 gap-3.5 mb-8">
                  <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">Factory-Direct Craft</h4>
                      <p className="text-xs text-gray-300 leading-snug">Direct from our Duluth shop with zero retail middleman markup.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5 shadow-sm">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">Fast 5-Day Turnaround</h4>
                      <p className="text-xs text-gray-300 leading-snug">From final laser template approval to finished installation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5 shadow-sm">
                      <PenTool size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">Duluth CNC Fabrication</h4>
                      <p className="text-xs text-gray-300 leading-snug">Waterjet miters, seamless sink cutouts, and polished edges.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5 shadow-sm">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">Full Craft Warranty</h4>
                      <p className="text-xs text-gray-300 leading-snug">Licensed, insured, and 100% turnkey accountability.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN / MOBILE CARD: INTERACTIVE ESTIMATOR WIZARD */}
              <div className="lg:col-span-5 xl:col-span-5 w-full">
                {/* Immediate Multi-Step Interactive Quote Wizard */}
                <div
                  className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative border border-slate-100 text-slate-900"
                  id="estimate-form"
                >
              {isSuccess ? (
                /* SUCCESS CONFIRMATION VIEW - Clean, Compact & Mobile Perfect */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-2 sm:py-3"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <CheckCircle2 size={34} />
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Request Received
                  </span>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1.5 leading-tight">
                    Estimate Request Confirmed!
                  </h3>

                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed mb-4 font-light">
                    Thank you, <strong className="font-semibold text-slate-900">{formData.name}</strong>. Our Duluth fabrication team received your details and is preparing your personalized quote.
                  </p>

                  {/* Clean Receipt / Summary Card */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 sm:p-4 text-left text-xs mb-4 shadow-xs">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Name:</span>
                        <span className="font-bold text-slate-900 text-right">{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Project:</span>
                        <span className="font-bold text-slate-900 text-right">{formData.project}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Contact:</span>
                        <span className="font-medium text-slate-800 text-right">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Zip Code:</span>
                        <span className="font-medium text-slate-800 text-right">{formData.city}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200/70 flex justify-between items-center gap-2">
                        <span className="text-slate-600 font-medium">Included:</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
                          ✓ Free In-Home Laser Templating
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Action / Direct Call */}
                  <div className="space-y-2.5">
                    <a
                      href="tel:4049524534"
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-black text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md"
                    >
                      <Phone size={15} className="text-secondary" /> Call (404) 952-4534 Now
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[11px] text-slate-500 hover:text-primary font-medium py-1 transition-colors block mx-auto cursor-pointer"
                    >
                      ← Submit another request
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* SINGLE-VIEW FILLING FORM - ZERO STEPS, FAST & DIRECT */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Card Title & Value Header - Privacy & No-Obligation Focus */}
                  <div className="border-b border-slate-100 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold tracking-tight">
                        <Lock size={12} className="text-primary flex-shrink-0" />
                        <span>Data Protected</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold tracking-tight">
                        <CheckCircle2 size={12} className="text-emerald-600 flex-shrink-0" />
                        <span>100% No Obligation</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-snug">
                      Request Your Free Estimate
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                      Your details are strictly confidential. Zero spam & zero sales pressure.
                    </p>
                  </div>

                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5">
                      <span className="font-bold">Notice:</span>
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs transition-all"
                      required
                    />
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(404) 555-0123"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs transition-all"
                      required
                    />
                  </div>

                  {/* 3. Zip Code & Email (2-column grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="30097 or City"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email <span className="text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* 4. Project Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Type *
                    </label>
                    <div className="relative">
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs transition-all appearance-none cursor-pointer pr-10"
                      >
                        <option value="Countertops">Countertops (Quartz, Granite, Quartzite)</option>
                        <option value="Custom Cabinets">Custom Cabinets (Kitchen or Bath)</option>
                        <option value="Full Kitchen Remodel">Full Kitchen Remodel (Countertops + Cabinets)</option>
                        <option value="Bathroom Vanity">Bathroom Vanity Countertop</option>
                        <option value="Outdoor Kitchen">Outdoor Kitchen Countertops</option>
                        <option value="Other / Remnants">Other Stone / Remnants</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* 5. Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your space, dimensions, preferred stone, or timeline..."
                      rows={2}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-black text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider disabled:opacity-70 active:scale-[0.99] group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Request...</span>
                      ) : (
                        <>
                          <span>Get Free Estimate</span>
                          <ArrowRight size={18} className="text-secondary group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1.5 font-normal">
                    <Lock size={12} className="text-emerald-600 flex-shrink-0" />
                    <span>Your information is strictly protected & confidential • No obligation</span>
                  </p>
                </form>
              )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Quick Benefits Bar */}
        <section className="bg-[#090909] py-12 relative -mt-6 z-20 shadow-2xl">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
              {[
                { icon: CheckCircle2, text: "Free In-Home Measure" },
                { icon: Clock, text: "Fast 5-Day Turnaround" },
                { icon: PenTool, text: "In-House Fabrication" },
                { icon: ShieldCheck, text: "0% Financing Available" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center p-4 group"
                >
                  <item.icon size={36} className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white font-medium tracking-wide text-sm md:text-base">{item.text}</span>
                </motion.div>
              ))}
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
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedImage("https://www.igscountertops.com/wp-content/uploads/2018/01/Statuario-Nuvo-Kitchen-Island.jpg")}
                className="col-span-2 md:col-span-8 group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer"
              >
                <Image
                  src="https://www.igscountertops.com/wp-content/uploads/2018/01/Statuario-Nuvo-Kitchen-Island.jpg"
                  alt="Seamless Island Waterfall"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-secondary mb-1 block">Kitchen Island</span>
                  <h4 className="text-xl md:text-2xl font-serif">Seamless Island Waterfall</h4>
                </div>
              </motion.div>

              {/* Item 2 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() => setSelectedImage("https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop"
                  alt="Master Bathroom Vanity"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-secondary mb-1 block">Master Bathroom</span>
                  <h4 className="text-lg md:text-2xl font-serif leading-tight">Luminous Double Vanity</h4>
                </div>
              </motion.div>

              {/* Item 3 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => setSelectedImage("https://media.designcafe.com/wp-content/uploads/2024/11/11212229/luxury-modern-kitchen-designs.jpg")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer"
              >
                <Image
                  src="https://media.designcafe.com/wp-content/uploads/2024/11/11212229/luxury-modern-kitchen-designs.jpg"
                  alt="Elegant Veining"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-secondary mb-1 block">Quartz Countertop</span>
                  <h4 className="text-lg md:text-2xl font-serif leading-tight">Elegant Veining</h4>
                </div>
              </motion.div>

              {/* Item 4 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={() => setSelectedImage("https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop"
                  alt="Modern Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-secondary mb-1 block">Backsplash Match</span>
                  <h4 className="text-lg md:text-2xl font-serif leading-tight">Full Height Splash</h4>
                </div>
              </motion.div>

              {/* Item 5 - Square */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onClick={() => setSelectedImage("https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop")}
                className="col-span-1 md:col-span-4 group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-square md:aspect-auto md:h-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1000&auto=format&fit=crop"
                  alt="Classic Sophistication"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 md:bottom-6 md:left-6 text-white transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-secondary mb-1 block">Warm Tones</span>
                  <h4 className="text-xl md:text-2xl font-serif leading-tight">Classic Sophistication</h4>
                </div>
              </motion.div>

              {/* Item 6 - Wide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={() => setSelectedImage("https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2000&auto=format&fit=crop")}
                className="col-span-2 md:col-span-12 group relative overflow-hidden rounded-2xl aspect-[16/9] md:h-[500px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer mt-0 sm:mt-3 md:mt-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2000&auto=format&fit=crop"
                  alt="The Culinary Dream"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-secondary mb-2 block">Full Masterpiece</span>
                  <h4 className="text-2xl md:text-4xl font-serif leading-tight">The Culinary Dream</h4>
                  <p className="text-sm md:text-base text-gray-300 mt-2 max-w-lg hidden sm:block">
                    A complete transformation featuring custom fabrication, exact templating, and our signature invisible seams.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-16 text-center">
              <a
                href="#estimate-form"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors uppercase tracking-widest text-sm border-b-2 border-primary hover:border-secondary pb-1"
              >
                Calculate your custom project estimate now <ArrowRight size={16} />
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

        {/* Final CTA Bar */}
        <section className="py-24 bg-primary text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <div className="inline-flex w-16 h-1 bg-secondary mb-8"></div>
            <h2 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-[1.1] tracking-tight">
              Don&apos;t settle for an <span className="italic font-light text-secondary">outdated space.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Join over 200+ homeowners in Metro Atlanta who transformed their spaces with factory-direct savings and master craftsmanship.
            </p>
            <a
              href="#estimate-form"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center bg-secondary text-white text-lg font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_40px_rgba(193,161,104,0.3)] hover:shadow-[0_0_50px_rgba(193,161,104,0.5)] hover:-translate-y-1 group"
            >
              Start Your Free Estimate <ArrowRight size={20} className="ml-4 transform group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </section>

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
