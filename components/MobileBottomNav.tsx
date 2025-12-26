import React, { useState, useEffect } from 'react';
import { Home, Layers, Wand2, Phone, MapPin } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', icon: <Home size={20} />, label: 'Home', href: '#' },
    { id: 'services', icon: <Layers size={20} />, label: 'Services', href: '#services' },
    { id: 'visualizer', icon: <Wand2 size={20} />, label: 'Design', href: '#visualizer' },
    { id: 'showroom', icon: <MapPin size={20} />, label: 'Visit', href: '#showroom' },
    { id: 'contact', icon: <Phone size={20} />, label: 'Contact', href: '#contact' },
  ];

  // Scroll spy to highlight active icon
  useEffect(() => {
    const handleScroll = () => {
      // Small throttle or check to prevent performance issues
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Check current section
      for (const item of navItems) {
        const section = item.id === 'hero' ? document.body : document.getElementById(item.id);
        if (section) {
            const offsetTop = section === document.body ? 0 : (section as HTMLElement).offsetTop;
            const height = (section as HTMLElement).offsetHeight;
            
            // Adjust heuristic for Hero
            if (item.id === 'hero' && window.scrollY < 300) {
                setActiveSection('hero');
                break;
            }
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                setActiveSection(item.id);
            }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Z-index 50 (same as Header) to ensure it sits on top of everything. 
    // Explicit height and box-sizing to prevent accidental overlay.
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe safe-area-inset-bottom h-16 box-content">
      <div className="flex justify-around items-center h-full px-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 active:scale-95 touch-manipulation cursor-pointer ${
                isActive ? 'text-secondary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium mt-1 leading-none ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              
              {/* Active Indicator Line */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-secondary rounded-b-full"></span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;