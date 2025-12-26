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

  // Simple scroll spy to highlight active icon
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id === 'hero' ? document.body : document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = section === document.body ? 0 : (section as HTMLElement).offsetTop;
          const height = section === document.body ? 600 : (section as HTMLElement).offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
             // Special case for 'hero' usually maps to top of page or #root
             if (index === 0 && window.scrollY < 400) {
                 setActiveSection(navItems[0].id);
             } else if (index > 0) {
                 setActiveSection(navItems[index].id);
             }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 z-[60] pb-safe shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ${
                isActive ? 'text-secondary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1 scale-110' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium mt-1 ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 bg-secondary rounded-t-full"></span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;