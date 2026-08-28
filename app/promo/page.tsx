'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle2, Star, ArrowRight, ShieldCheck, Clock, PenTool, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import BeforeAfter from '../../components/BeforeAfter';

export default function PromoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Safely fire PageView explicitly for this route on mount
    try {
      if (typeof window !== 'undefined' && 'fbq' in window) {
        (window as any).fbq('track', 'PageView');
      }
    } catch (e) {
      console.warn("Meta pixel error:", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitEventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;

    const submitData = {
      access_key: "8120d187-d8e4-4348-83a8-b0248042becb",
      _subject: 'New Lead - Promo Landing Page',
      _template: 'table',
      'Event ID': submitEventId,
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      City: formData.city,
      Project: formData.project,
      Message: formData.message || "No additional message"
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
            (window as any).fbq('track', 'Lead', {}, { eventID: submitEventId });
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
        setFormData({ name: '', email: '', phone: '', city: '', project: '', message: '' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        {/* 1. Hero Absurdo */}
        <section className="relative px-4 pt-36 pb-24 lg:pt-40 lg:pb-36 overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/95 via-[#090909]/80 to-transparent"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg text-white pt-4 lg:pt-0"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/90 text-white px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-md shadow-lg">
                <Star size={12} className="fill-white" />
                #1 Top Rated in Metro Atlanta
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4 leading-[1.1] drop-shadow-2xl">
                Transform Your Space With <span className="text-secondary italic font-light">Custom Design &</span> Remodeling
              </h1>
              <div className="text-base md:text-xl text-gray-200 mb-8 font-light flex flex-col gap-2">
                <span className="flex items-center gap-2.5"><CheckCircle2 className="text-secondary flex-shrink-0" size={20}/> <span>Receive a <strong className="font-semibold text-white">Free</strong> In-Home Estimate</span></span>
                <span className="flex items-center gap-2.5"><CheckCircle2 className="text-secondary flex-shrink-0" size={20}/> <span>Lightning <strong className="font-semibold text-white">Fast</strong> Fabrication & Install</span></span>
                <span className="flex items-center gap-2.5"><CheckCircle2 className="text-secondary flex-shrink-0" size={20}/> <span>Serving all of <strong className="font-semibold text-white">Metro Atlanta</strong></span></span>
              </div>
              <a
                href="#estimate-form"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-secondary text-white text-sm md:text-base font-bold uppercase tracking-widest px-8 py-4 md:px-10 md:py-4 rounded-full hover:bg-white hover:text-primary hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(193,161,104,0.4)] group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                Get Free Estimate <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>

            {/* Quick Form in Hero (Desktop mostly) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-md bg-white rounded-3xl p-8 lg:p-10 shadow-2xl relative border border-gray-100"
                id="estimate-form"
            >
                <div className="absolute -top-4 -right-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-lg transform rotate-3">
                    Limited Time Offer
                </div>
                <h3 className="text-3xl lg:text-4xl font-serif font-medium text-primary mb-2 text-center tracking-tight">Claim Your Free Estimate</h3>
                <p className="text-gray-500 text-center text-sm md:text-base mb-8 font-light">Secure your spot for a priority in-home consultation and customized pricing.</p>

                {isSuccess ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-8 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-2xl font-serif font-bold mb-2">Success!</h4>
                        <p className="text-sm font-light">We received your request. Our team will call you shortly to schedule your free estimate.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City / Zip Code"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <select
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-gray-700 appearance-none"
                                required
                            >
                                <option value="" disabled>What is your project?</option>
                                <option value="Countertops">Countertops</option>
                                <option value="Custom Cabinets">Custom Cabinets</option>
                                <option value="Full Remodel">Full Remodel</option>
                                <option value="Bath Vanity">Bath Vanity</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Additional message (optional)"
                                rows={3}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all resize-none text-gray-700"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary hover:bg-black text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_25px_rgb(0,0,0,0.2)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 tracking-widest uppercase text-sm mt-2"
                        >
                            {isSubmitting ? 'Sending Request...' : 'GET MY FREE ESTIMATE'}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                            <ShieldCheck size={14} className="text-green-500" /> Your information is 100% secure.
                        </p>
                    </form>
                )}
            </motion.div>
          </div>
        </section>

        {/* 4. Quick Benefits Bar */}
        <section className="bg-[#090909] py-12 relative -mt-6 z-20 shadow-2xl">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
                    {[
                        { icon: CheckCircle2, text: "Free Estimate" },
                        { icon: Clock, text: "Fast Turnaround" },
                        { icon: PenTool, text: "Custom Fabrication" },
                        { icon: ShieldCheck, text: "Financing Available" }
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
                    <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary mb-6 tracking-tight">Recent <span className="italic font-light text-secondary">Masterpieces</span></h2>
                    <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto">Get inspired by some of our recent premium kitchen and bathroom transformations across Metro Atlanta.</p>
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
                            <p className="text-sm md:text-base text-gray-300 mt-2 max-w-lg hidden sm:block">A complete transformation featuring custom fabrication, exact templating, and our signature invisible seams.</p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-16 text-center">
                    <a href="#estimate-form" onClick={scrollToForm} className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors uppercase tracking-widest text-sm border-b-2 border-primary hover:border-secondary pb-1">
                        Book your design consultation today <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>

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
                    Don't settle for an <span className="italic font-light text-secondary">outdated space.</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                    Join over 200+ homeowners in Metro Atlanta who transformed their spaces with unparalleled craftsmanship.
                </p>
                <a
                    href="#estimate-form"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center bg-secondary text-white text-lg font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_40px_rgba(193,161,104,0.3)] hover:shadow-[0_0_50px_rgba(193,161,104,0.5)] hover:-translate-y-1 group"
                >
                    Claim Your Free Estimate <ArrowRight size={20} className="ml-4 transform group-hover:translate-x-2 transition-transform" />
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
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the image area
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