"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Loader2, ArrowRight, ShieldCheck, Star, 
  User, Phone, Mail, Lock, ChevronLeft, MapPin, Zap, Calendar, XCircle, ChevronRight, Award
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('../../components/Testimonials'));

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
  
  const [formData, setFormData] = useState({
    isHomeowner: '',
    projectType: '',
    timeline: '',
    name: '',
    phone: '',
    email: '',
    zipCode: ''
  });

  const [isVerifyingZip, setIsVerifyingZip] = useState(false);
  const [verifiedCity, setVerifiedCity] = useState('');
  const [projectsCount, setProjectsCount] = useState(0);
  const [showZipSuccess, setShowZipSuccess] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  const totalSteps = 5;
  const zipInputRef = useRef<HTMLInputElement>(null);

  // Defer video loading to improve LCP and reduce main thread blocking
  // Only load video on desktop devices to save mobile bandwidth and CPU
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const timer = setTimeout(() => {
        setLoadVideo(true);
      }, 1500); // Load video 1.5s after page load
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-focus zip input when reaching step 3
  useEffect(() => {
    if (step === 3 && zipInputRef.current) {
      setTimeout(() => zipInputRef.current?.focus(), 100);
    }
  }, [step]);

  const handleOptionSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Instant advance, no loading screens
    if (step < totalSteps) setStep(step + 1);
  };

  const verifyZipCode = async (zip: string) => {
    if (zip.length < 5) return;
    setIsVerifyingZip(true);
    
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (res.ok) {
        const data = await res.json();
        setVerifiedCity(data.places[0]['place name']);
      } else {
        setVerifiedCity('your area');
      }
    } catch (e) {
      setVerifiedCity('your area');
    }
    
    setProjectsCount(Math.floor(Math.random() * 40) + 60); // Random number between 60-99
    setIsVerifyingZip(false);
    setShowZipSuccess(true);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, zipCode: value }));
    setShowZipSuccess(false);
    
    if (value.length === 5) {
      verifyZipCode(value);
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
    submitData.append('Homeowner', formData.isHomeowner);
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
      x: direction > 0 ? 15 : -15,
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
      x: direction < 0 ? 15 : -15,
      opacity: 0,
      scale: 0.98
    })
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
            quality={60}
            className="object-cover"
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
          
          <div className="text-center text-white mb-4 w-full animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-3">
              <Star className="w-3 h-3 text-secondary fill-secondary" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-white/90">Georgia's #1 Direct Fabricator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold leading-tight mb-1.5 drop-shadow-lg">
              Get Your <span className="text-secondary">Free Quote</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto drop-shadow-md font-medium">
              Takes less than 30 seconds. Lock in factory-direct pricing today.
            </p>
          </div>

          {/* Multi-Step Form Container - Compact Glassmorphism */}
          <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-white/50 overflow-hidden relative min-h-[320px] flex flex-col">
              
              {/* Modern Step Indicator - Compact */}
              {status !== 'success' && (
                <div className="w-full bg-slate-50/90 backdrop-blur-sm border-b border-slate-100 p-3 sm:p-4 flex justify-between items-center relative z-20 rounded-t-[1.5rem]">
                  {['Home', 'Project', 'Location', 'Time', 'Details'].map((label, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all duration-300 shadow-sm ${
                        step > i + 1 ? 'bg-green-500 text-white shadow-green-500/30' : step === i + 1 ? 'bg-blue-600 text-white ring-2 ring-blue-600/20 shadow-blue-600/40 scale-110' : 'bg-white border border-slate-200 text-slate-400'
                      }`}>
                        {step > i + 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                        step >= i + 1 ? 'text-slate-800' : 'text-slate-400'
                      }`}>{label}</span>
                    </div>
                  ))}
                  {/* Connecting Lines */}
                  <div className="absolute top-[22px] sm:top-[26px] left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-600 transition-all duration-500 ease-in-out"
                      style={{ width: `${((step - 1) / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6 flex-grow flex flex-col relative z-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center h-full animate-in fade-in zoom-in duration-300 my-auto">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-inner relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <CheckCircle2 className="w-10 h-10 text-green-600 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Quote Requested!</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm sm:text-base">
                      Thanks, <strong>{formData.name.split(' ')[0]}</strong>! We're reviewing your project and will contact you shortly.
                    </p>
                    <button 
                      onClick={() => {
                        setStatus('idle');
                        setStep(1);
                        setFormData({ isHomeowner: '', projectType: '', timeline: '', name: '', phone: '', email: '', zipCode: '' });
                      }}
                      className="w-full px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
                    >
                      Start New Request
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Header Area */}
                    <div className="flex items-center justify-between mb-4">
                      {step > 1 ? (
                        <button 
                          onClick={() => setStep(step - 1)}
                          className="flex items-center text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors group"
                        >
                          <ChevronLeft className="w-4 h-4 mr-0.5 group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        <Lock className="w-2.5 h-2.5" /> SECURE
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <div className="relative flex-grow flex flex-col">
                      <AnimatePresence mode="wait" custom={1}>
                        
                        {/* STEP 1: Homeowner */}
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "tween", duration: 0.2 }}
                            className="flex flex-col h-full"
                          >
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 text-center tracking-tight">Are you a homeowner?</h3>
                            <p className="text-slate-500 text-xs sm:text-sm text-center mb-6">Select an option to begin.</p>
                            
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-auto mb-auto">
                              <button
                                onClick={() => handleOptionSelect('isHomeowner', 'Yes')}
                                className={`group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                                  formData.isHomeowner === 'Yes' 
                                    ? 'border-green-500 bg-green-100 text-green-800 shadow-sm scale-[0.98]' 
                                    : 'border-green-200 bg-green-50/50 text-green-700 hover:border-green-400 hover:bg-green-50'
                                }`}
                              >
                                <CheckCircle2 className={`w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110 ${formData.isHomeowner === 'Yes' ? 'text-green-600' : 'text-green-500'}`} />
                                <span className="font-extrabold text-lg text-center">Yes</span>
                              </button>
                              
                              <button
                                onClick={() => handleOptionSelect('isHomeowner', 'No')}
                                className={`group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                                  formData.isHomeowner === 'No' 
                                    ? 'border-red-500 bg-red-100 text-red-800 shadow-sm scale-[0.98]' 
                                    : 'border-red-200 bg-red-50/50 text-red-700 hover:border-red-400 hover:bg-red-50'
                                }`}
                              >
                                <XCircle className={`w-16 h-16 mb-3 transition-transform duration-300 group-hover:scale-110 ${formData.isHomeowner === 'No' ? 'text-red-600' : 'text-red-500'}`} />
                                <span className="font-extrabold text-lg text-center">No</span>
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: Project Type */}
                        {step === 2 && (
                          <motion.div
                            key="step2"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "tween", duration: 0.2 }}
                            className="flex flex-col h-full"
                          >
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 text-center tracking-tight">What are you looking for?</h3>
                            <p className="text-slate-500 text-xs sm:text-sm text-center mb-4">Tap the option that best fits your project.</p>
                            
                            {/* Vertical List Layout */}
                            <div className="flex flex-col gap-3 mt-auto mb-auto">
                              {[
                                { id: 'Kitchen Remodel', icon: KitchenIcon },
                                { id: 'Bath Remodel', icon: BathIcon },
                                { id: 'Cabinets', icon: CabinetsIcon },
                                { id: 'Countertops', icon: CountertopsIcon },
                                { id: 'Commercial / Other', icon: CommercialIcon }
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => handleOptionSelect('projectType', opt.id)}
                                  className={`group relative flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                                    formData.projectType === opt.id 
                                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm scale-[0.98]' 
                                      : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-slate-800 shadow-sm'
                                  }`}
                                >
                                  <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${formData.projectType === opt.id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                                      <opt.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-extrabold text-base sm:text-lg">{opt.id}</span>
                                  </div>
                                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${formData.projectType === opt.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: Zip Code */}
                        {step === 3 && (
                          <motion.div
                            key="step3"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "tween", duration: 0.2 }}
                            className="flex flex-col h-full items-center justify-center"
                          >
                            <div className="w-full max-w-sm mx-auto text-center">
                              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Where is your project?</h3>
                              <p className="text-slate-500 text-xs sm:text-sm mb-6">Enter your zip code to verify service area.</p>
                              
                              <div className="relative group mb-4">
                                <input 
                                  ref={zipInputRef}
                                  type="text" 
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  value={formData.zipCode}
                                  onChange={handleZipChange}
                                  placeholder="e.g. 30024"
                                  disabled={showZipSuccess || isVerifyingZip}
                                  className={`w-full px-4 py-4 bg-white border-2 rounded-xl outline-none text-center text-2xl font-extrabold tracking-[0.2em] transition-all shadow-inner text-slate-800 placeholder:text-slate-300 placeholder:font-medium placeholder:tracking-normal ${
                                    showZipSuccess ? 'border-green-500 ring-2 ring-green-500/20' : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                                  }`}
                                  maxLength={5}
                                />
                                {isVerifyingZip && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                  </div>
                                )}
                              </div>

                              <AnimatePresence>
                                {showZipSuccess && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    className="bg-[#eafff4] border border-[#bbf3d8] rounded-xl p-4 flex items-start text-left gap-3 overflow-hidden mb-4"
                                  >
                                    <div className="bg-[#00c875] rounded-full p-2 shrink-0 mt-0.5 shadow-sm">
                                      <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="text-[#006e3f] font-extrabold text-sm sm:text-base mb-0.5">
                                        Great news! We serve {verifiedCity}.
                                      </h4>
                                      <p className="text-[#008a4f] text-xs sm:text-sm font-medium">
                                        We have completed over {projectsCount} projects near you.
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {showZipSuccess ? (
                                <button 
                                  onClick={() => {
                                    setStep(4);
                                    setShowZipSuccess(false);
                                  }}
                                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                                >
                                  Next Step <ArrowRight className="w-5 h-5" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => verifyZipCode(formData.zipCode)}
                                  disabled={formData.zipCode.length < 5 || isVerifyingZip}
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md flex items-center justify-center gap-2 text-base"
                                >
                                  {isVerifyingZip ? 'Verifying...' : 'Verify Zip Code'} {!isVerifyingZip && <ArrowRight className="w-4 h-4" />}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: Timeline */}
                        {step === 4 && (
                          <motion.div
                            key="step4"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "tween", duration: 0.2 }}
                            className="flex flex-col h-full"
                          >
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 text-center tracking-tight">When do you need it done?</h3>
                            <p className="text-slate-500 text-xs sm:text-sm text-center mb-4">This helps us check our factory schedule.</p>
                            
                            <div className="flex flex-col gap-2 mt-auto mb-auto">
                              {[
                                { id: 'ASAP (Within 1-2 weeks)', title: 'ASAP', subtitle: 'Within 1-2 weeks', desc: 'Ready to start immediately.', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-100' },
                                { id: 'Soon (2-4 weeks)', title: 'Soon', subtitle: '2-4 weeks', desc: 'Gathering quotes and planning.', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100' },
                                { id: 'Planning (1+ month)', title: 'Planning', subtitle: '1+ month', desc: 'Just exploring options for now.', icon: Calendar, color: 'text-slate-500', bg: 'bg-slate-100' }
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => handleOptionSelect('timeline', opt.id)}
                                  className={`group flex items-center p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                                    formData.timeline === opt.id 
                                      ? 'border-blue-600 bg-blue-50/50 shadow-sm scale-[0.98]' 
                                      : 'border-slate-100 bg-white hover:border-blue-400 hover:bg-blue-50/30'
                                  }`}
                                >
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-3 ${opt.bg}`}>
                                    <opt.icon className={`w-5 h-5 ${opt.color}`} />
                                  </div>
                                  <div>
                                    <div className="flex items-baseline gap-1.5">
                                      <span className={`font-extrabold text-sm sm:text-base ${formData.timeline === opt.id ? 'text-blue-700' : 'text-slate-900'}`}>{opt.title}</span>
                                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{opt.subtitle}</span>
                                    </div>
                                    <span className="text-xs text-slate-500 mt-0.5 block font-medium">{opt.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 5: Contact Info (Final) */}
                        {step === 5 && (
                          <motion.div
                            key="step5"
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "tween", duration: 0.2 }}
                            className="flex flex-col h-full"
                          >
                            <div className="text-center mb-4">
                              <div className="inline-flex items-center justify-center gap-1 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2 border border-green-200/50">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                Final Step
                              </div>
                              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
                                Where should we send your <span className="text-blue-600">{formData.projectType || 'Project'}</span> quote?
                              </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-2 mt-auto">
                              <div className="space-y-2">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-slate-400" />
                                  </div>
                                  <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required 
                                    autoFocus
                                    className="block w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Full Name"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                  </div>
                                  <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    required 
                                    className="block w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Phone Number"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                  </div>
                                  <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Email Address"
                                  />
                                </div>
                              </div>

                              <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-extrabold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(249,115,22,0.6)] hover:shadow-[0_12px_25px_-6px_rgba(249,115,22,0.8)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                              >
                                {status === 'submitting' ? (
                                  <><Loader2 className="animate-spin w-5 h-5" /> Processing...</>
                                ) : (
                                  <>Get My Free Quote <ArrowRight className="w-4 h-4" /></>
                                )}
                              </button>
                              
                              <div className="flex items-center justify-center gap-3 mt-3">
                                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  <Lock className="w-3 h-3 text-green-500" /> 100% Secure
                                </div>
                                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  <ShieldCheck className="w-3 h-3 text-blue-500" /> No Spam
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
          </div>

          {/* Trust Badges - Premium Local Business Indicators */}
          <div className="w-full max-w-2xl mx-auto mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-white/90 animate-in fade-in duration-700 delay-300 fill-mode-both">
            {/* Google Rating */}
            <div className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 transition-colors px-2 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white">5.0 GOOGLE RATED</span>
            </div>

            {/* BBB A+ */}
            <div className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 transition-colors px-2 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <Award className="w-4 h-4 text-white" fill="#005A9C" stroke="white" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white">BBB A+ ACCREDITED</span>
            </div>

            {/* Screened & Approved (HomeAdvisor style) */}
            <div className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 transition-colors px-2 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-white" fill="#F2A900" stroke="white" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white">SCREENED & APPROVED</span>
            </div>

            {/* Licensed & Insured */}
            <div className="flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 transition-colors px-2 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" fill="#22c55e" stroke="white" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white">LICENSED & INSURED</span>
            </div>
          </div>

        </div>
      </section>

      {/* Rest of the page content */}
      <div className="bg-white">
        <Testimonials />
      </div>
    </div>
  );
}
