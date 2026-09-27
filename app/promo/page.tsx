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
  Sparkles,
  Calendar,
  MapPin,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import BeforeAfter from '../../components/BeforeAfter';
import PromoRealWork from '../../components/PromoRealWork';

const projectOptions = [
  { id: 'Countertops', title: 'Countertops', icon: Layers },
  { id: 'Custom Cabinets', title: 'Custom Cabinets', icon: Box },
  { id: 'Full Remodel', title: 'Full Kitchen Remodel', icon: ChefHat },
  { id: 'Bath Vanity', title: 'Bathroom Vanity', icon: Bath },
  { id: 'Outdoor Kitchens', title: 'Outdoor Kitchen', icon: Flame },
  { id: 'Other / Remnants', title: 'Remnants / Other', icon: Sparkles }
];

const stonePreferences = [
  { id: 'Engineered Quartz', label: 'Quartz' },
  { id: 'Natural Granite', label: 'Granite' },
  { id: 'Exotic Quartzite', label: 'Quartzite' },
  { id: 'Need Guidance', label: 'Showroom Visit / Advice' }
];

const cabinetPreferences = [
  { id: 'White Shaker', label: 'White Shaker' },
  { id: 'Modern Flat Panel', label: 'Modern Flat Panel' },
  { id: 'Navy or Accent Color', label: 'Navy / Accent Color' },
  { id: 'Natural Stained Wood', label: 'Natural Wood Grain' }
];

const projectSizes = [
  { id: 'Small (< 35 sq ft)', label: 'Small (< 35 sq ft)' },
  { id: 'Standard (40–60 sq ft)', label: 'Standard (40–60 sq ft)' },
  { id: 'Large with Island (65–90 sq ft)', label: 'Large w/ Island (65–90 sq ft)' },
  { id: 'Luxury Open-Concept (95+ sq ft)', label: 'Open Concept (95+ sq ft)' }
];

const timelineOptions = [
  { id: 'Immediately / ASAP', label: 'ASAP / Ready' },
  { id: 'Within 2 to 4 Weeks', label: '2 to 4 Weeks' },
  { id: '1 to 2 Months', label: '1 to 2 Months' },
  { id: 'Just Planning', label: 'Just Planning' }
];

const tearOutOptions = [
  { id: 'Yes, need tear-out', label: 'Yes, remove old tops' },
  { id: 'No, already prepped', label: 'No, space is ready' }
];

