"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Phone,
  Lock,
  Award,
  ChevronLeft,
  Zap
} from 'lucide-react';

const Testimonials = dynamic(() => import('../../components/Testimonials'), { ssr: false });

export default function FastQuotePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    projectType: 'kitchen',
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    details: ''
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    
    let formatted = val;
    if (val.length > 6) {
      formatted = `(${val.slice(0,3)}) ${val.slice(3,6)}-${val.slice(6)}`;
    } else if (val.length > 3) {
      formatted = `(${val.slice(0,3)}) ${val.slice(3)}`;
    } else if (val.length > 0) {
      formatted = `(${val}`;
    }
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, zipCode: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 lg:bg-primary flex flex-col font-sans">
        <header className="py-5 px-6 sm:px-10 border-b border-gray-100 lg:border-white/10 flex justify-between items-center bg-white lg:bg-primary/95 lg:backdrop-blur-md shadow-sm">
          <Link href="/" className="block group z-50 relative" aria-label="AGS Stones Home">
            <Image 
              src="https://i.imgur.com/B0ZaBpN.png" 
              alt="AGS Stones and Cabinets Logo" 
              className="h-8 sm:h-10 w-auto lg:brightness-0 lg:invert lg:drop-shadow-lg"
              priority
              width={180}
              height={48}
            />
          </Link>
          <a href="tel:4049524534" className="flex items-center gap-2 text-sm font-semibold text-gray-900 lg:text-white bg-gray-50 lg:bg-white/10 px-4 py-2 rounded-full border border-gray-100 lg:border-white/20 hover:bg-gray-100 lg:hover:bg-white/20 transition-colors">
            <Phone size={16} className="text-amber-600 lg:text-amber-400" />
            <span className="hidden sm:inline">(404) 952-4534</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </header>
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="bg-white p-10 md:p-16 rounded-[32px] shadow-xl text-center max-w-lg w-full border border-gray-100">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quote Requested!</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you, {formData.name.split(' ')[0] || 'there'}. We have received your request and our design team will contact you shortly with your custom factory-direct pricing.
            </p>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-colors w-full flex items-center justify-center gap-2"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-[#f3f4f6] flex flex-col font-sans selection:bg-amber-100">
      {/* Background Image / Texture block for desktop */}
      <div className="hidden lg:block absolute inset-0 z-0 bg-primary h-[50vh] xl:h-[60vh] border-b-8 border-secondary">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-transparent"></div>
      </div>

      {/* Minimal Header */}
      <header className="py-4 lg:py-6 px-5 lg:px-12 bg-white lg:bg-transparent flex justify-between items-center z-20 border-b border-gray-100 lg:border-transparent lg:shadow-none relative">
        <div className="flex items-center gap-3 lg:gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 rounded-full bg-gray-50 lg:bg-white/10 flex items-center justify-center text-gray-600 lg:text-white lg:hover:text-amber-400 hover:bg-gray-100 transition-colors border border-gray-100 lg:border-white/20 backdrop-blur-md"
          >
            <ChevronLeft size={20} />
          </button>
          <Link href="/" className="block group z-50 relative" aria-label="AGS Stones Home">
            <Image 
              src="https://i.imgur.com/B0ZaBpN.png" 
              alt="AGS Stones and Cabinets Logo" 
              className="h-8 sm:h-10 w-auto lg:brightness-0 lg:invert lg:drop-shadow-lg transition-transform hover:scale-105"
              priority
              width={180}
              height={48}
            />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 lg:text-gray-200">
            <ShieldCheck size={18} className="text-emerald-500 lg:text-emerald-400" />
            Licensed & Insured
          </div>
          <a href="tel:4049524534" className="flex items-center gap-2 text-sm font-bold text-gray-900 lg:text-white bg-amber-50 lg:bg-white/10 lg:backdrop-blur-md hover:bg-amber-100 lg:hover:bg-white/20 px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-amber-200 lg:border-white/20 transition-all shadow-sm">
            <Phone size={16} className="text-amber-600 lg:text-amber-400" />
            <span className="hidden sm:inline">(404) 952-4534</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto lg:my-8 lg:rounded-[32px] overflow-hidden relative shadow-md lg:shadow-2xl bg-white xl:min-h-[750px] z-10 border border-gray-100 lg:border-transparent">
        
        {/* Left Column - Imagery & Trust */}
        <div className="lg:w-5/12 xl:w-1/2 relative flex flex-col justify-center bg-black text-white p-6 pt-6 pb-20 lg:py-24 lg:px-16 xl:px-20 overflow-hidden min-h-[30vh] lg:min-h-0 text-center lg:text-left">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
              alt="Premium Kitchen"
              fill
              className="object-cover opacity-60 lg:opacity-40 mix-blend-overlay"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:bg-gradient-to-br lg:from-black/80 lg:to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center lg:items-start lg:mt-auto lg:mb-auto w-full max-w-lg mx-auto lg:mx-0 lg:max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-700/20 backdrop-blur-md border border-amber-500/50 px-5 py-2 rounded-full text-[11px] sm:text-xs lg:text-sm font-bold tracking-widest uppercase mb-5 sm:mb-6 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <Zap size={15} className="text-amber-400 drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]" fill="currentColor" /> 
              Instant Estimate
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-5 leading-[1.1] text-balance drop-shadow-xl font-serif text-center lg:text-left">
              <span className="text-white drop-shadow-md">Beautiful spaces.</span><br/>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 italic lg:pr-4">Factory prices.</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-200 max-w-md xl:max-w-lg font-light leading-relaxed lg:border-l-4 border-l-2 border-amber-500/50 pl-5 lg:pl-6 mt-2 lg:mt-6 bg-gradient-to-r from-black/40 to-transparent py-3 lg:py-5 rounded-r-xl shadow-sm text-center sm:text-left">
              Skip the middleman. Request a custom quote today for Countertops & Cabinets and save up to <strong className="text-amber-400 font-semibold text-lg xl:text-xl">40%</strong> on your next project.
            </p>
          </div>
        </div>

        {/* Right Column - The Form (Floating on mobile) */}
        <div className="lg:w-7/12 xl:w-1/2 flex-1 flex flex-col lg:justify-center bg-white relative z-20 -mt-16 lg:mt-0 rounded-t-[32px] lg:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-none lg:bg-transparent">
          {/* Drag handle for mobile app feel */}
          <div className="w-full flex justify-center pt-4 pb-2 lg:hidden">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </div>

          <div className="w-full max-w-[500px] lg:max-w-[600px] mx-auto px-6 pb-12 pt-2 sm:px-12 lg:py-16 lg:px-16 flex flex-col justify-center h-full">
            <div className="mb-6 lg:mb-10 text-center lg:text-left">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-3 tracking-tight font-serif">Get Your Estimate</h2>
              <p className="text-sm lg:text-lg text-gray-500">Fast, free, and factory-direct pricing.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-7">
              {/* Project Type */}
              <div>
                <label className="block text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">What are you looking for?</label>
                <div className="relative">
                  <select 
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full appearance-none bg-gray-50 lg:bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg lg:rounded-xl px-4 py-3 lg:py-4 lg:px-5 lg:text-lg outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all shadow-sm"
                  >
                    <option value="kitchen">Kitchen Countertops</option>
                    <option value="bathroom">Bathroom Vanity</option>
                    <option value="cabinets">Kitchen Cabinets</option>
                    <option value="full_remodel">Full Remodel</option>
                    <option value="outdoor">Outdoor Kitchen</option>
                    <option value="fireplace">Fireplace Surround</option>
                    <option value="commercial">Commercial Project</option>
                    <option value="table">Custom Table / Desk</option>
                    <option value="other">Other Project</option>
                  </select>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Jane Doe"
                  className="w-full bg-gray-50 lg:bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg lg:rounded-xl px-4 py-3 lg:py-4 lg:px-5 lg:text-lg outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all placeholder-gray-400 shadow-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Phone & Zip */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">Phone</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="(404) 555-0123"
                    className="w-full bg-gray-50 lg:bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg lg:rounded-xl px-4 py-3 lg:py-4 lg:px-5 lg:text-lg outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all placeholder-gray-400 shadow-sm"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">Zip Code</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="30004"
                    maxLength={5}
                    className="w-full bg-gray-50 lg:bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg lg:rounded-xl px-4 py-3 lg:py-4 lg:px-5 lg:text-lg outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all placeholder-gray-400 shadow-sm"
                    value={formData.zipCode}
                    onChange={handleZipChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="jane@example.com"
                  className="w-full bg-gray-50 lg:bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg lg:rounded-xl px-4 py-3 lg:py-4 lg:px-5 lg:text-lg outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all placeholder-gray-400 shadow-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Optional Details */}
              <div>
                <label className="block text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">Project Details <span className="text-gray-400 lowercase font-normal">(Optional)</span></label>
                <textarea 
                  placeholder="Tell us about your space, timeline, and any specific stones you are interested in..."
                  rows={3}
                  className="w-full bg-gray-50 lg:bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg lg:rounded-xl px-4 py-3 lg:py-4 lg:px-5 lg:text-lg outline-none focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all placeholder-gray-400 resize-none shadow-sm"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 lg:pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-slate-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 lg:py-5 rounded-xl lg:rounded-2xl lg:text-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Sending Request...' : 'Get My Free Estimate'}
                  {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              {/* Privacy/Trust Note */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs lg:text-sm text-gray-500 font-medium pb-2 lg:pb-0">
                <Lock size={14} className="lg:w-4 lg:h-4 text-emerald-600" />
                <span className="lg:text-gray-600">Your information is secure and 100% confidential.</span>
              </div>
            </form>

            {/* Minimalist Pill Badges (Moved to below form) */}
            <div className="mt-6 lg:mt-8 border-t border-gray-100 lg:border-gray-200 pt-6 lg:pt-8 flex flex-wrap justify-center gap-3 lg:gap-4">
              {/* Google Reviews */}
              <div className="inline-flex items-center gap-2 bg-gray-50 lg:bg-white border border-gray-200 px-3 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-full shadow-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-gray-700 tracking-wide uppercase">5.0 Rated</span>
              </div>
              
              {/* BBB Accredited */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-50 lg:bg-white border border-gray-200 px-3 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-full shadow-sm">
                <Award size={14} className="text-blue-500 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-gray-700 tracking-wide uppercase">BBB A+</span>
              </div>

              {/* Licensed */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-50 lg:bg-white border border-gray-200 px-3 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-full shadow-sm">
                <ShieldCheck size={14} className="text-emerald-600 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-gray-700 tracking-wide uppercase">Licensed</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Testimonials Below */}
      <Testimonials />
    </div>
  );
}
