'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Check, Calendar, Phone, ArrowRight, ShieldCheck, Star, PenTool, Hammer, Truck, HeartHandshake, HelpCircle, MapPin } from 'lucide-react';
import type { ServiceDetail } from '@/lib/servicesData';

export default function ServiceDynamicContent({ service, cityOverride }: { service: ServiceDetail; cityOverride?: string }) {
    const searchParams = useSearchParams();
    const cityParam = searchParams.get('city') || searchParams.get('loc');
    
    const initialCity = cityOverride 
        ? cityOverride.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "Atlanta Area";
        
    const [userCity, setUserCity] = useState(initialCity);

    // Compute the parent prefix for local internal dynamic linking mapping (SEO master-link web)
    let activePrefix = 'countertops';
    const locationsList = ['atlanta', 'duluth', 'alpharetta', 'roswell', 'johns-creek', 'suwanee', 'marietta', 'sandy-springs', 'buckhead'];
    let slugLower = service.slug.toLowerCase();
    if (slugLower.endsWith('-ga')) {
        slugLower = slugLower.slice(0, -3);
    }
    for (const loc of locationsList) {
        if (slugLower.endsWith(`-${loc}`)) {
            activePrefix = slugLower.slice(0, -(loc.length + 1));
            break;
        }
    }
    // If not matching prefix or default, fallback to service.slug or base service slug
    if (!activePrefix || activePrefix === 'countertops' && !service.slug.includes('countertops')) {
        activePrefix = service.slug;
    }
    
    useEffect(() => {
        if (!cityOverride && cityParam) {
            // Capitalize city
            const formatted = cityParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            setUserCity(formatted);
        }
    }, [cityParam, cityOverride]);
    
    // Derived values for dynamic location insertion
    const isSpecificLocation = userCity.toLowerCase() !== "atlanta area";
    const localizedHeroSubtitle = isSpecificLocation 
        ? `Serving ${userCity} & Surrounding Areas` 
        : `Custom ${service.slug.replace('-', ' ')} Experts`;
        
    const localizedTrustHeadline = isSpecificLocation
        ? `Why Homeowners in ${userCity} Choose Us`
        : `Why Homeowners Trust AGS Stones`;

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
    const opacityHero = useTransform(heroProgress, [0, 0.8], [1, 0]);
    const yHeroText = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
    
    const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    const { scrollY } = useScroll();
    const [showMobileSticky, setShowMobileSticky] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const threshold = typeof window !== "undefined" ? window.innerHeight * 0.8 : 500;
        if (latest > threshold) {
            setShowMobileSticky(true);
        } else {
            setShowMobileSticky(false);
        }
    });

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const textReveal = {
        hidden: { y: "100%" },
        show: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div ref={containerRef} className="relative bg-[#0a0a0a] text-white overflow-hidden selection:bg-secondary/30">
            {/* Smooth Scroll Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Immersive Hero Section */}
            <section ref={heroRef} className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ y: yBackground }}
                    className="absolute inset-0 w-full h-[130%] -top-[15%]"
                >
                    <Image 
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-40 brightness-75 contrast-125"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
                </motion.div>

                <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-32 pb-24 md:py-0">
                    <motion.div 
                        style={{ y: yHeroText, opacity: opacityHero }}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full mb-6 md:mb-8 shadow-2xl">
                            <span className="text-secondary w-4 h-4 md:w-auto md:h-auto">{service.icon}</span>
                            <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">{localizedHeroSubtitle}</span>
                        </motion.div>
                        
                        <div className="overflow-visible mb-4 md:mb-6 pb-2">
                            <motion.h1 variants={textReveal} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tighter">
                                {service.title.split(' ').map((word, i) => (
                                    <React.Fragment key={i}>
                                        {word === '&' ? <span className="text-secondary italic">&</span> : word}
                                        {i !== service.title.split(' ').length - 1 && ' '}
                                    </React.Fragment>
                                ))}
                            </motion.h1>
                        </div>
                        
                        <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed mb-8 md:mb-10 max-w-2xl border-l-2 border-secondary pl-4 md:pl-6">
                            {service.shortDesc} 
                            <span className="block mt-2 text-white">
                                {isSpecificLocation 
                                    ? `Beautiful, custom craftsmanship now available in ${userCity}.` 
                                    : "Quality materials, expert installation, and results you'll love."}
                            </span>
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 w-full">
                            <Link href="/fast-quote" className="group relative overflow-hidden bg-secondary text-white font-bold py-4 px-6 md:py-5 md:px-10 rounded-full transition-all duration-500 w-full sm:w-auto text-center cursor-pointer shadow-xl shadow-secondary/20 block">
                                <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-[15px] md:text-lg whitespace-nowrap">
                                    Get Your Free Estimate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5 shrink-0" />
                                </span>
                                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                                <span className="absolute inset-0 z-0 flex items-center justify-center gap-2 md:gap-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-bold text-[15px] md:text-lg whitespace-nowrap">
                                    Get Your Free Estimate <ArrowRight size={18} className="md:w-5 md:h-5 shrink-0" />
                                </span>
                            </Link>

                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
                                <div className="flex -space-x-3">
                                    {[1,2,3,4].map((i) => (
                                        <div key={i} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-600 flex items-center justify-center overflow-hidden`}>
                                            <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} width={40} height={40} alt="Avatar" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-secondary mb-0.5"><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/></div>
                                    <span>{localizedTrustHeadline}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">Scroll to Explore</span>
                    <motion.div 
                        animate={{ y: [0, 10, 0] }} 
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent"
                    />
                </div>
            </section>

            {/* The Desire / Overview Section */}
            <section className="py-20 md:py-32 relative bg-white text-gray-900 overflow-hidden rounded-t-3xl md:rounded-t-[3rem] -mt-10 z-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:items-center">
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-6 space-y-6 md:space-y-8"
                        >
                            <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                                <span className="w-8 h-px bg-secondary"></span> 
                                The Vision
                            </h2>
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-primary">
                                Beautiful upgrades that transform your home.
                            </h3>
                            <div className="text-base md:text-lg leading-relaxed text-gray-600 space-y-4 md:space-y-6 font-light">
                                <p>
                                    {service.longDesc}
                                </p>
                                <p>
                                    When you choose AGS Stones & Cabinets, you're partnering with an experienced local team that cares about your home. We handle everything from design to fabrication, cutting out the middlemen to bring you premium quality without the retail markups. 
                                    Looking for {activePrefix === 'cabinets' || activePrefix === 'custom-cabinets' ? 'custom cabinets' : 'countertops'} in <Link href={`/${activePrefix}-alpharetta-ga`} className="text-secondary font-medium underline hover:text-primary transition-colors">Alpharetta</Link>? Or custom countertop installations in <Link href={`/countertops-johns-creek-ga`} className="text-secondary font-medium underline hover:text-primary transition-colors">Johns Creek</Link> or <Link href={`/countertops-sandy-springs-ga`} className="text-secondary font-medium underline hover:text-primary transition-colors">Sandy Springs</Link>? We have dedicated fabricators assigned to every major area of Metro Atlanta to ensure custom templating and turnaround in under a week.
                                </p>
                            </div>

                            <ul className="space-y-4 md:space-y-5 pt-6 md:pt-8 border-t border-gray-100">
                                {service.features.map((feature, idx) => (
                                    <motion.li 
                                        key={idx} 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 group cursor-default"
                                    >
                                        <div className="w-2 h-2 rounded-full border border-secondary/40 bg-secondary/80 group-hover:bg-secondary group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(217,119,6,0.6)] transition-all duration-300"></div>
                                        <span className="text-gray-900 font-medium text-base md:text-lg group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="lg:col-span-6 lg:col-start-7 relative">
                            <motion.div 
                                style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [50, -50]) }}
                                className="relative rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                            >
                                <motion.div style={{ scale: scaleImage }} className="w-full h-full relative">
                                    <Image 
                                        src={service.image}
                                        alt={`${service.title} detail`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                                </motion.div>

                                {/* Floating Trust Badge */}
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", delay: 0.5 }}
                                    className="absolute bottom-8 left-8 bg-white p-6 rounded-3xl shadow-2xl backdrop-blur-md max-w-[200px]"
                                >
                                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <p className="font-bold text-primary leading-tight">Locally fabricated & guaranteed.</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Quote Break */}
            <section className="relative py-24 md:py-40 overflow-hidden bg-primary text-white">
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0.5, 0.9], ["-20%", "20%"]) }}
                    className="absolute inset-0 opacity-20 grayscale"
                >
                    <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" fill alt="Texture" className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
                
                <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Star className="text-secondary w-8 h-8 md:w-12 md:h-12 mx-auto mb-6 md:mb-8 opacity-50" />
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic font-light leading-snug mb-6 md:mb-8">
                            "Great design is in the details. We take pride in making sure every cut, edge, and finish looks absolutely flawless."
                        </h2>
                        <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-secondary font-bold">— The AGS Team</p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            {service.gallery && service.gallery.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-16 md:mb-20">
                            <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">Portfolio</h2>
                            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">{service.title} Gallery</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {service.gallery.map((imgUrl, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <Image 
                                        src={imgUrl}
                                        alt={`${service.title} work example ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 mix-blend-overlay"></div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-16 md:mt-24 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex flex-col items-center p-8 md:p-16 bg-[#f8f9fa] rounded-[2rem] border border-gray-200 w-full max-w-4xl mx-auto shadow-sm"
                            >
                                <MapPin className="text-secondary w-10 h-10 mb-6 opacity-80" strokeWidth={1.5} />
                                <h4 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">Want to see more?</h4>
                                <p className="text-gray-600 mb-6 max-w-lg text-lg">
                                    Words and photos can only do so much. Visit our Duluth showroom to feel the textures, see the true colors, and explore our massive inventory in person.
                                </p>
                                <p className="text-gray-900 font-medium mb-8 text-center max-w-sm">
                                    AGS STONES & CABINETS<br/>
                                    4579 Abbotts Bridge Rd Suite -10<br/>
                                    Duluth, GA 30097, United States
                                </p>
                                <a 
                                    href="https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden bg-primary text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-full transition-all duration-500 hover:shadow-xl inline-flex items-center justify-center gap-3"
                                >
                                    <span className="relative z-10 flex items-center gap-2 text-base md:text-lg transition-transform duration-500 group-hover:-translate-y-[150%]">
                                        Get Directions <ArrowRight size={18} />
                                    </span>
                                    <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-base md:text-lg text-primary bg-secondary translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500">
                                        Get Directions <ArrowRight size={18} />
                                    </span>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Service Areas Section (Replacing Showroom CTA) */}
            <section className="py-20 md:py-32 bg-white text-gray-900 border-t border-gray-100 border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                                <MapPin size={16} /> 
                                Service Areas
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                                {isSpecificLocation ? `Proudly Serving ${userCity}` : "Serving All of Metro Atlanta"}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                                Based in Duluth, we extend our {service.title.toLowerCase()} expertise to the finest homes across Georgia. Wherever you are, perfection is within reach.
                            </p>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm font-medium pt-4 border-t border-gray-100">
                                {["Atlanta", "Alpharetta", "Roswell", "Duluth", "Johns Creek", "Marietta", "Suwanee", "Sandy Springs", "Buckhead"].map((city) => {
                                    const citySlug = city.toLowerCase().replace(' ', '-');
                                    const dynamicUrl = `/${activePrefix}-${citySlug}-ga`;
                                    return (
                                        <Link 
                                            key={city} 
                                            href={dynamicUrl}
                                            className={`flex items-center gap-2 hover:text-secondary transition-colors cursor-pointer group ${userCity.toLowerCase() === city.toLowerCase() ? 'text-green-600 font-bold' : 'text-gray-500'}`}
                                        >
                                            <div className="relative flex h-2 w-2 shrink-0">
                                              {userCity.toLowerCase() === city.toLowerCase() && (
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                              )}
                                              <span className={`relative inline-flex rounded-full h-2 w-2 ${userCity.toLowerCase() === city.toLowerCase() ? 'bg-green-500' : 'bg-green-500/40 group-hover:bg-secondary'}`}></span>
                                            </div> 
                                            <span className="border-b border-transparent group-hover:border-secondary transition-colors pb-0.5">{city}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                            
                            <div className="pt-6">
                                <Link href="/contact" className="text-primary font-bold hover:text-secondary flex items-center gap-2 transition-colors w-fit group">
                                    <span className="border-b-2 border-primary/20 group-hover:border-secondary pb-0.5">Don't see your city? Contact us</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group"
                        >
                            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 text-xs font-bold text-gray-800">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                Currently scheduling in these areas
                            </div>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105955.0270034237!2d-84.34914101150428!3d34.02059363574005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598c467657571%3A0x6762332675667676!2s4579%20Abbotts%20Bridge%20Rd%20Suite%20-10%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1709867543210!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-1000"
                            ></iframe>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Seamless Process */}
            <section className="py-20 md:py-32 bg-[#f8f9fa] text-primary relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-end mb-16 md:mb-24">
                        <div className="flex-1">
                            <h2 className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">Our Process</h2>
                            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-[1.1]">Smooth & stress-free.</h3>
                        </div>
                        <div className="max-w-md">
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">We respect your time and your home. From templating to the final install, our team works efficiently to get the job done right the first time.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 relative">
                        <div className="hidden md:block absolute top-[28px] left-[10%] w-[80%] h-px bg-gray-300 -z-10"></div>
                        
                        {[
                            { icon: <PenTool />, title: "Accurate Measurements", desc: "We map out your space so everything fits perfectly. No guessing." },
                            { icon: <HeartHandshake />, title: "Hand-Picked Materials", desc: "Access to top quality stone slabs directly at our showroom." },
                            { icon: <Hammer />, title: "In-House Fabrication", desc: "We cut and polish your stone right here in our Duluth shop." },
                            { icon: <Truck />, title: "Professional Install", desc: "Our experienced crew gets it installed quickly and cleanly." }
                        ].map((step, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.8 }}
                                className="relative group"
                            >
                                <div className="w-14 h-14 bg-white border border-gray-200 text-primary rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-secondary group-hover:text-white group-hover:-translate-y-2 transition-all duration-300">
                                    {step.icon}
                                </div>
                                <div className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Phase 0{idx + 1}</div>
                                <h4 className="text-2xl font-bold font-serif mb-3 text-primary">{step.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scarcity / Urgency CTA */}
            <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 lg:p-24 rounded-3xl md:rounded-[3rem] shadow-2xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full mb-6 md:mb-8 border border-secondary/20">
                            Booking Now
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 md:mb-8 leading-[1.1]">
                            Ready to upgrade your space?
                        </h2>
                        
                        <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                            Because we handle all our fabrication in-house and never cut corners, our schedule fills up fast. Request a free estimate today to lock in your project {isSpecificLocation ? `in ${userCity} ` : ""}for the upcoming weeks.
                        </p>
                        
                        <div className="flex flex-col w-full sm:w-auto mt-8 md:mt-10">
                            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full">
                                <Link href="/fast-quote" className="bg-secondary text-white hover:bg-white hover:text-primary font-bold py-4 md:py-6 px-4 md:px-12 rounded-full transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(217,119,6,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 md:gap-3 text-[15px] md:text-lg w-full sm:w-auto whitespace-nowrap">
                                    Get Your Free Estimate <ArrowRight size={22} className="shrink-0" />
                                </Link>
                            </div>
                            
                            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-gray-400 text-xs sm:text-sm mt-6 md:mt-8 font-medium">
                                <span className="flex items-center gap-1.5"><Check size={14} className="text-secondary" /> Zero commitment required</span>
                                <span className="hidden sm:inline text-gray-600">•</span>
                                <span className="flex items-center gap-1.5"><Check size={14} className="text-secondary" /> Free In-Home Estimate</span>
                                <span className="hidden sm:inline text-gray-600">•</span>
                                <span className="flex items-center gap-1.5"><Check size={14} className="text-secondary" /> Factory Direct Pricing</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mobile Sticky Conversion Footer */}
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: showMobileSticky ? 0 : 100, opacity: showMobileSticky ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex gap-2 pointer-events-auto"
                style={{ pointerEvents: showMobileSticky ? 'auto' : 'none' }}
            >
                <a 
                    href="tel:4049524534"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
                            if ((window as any).fbq) (window as any).fbq('track', 'Contact'); 
                        }
                    }}
                    className="flex-1 bg-white text-primary border border-gray-100 shadow-2xl py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm"
                >
                    <Phone size={16} className="text-secondary" />
                    Call
                </a>
                <Link 
                    href="/fast-quote" 
                    className="flex-[2] bg-secondary text-white shadow-[0_8px_20px_-6px_rgba(217,119,6,0.8)] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm"
                >
                    Get Free Quote <ArrowRight size={16} />
                </Link>
            </motion.div>
        </div>
    );
}
