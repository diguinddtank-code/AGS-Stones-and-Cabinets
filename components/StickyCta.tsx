import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

const StickyCta: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      // Added mb-16 md:mb-0 to move button up on mobile above the nav bar
      <div className="fixed bottom-6 mb-16 md:mb-0 right-6 z-50 flex items-center gap-3 flex-row-reverse animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-secondary hover:bg-yellow-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 group relative"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
          
          {/* Notification Badge (Red Dot with 1) */}
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-md border-2 border-white animate-pulse">
            1
          </span>
        </button>

        {/* "Mensagenzinha" / Tooltip */}
        <div className="hidden md:block bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 text-sm font-bold text-gray-700 relative mr-1 animate-in slide-in-from-right-4 fade-in duration-700 delay-100">
           1 new message
           {/* Arrow pointing to the button */}
           <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    // Added mb-16 md:mb-0 to move chat window up on mobile
    <div className="fixed bottom-6 mb-16 md:mb-0 right-6 z-50 flex flex-col items-end animate-in slide-in-from-bottom-5 fade-in duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="mb-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 rounded-full p-2 shadow-sm transition-colors border border-gray-200"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
        <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        AG
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Questions?</h4>
                    <p className="text-sm text-gray-500">We are online. Call us now!</p>
                </div>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
                Ready to transform your home? Get a free estimate today.
            </p>
            <a 
                href="tel:4049524534" 
                className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
                <Phone size={18} />
                Call (404) 952-4534
            </a>
        </div>
    </div>
  );
};

export default StickyCta;