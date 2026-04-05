"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Star, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Header from '../../components/Header';

export default function QuotePage() {
  // Form states
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  // Scroll animations
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20, restDelta: 0.001 });

  // Detect mobile for aggressive parallax
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Text Animation: fade out and move up
  const textOpacity = useTransform(smoothScrollY, [0, 400], [1, 0]);
  const textY = useTransform(smoothScrollY, [0, 400], [0, -100]);

  // Form Animation: aggressive on mobile, smooth on desktop
  const formYMobile = useTransform(smoothScrollY, [0, 400], [20, -400]);
  const formYDesktop = useTransform(smoothScrollY, [0, 400], [20, -150]);
  const formY = isMobile ? formYMobile : formYDesktop;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formsubmit.co/ajax/agsstonesandcabinets@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-900 relative">
      <Header />
      
      {/* Fixed Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
          alt="Luxury Kitchen Countertops"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[100dvh] pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Trust (7 cols) */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="lg:col-span-7 flex flex-col items-start text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-bold uppercase tracking-wider mb-6 mt-8 lg:mt-0">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Fast Turnaround & Installation
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 drop-shadow-lg">
              Transform Your Home with <br />
              <span className="text-secondary">Premium Countertops</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
              Factory-direct fabrication and installation of Granite, Quartz, and Marble. Impeccable quality straight from our Duluth factory to your home, with the best prices in Atlanta.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <ShieldCheck className="text-secondary w-8 h-8" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Quality Guaranteed</span>
                  <span className="text-xs text-gray-400">Perfect Installation</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <Star className="text-secondary w-8 h-8 fill-secondary" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">5.0 Google Reviews</span>
                  <span className="text-xs text-gray-400">100% Satisfied Customers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form (5 cols) */}
          <motion.div 
            style={{ y: formY }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none relative z-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative">
              {/* Top Highlight Line */}
              <div className="h-2 w-full bg-secondary"></div>
              
              <div className="p-8">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Request Received!</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Thank you for your interest. Our team will contact you shortly with your free estimate.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="w-full px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Your Free Quote</h3>
                    <p className="text-sm text-gray-500 mb-6">Fill out the details below and get a no-obligation estimate.</p>
                    
                    {status === 'error' && (
                      <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                        An error occurred. Please try again.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input type="hidden" name="_subject" value="New Lead - Quote Page" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_template" value="table" />

                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-slate-900"
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number *</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-slate-900"
                          placeholder="(404) 555-0123"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-slate-900"
                          placeholder="john@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Service Type *</label>
                        <select 
                          id="service" 
                          name="service" 
                          required 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-slate-900 appearance-none"
                        >
                          <option value="">Select an option</option>
                          <option value="Granite Countertops">Granite Countertops</option>
                          <option value="Quartz Countertops">Quartz Countertops</option>
                          <option value="Marble Countertops">Marble Countertops</option>
                          <option value="Custom Cabinets">Custom Cabinets</option>
                          <option value="Full Remodel (Kitchen/Bath)">Full Remodel (Kitchen/Bath)</option>
                        </select>
                      </div>

                      <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full mt-2 bg-secondary hover:bg-yellow-600 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        {status === 'submitting' ? (
                          <><Loader2 className="animate-spin w-5 h-5" /> Sending...</>
                        ) : (
                          <>Get Free Quote <ArrowRight className="w-5 h-5" /></>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Below the fold content */}
      <div className="relative z-20 bg-slate-50 rounded-t-[2.5rem] pt-20 pb-24 px-4 sm:px-6 lg:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Why Choose AGS Stones?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We take pride in delivering exceptional projects with top-tier materials and expert craftsmanship.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Social Proof / Benefits */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-secondary w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Premium Materials</h3>
              <p className="text-slate-600">We work only with the best stones on the market, ensuring unmatched durability and beauty.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-secondary w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Expert Installation</h3>
              <p className="text-slate-600">Our team has years of experience, guaranteeing precise cuts and perfect finishes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-secondary w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Factory Direct Pricing</h3>
              <p className="text-slate-600">As direct fabricators, we cut out the middleman to offer you the best value.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
