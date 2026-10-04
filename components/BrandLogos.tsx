import React from 'react';

/**
 * Pixel-perfect, high-definition official brand lockups matching reference image
 */

export const GoogleGLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5 sm:w-5.5 sm:h-5.5" }) => (
  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  </div>
);

export const YelpLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center gap-1 sm:gap-1.5 select-none shrink-0 ${className}`}>
    <svg viewBox="0 0 32 32" className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top petal */}
      <path
        d="M14.6 14.2L12.1 4.5C11.9 3.7 11 3.2 10.2 3.5C9.4 3.8 8.9 4.7 9.2 5.5L11.7 15.2C11.9 16 12.8 16.5 13.6 16.2C14.4 15.9 14.9 15 14.6 14.2Z"
        fill="#D32323"
      />
      {/* Top-right petal */}
      <path
        d="M16.8 15.1L23.8 8.1C24.4 7.5 24.4 6.5 23.8 5.9C23.2 5.3 22.2 5.3 21.6 5.9L14.6 12.9C14 13.5 14 14.5 14.6 15.1C15.2 15.7 16.2 15.7 16.8 15.1Z"
        fill="#D32323"
      />
      {/* Right petal */}
      <path
        d="M17.4 17.6L27.1 15.8C27.9 15.7 28.5 14.9 28.3 14.1C28.2 13.3 27.4 12.7 26.6 12.9L16.9 14.7C16.1 14.8 15.5 15.6 15.7 16.4C15.8 17.2 16.6 17.8 17.4 17.6Z"
        fill="#D32323"
      />
      {/* Bottom-right petal */}
      <path
        d="M16 19.3L21.4 27.5C21.8 28.2 22.8 28.4 23.5 28C24.2 27.6 24.4 26.6 24 25.9L18.6 17.7C18.2 17 17.2 16.8 16.5 17.2C15.8 17.6 15.6 18.6 16 19.3Z"
        fill="#D32323"
      />
      {/* Bottom-left petal */}
      <path
        d="M13.8 18.2L6.1 24.3C5.5 24.8 5.4 25.8 5.9 26.4C6.4 27 7.4 27.1 8 26.6L15.7 20.5C16.3 20 16.4 19 15.9 18.4C15.4 17.8 14.4 17.7 13.8 18.2Z"
        fill="#D32323"
      />
    </svg>
    <span className="font-extrabold text-[14px] sm:text-[16px] tracking-[-0.04em] text-[#D32323] leading-none font-sans lowercase">
      yelp
    </span>
  </div>
);

export const ThumbtackLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center gap-1 sm:gap-1.5 select-none shrink-0 ${className}`}>
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Classic Thumbtack Pushpin in #009FD9 */}
      <path
        d="M18.5 14H16.2L14.7 6.8C15.2 6.5 15.5 5.9 15.5 5.2C15.5 4.3 14.8 3.6 13.9 3.6H10.1C9.2 3.6 8.5 4.3 8.5 5.2C8.5 5.9 8.8 6.5 9.3 6.8L7.8 14H5.5C4.9 14 4.5 14.4 4.5 15C4.5 15.6 4.9 16 5.5 16H11.2V20.2C11.2 20.6 11.5 21 12 21C12.5 21 12.8 20.6 12.8 20.2V16H18.5C19.1 16 19.5 15.6 19.5 15C19.5 14.4 19.1 14 18.5 14Z"
        fill="#009FD9"
      />
    </svg>
    <span className="font-extrabold text-[14px] sm:text-[16px] tracking-[-0.03em] text-[#009FD9] leading-none font-sans lowercase">
      thumbtack
    </span>
  </div>
);

export const NextdoorLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center gap-1 sm:gap-1.5 select-none shrink-0 ${className}`}>
    {/* Nextdoor Green Circle with Crisp White House */}
    <div className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] rounded-full bg-[#76B82A] flex items-center justify-center shrink-0 shadow-2xs">
      <svg viewBox="0 0 20 20" className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 3.2L3.5 8.8V16.5C3.5 16.8 3.7 17 4 17H7.5V12.5C7.5 12.2 7.7 12 8 12H12C12.3 12 12.5 12.2 12.5 12.5V17H16C16.3 17 16.5 16.8 16.5 16.5V8.8L10 3.2Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
    <span className="font-extrabold text-[14px] sm:text-[16px] tracking-[-0.03em] text-[#76B82A] leading-none font-sans lowercase">
      nextdoor
    </span>
  </div>
);

export const HomeDepotLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center gap-1 sm:gap-1.5 select-none shrink-0 ${className}`}>
    <div className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] rounded-xs bg-[#F96302] flex items-center justify-center shrink-0 p-0.5 shadow-2xs">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#F96302" />
        <path d="M2.5 3.5h19v17h-19z" fill="#F96302" stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="12" y="9.5" fill="#FFFFFF" fontSize="4.6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">HOME</text>
        <text x="12" y="16" fill="#FFFFFF" fontSize="4.6" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DEPOT</text>
      </svg>
    </div>
    <span className="font-extrabold text-[11px] sm:text-xs tracking-tight text-[#D35400] leading-none font-sans uppercase">
      The Home Depot
    </span>
  </div>
);
