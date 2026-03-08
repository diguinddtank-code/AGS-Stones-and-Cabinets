import React, { useState } from 'react';
import { X } from 'lucide-react';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [promoDate] = useState(() => {
    // Calculate date 2 days from now
    const date = new Date();
    date.setDate(date.getDate() + 2);
    
    // Format: "Mar 7"
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  });

  if (!isVisible) return null;

  return (
    <div className="bg-zinc-950 border-b border-white/5 text-zinc-400 py-2 px-4 relative z-[60]">
      <div className="container mx-auto flex items-center justify-center text-xs font-medium tracking-wide text-center whitespace-nowrap pr-6">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-2 shrink-0">
          Special Offer
        </span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-200">Factory Direct Pricing</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block" />
          <span className="hidden sm:inline text-zinc-200">Save up to 70%</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-red-500 font-medium">Ends {promoDate}</span>
        </div>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full hover:bg-white/5"
        aria-label="Close promotion"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default TopBar;
