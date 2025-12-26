import React, { useState, useEffect } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

const StickyCta: React.FC = () => {
  // Chat window state (starts closed)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically open the chat window after 4 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Position Logic: 
  // Mobile (md:hidden): bottom-20 (to clear the 16px height bottom nav + padding)
  // Desktop (md:block): bottom-6 (standard)

  // If closed, show just the button
  if (!isOpen) {
    return (
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] flex items-center gap-3 flex-row-reverse animate-in fade-in zoom-in duration-500 pointer-events-auto">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-secondary hover:bg-yellow-600 text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(202,138,4,0.39)] transition-transform hover:scale-110 group relative cursor-pointer active:scale-95 touch-manipulation"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
          
          {/* Notification dot */}
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
        </button>
      </div>
    );
  }

  // Expanded Chat Window
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] flex flex-col items-end animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto">
        <button 
          onClick={() => setIsOpen(false)}
          className="mb-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 rounded-full p-2 shadow-sm transition-colors border border-gray-200 cursor-pointer touch-manipulation"
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
                className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
            >
                <Phone size={18} />
                Call (404) 952-4534
            </a>
        </div>
    </div>
  );
};

export default StickyCta;