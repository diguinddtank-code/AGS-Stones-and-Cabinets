import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-primary pb-0">
      {/* 
        Background Video with Parallax Effect 
        Moves at 0.5 speed relative to scroll
      */}
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: `brightness(0.6)` // Adjusted brightness for better video visibility while keeping text readable
        }}
      >
        <video
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
            autoPlay
            muted
            loop
            playsInline
            poster="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
        >
            {/* Cinematic Luxury Kitchen Video - High Quality 4K */}
            <source src="https://videos.pexels.com/video-files/7578552/7578552-uhd_3840_2160_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Cinematic Gradient Overlay - Subtle to let video shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-primary/90"></div>
      </div>

      {/* 
        Text Content Parallax 
        Moves at 0.3 speed (slower than background's 0.5 relative to viewport, creating depth)
      */}
      <div 
        className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-32 pb-28 md:py-0 will-change-transform"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`, 
          opacity: Math.max(0, 1 - scrollY / 700)
        }}
      >
        <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 max-w-5xl w-full">
            <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6 font-medium shadow-sm">
                Atlanta's #1 Granite Fabricator & Cabinet Maker
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 md:mb-6 drop-shadow-2xl leading-tight tracking-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#fde047] to-[#eab308]">Stone & Cabinets</span><br />
            For Your Home
            </h1>
            
            <div className="max-w-3xl mx-auto mb-8 md:mb-12 space-y-3 md:space-y-4 px-2">
                <p className="text-base md:text-2xl drop-shadow-lg text-gray-100 leading-relaxed font-light">
                   Visit our <strong>Kitchen and Bath Showroom</strong> in Duluth. We specialize in Granite, Quartz, Marble fabrication, and Custom Cabinet installation.
                </p>
                <p className="text-sm md:text-lg drop-shadow-lg text-gray-300 font-light max-w-2xl mx-auto hidden sm:block">
                    Factory-direct pricing for Bathroom Renovations and Kitchen Remodeling in Metro Atlanta.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 relative z-20 px-4 sm:px-0">
            <a 
                href="#showroom" 
                className="group relative bg-secondary hover:bg-[#b47a03] text-white text-base md:text-lg font-bold py-3.5 md:py-4 px-10 rounded-xl md:rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(202,138,4,0.4)] overflow-hidden w-full sm:w-auto"
            >
                <span className="relative z-10">Visit Showroom</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a 
                href="#contact" 
                className="bg-white/10 hover:bg-white/20 text-white text-base md:text-lg font-bold py-3.5 md:py-4 px-10 rounded-xl md:rounded-full transition-all hover:scale-105 border border-white/40 backdrop-blur-md w-full sm:w-auto shadow-lg"
            >
                Free Quote
            </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;