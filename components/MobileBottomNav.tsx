'use client';

import React from 'react';
import { Home, Layers, Phone, Image as ImageIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home', href: '/' },
    { id: 'services', icon: <Layers size={20} />, label: 'Services', href: '/services' },
    { id: 'gallery', icon: <ImageIcon size={20} />, label: 'Gallery', href: '/blog' },
    { id: 'contact', icon: <Phone size={20} />, label: 'Contact', href: '/#contact' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe safe-area-inset-bottom h-16 box-content">
      <div className="flex justify-around items-end h-full px-1 pb-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center justify-center transition-all duration-300 touch-manipulation cursor-pointer w-full h-full pb-1"
            >
              <div 
                className={`transition-all duration-300 flex items-center justify-center mb-1 rounded-full p-1.5 ${
                  isActive 
                    ? 'text-secondary -translate-y-1 bg-transparent' 
                    : 'text-gray-400 bg-transparent'
                }`}
              >
                {item.icon}
              </div>

              <span 
                className={`text-[10px] font-medium leading-none transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-secondary rounded-b-full"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;