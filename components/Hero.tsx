import React, { useEffect, useRef } from 'react';
import { Star, CheckCircle2, ArrowRight, ShieldCheck, Phone, User, Mail, Layers } from 'lucide-react';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestThumb: number;

    const handleScroll = () => {
      requestThumb = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight) return;

        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
        }

        if (contentRef.current) {
            const opacity = Math.max(0, 1 - (scrollY / (window.innerHeight * 0.6)));
            const yOffset = scrollY * 0.3;
            const scale = Math.max(0.95, 1 - (scrollY / (window.innerHeight * 4)));

            contentRef.current.style.opacity = opacity.toString();
            contentRef.current.style.transform = `translateY(${yOffset}px) scale(${scale})`;
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
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-24 lg:pt-28 pb-32 md:pb-12">
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ filter: `brightness(0.8)` }}
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

        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/25 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/60 lg:to-primary/0"></div>
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 h-full flex flex-col justify-center will-change-transform origin-center"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-7xl mx-auto w-full">
            
            <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0 animate-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-xs md:text-sm uppercase tracking-widest mb-6 font-medium shadow-sm text-white mx-auto lg:mx-0">
                    <Star size={12} className="text-secondary fill-secondary" />
                    #1 Factory Direct Fabricator in GA
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6 drop-shadow-xl leading-[1.15] tracking-tight text-white max-w-4xl mx-auto lg:mx-0 shadow-black/10">
                  Atlanta's Premier <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#fde047] to-[#eab308] drop-shadow-md">Granite & Cabinet</span><br />
                  Fabricators
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-white mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-md">
                   Buy direct from the factory and save up to 30%. Expert installation of <strong>Granite, Quartz, Marble</strong>, and <strong>Custom Kitchen Cabinets</strong> in Duluth & Metro Atlanta.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10 lg:hidden px-4 sm:px-0 justify-center lg:justify-start">
                     <a href="#contact" className="w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-2">
                        Get Free Quote <ArrowRight size={18} />
                     </a>
                     <a href="tel:4049524534" className="w-full sm:w-auto bg-black/30 backdrop-blur-md border border-white/40 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2">
                        <Phone size={18} /> Call Now
                     </a>
                </div>

                <div className="hidden lg:flex flex-col gap-3 mb-10 text-white drop-shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-1 rounded-full backdrop-blur-sm border border-white/10"><CheckCircle2 className="text-secondary" size={18} /></div>
                        <span className="font-semibold text-lg">Factory Direct Pricing (No Middlemen)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-1 rounded-full backdrop-blur-sm border border-white/10"><CheckCircle2 className="text-secondary" size={18} /></div>
                        <span className="font-semibold text-lg">Largest Indoor Slab Yard in Duluth</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-1 rounded-full backdrop-blur-sm border border-white/10"><CheckCircle2 className="text-secondary" size={18} /></div>
                        <span className="font-semibold text-lg">5-Day Turnaround Guarantee</span>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-start">
                     <a 
                        href="https://www.google.com/search?q=AGS+Stones+and+Cabinets"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-3 bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/15 rounded-full pr-5 pl-1.5 py-1.5 transition-all group hover:scale-[1.02] cursor-pointer"
                     >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                             <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                                alt="Google Review" 
                                className="w-5 h-5" 
                                width="20"
                                height="20"
                             />
                        </div>
                        
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white text-sm leading-none">5.0</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <Star key={i} size={12} className="fill-[#FBBC05] text-[#FBBC05]" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[10px] font-medium text-gray-300 leading-none mt-1 group-hover:text-white transition-colors">
                                120+ Excellent Reviews
                            </p>
                        </div>
                     </a>
                </div>
            </div>

            {/* Compact Quick Quote Form */}
            <div className="hidden lg:block lg:col-span-5 relative mt-8 lg:mt-0">
                 <div className="flex absolute -top-4 -right-4 z-20 bg-white text-primary p-3 rounded-2xl shadow-xl items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <ShieldCheck size={24} className="text-secondary" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Guaranteed</p>
                        <p className="font-bold text-sm">Best Price in GA</p>
                    </div>
                 </div>

                 <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 border border-white/20 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 w-full max-w-[400px] ml-auto">
                    <div className="mb-6">
                        <div className="inline-block bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-2">
                           Fast Estimate
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-1">Quick Quote</h3>
                        <p className="text-gray-500 text-xs">Fill out the form below to get your free estimate.</p>
                    </div>

                    <form action="https://formsubmit.co/agsstonesandcabinets@gmail.com" method="POST" className="space-y-4">
                        <input type="hidden" name="_subject" value="Hero Quick Quote (Compact)" />
                        <input type="hidden" name="_next" value="https://agsstonefabricators.com" />
                        
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Your Name" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                                required 
                            />
                        </div>
                        
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                                <Phone size={18} />
                            </div>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Phone Number" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                                required 
                            />
                        </div>
                        
                        <div className="relative group">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                                <Mail size={18} />
                            </div>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                                required 
                            />
                        </div>

                        <div className="relative group">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                                <Layers size={18} />
                            </div>
                            <select 
                                name="service_interest"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all appearance-none text-gray-500 invalid:text-gray-400 cursor-pointer" 
                                required
                                defaultValue=""
                            >
                                <option value="" disabled>Service Needed?</option>
                                <option value="Countertops">Countertops (Granite/Quartz)</option>
                                <option value="Cabinets">Kitchen Cabinets</option>
                                <option value="Remodeling">Full Remodel</option>
                                <option value="Bathroom">Bathroom/Vanity</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group"
                        >
                            <span>Get Free Quote</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                            <ShieldCheck size={12} /> Privacy protected. No spam.
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