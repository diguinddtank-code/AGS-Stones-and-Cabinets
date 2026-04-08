"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Loader2, ArrowRight, ShieldCheck, ThumbsUp, Award, Star, 
  User, Phone, Mail, Lock, ChevronLeft, MapPin, Zap, Calendar
} from 'lucide-react';
import Header from '../../components/Header';
import WhyChooseUs from '../../components/WhyChooseUs';
import ProcessTimeline from '../../components/ProcessTimeline';
import Testimonials from '../../components/Testimonials';
import Showroom from '../../components/Showroom';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';

// Premium Custom SVGs
const KitchenIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 18H20V22H4V18Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18M4 18H20M4 18V22H20V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10H16M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BathIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 14C3 15.6569 4.34315 17 6 17H18C19.6569 17 21 15.6569 21 14V11H3V14Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M3 14C3 15.6569 4.34315 17 6 17H18C19.6569 17 21 15.6569 21 14V11H3V14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 17V19M18 17V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 11V7C8 5.89543 8.89543 5 10 5H12C13.1046 5 14 5.89543 14 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CabinetsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 4H20V20H4V4Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 8V10M14 8V10M10 16V18M14 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CountertopsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 13L12 8L22 13L12 18L2 13Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M2 13L12 8L22 13L12 18L2 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 13V17L12 22L22 17V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CommercialIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 22V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V22" fill="currentColor" fillOpacity="0.15"/>
    <path d="M6 22V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 6H14M10 10H14M10 14H14M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeText, setAnalyzeText] = useState("");
  const [zipSuccess, setZipSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    projectType: '',
    timeline: '',
    name: '',
    phone: '',
    email: '',
    zipCode: ''
  });

  const totalSteps = 4;
  const zipInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus zip input when reaching step 2
  useEffect(() => {
    if (step === 2 && zipInputRef.current) {
      setTimeout(() => zipInputRef.current?.focus(), 400);
    }
  }, [step]);

  const handleOptionSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Snappy transition
    setIsAnalyzing(true);
    setAnalyzeText("Saving...");
    
    setTimeout(() => {
      setIsAnalyzing(false);
      if (step < totalSteps) setStep(step + 1);
    }, 400); // Reduced delay for less friction
  };

  const handleZipSubmit = (zipToUse?: string) => {
    const zip = zipToUse || formData.zipCode;
    if (zip.length < 5) return;
    
    setIsAnalyzing(true);
    setAnalyzeText(`Locating installers near ${zip}...`);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setZipSuccess(true);
      
      setTimeout(() => {
        setZipSuccess(false);
        setStep(3);
      }, 1800); // Show success message briefly
    }, 1200);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, zipCode: value }));
    
    // MAGIC CONVERSION BOOSTER: Auto-advance when 5 digits are entered
    if (value.length === 5) {
      setTimeout(() => {
        handleZipSubmit(value);
      }, 300);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    
    // Auto-format phone number: (XXX) XXX-XXXX
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const submitData = new FormData();
    submitData.append('_subject', 'New Lead - Multi-Step Quote Quiz');
    submitData.append('_captcha', 'false');
    submitData.append('_template', 'table');
    submitData.append('Project Type', formData.projectType);
    submitData.append('Zip Code', formData.zipCode);
    submitData.append('Timeline', formData.timeline);
    submitData.append('Name', formData.name);
    submitData.append('Phone', formData.phone);
    submitData.append('Email', formData.email);

    try {
      const res = await fetch("https://formsubmit.co/ajax/agsstonesandcabinets@gmail.com", {
        method: "POST",
        body: submitData,
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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Header />
      
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-900 min-h-[100dvh] flex items-center">
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/95"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white mb-6 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-white/90">Accepting New Projects</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight mb-3 drop-shadow-lg">
              Get Your <span className="text-secondary">Free Quote</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto drop-shadow-md font-medium">
              Takes less than 30 seconds. Lock in factory-direct pricing today.
            </p>
          </motion.div>

          {/* Multi-Step Form Container - Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-lg mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden relative min-h-[420px] flex flex-col">
              
              {/* Modern Step Indicator */}
              {status !== 'success' && (
                <div className="w-full bg-slate-50/90 backdrop-blur-sm border-b border-slate-100 p-5 flex justify-between items-center relative z-20 rounded-t-[2rem]">
                  {['Project', 'Location', 'Timeline', 'Details'].map((label, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-1.5 transition-all duration-500 shadow-sm ${
                        step > i + 1 ? 'bg-green-500 text-white shadow-green-500/30' : step === i + 1 ? 'bg-secondary text-white ring-4 ring-secondary/20 shadow-secondary/40 scale-110' : 'bg-white border border-slate-200 text-slate-400'
                      }`}>
                        {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
                        step >= i + 1 ? 'text-slate-800' : 'text-slate-400'
                      }`}>{label}</span>
                    </div>
                  ))}
                  {/* Connecting Lines */}
                  <div className="absolute top-[34px] left-[12.5%] right-[12.5%] h-[2px] bg-slate-200 -z-10">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-secondary transition-all duration-700 ease-in-out"
                      style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Analyzing Overlay */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div 
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
                    animate={{ opacity: 1, backdropFilter: "blur(8px)" }} 
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="absolute inset-0 z-50 bg-white/80 flex flex-col items-center justify-center rounded-[2rem]"
                  >
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-secondary rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-secondary animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">{analyzeText}</h3>
                    <p className="text-sm text-slate-500 font-medium">Secure connection...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-6 sm:p-8 flex-grow flex flex-col relative z-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center h-full animate-in fade-in zoom-in duration-500 my-auto">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <CheckCircle2 className="w-12 h-12 text-green-600 relative z-10" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Quote Requested!</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      Thanks, <strong>{formData.name.split(' ')[0]}</strong>! We're reviewing your project and will contact you shortly.
                    </p>
                    <button 
                      onClick={() => {
                        setStatus('idle');
                        setStep(1);
                        setFormData({ projectType: '', timeline: '', name: '', phone: '', email: '', zipCode: '' });
                      }}
                      className="w-full px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                    >
                      Start New Request
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Header Area */}
                    <div className="flex items-center justify-between mb-6">
                      {step > 1 ? (
                        <button 
                          onClick={() => setStep(step - 1)}
                          className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors group"
                        >
                          <ChevronLeft className="w-5 h-5 mr-0.5 group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                        <Lock className="w-3 h-3" /> SECURE
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-2xl flex items-center gap-2">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <div className="relative flex-grow flex flex-col">
                      <AnimatePresence mode="wait" custom={1}>
                        
                        {/* STEP 1: Project Type */}
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col h-full"
                          >
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 text-center tracking-tight">What are you looking for?</h3>
                            <p className="text-slate-500 text-sm sm:text-base text-center mb-6">Tap the option that best fits your project.</p>
                            
                            {/* Bento Grid Layout */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-auto mb-auto">
                              {[
                                { id: 'Kitchen Remodel', icon: KitchenIcon, colSpan: 'col-span-2 sm:col-span-1' },
                                { id: 'Bath Remodel', icon: BathIcon, colSpan: 'col-span-2 sm:col-span-1' },
                                { id: 'Cabinets', icon: CabinetsIcon, colSpan: 'col-span-1' },
                                { id: 'Countertops', icon: CountertopsIcon, colSpan: 'col-span-1' },
                                { id: 'Commercial / Other', icon: CommercialIcon, colSpan: 'col-span-2' }
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => handleOptionSelect('projectType', opt.id)}
                                  className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${opt.colSpan} ${
                                    formData.projectType === opt.id 
                                      ? 'border-secondary bg-secondary/5 text-secondary shadow-[0_0_20px_rgba(234,179,8,0.15)] scale-[0.98]' 
                                      : 'border-slate-100 bg-white hover:border-secondary/40 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 text-slate-600'
                                  }`}
                                >
                                  <div className={`absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${formData.projectType === opt.id ? 'opacity-100' : ''}`}></div>
                                  <opt.icon className={`w-12 h-12 mb-3 relative z-10 transition-transform duration-500 group-hover:scale-110 ${formData.projectType === opt.id ? 'text-secondary' : 'text-slate-400 group-hover:text-secondary/80'}`} />
                                  <span className="font-extrabold text-sm text-center leading-tight relative z-10">{opt.id}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: Zip Code */}
                        {step === 2 && (
                          <motion.div
                            key="step2"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col h-full items-center justify-center"
                          >
                            {!zipSuccess ? (
                              <div className="w-full max-w-sm mx-auto text-center">
                                <div className="relative mb-6">
                                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
                                  <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto relative z-10 border border-slate-100">
                                    <MapPin className="w-10 h-10 text-secondary" />
                                  </div>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Where is your project?</h3>
                                <p className="text-slate-500 text-sm sm:text-base mb-8">Enter your zip code to verify service area and local pricing.</p>
                                
                                <div className="relative group mb-4">
                                  <input 
                                    ref={zipInputRef}
                                    type="text" 
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={formData.zipCode}
                                    onChange={handleZipChange}
                                    placeholder="e.g. 30024"
                                    className="w-full px-4 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none text-center text-3xl font-extrabold tracking-[0.2em] transition-all shadow-inner text-slate-800 placeholder:text-slate-300 placeholder:font-medium placeholder:tracking-normal"
                                    maxLength={5}
                                  />
                                </div>
                                <button 
                                  onClick={() => handleZipSubmit()}
                                  disabled={formData.zipCode.length < 5}
                                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl disabled:opacity-50 disabled:hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                  Continue <ArrowRight className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                className="text-center w-full max-w-sm mx-auto my-auto"
                              >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h4 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Great News!</h4>
                                <p className="text-slate-600 mb-6 text-lg">We have installation teams available in <strong>{formData.zipCode}</strong>.</p>
                                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
                                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                  Locking in local pricing...
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        )}

                        {/* STEP 3: Timeline */}
                        {step === 3 && (
                          <motion.div
                            key="step3"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col h-full"
                          >
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 text-center tracking-tight">When do you need it done?</h3>
                            <p className="text-slate-500 text-sm sm:text-base text-center mb-6">This helps us check our factory schedule.</p>
                            
                            <div className="flex flex-col gap-3 sm:gap-4 mt-auto mb-auto">
                              {[
                                { id: 'ASAP (Within 1-2 weeks)', title: 'ASAP', subtitle: 'Within 1-2 weeks', desc: 'Ready to start immediately.', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-100' },
                                { id: 'Soon (2-4 weeks)', title: 'Soon', subtitle: '2-4 weeks', desc: 'Gathering quotes and planning.', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100' },
                                { id: 'Planning (1+ month)', title: 'Planning', subtitle: '1+ month', desc: 'Just exploring options for now.', icon: Calendar, color: 'text-slate-500', bg: 'bg-slate-100' }
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => handleOptionSelect('timeline', opt.id)}
                                  className={`group flex items-center p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                                    formData.timeline === opt.id 
                                      ? 'border-secondary bg-secondary/5 shadow-[0_0_20px_rgba(234,179,8,0.15)] scale-[0.98]' 
                                      : 'border-slate-100 bg-white hover:border-secondary/40 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1'
                                  }`}
                                >
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4 ${opt.bg}`}>
                                    <opt.icon className={`w-6 h-6 ${opt.color}`} />
                                  </div>
                                  <div>
                                    <div className="flex items-baseline gap-2">
                                      <span className={`font-extrabold text-lg ${formData.timeline === opt.id ? 'text-secondary' : 'text-slate-900'}`}>{opt.title}</span>
                                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{opt.subtitle}</span>
                                    </div>
                                    <span className="text-sm text-slate-500 mt-0.5 block font-medium">{opt.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: Contact Info (Final) */}
                        {step === 4 && (
                          <motion.div
                            key="step4"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col h-full"
                          >
                            <div className="text-center mb-6">
                              <div className="inline-flex items-center justify-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 border border-green-200/50">
                                <CheckCircle2 className="w-3 h-3" />
                                Final Step
                              </div>
                              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                                Where should we send your <span className="text-secondary">{formData.projectType || 'Project'}</span> quote?
                              </h3>
                              <p className="text-slate-500 text-sm sm:text-base">Your custom pricing is ready. Enter your details below.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 mt-auto">
                              <div className="space-y-3">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                  </div>
                                  <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required 
                                    autoFocus
                                    className="block w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-bold text-base placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Full Name"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-slate-400" />
                                  </div>
                                  <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    required 
                                    className="block w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-bold text-base placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Phone Number (Mobile Preferred)"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                  </div>
                                  <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-slate-900 font-bold text-base placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Email Address"
                                  />
                                </div>
                              </div>

                              <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full mt-4 bg-gradient-to-r from-secondary to-yellow-500 hover:from-yellow-500 hover:to-secondary disabled:from-slate-400 disabled:to-slate-400 text-white font-extrabold py-4 rounded-2xl shadow-[0_8px_20px_-6px_rgba(234,179,8,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(234,179,8,0.6)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                              >
                                {status === 'submitting' ? (
                                  <><Loader2 className="animate-spin w-6 h-6" /> Processing...</>
                                ) : (
                                  <>Get My Free Quote <ArrowRight className="w-5 h-5" /></>
                                )}
                              </button>
                              
                              <div className="flex items-center justify-center gap-4 mt-4">
                                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                                  <Lock className="w-3.5 h-3.5 text-green-500" /> 100% Secure
                                </div>
                                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> No Spam
                                </div>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Trust Badges - Integrated closer to the form */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-lg mx-auto mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/90"
          >
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-[11px] font-bold tracking-wider">5.0 GOOGLE RATING</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-[11px] font-bold tracking-wider">LICENSED & INSURED</span>
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
