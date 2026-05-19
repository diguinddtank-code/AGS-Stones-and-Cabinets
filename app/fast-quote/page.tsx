"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Phone,
  Lock,
  Award,
  Users,
  MapPin,
  Pencil,
  Loader2,
  Star
} from 'lucide-react';
import Header from '../../components/Header';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Testimonials = dynamic(() => import('../../components/Testimonials'), { ssr: false });

function FastQuoteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setSuccess(true);
      try {
        if (typeof window !== 'undefined') {
          const eventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;
          if ((window as any).fbq) (window as any).fbq('track', 'Lead', {}, { eventID: eventId });
          if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
        }
      } catch(e) {}
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const timer = setTimeout(() => {
        setLoadVideo(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const [formData, setFormData] = useState({
    projectType: 'Kitchen Countertops',
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    message: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate eventId for pixel duplication prevention
    const submitEventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;
    
    const submitData: Record<string, string> = {
      access_key: "8120d187-d8e4-4348-83a8-b0248042becb",
      _subject: 'New Lead - Fast Quote Form',
      'Event ID': submitEventId,
      'Project Type': formData.projectType,
      Name: formData.name,
      Phone: formData.phone,
      Email: formData.email,
      'Zip Code': formData.zipCode,
      Message: formData.message
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
        setIsSubmitting(false);
        setSuccess(true);
        try {
          if (typeof window !== 'undefined') {
            if ((window as any).fbq) (window as any).fbq('track', 'Lead', {}, { eventID: submitEventId });
            if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
          }
        } catch(e) {}
      } else {
        throw new Error('Service down');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Something went wrong. Please call us directly to get your quote.");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Header />
      
      <section className="relative pt-36 pb-10 lg:pt-48 lg:pb-16 overflow-hidden bg-slate-900 min-h-[100dvh] flex items-center">
        {/* Background Image & Video & Overlay */}
        <div className="absolute inset-0 z-0 bg-[#1e293b]">
          <Image
            src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
            alt="Beautiful Kitchen Background"
            fill
            priority
            fetchPriority="high"
            quality={75}
            className="object-cover opacity-90"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          {loadVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000"
            >
              <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
          
          <div className="text-center text-white mb-6 w-full animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-3 shadow-lg">
              <Star className="w-3 h-3 text-secondary fill-secondary" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-white/90">Rated #1 in Georgia for Custom Stone</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-2 drop-shadow-lg text-white">
              <span className="text-secondary">Premium</span> Countertops & Cabinetry
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl mx-auto drop-shadow-md font-medium">
              Lock in your exclusive factory-direct estimate. Experience luxury design without the retail markup.
            </p>
          </div>

          {/* Form Container - Compact Glassmorphism */}
          <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
            <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-white/50 overflow-hidden relative min-h-[320px] flex flex-col">
              
              <div className="p-6 sm:p-8 flex-grow flex flex-col relative z-10">
                {success ? (
                  <div className="flex flex-col items-center justify-center text-center h-full animate-in fade-in zoom-in duration-300 my-auto py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-inner relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <CheckCircle2 className="w-10 h-10 text-green-600 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Quote Requested!</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
                      Thank you, <strong>{formData.name.split(' ')[0] || 'there'}</strong>. We have received your request and our design team will contact you shortly with your custom factory-direct pricing.
                    </p>
                    <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3 mx-auto">
                        <a 
                            href="tel:4049524534"
                            className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 flex-1 text-sm sm:text-base"
                        >
                            <Phone size={18} /> Call Us Now
                        </a>
                        <button 
                            onClick={() => router.push('/')}
                            className="bg-white text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center hover:scale-[1.02] active:scale-95 flex-1 text-sm sm:text-base"
                        >
                            Return Home
                        </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="h-px w-6 sm:w-8 bg-secondary"></div>
                        <span className="text-secondary font-bold tracking-[0.1em] uppercase text-[10px] sm:text-xs">Estimate Request</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        <Lock className="w-2.5 h-2.5" /> SECURE
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Project Selection */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Project Type</label>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                {[
                                { id: 'Kitchen Countertops', label: 'Countertops' },
                                { id: 'Bathroom Vanities', label: 'Vanities' },
                                { id: 'Cabinets', label: 'Cabinets' },
                                { id: 'Full Remodel', label: 'Remodel' }
                                ].map((option) => (
                                <button 
                                    key={option.id}
                                    type="button"
                                    onClick={() => setFormData({...formData, projectType: option.id})}
                                    className={`py-3.5 px-2 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all duration-300 border-2 flex items-center justify-center text-center w-full ${
                                    formData.projectType === option.id 
                                        ? 'border-secondary bg-secondary/5 text-secondary shadow-[0_2px_10px_rgba(239,122,54,0.1)]' 
                                        : 'border-slate-200 bg-white text-slate-500 hover:border-secondary/40 hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm'
                                    }`}
                                >
                                    {option.label}
                                </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                            {/* Name */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Users size={16} strokeWidth={2.5} />
                                </span>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="block w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Full Name"
                                />
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Phone size={16} strokeWidth={2.5} />
                                </span>
                                <input 
                                    type="tel" 
                                    required 
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    className="block w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Phone Number"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={16} strokeWidth={2.5} />
                                </span>
                                <input 
                                    type="email" 
                                    required 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="block w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Email Address"
                                />
                            </div>

                            {/* Zip Code */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <MapPin size={16} strokeWidth={2.5} />
                                </span>
                                <input 
                                    type="text" 
                                    required 
                                    maxLength={5}
                                    value={formData.zipCode}
                                    onChange={handleZipChange}
                                    className="block w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Zip Code"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="relative mb-5">
                            <span className="absolute left-4 top-3.5 text-slate-400">
                                <Pencil size={16} strokeWidth={2.5} />
                            </span>
                            <textarea 
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="block w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium min-h-[90px] resize-none"
                                placeholder="Tell us about your project (dimensions, stone preference, etc...)"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-extrabold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(249,115,22,0.6)] hover:shadow-[0_12px_25px_-6px_rgba(249,115,22,0.8)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base sm:text-lg"
                        >
                            {isSubmitting ? (
                            <><Loader2 className="animate-spin w-5 h-5" /> Sending Request...</>
                            ) : (
                            <>Get My Free Quote <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                        
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <Lock className="w-3 h-3 text-green-500" /> 100% Secure
                            </div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3 text-blue-500" /> Fast Response
                            </div>
                        </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges - Premium Local Business Indicators */}
          <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-in fade-in duration-500 delay-150 fill-mode-both px-2">
            
            {/* 25+ Years Experience */}
            <div className="group relative flex flex-row items-center justify-start p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 shadow-lg gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="font-extrabold text-white text-xs sm:text-sm tracking-wide leading-tight text-left">25+ Years</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5 text-left">Experience</div>
              </div>
            </div>

            {/* Houzz Badge */}
            <div className="group relative flex flex-row items-center justify-start p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#7ac143]/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 shadow-lg gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden p-1.5 sm:p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Houzz_logo_%282024%29.png" alt="Houzz" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="font-extrabold text-white text-xs sm:text-sm tracking-wide leading-tight text-left">Best of Houzz</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5 text-left">Winner 2024</div>
              </div>
            </div>

            {/* Angi Pro */}
            <div className="group relative flex flex-row items-center justify-start p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#f15e22]/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 shadow-lg gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden p-1.5 sm:p-2">
                <img src="https://static.wikia.nocookie.net/logopedia/images/6/62/Angi.svg/revision/latest/scale-to-width-down/250?cb=20210323150535" alt="Angi" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="font-extrabold text-white text-xs sm:text-sm tracking-wide leading-tight text-left">Super Service</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5 text-left">Angi Pro</div>
              </div>
            </div>

            {/* Home Depot Services Partner */}
            <div className="group relative flex flex-row items-center justify-start p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#f96302]/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 shadow-lg gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden p-1.5 sm:p-2">
                <img src="https://corporate.homedepot.com/sites/default/files/image_gallery/THD_logo.jpg" alt="Home Depot" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="font-extrabold text-white text-xs sm:text-sm tracking-wide leading-tight text-left">Service Partner</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5 text-left">Home Depot</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Showroom Section */}
      <section className="bg-white py-16 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
            <p className="text-gray-500 text-sm md:text-base text-center max-w-lg mb-10 font-medium">
                ...person. Our design experts are ready to bring your vision to life.
            </p>

            <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full max-w-2xl justify-center items-start">
                
                {/* Location Block */}
                <div className="flex gap-5 items-start flex-1 w-full relative">
                    <div className="w-14 h-14 rounded-full bg-orange-50/80 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm relative z-10">
                        <MapPin className="text-orange-500 w-6 h-6" strokeWidth={2} />
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-full border border-orange-200 scale-110 opacity-50"></div>
                    </div>
                    <div className="flex flex-col pt-1">
                        <h3 className="font-serif font-bold text-slate-900 text-[22px] md:text-2xl mb-2.5">Our Location</h3>
                        <p className="text-slate-500 font-medium text-[15px] leading-relaxed mb-4">
                            AGS STONES & CABINETS<br/>
                            4579 Abbotts Bridge Rd Suite -10<br/>
                            Duluth, GA 30097, United States
                        </p>
                        <a 
                            href="https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:text-orange-600 transition-colors w-max"
                        >
                            GET DIRECTIONS <ArrowRight size={14} strokeWidth={3} />
                        </a>
                    </div>
                </div>

                {/* Vertical Divider line between blocks for desktop */}
                <div className="hidden md:block w-px bg-gray-200 self-stretch my-2"></div>

                {/* Call Block */}
                <div className="flex gap-5 items-start flex-1 w-full relative">
                    <div className="w-14 h-14 rounded-full bg-orange-50/80 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm relative z-10">
                        <Phone className="text-orange-500 w-6 h-6" strokeWidth={2} />
                        <div className="absolute inset-0 rounded-full border border-orange-200 scale-110 opacity-50"></div>
                    </div>
                    <div className="flex flex-col pt-1">
                        <h3 className="font-serif font-bold text-slate-900 text-[22px] md:text-2xl mb-2.5">Schedule a Call</h3>
                        <p className="text-slate-500 font-medium text-[15px] leading-relaxed mb-4">
                            Prefer to speak with an expert right away?
                        </p>
                        <a href="tel:4049524534" className="text-slate-900 font-black text-2xl md:text-3xl hover:text-orange-500 transition-colors w-max">
                            (404) 952-4534
                        </a>
                    </div>
                </div>

            </div>

            {/* Storefront Image */}
            <div className="mt-14 relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 max-w-2xl mx-auto h-[300px] md:h-[400px]">
                <Image
                    src="https://i.imgur.com/L9foVza.png" 
                    alt="AGS Stones & Cabinets Layout"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-5 w-[85%] md:w-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 md:px-6 md:py-4 flex items-center gap-4 shadow-xl border border-white/50 z-10">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 relative border border-green-100">
                        <span className="absolute w-full h-full rounded-full bg-green-400 animate-ping opacity-30"></span>
                        <MapPin className="text-green-500 w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start pt-0.5">
                        <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-0.5">OPEN TODAY</div>
                        <div className="text-slate-900 font-black text-sm md:text-base leading-none">Come visit us!</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Rest of the page content */}
      <div className="bg-slate-50 pt-10">
        <Testimonials />
      </div>
    </div>
  );
}

export default function FastQuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen font-sans bg-slate-50"></div>}>
      <FastQuoteContent />
    </Suspense>
  );
}
