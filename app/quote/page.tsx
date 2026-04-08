"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, ArrowRight, ShieldCheck, ThumbsUp, Award, Star, User, Phone, Mail, Hammer, Lock } from 'lucide-react';
import Header from '../../components/Header';
import WhyChooseUs from '../../components/WhyChooseUs';
import ProcessTimeline from '../../components/ProcessTimeline';
import Testimonials from '../../components/Testimonials';
import Showroom from '../../components/Showroom';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';

export default function QuotePage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
    <div className="min-h-screen font-sans bg-slate-50">
      <Header />
      
      {/* Hero Section with Video Background & Centered Form */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-900 min-h-[100dvh] flex items-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
          >
            <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
          
          {/* Centered Copy */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-4 drop-shadow-lg">
              Get Your <span className="text-secondary">Free Custom Quote</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md font-medium">
              Fill out the form below to tell us about your project and lock in factory-direct pricing.
            </p>
          </motion.div>

          {/* Centered Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Decorative Header Background */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100"></div>
              
              {/* Thick Orange Top Border */}
              <div className="absolute top-0 left-0 h-2 w-full bg-secondary z-10"></div>
              
              <div className="p-8 sm:p-10 relative z-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-8 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Request Received!</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Thank you for your interest. Our team will contact you shortly with your free estimate.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="w-full px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Form Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        100% Free & No Obligation
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        Tell Us About Your Project
                      </h3>
                      <p className="text-slate-500 text-sm sm:text-base">
                        Fill out the details below to lock in your factory-direct pricing.
                      </p>
                    </div>

                    {status === 'error' && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
                        An error occurred. Please try again.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input type="hidden" name="_subject" value="New Lead - Quote Page" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_template" value="table" />

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-medium"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                          <input 
                            type="tel" 
                            name="phone" 
                            required 
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-medium"
                            placeholder="(404) 555-0123"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-medium"
                            placeholder="john@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Service Type</label>
                        <div className="relative group">
                          <Hammer className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                          <select 
                            name="service" 
                            required 
                            defaultValue=""
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="text-gray-400">Select Service Type</option>
                            <option value="Granite Countertops">Granite Countertops</option>
                            <option value="Quartz Countertops">Quartz Countertops</option>
                            <option value="Marble Countertops">Marble Countertops</option>
                            <option value="Custom Cabinets">Custom Cabinets</option>
                            <option value="Full Remodel (Kitchen/Bath)">Full Remodel (Kitchen/Bath)</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full mt-6 bg-gradient-to-r from-secondary to-yellow-500 hover:from-yellow-500 hover:to-secondary disabled:from-slate-400 disabled:to-slate-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                      >
                        {status === 'submitting' ? (
                          <><Loader2 className="animate-spin w-6 h-6" /> Sending...</>
                        ) : (
                          <>Get My Free Quote <ArrowRight className="w-5 h-5" /></>
                        )}
                      </button>
                      
                      <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Your information is secure and private.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Badge 1: Google Rating */}
            <div className="bg-[#1a2035]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-white font-bold text-xs tracking-wider">5.0 RATING</span>
            </div>

            {/* Badge 2: Licensed & Insured */}
            <div className="bg-[#1a2035]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
              <ShieldCheck className="w-8 h-8 text-green-500 mb-3" />
              <span className="text-white font-bold text-xs tracking-wider">LICENSED & INSURED</span>
            </div>

            {/* Badge 3: Factory Direct */}
            <div className="bg-[#1a2035]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
              <Award className="w-8 h-8 text-secondary mb-3" />
              <span className="text-white font-bold text-xs tracking-wider">FACTORY DIRECT</span>
            </div>

            {/* Badge 4: 100% Guaranteed */}
            <div className="bg-[#1a2035]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
              <ThumbsUp className="w-8 h-8 text-blue-400 mb-3" />
              <span className="text-white font-bold text-xs tracking-wider">100% GUARANTEED</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Rest of the page content */}
      <div className="bg-white">
        <WhyChooseUs />
        <ProcessTimeline />
        <Testimonials />
        <Showroom />
        <Faq />
        <Footer />
      </div>
    </div>
  );
}
