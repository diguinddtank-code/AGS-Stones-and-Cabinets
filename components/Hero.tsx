import React, { useEffect, useRef } from 'react';
import { Star, CheckCircle2, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestThumb: number;

    const handleScroll = () => {
      requestThumb = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight) return;

        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestThumb);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-24 lg:pt-28 pb-12">
      {/* 
        Background Video with Parallax Effect 
      */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ filter: `brightness(0.55)` }}
      >
        <video
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
            autoPlay
            muted
            loop
            playsInline
            poster="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
        >
            <source src="https://storage.googleapis.com/msgsndr/yRboz8P4zFeLUF6bAk8i/media/680a5a6f1eba4b32d1925215.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 lg:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/90 lg:to-primary/0"></div>
      </div>

      {/* 
        Main Content Grid
        - Increased px (padding-x) for desktop to prevent edge hugging
        - Added max-w-7xl to constrain content width (Compact Look)
      */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-7xl mx-auto w-full">
            
            {/* LEFT COLUMN: Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0 animate-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs md:text-sm uppercase tracking-widest mb-6 font-medium shadow-sm text-white mx-auto lg:mx-0">
                    <Star size={12} className="text-secondary fill-secondary" />
                    Atlanta's #1 Granite Fabricator
                </div>

                {/* Typography optimized for compact desktop look (slightly smaller than previous giant text) */}
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6 drop-shadow-2xl leading-[1.15] tracking-tight text-white max-w-4xl mx-auto lg:mx-0">
                  Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#fde047] to-[#eab308]">Granite & Cabinets</span><br />
                  in Metro Atlanta
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                   Transforming homes with <strong>Precision Stone Fabrication</strong> and <strong>Custom Cabinetry</strong>. Experience 5-star quality, factory-direct pricing, and 5-day turnaround.
                </p>

                {/* CTA BUTTONS: Visible on Mobile AND Tablet */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 lg:hidden px-4 sm:px-0 justify-center lg:justify-start">
                     <a href="#contact" className="w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-2">
                        Get Free Quote <ArrowRight size={18} />
                     </a>
                     <a href="tel:4049524534" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2">
                        <Phone size={18} /> Call Now
                     </a>
                </div>

                {/* Key Benefits List (Visible on Desktop) */}
                <div className="hidden lg:flex flex-col gap-3 mb-10 text-white/90">
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-1 rounded-full"><CheckCircle2 className="text-secondary" size={18} /></div>
                        <span className="font-medium text-lg">Factory Direct Pricing (Save up to 30%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-1 rounded-full"><CheckCircle2 className="text-secondary" size={18} /></div>
                        <span className="font-medium text-lg">Huge Indoor Slab Yard in Duluth</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-1 rounded-full"><CheckCircle2 className="text-secondary" size={18} /></div>
                        <span className="font-medium text-lg">Turnkey Installation in 5 Days</span>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                     <div className="flex -space-x-3">
                         {[
                             "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop",
                             "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
                             "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
                             "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop"
                         ].map((img, i) => (
                             <img key={i} src={img} alt="Happy Customer" className="w-10 h-10 rounded-full border-2 border-primary object-cover" />
                         ))}
                     </div>
                     <div className="text-center sm:text-left">
                        <div className="flex text-yellow-400 justify-center sm:justify-start gap-0.5 mb-1">
                            {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={16} />)}
                        </div>
                        <p className="text-gray-300 text-sm font-medium">4.9/5 Rating from 120+ Homeowners</p>
                     </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Lead Gen Form (VISIBLE ONLY ON LARGE DESKTOPS) */}
            <div className="hidden lg:block lg:col-span-5 relative mt-8 lg:mt-0">
                 {/* Floating Badge */}
                 <div className="flex absolute -top-4 -right-4 z-20 bg-white text-primary p-3 rounded-2xl shadow-xl items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <ShieldCheck size={24} className="text-secondary" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Guaranteed</p>
                        <p className="font-bold text-sm">Best Price in GA</p>
                    </div>
                 </div>

                 <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 border border-white/20 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 w-full max-w-[420px] ml-auto">
                    <div className="mb-5">
                        <h3 className="text-xl font-serif font-bold text-primary mb-1">Get Your Free Estimate</h3>
                        <p className="text-gray-500 text-xs">Lock in this month's special pricing.</p>
                    </div>

                    <form action="https://formsubmit.co/agsstonesandcabinets@gmail.com" method="POST" className="space-y-3">
                        <input type="hidden" name="_subject" value="Hero Section Lead (High Intent)" />
                        <input type="hidden" name="_next" value="https://agsstonefabricators.com" />
                        
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder="First Name" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                                required 
                            />
                            <input 
                                type="text" 
                                name="lastName" 
                                placeholder="Last Name" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                                required 
                            />
                        </div>
                        
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="Phone Number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                            required 
                        />
                        
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                            required 
                        />
                        
                        <div className="relative">
                            <select 
                                name="service" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-gray-600 appearance-none cursor-pointer"
                            >
                                <option value="" disabled selected>I'm interested in...</option>
                                <option>Granite/Quartz Countertops</option>
                                <option>Custom Cabinets</option>
                                <option>Full Kitchen Remodel</option>
                                <option>Bathroom Vanity</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <ArrowRight size={14} className="rotate-90" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group mt-2"
                        >
                            <span>Get My Free Quote</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                            <ShieldCheck size={10} /> No obligation. Privacy protected.
                        </p>
                    </form>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;