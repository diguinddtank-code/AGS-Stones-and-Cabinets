import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth performance on mobile
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Changed h-screen to min-h-[100dvh] to account for mobile browser bars properly
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black pb-24 md:pb-0">
      {/* 
        Background Image with Parallax Effect 
        - Moves at 50% speed of scroll (scrollY * 0.5)
        - Blurs slightly as user scrolls down for depth
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* 
        Content Container:
        - pt-44 on mobile (Increased from 32 to push text down further below the logo)
        - Parallax Speed 0.2 (Moves slower than scroll, faster than bg)
        - Fades out opacity as user scrolls away
      */}
      <div 
        className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-44 md:pt-0 will-change-transform"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`, 
          opacity: Math.max(0, 1 - scrollY / 600) // Fades out completely after 600px scroll
        }}
      >
        <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight tracking-tight">
            Crafting Your Dream <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300">Kitchen & Bath</span>
            </h1>
            <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-lg text-gray-100 leading-relaxed font-light">
            Premier granite, marble, quartz countertops and custom cabinetry in Metro Atlanta. 
            <span className="block md:inline mt-2 md:mt-0"> Experience quality craftsmanship from Duluth to your doorstep.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-20">
            <a 
                href="#visualizer" 
                className="bg-secondary hover:bg-yellow-600 text-white text-lg font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(202,138,4,0.5)] border-2 border-secondary touch-manipulation"
            >
                Design With AI
            </a>
            <a 
                href="#contact" 
                className="bg-transparent hover:bg-white/10 text-white text-lg font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl border-2 border-white backdrop-blur-sm touch-manipulation"
            >
                Get Free Quote
            </a>
            </div>
        </div>
      </div>

      {/* 
        Bottom Transition Gradient:
        Creates a smooth blend into the next section (which is bg-gray-50),
        removing the harsh line between the hero image and white content.
      */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;