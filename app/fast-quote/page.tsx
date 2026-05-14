"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Phone,
  Lock,
  Award,
  ChevronLeft,
  Zap,
  Star,
  Users,
  Timer,
  Check,
  Package,
  Truck,
  Gem,
  MapPin,
  ChevronDown,
  Pencil,
  UtensilsCrossed,
  Bath,
  Home
} from 'lucide-react';
import TopBar from '../../components/TopBar';
import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('../../components/Testimonials'), { ssr: false });

import { motion } from 'framer-motion';

export default function FastQuotePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    projectType: 'Kitchen Countertops',
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    message: '',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
    
    const submitData = new FormData();
    submitData.append('_subject', 'New Lead - Fast Quote Form');
    submitData.append('_captcha', 'false');
    submitData.append('Project Type', formData.projectType);
    submitData.append('Name', formData.name);
    submitData.append('Phone', formData.phone);
    submitData.append('Email', formData.email);
    submitData.append('Zip Code', formData.zipCode);
    submitData.append('Message', formData.message);

    try {
      const res = await fetch("https://formsubmit.co/ajax/agsstonesandcabinets@gmail.com", {
        method: "POST",
        body: submitData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setIsSubmitting(false);
        setSuccess(true);
        try {
          if (typeof window !== 'undefined') {
            if ((window as any).fbq) (window as any).fbq('track', 'Lead');
            if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
          }
        } catch(e) {}
      } else {
        setIsSubmitting(false);
        alert("Something went wrong. Please call us.");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Something went wrong. Please call us.");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <TopBar />
        <header className="py-5 px-6 sm:px-10 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm font-sans">
          <Link href="/" aria-label="AGS Stones Home">
            <Image 
              src="https://i.imgur.com/B0ZaBpN.png" 
              alt="AGS Stones and Cabinets Logo" 
              className="h-8 sm:h-10 w-auto"
              priority
              width={180}
              height={48}
            />
          </Link>
          <a href="tel:4049524534" className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 transition-colors hover:bg-gray-100">
            <Phone size={16} className="text-amber-600" />
            <span className="hidden sm:inline font-bold">(404) 952-4534</span>
            <span className="sm:hidden font-bold">Call Now</span>
          </a>
        </header>
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 md:p-16 rounded-[32px] shadow-xl text-center max-w-lg w-full border border-gray-100 font-sans"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl font-serif font-black text-gray-900 mb-4">Quote Requested!</h1>
            <p className="text-gray-600 mb-8 text-lg text-balance">
              Thank you, {formData.name.split(' ')[0] || 'there'}. We have received your request and our design team will contact you shortly with your <span className="font-extrabold text-gray-900">custom factory-direct pricing</span>.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:4049524534"
                className="bg-[#1e293b] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all w-full flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <Phone size={20} /> Need it Faster? Call Now
              </a>
              <button 
                onClick={() => router.push('/')}
                className="bg-white text-gray-600 px-8 py-4 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-all w-full hover:scale-[1.02] active:scale-95"
              >
                Return to Homepage
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-amber-100 overflow-x-hidden">
      <TopBar />
      
      <div className="relative">
        {/* Transparent Header over Hero */}
        <header className="absolute top-6 sm:top-10 left-0 w-full z-50 px-6 sm:px-12 flex justify-between items-center pointer-events-none">
          <Link href="/" className="pointer-events-auto">
            <Image 
              src="https://i.imgur.com/B0ZaBpN.png" 
              alt="AGS Stones Logo" 
              width={160}
              height={44}
              referrerPolicy="no-referrer"
              className="h-9 sm:h-12 w-auto brightness-0 invert"
            />
          </Link>
          <div className="hidden sm:flex items-center gap-6 pointer-events-auto">
            <a href="tel:4049524534" className="text-white font-black text-lg hover:text-amber-400 transition-colors drop-shadow-md">
              (404) 952-4534
            </a>
          </div>
        </header>
        
        {/* Hero Section with Background Image - MATCHING IMAGE STYLE */}
        <div className="relative flex flex-col items-center justify-start pt-24 sm:pt-28 pb-32 sm:pb-48 px-4 overflow-hidden">
          {/* Background Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://i.imgur.com/aHv4bLV.png"
              alt="Premium Countertops background"
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent sm:bg-black/40"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-5xl mx-auto px-4 w-full"
          >
            <p className="text-amber-400 font-black tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4">Elevate your kitchen</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white mb-0 leading-[1.1] tracking-tight drop-shadow-md">
              Premium Countertops & Cabinets
            </h1>
          </motion.div>
        </div>
      </div>

      <main className="flex-1 flex flex-col w-full px-4 -mt-24 sm:-mt-40 relative z-20 pb-20">
        {/* Form Container precisely matching image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 max-w-2xl mx-auto w-full shadow-2xl border border-gray-100 flex flex-col items-center"
        >
          
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-amber-200"></div>
              <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">Complimentary Design Consultation</span>
              <div className="h-px w-8 bg-amber-200"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 mb-3 block">
              Request an <span className="text-amber-500">Estimate</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Provide your details below for a custom layout and exact factory-direct pricing.
            </p>
          </div>

          <motion.form 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit} 
            className="w-full"
          >
            {/* Project Selection */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <label className="block text-xs font-bold text-gray-400 mb-4 text-center sm:text-left tracking-[0.15em] uppercase">Select Project Type</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'Kitchen Countertops', label: 'Kitchen Countertops' },
                  { id: 'Bathroom Vanities', label: 'Bathroom Vanities' },
                  { id: 'Cabinets', label: 'Cabinets' },
                  { id: 'Full Remodel', label: 'Full Remodel' }
                ].map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => setFormData({...formData, projectType: option.id})}
                    className={`cursor-pointer rounded-xl px-2 py-4 transition-all duration-300 flex items-center justify-center text-center select-none border-2 ${
                      formData.projectType === option.id 
                        ? 'border-[#1e293b] bg-[#1e293b] text-white shadow-lg shadow-slate-900/20' 
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-sm font-bold leading-tight">
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Input fields with fixed padding and premium styling */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors pointer-events-none">
                    <Users size={18} strokeWidth={2.5} />
                  </span>
                  <input 
                    type="text" 
                    required 
                    placeholder="Full Name"
                    className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-base font-bold placeholder:text-gray-400 placeholder:font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors pointer-events-none">
                    <Phone size={18} strokeWidth={2.5} />
                  </span>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Phone Number"
                    className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-base font-bold placeholder:text-gray-400 placeholder:font-medium"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors pointer-events-none">
                    <Lock size={18} strokeWidth={2.5} />
                  </span>
                  <input 
                    type="email" 
                    required 
                    placeholder="Email Address"
                    className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-base font-bold placeholder:text-gray-400 placeholder:font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors pointer-events-none">
                    <MapPin size={18} strokeWidth={2.5} />
                  </span>
                  <input 
                     type="text" 
                     required 
                     placeholder="Zip Code"
                     maxLength={5}
                     className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-base font-bold placeholder:text-gray-400 placeholder:font-medium"
                     value={formData.zipCode}
                     onChange={handleZipChange}
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="relative group">
                <span className="absolute left-5 top-5 text-gray-400 group-focus-within:text-amber-500 transition-colors pointer-events-none">
                  <Pencil size={18} strokeWidth={2.5} />
                </span>
                <textarea 
                  placeholder="Tell us about your project (e.g. dimensions, stone preference)"
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-base font-bold placeholder:text-gray-400 placeholder:font-medium min-h-[120px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </motion.div>
            </div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-5 rounded-xl text-lg flex items-center justify-center gap-3 shadow-lg shadow-amber-500/30 transition-all mt-8 tracking-wide"
            >
              {isSubmitting ? 'Sending Request...' : 'Get My Free Quote'}
            </motion.button>

            <motion.p variants={itemVariants} className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 mt-5 font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-amber-500" /> Your information is encrypted and 100% secure.
            </motion.p>
          </motion.form>
        </motion.div>

        {/* Showroom & Directions Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 rounded-[2rem] bg-gray-50 flex flex-col md:flex-row max-w-5xl mx-auto w-full border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* Information Side */}
          <div className="flex-1 p-8 sm:p-14 flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 mb-4 block">
              Visit Our <span className="text-amber-500">Showroom</span>
            </h3>
            <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed mb-8">
              Explore our extensive selection of premium quartz, granite, and custom cabinetry in person. Our design experts are ready to bring your vision to life.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner shadow-white">
                  <MapPin size={22} strokeWidth={2.5} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1.5 tracking-wide">Our Location</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    4579 Abbotts Bridge Rd Suite -10<br />
                    Duluth, GA 30097
                  </p>
                  <a 
                    href="https://maps.google.com/?q=4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-600 font-black text-[11px] tracking-[0.15em] uppercase hover:text-amber-700 transition-colors"
                  >
                    Get Directions 
                    <span className="text-lg leading-none">&rarr;</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner shadow-white relative">
                  <Phone size={22} strokeWidth={2.5} className="text-amber-600 relative z-10" />
                  <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping opacity-50"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1.5 tracking-wide">Schedule a Call</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-2">
                    Prefer to speak with an expert right away?
                  </p>
                  <a href="tel:4049524534" className="text-[#1e293b] font-black text-xl hover:text-amber-500 transition-colors inline-block">
                    (404) 952-4534
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-2/5 min-h-[350px] md:min-h-auto relative bg-amber-50">
            <Image
              src="https://i.imgur.com/L9foVza.png"
              alt="AGS Stones Showroom"
              fill
              referrerPolicy="no-referrer"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 md:from-black/10 to-transparent"></div>
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:left-auto md:bottom-8 md:top-8 md:translate-x-1/2 flex items-center justify-center md:hidden pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 w-full max-w-xs mx-auto">
                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-green-600" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Open Today</p>
                     <p className="text-sm font-black text-gray-900">Come visit us!</p>
                   </div>
                </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-24 sm:mt-32">
          <Testimonials />
        </div>
      </main>


      <footer className="py-12 px-4 text-center text-gray-400 text-xs mt-auto border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-8 mb-6">
               <Link href="/privacy-policy" className="hover:text-primary transition-colors font-bold uppercase tracking-widest underline decoration-amber-400/30 underline-offset-4">Privacy Policy</Link>
               <Link href="/contact" className="hover:text-primary transition-colors font-bold uppercase tracking-widest underline decoration-amber-400/30 underline-offset-4">Contact Us</Link>
          </div>
          <p className="text-gray-400 font-medium tracking-wide">&copy; {new Date().getFullYear()} AGS Stones & Cabinets. Duluth, Georgia's Trusted Fabrication Partner.</p>
        </div>
      </footer>
    </div>
  );
}
