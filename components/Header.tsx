import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Header background transition
      setIsScrolled(window.scrollY > 50);

      // Scroll Progress Calculation
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        Moves from Center (Hero) to Top-Left (Nav).
        Fixed responsiveness: Adjusted top position for better centering.
      */}
      <a href="#" className="z-[60] block md:hidden">
        <img 
          src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
          alt="AGS Stones and Cabinets" 
          className={`fixed transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-[60] ${
            isScrolled 
              ? 'top-3 left-4 h-10 w-auto translate-x-0 filter-none' // Header State (Mobile) - Centered vertically (top-3 = 12px, header h-16 = 64px, logo h-10 = 40px)
              : 'top-[20%] left-1/2 h-24 w-auto max-w-[80vw] -translate-x-1/2 -translate-y-1/2 brightness-0 invert drop-shadow-2xl' // Hero State (Mobile)
          }`}
        />
      </a>

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-end md:justify-between items-center h-16 md:h-20 relative">
          
          {/* 
            DESKTOP ONLY LOGO (Static):
            Visible ONLY on Desktop (hidden md:block).
            Always sits in the navbar. No animation relative to screen center.
          */}
          <a href="#" className="hidden md:block group">
             <img 
              src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
              alt="AGS Stones and Cabinets" 
              className={`h-16 w-auto transition-all duration-300 ${
                isScrolled 
                  ? 'filter-none' // Original Colors on White Background
                  : 'brightness-0 invert drop-shadow-lg' // White Logo on Transparent Background
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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-secondary z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} className={!isScrolled ? 'text-white drop-shadow-md' : 'text-gray-800'} />}
          </button>
        </div>

        {/* Scroll Progress Bar - Hidden on Mobile */}
        <div className="hidden md:block absolute bottom-0 left-0 h-1 bg-gray-200 w-full opacity-50">
            <div 
                className="h-full bg-secondary transition-all duration-150 ease-out shadow-[0_0_10px_#ca8a04]"
                style={{ width: `${scrollProgress * 100}%` }}
            ></div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-xl pt-24 pb-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top-10 duration-300">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2 active:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:4049524534" 
              className="bg-secondary text-white text-center py-3 rounded-lg font-bold"
            >
              Call Now
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;