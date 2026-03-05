import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [promoDate, setPromoDate] = useState('');

  useEffect(() => {
    // Calculate date 2 days from now
    const date = new Date();
    date.setDate(date.getDate() + 2);
    
    // Format: "Mar 7"
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    setPromoDate(date.toLocaleDateString('en-US', options));
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-900 text-white py-2.5 px-4 relative z-[60]">
      <div className="container mx-auto flex items-center justify-center text-xs md:text-sm font-medium tracking-wide text-center pr-6">
        <MapPin size={14} className="text-secondary mr-2 shrink-0" />
        <p>
          <span className="text-secondary font-bold mr-1">METRO ATLANTA SPECIAL:</span>
          <span className="text-gray-200">Direct pricing valid until {promoDate}.</span>
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
        aria-label="Close promotion"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default TopBar;
