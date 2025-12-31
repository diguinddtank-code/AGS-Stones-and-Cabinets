import React, { useState, useEffect } from 'react';
import { Home, Layers, Phone, MapPin } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', icon: <Home size={20} />, label: 'Home', href: '#' },
    { id: 'services', icon: <Layers size={20} />, label: 'Services', href: '#services' },
    { id: 'showroom', icon: <MapPin size={20} />, label: 'Visit', href: '#showroom' },
    { id: 'contact', icon: <Phone size={20} />, label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Performance Optimization: Use IntersectionObserver instead of scroll listener
    // Scroll listeners that calculate offsetTop cause "Layout Thrashing" and frame drops.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When a section comes into view (at least 50% of it), set it as active
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the target is visible
      }
    );

    // Observe all targets
    navItems.forEach((item) => {
      // For 'hero', we might need to target the body or a specific hero ID if it exists.
      // Assuming Hero component is at top, we usually give it an ID or observe a wrapper.
      // If hero ID doesn't exist on an element, this will just gracefully skip.
      const element = document.getElementById(item.id) || (item.id === 'hero' ? document.querySelector('section') : null); // Fallback for hero
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    // Z-index 50 (same as Header) to ensure it sits on top of everything. 
    // Explicit height and box-sizing to prevent accidental overlay.
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe safe-area-inset-bottom h-16 box-content will-change-transform">
      <div className="flex justify-around items-center h-full px-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                  // Optional: Manual set on click for immediate feedback
                  setActiveSection(item.id);
              }}
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