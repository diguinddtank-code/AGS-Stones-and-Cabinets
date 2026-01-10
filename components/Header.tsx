import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, Instagram, Facebook } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Optimized: Only update state if the boolean value actually changes
          const scrollTop = window.scrollY;
          const scrolled = scrollTop > 20;
          
          // Using callback to access latest state without dependency array issue
          setIsScrolled(prev => {
             if (prev !== scrolled) return scrolled;
             return prev;
          });

          // Scroll Progress Calculation
          const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (totalHeight > 0) {
            setScrollProgress(scrollTop / totalHeight);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
      if (mobileMenuOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
      return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Showroom', href: '#showroom' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b will-change-transform ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-200/50 py-3' 
            : 'bg-transparent border-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-12 md:h-16 relative">
          
          {/* LOGO (Visible on Mobile & Desktop) */}
          <a href="#" className="block group z-50 relative" aria-label="AGS Stones Home">
             <img 
              src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
              alt="AGS Stones and Cabinets Logo" 
              className={`h-10 md:h-12 w-auto transition-all duration-300 ${
                isScrolled 
                  ? 'filter-none' // Original Colors
                  : 'brightness-0 invert drop-shadow-lg' // White Logo
              }`}
              fetchPriority="high"
              width="180"
              height="60"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main Desktop Navigation">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-medium tracking-wide text-sm uppercase transition-all duration-300 hover:-translate-y-0.5 ${
                  isScrolled ? 'text-gray-700 hover:text-secondary' : 'text-white/90 hover:text-white drop-shadow-md'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:4049524534" 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                isScrolled 
                  ? 'bg-primary text-white hover:bg-gray-800' 
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
              aria-label="Call AGS Stones at 404-952-4534"
            >
              <Phone size={16} aria-hidden="true" />
              (404) 952-4534
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden z-50 p-2 cursor-pointer relative rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <Menu size={28} className={!isScrolled && !mobileMenuOpen ? 'text-white drop-shadow-md' : 'text-gray-800'} />
          </button>
        </div>

        {/* Scroll Progress Bar - Hidden on Mobile */}
        <div className={`hidden md:block absolute bottom-0 left-0 h-[2px] bg-transparent w-full`}>
            <div 
                className="h-full bg-secondary shadow-[0_0_10px_#ca8a04] will-change-transform"
                style={{ width: `${scrollProgress * 100}%`, opacity: isScrolled ? 1 : 0 }}
            ></div>
        </div>
      </header>

      {/* 
          MOBILE SIDE DRAWER
          Moved OUTSIDE the header to prevent z-index/stacking context clipping issues.
          Now sits at z-[100] to cover everything including StickyCta.
      */}
      <div 
          id="mobile-navigation-drawer"
          className={`md:hidden fixed inset-0 z-[100] transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible delay-300'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
      >
          <div 
              className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ${
                  mobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
          ></div>

          <div 
              className={`absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col pt-24 border-l border-white/20 ${
                  mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
              {/* Close button inside drawer */}
              <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-4 p-2 bg-gray-50/50 border border-gray-200 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Close menu"
              >
                  <X size={20} aria-hidden="true" />
              </button>

              <nav className="flex-grow overflow-y-auto py-4 px-6 flex flex-col gap-4">
                  {navLinks.map((link, idx) => (
                      <a 
                          key={link.name} 
                          href={link.href} 
                          className="text-xl font-serif text-gray-800 py-3 border-b border-gray-100 flex items-center justify-between group active:text-secondary"
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ transitionDelay: `${mobileMenuOpen ? idx * 50 : 0}ms` }}
                      >
                          {link.name}
                          <ArrowRight size={18} className="text-gray-300 group-hover:text-secondary -translate-x-2 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                      </a>
                  ))}
              </nav>

              <div className="p-6 bg-gray-900 text-white mt-auto relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <a 
                      href="tel:4049524534" 
                      className="flex items-center justify-center gap-2 bg-secondary text-white py-4 rounded-xl font-bold shadow-lg mb-6 active:scale-95 transition-transform relative z-10"
                  >
                      <Phone size={20} /> Call for Estimate
                  </a>
                  
                  <div className="flex justify-center gap-6 text-gray-400 relative z-10">
                      <a href="#" className="hover:text-white transition-colors" aria-label="Visit our Instagram"><Instagram size={24} /></a>
                      <a href="#" className="hover:text-white transition-colors" aria-label="Visit our Facebook"><Facebook size={24} /></a>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Header;