export default function PromoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    project: 'Countertops',
    material: 'Engineered Quartz',
    size: 'Standard (40–60 sq ft)',
    timeline: 'Immediately / ASAP',
    tearOut: 'Yes, need tear-out',
    measurementsStatus: 'Need In-Home Laser Measure',
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
          // Fallback check if script is still initializing
          const timer = setTimeout(fireMetaEvents, 1000);
          return () => clearTimeout(timer);
        }
      }
    } catch (e) {
      console.warn("Meta pixel error:", e);
    }
  }, []);

  const handleProjectSelect = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      project: projectId,
      material: projectId === 'Custom Cabinets' ? 'White Shaker' : prev.material
    }));
    setValidationError(null);
  };

  const handleNextStep = () => {
    setValidationError(null);
    if (currentStep === 1 && !formData.project) {
      setValidationError('Please select a project type to continue.');
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

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
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!formData.city.trim()) {
      setValidationError('Please enter your city or zip code in Metro Atlanta.');
      return;
    }

    setIsSubmitting(true);

    const submitEventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;

    const projectSummary = `${formData.project} (${formData.material} • ${formData.size} • ${formData.timeline})`;
    const fullMessage = [
      formData.message ? `Notes: ${formData.message}` : '',
      `Selected Project: ${formData.project}`,
      `Material/Style: ${formData.material}`,
      `Size/Scope: ${formData.size}`,
      `Tear-Out Needed: ${formData.tearOut}`,
      `Timeline: ${formData.timeline}`,
      `Measuring Preference: ${formData.measurementsStatus}`
    ].filter(Boolean).join(' | ');

    const submitData = {
      access_key: "8120d187-d8e4-4348-83a8-b0248042becb",
      _subject: `New Lead: ${formData.project} - Promo Quote Wizard`,
      _template: 'table',
      'Event ID': submitEventId,
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      City: formData.city,
      Project: projectSummary,
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
        // Fire Meta Pixel Lead Event before state reset
        if (typeof window !== 'undefined') {
          if ((window as any).fbq) {
            const names = formData.name.trim().split(' ');
            const firstName = names[0] || '';
            const lastName = names.slice(1).join(' ') || '';

            (window as any).fbq('init', '1660874861583892', {
              em: formData.email.trim().toLowerCase(),
              ph: formData.phone.replace(/\D/g, ''),
              fn: firstName.toLowerCase(),
              ln: lastName.toLowerCase(),
              zp: formData.city.trim(),
              country: 'us'
            });
            (window as any).fbq('track', 'Lead', {
              content_name: formData.project,
              content_category: `${formData.material} - Turnkey Installation`,
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
    setCurrentStep(1);
    setIsSuccess(false);
    setValidationError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      project: 'Countertops',
      material: 'Engineered Quartz',
      size: 'Standard (40–60 sq ft)',
      timeline: 'Immediately / ASAP',
      tearOut: 'Yes, need tear-out',
      measurementsStatus: 'Need In-Home Laser Measure',
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

  const progressPercentage = Math.round((currentStep / 4) * 100);

  const stepTitles = [
    'Project',
    'Material & Size',
    'Scope',
    'Contact'
  ];

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

          <div className="container mx-auto max-w-lg relative z-10 flex flex-col items-center">
            {/* Direct Centered H1 - Turnkey Full-Service Message & Mobile Friendly */}
            <div className="text-center mb-3.5 sm:mb-5 px-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/35 mb-2 backdrop-blur-sm shadow-xs">
                Turnkey Full-Service • We Fabricate & Install
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-tight drop-shadow-md mb-2">
                Custom Countertops & Cabinets: <span className="text-secondary italic font-light">Complete Turnkey Installation</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 font-light max-w-lg mx-auto leading-relaxed">
                From free 3D laser templating to custom in-house fabrication and complete professional installation — save 20% to 30% factory-direct with zero retail markups.
              </p>
            </div>

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
                    Thank you, <strong className="font-semibold text-slate-900">{formData.name}</strong>. Our Duluth shop has received your details and is preparing your personalized quote.
                  </p>

                  {/* Clean Receipt / Summary Card */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 sm:p-4 text-left text-xs mb-4 shadow-xs">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Service:</span>
                        <span className="font-bold text-slate-900 text-right">{formData.project}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Material:</span>
                        <span className="font-bold text-slate-900 text-right">{formData.material}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Scope:</span>
                        <span className="font-medium text-slate-800 text-right">{formData.size}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-slate-500">Location:</span>
                        <span className="font-medium text-slate-800 text-right">{formData.city}</span>
                      </div>
                      {formData.message && (
                        <div className="flex justify-between items-start gap-2 pt-1 border-t border-slate-200/50">
                          <span className="text-slate-500">Notes:</span>
                          <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{formData.message}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-200/70 flex justify-between items-center gap-2">
                        <span className="text-slate-600 font-medium">Applied Promo:</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          ✓ 20–30% Factory Discount
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
                      className="text-[11px] text-slate-500 hover:text-primary font-medium py-1 transition-colors block mx-auto"
                    >
                      ← Calculate another project
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* MULTI-STEP FORM VIEW */
                <form onSubmit={handleSubmit}>
                  {/* Step Header & Progress */}
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Step {currentStep} of 4: <span className="text-primary font-bold">{stepTitles[currentStep - 1]}</span>
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {progressPercentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-2.5">
                      <motion.div
                        className="bg-gradient-to-r from-secondary to-amber-500 h-full rounded-full"
                        initial={{ width: '25%' }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>

                    {/* Navigation Pills */}
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {['Space', 'Material', 'Timeline', 'Contact'].map((label, idx) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => {
                            if (idx + 1 < currentStep) setCurrentStep(idx + 1);
                          }}
                          className={`text-[11px] font-semibold py-1 rounded-md transition-all ${
                            currentStep === idx + 1
                              ? 'bg-primary text-white shadow-xs'
                              : idx + 1 < currentStep
                              ? 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
                              : 'text-slate-400 bg-transparent cursor-default'
                          }`}
                        >
                          {idx + 1}. {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl mb-3 flex items-center gap-1.5">
                      <span className="font-bold">Notice:</span>
                      <span>{validationError}</span>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {/* STEP 1: Choose Space / Project */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <h2 className="text-sm sm:text-base font-serif font-bold text-slate-900">
                          Select Your Project:
                        </h2>

                        <div className="grid grid-cols-2 gap-2">
                          {projectOptions.map((opt) => {
                            const IconComponent = opt.icon;
                            const isSelected = formData.project === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleProjectSelect(opt.id)}
                                className={`text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-xs'
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isSelected
                                      ? 'bg-secondary text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  <IconComponent size={15} />
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                                  {opt.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-1.5">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full bg-primary hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
                          >
                            Next: Material & Size <ArrowRight size={15} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Stone / Material Preferences */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3.5"
                      >
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {formData.project === 'Custom Cabinets' ? 'Cabinet Style' : 'Stone Material'}
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(formData.project === 'Custom Cabinets' ? cabinetPreferences : stonePreferences).map((mat) => {
                              const isSelected = formData.material === mat.id;
                              return (
                                <button
                                  key={mat.id}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, material: mat.id }))}
                                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all active:scale-[0.98] ${
                                    isSelected
                                      ? 'border-amber-600 bg-amber-50/60 text-slate-900 ring-2 ring-amber-500/20'
                                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                  }`}
                                >
                                  {mat.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Approximate Area / Size
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {projectSizes.map((s) => {
                              const isSelected = formData.size === s.id;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, size: s.id }))}
                                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all active:scale-[0.98] ${
                                    isSelected
                                      ? 'border-amber-600 bg-amber-50/60 text-slate-900 ring-2 ring-amber-500/20'
                                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                  }`}
                                >
                                  {s.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1.5">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 text-xs uppercase tracking-wider"
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-2/3 bg-primary hover:bg-black text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
                          >
                            Next: Scope <ArrowRight size={15} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Timeline & Current Condition */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3.5"
                      >
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            When are you looking to start?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {timelineOptions.map((t) => {
                              const isSelected = formData.timeline === t.id;
                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, timeline: t.id }))}
                                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all active:scale-[0.98] ${
                                    isSelected
                                      ? 'border-amber-600 bg-amber-50/60 text-slate-900 ring-2 ring-amber-500/20'
                                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                  }`}
                                >
                                  {t.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Need removal of old countertops?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {tearOutOptions.map((opt) => {
                              const isSelected = formData.tearOut === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, tearOut: opt.id }))}
                                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all active:scale-[0.98] ${
                                    isSelected
                                      ? 'border-amber-600 bg-amber-50/60 text-slate-900 ring-2 ring-amber-500/20'
                                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1.5">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 text-xs uppercase tracking-wider"
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-2/3 bg-primary hover:bg-black text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
                          >
                            Final Step: Details <ArrowRight size={15} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Contact & Submission */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 truncate">{formData.project} • {formData.material}</span>
                          <span className="text-emerald-700 font-bold flex-shrink-0 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">✓ 20–30% OFF</span>
                        </div>

                        <div className="space-y-2.5">
                          <div>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Full Name *"
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number *"
                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs"
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address *"
                                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="City or Zip Code (Metro Atlanta) *"
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs"
                              required
                            />
                          </div>

                          <div>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Notes or preferences? (e.g. Calacatta quartz, waterfall island, target date — optional)"
                              rows={2}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:border-amber-600 focus:ring-4 focus:ring-amber-500/15 outline-none shadow-xs resize-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1.5">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            disabled={isSubmitting}
                            className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 text-xs uppercase tracking-wider"
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-2/3 bg-primary hover:bg-black text-white font-bold py-3.5 px-5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <span>Sending...</span>
                            ) : (
                              <>
                                Get My Quote <ArrowRight size={15} />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-center text-[11px] text-slate-400 pt-0.5 flex items-center justify-center gap-1 font-light">
                          <ShieldCheck size={12} className="text-emerald-500" /> 100% confidential. No spam.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
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
