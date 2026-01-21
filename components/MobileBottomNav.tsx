import React, { useState, useEffect } from 'react';
import { Home, Layers, Phone, MapPin } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', icon: <Home size={20} />, label: 'Home', href: '#' },
    { id: 'services', icon: <Layers size={20} />, label: 'Services', href: '#services' },
    { id: 'showroom', icon: <MapPin size={20} />, label: 'Visit', href: '#showroom' },
    { id: 'contact', icon: <Phone size={20} />, label: 'Call Now', href: 'tel:4049524534' }, // Updated to direct Call link
  ];

  useEffect(() => {
    // Performance Optimization: Use IntersectionObserver instead of scroll listener
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
      }
    );

    navItems.forEach((item) => {
      if (item.href.startsWith('#')) {
         const element = document.getElementById(item.id) || (item.id === 'hero' ? document.querySelector('section') : null);
         if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    // Z-index 50 (same as Header) to ensure it sits on top of everything. 
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe safe-area-inset-bottom h-16 box-content will-change-transform">
      <div className="flex justify-around items-end h-full px-1 pb-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHighlighted = item.id === 'contact'; // Identify the phone item

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                 if(item.href.startsWith('#')) {
                    setActiveSection(item.id);
                 }
              }}
              className="relative flex flex-col items-center justify-center transition-all duration-300 touch-manipulation cursor-pointer w-full h-full pb-1"
            >
              {/* Icon Container */}
              <div 
                className={`transition-all duration-300 flex items-center justify-center mb-1 rounded-full p-1.5 ${
                  isHighlighted 
                    ? 'bg-secondary text-white shadow-sm' // Subtle filled circle for Call
                    : isActive 
                        ? 'text-secondary -translate-y-1 bg-transparent' 
                        : 'text-gray-400 bg-transparent'
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span 
                className={`text-[10px] font-medium leading-none transition-colors ${
                    isHighlighted
                     ? 'text-secondary font-bold'
                     : isActive ? 'text-secondary font-bold' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              
              {/* Active Indicator Line (Only for standard tabs, not the button) */}
              {!isHighlighted && isActive && (
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