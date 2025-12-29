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
        Background Image with Parallax Effect 
      */}
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: `blur(${scrollY * 0.005}px)`
        }}
      >
        <img 
          src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg" 
          alt="Luxury Kitchen Remodel in Atlanta" 
          className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-primary/90"></div>
      </div>

      <div 
        className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-32 md:pt-0 will-change-transform"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`, 
          opacity: Math.max(0, 1 - scrollY / 600)
        }}
      >
        <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 max-w-5xl">
            <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs md:text-sm uppercase tracking-widest mb-6 font-medium">
                Atlanta's Premier Stone Fabricator
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-2xl leading-tight tracking-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#fde047] to-[#eab308]">Living Space</span>
            </h1>
            <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto drop-shadow-lg text-gray-200 leading-relaxed font-light">
            Exquisite granite, marble, and quartz craftsmanship. <br className="hidden md:block"/>
            Bringing luxury to Duluth, Alpharetta, and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-20">
            <a 
                href="#showroom" 
                className="group relative bg-secondary hover:bg-[#b47a03] text-white text-lg font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(202,138,4,0.4)] overflow-hidden"
            >
                <span className="relative z-10">Visit Showroom</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a 
                href="#contact" 
                className="bg-white/5 hover:bg-white/10 text-white text-lg font-bold py-4 px-10 rounded-full transition-all hover:scale-105 border border-white/30 backdrop-blur-md"
            >
                Get Free Quote
            </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;