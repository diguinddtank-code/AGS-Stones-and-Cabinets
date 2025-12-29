import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, Instagram, Facebook } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Header background transition logic
      const scrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled);
      }

      // Scroll Progress Calculation
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

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
      {/* 
        MOBILE LOGO
      */}
      <div className={`fixed z-[60] block md:hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
            isScrolled 
              ? 'top-3 left-4 w-auto translate-x-0 translate-y-0 pointer-events-none' 
              : 'top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80vw] pointer-events-none'
          }`}>
        <a href="#" className="block pointer-events-auto origin-top-left">
          <img 
            src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
            alt="AGS Stones and Cabinets" 
            className={`transition-all duration-700 w-auto ${
              isScrolled 
                ? 'h-10 filter-none' 
                : 'h-24 mx-auto brightness-0 invert drop-shadow-2xl'
            }`}
          />
        </a>
      </div>

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-white/20 py-3' // Glassmorphism
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-end md:justify-between items-center h-12 md:h-16 relative">
          
          {/* DESKTOP ONLY LOGO */}
          <a href="#" className="hidden md:block group">
             <img 
              src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
              alt="AGS Stones and Cabinets" 
              className={`h-12 w-auto transition-all duration-300 ${
                isScrolled 
                  ? 'filter-none' // Original Colors
                  : 'brightness-0 invert drop-shadow-lg' // White Logo
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
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
            >
              <Phone size={16} />
              (404) 952-4534
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden z-50 p-2 cursor-pointer relative rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={32} className={!isScrolled && !mobileMenuOpen ? 'text-white drop-shadow-md' : 'text-gray-800'} />
          </button>
        </div>

        {/* Scroll Progress Bar - Hidden on Mobile */}
        <div className={`hidden md:block absolute bottom-0 left-0 h-[2px] bg-transparent w-full`}>
            <div 
                className="h-full bg-secondary shadow-[0_0_10px_#ca8a04]"
                style={{ width: `${scrollProgress * 100}%`, opacity: isScrolled ? 1 : 0 }}
            ></div>
        </div>

        {/* 
            MOBILE SIDE DRAWER
        */}
        <div className={`md:hidden fixed inset-0 z-[70] transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible delay-300'}`}>
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            <div 
                className={`absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
                    <span className="font-serif font-bold text-xl text-primary tracking-tight">AGS Stones</span>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto py-6 px-6 flex flex-col gap-4">
                    {navLinks.map((link, idx) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className="text-xl font-serif text-gray-800 py-3 border-b border-gray-50 flex items-center justify-between group active:text-secondary"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ transitionDelay: `${mobileMenuOpen ? idx * 50 : 0}ms` }}
                        >
                            {link.name}
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-secondary -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </a>
                    ))}
                </div>

                <div className="p-6 bg-gray-900 text-white mt-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <a 
                        href="tel:4049524534" 
                        className="flex items-center justify-center gap-2 bg-secondary text-white py-4 rounded-xl font-bold shadow-lg mb-6 active:scale-95 transition-transform relative z-10"
                    >
                        <Phone size={20} /> Call for Estimate
                    </a>
                    
                    <div className="flex justify-center gap-6 text-gray-400 relative z-10">
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
                    </div>
                </div>
            </div>
        </div>

      </header>
    </>
  );
};

export default Header;