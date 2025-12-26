import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, Instagram, Facebook } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Header background transition logic
      const scrolled = window.scrollY > 50;
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
    { name: 'Visualizer', href: '#visualizer' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Showroom', href: '#showroom' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* 
        MOBILE ONLY LOGO (Animated Flying Effect):
        Visible ONLY on Mobile (md:hidden). 
        
        State 1 (Top/Small): Fixed at top-left, small height, reset transform.
        State 2 (Hero/Big): Fixed at 15% vertical (moved up from 20%), centered horizontal, large height.
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
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-end md:justify-between items-center h-16 md:h-20 relative">
          
          {/* DESKTOP ONLY LOGO */}
          <a href="#" className="hidden md:block group">
             <img 
              src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
              alt="AGS Stones and Cabinets" 
              className={`h-16 w-auto transition-all duration-300 ${
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
                className={`font-semibold hover:text-secondary transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white drop-shadow-md'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:4049524534" 
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all shadow-lg ${
                isScrolled 
                  ? 'bg-secondary hover:bg-yellow-600 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30'
              }`}
            >
              <Phone size={18} />
              (404) 952-4534
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden z-50 p-2 cursor-pointer relative rounded-md hover:bg-black/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={32} className={!isScrolled && !mobileMenuOpen ? 'text-white drop-shadow-md' : 'text-gray-800'} />
          </button>
        </div>

        {/* Scroll Progress Bar - Hidden on Mobile */}
        <div className="hidden md:block absolute bottom-0 left-0 h-1 bg-gray-200 w-full opacity-50">
            <div 
                className="h-full bg-secondary transition-all duration-150 ease-out shadow-[0_0_10px_#ca8a04]"
                style={{ width: `${scrollProgress * 100}%` }}
            ></div>
        </div>

        {/* 
            MOBILE SIDE DRAWER (Nav Lateral)
            Sliding from Right to Left
        */}
        <div className={`md:hidden fixed inset-0 z-[70] transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible delay-300'}`}>
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            {/* Sidebar Content */}
            <div 
                className={`absolute top-0 right-0 w-[80%] max-w-[300px] h-full bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <span className="font-bold text-lg text-primary">Menu</span>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Links */}
                <div className="flex-grow overflow-y-auto py-4 px-6 flex flex-col gap-2">
                    {navLinks.map((link, idx) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className="text-lg font-medium text-gray-700 py-3 border-b border-gray-50 flex items-center justify-between group active:text-secondary"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ transitionDelay: `${mobileMenuOpen ? idx * 50 : 0}ms` }}
                        >
                            {link.name}
                            <ArrowRight size={16} className="text-gray-300 group-hover:text-secondary -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </a>
                    ))}
                </div>

                {/* Drawer Footer */}
                <div className="p-6 bg-gray-50 mt-auto">
                    <a 
                        href="tel:4049524534" 
                        className="flex items-center justify-center gap-2 bg-secondary text-white py-3 rounded-xl font-bold shadow-lg mb-4 active:scale-95 transition-transform"
                    >
                        <Phone size={18} /> Call Now
                    </a>
                    
                    <div className="flex justify-center gap-4 text-gray-400">
                        <a href="#" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Facebook size={24} /></a>
                    </div>
                </div>
            </div>
        </div>

      </header>
    </>
  );
};

export default Header;