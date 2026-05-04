"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ArrowRight, CheckCircle2, ChevronLeft, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Data
const areas = [
  { id: "kitchen", title: "Kitchen", subtitle: "Countertops & Islands", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600" },
  { id: "bathroom", title: "Bathroom", subtitle: "Vanities & Showers", img: "https://images.unsplash.com/photo-1584622781564-1d987ba4a98c?q=80&w=1600" },
  { id: "outdoor", title: "Outdoor", subtitle: "BBQ & Patio", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600" },
  { id: "fireplace", title: "Fireplace", subtitle: "Surrounds & Hearths", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600" },
];

const stones = [
  { id: "white-quartz", title: "White Quartz", category: "Quartz", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800", bgProject: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?q=80&w=1600" },
  { id: "calacatta", title: "Calacatta", category: "Quartz", img: "https://images.unsplash.com/photo-1596417743126-7243b6794689?q=80&w=800", bgProject: "https://images.unsplash.com/photo-1588854337221-4cfb638b9d36?q=80&w=1600" },
  { id: "carrara", title: "Carrara", category: "Marble", img: "https://images.unsplash.com/photo-1582582494700-f8ce0b2f6b42?q=80&w=800", bgProject: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600" },
  { id: "black-granite", title: "Black Granite", category: "Granite", img: "https://images.unsplash.com/photo-1598300056393-4aac492f3f0b?q=80&w=800", bgProject: "https://images.unsplash.com/photo-1600566753376-12c8ab7e5ce1?q=80&w=1600" },
];

export default function DigitalShowroomApp() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: Hero, 1: Area, 2: Stone, 3: Form
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedStone, setSelectedStone] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600");
  
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const triggerHaptic = (duration = 50) => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(duration);
    }
  };

  const handleStart = () => {
    triggerHaptic();
    setStep(1);
  };

  const handleSelectArea = (area: any) => {
    triggerHaptic();
    setSelectedArea(area.id);
    setBgImage(area.img);
    setTimeout(() => setStep(2), 300); // Slight delay for haptic feel
  };

  const handleSelectStone = (stone: any) => {
    triggerHaptic();
    setSelectedStone(stone.id);
    setBgImage(stone.bgProject);
    setTimeout(() => setStep(3), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic();
    setIsSubmitting(true);
    
    // Simulate API submission + Real submission via FormSubmit
    const submitData = new FormData();
    submitData.append('_subject', 'New Lead - Digital Showroom');
    submitData.append('_captcha', 'false');
    submitData.append('Area Selected', areas.find(a=>a.id === selectedArea)?.title || String(selectedArea));
    submitData.append('Stone Selected', stones.find(s=>s.id === selectedStone)?.title || String(selectedStone));
    submitData.append('Name', formData.name);
    submitData.append('Phone', formData.phone);

    try {
      const res = await fetch("https://formsubmit.co/ajax/agsstonesandcabinets@gmail.com", {
        method: "POST",
        body: submitData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setIsSubmitting(false);
        setSuccess(true);
        triggerHaptic([50, 50, 100]); // Success pattern vibration
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead');
        }
      } else {
        setIsSubmitting(false);
        alert("Something went wrong. Please call us.");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Something went wrong. Please call us.");
    }
  };

  const goBack = () => {
    triggerHaptic(30);
    if (step > 0 && !success) setStep(step - 1);
    else router.push("/");
  };

  const getStepProgressWidth = () => {
    if (step === 0) return "0%";
    if (step === 1) return "33%";
    if (step === 2) return "66%";
    return "100%";
  };

  return (
    <div className="fixed inset-0 bg-black text-white h-[100dvh] w-full overflow-hidden flex flex-col font-sans sm:bg-[#0a0a0a]">
      
      {/* Desktop Wrapper specific styles to simulate app view on large screens, though focus is mobile */}
      <div className="relative w-full h-full max-w-[500px] mx-auto sm:h-[90dvh] sm:mt-[5dvh] sm:rounded-[40px] sm:overflow-hidden sm:ring-8 sm:ring-white/10 sm:shadow-2xl">
        
        {/* Dynamic Background */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgImage}
            src={bgImage}
            alt="Showroom visualization"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        {/* Top App Bar */}
        <header className="absolute top-0 left-0 right-0 z-50 px-5 pt-8 pb-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={goBack} 
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white active:scale-95 transition-transform"
            >
              {step === 0 || success ? <X className="w-5 h-5"/> : <ChevronLeft className="w-5 h-5"/>}
            </button>
            <div className="text-xs font-semibold tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
              Studio
            </div>
            <div className="w-10 h-10" />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden shrink-0">
            <motion.div 
              className="h-full bg-amber-500 rounded-full" 
              initial={{ width: "0%" }} 
              animate={{ width: getStepProgressWidth() }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </header>

        {/* HERO / STEP 0 content */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div 
              className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-16 h-1 bg-amber-500 mb-6 rounded-full" />
              <h1 className="text-5xl font-light tracking-tight leading-[1.1] mb-4 text-balance drop-shadow-2xl">
                Design your <br/><span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">ideal space</span>.
              </h1>
              <p className="text-[15px] text-white/80 font-light mb-10 max-w-sm drop-shadow-md">
                Experience premium stones in real environments. Tap below to begin configuring.
              </p>
              
              <button 
                onClick={handleStart}
                className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-lg active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Start Exploring
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM SHEET UI (Steps 1, 2, 3) */}
        <div 
          className={`absolute bottom-0 left-0 right-0 z-30 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            step > 0 ? 'translate-y-0' : 'translate-y-[120%]'
          }`}
        >
          {/* Main Sheet Container */}
          <div className="bg-[#111111]/90 backdrop-blur-2xl rounded-t-[32px] border-t border-white/10 w-full overflow-hidden flex flex-col shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
            
            {/* Sheet Handle */}
            <div className="w-full flex justify-center py-4">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            <div className="pb-10 pt-2 px-0 min-h-[350px]">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SELECT AREA */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="px-6 mb-5">
                      <h3 className="text-2xl font-light text-white">Which area are you designing?</h3>
                      <p className="text-sm text-white/50 mt-1">Select an application space to visualize.</p>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 pt-2 hidden-scrollbar">
                      {areas.map(area => (
                        <div 
                          key={area.id} 
                          className="w-[65vw] sm:w-[240px] shrink-0 snap-center rounded-[24px] overflow-hidden relative aspect-[4/5] border border-white/10 active:border-amber-500 transition-colors shadow-lg"
                          onClick={() => handleSelectArea(area)}
                        >
                          <Image src={area.img} alt={area.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          <div className="absolute bottom-5 left-5 right-5">
                             <h4 className="font-semibold text-lg">{area.title}</h4>
                             <p className="text-xs text-white/70">{area.subtitle}</p>
                          </div>
                        </div>
                      ))}
                      {/* Spacer for horizontal scroll ending affordance */}
                      <div className="w-6 shrink-0" />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SELECT STONE */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="px-6 mb-5 flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-light text-white">Choose a Stone</h3>
                        <p className="text-sm text-amber-500 mt-1 capitalize font-medium">{areas.find(a=>a.id===selectedArea)?.title} Preview</p>
                      </div>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 pt-2 hidden-scrollbar">
                      {stones.map(stone => (
                        <div 
                          key={stone.id} 
                          className={`w-[45vw] sm:w-[160px] shrink-0 snap-start rounded-[24px] bg-white/5 border ${selectedStone === stone.id ? 'border-amber-500 bg-white/10' : 'border-white/10'} p-3 active:scale-95 transition-all shadow-lg flex flex-col`}
                          onClick={() => handleSelectStone(stone)}
                        >
                          <div className="relative aspect-square w-full rounded-[16px] overflow-hidden border border-white/5 mb-3">
                            <Image src={stone.img} alt={stone.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-end px-1 pb-1">
                             <span className="text-[10px] text-white/50 uppercase tracking-widest">{stone.category}</span>
                             <h4 className="font-medium text-sm leading-tight mt-0.5">{stone.title}</h4>
                          </div>
                        </div>
                      ))}
                      <div className="w-6 shrink-0" />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: QUOTE FORM */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full px-6"
                  >
                    {success ? (
                      <div className="py-6 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-light mb-2">Quote Requested</h3>
                        <p className="text-sm text-white/60 mb-8 max-w-xs">
                          Your configuration is saved. Our design team will contact you shortly with direct pricing.
                        </p>
                        <button 
                          onClick={() => router.push('/')}
                          className="w-full bg-white/10 text-white border border-white/20 py-4 rounded-2xl font-semibold active:scale-95 transition-all"
                        >
                          Return to Home
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-6 flex justify-between items-start">
                           <div>
                             <h3 className="text-2xl font-light text-white leading-tight">Get Your Custom<br/>Factory Quote</h3>
                           </div>
                           <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                             <div className="w-4 h-4 rounded-full overflow-hidden relative">
                               <Image src={stones.find(s=>s.id === selectedStone)?.img || ""} alt="" fill className="object-cover" />
                             </div>
                             <span className="text-xs font-semibold text-amber-500">{stones.find(s=>s.id === selectedStone)?.title}</span>
                           </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="relative">
                            <input 
                              type="text" 
                              required 
                              placeholder="Full Name"
                              className="w-full bg-black/60 border border-white/10 border-b-white/20 rounded-2xl px-5 py-4 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-black/80 transition-colors"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div className="relative">
                            <input 
                              type="tel" 
                              required 
                              placeholder="Phone Number"
                              className="w-full bg-black/60 border border-white/10 border-b-white/20 rounded-2xl px-5 py-4 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-black/80 transition-colors"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                          
                          <div className="pt-2">
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="w-full bg-amber-500 text-black py-4 rounded-2xl font-semibold text-[15px] shadow-[0_0_30px_rgba(245,158,11,0.2)] active:scale-95 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? 'Processing...' : 'Get Free Estimate'}
                              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                            </button>
                          </div>
                        </form>

                        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/40 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" /> Direct Fabrication • Better Pricing
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for hidden scrollbar */}
      <style jsx global>{`
        .hidden-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hidden-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        /* Mobile notch safe areas */
        .pt-safe { padding-top: env(safe-area-inset-top); }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .mt-safe { margin-top: env(safe-area-inset-top); }
      `}</style>
    </div>
  );
}

