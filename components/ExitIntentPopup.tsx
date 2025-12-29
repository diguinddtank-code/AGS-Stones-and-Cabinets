import React, { useState, useEffect } from 'react';
import { X, Gift, Phone } from 'lucide-react';

const ExitIntentPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Logic for Desktop: Mouse leaves viewport to the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        // Check localStorage to ensure we don't annoy the user every time
        const alreadyShown = localStorage.getItem('ags_exit_popup_shown');
        if (!alreadyShown) {
            setIsOpen(true);
            setHasShown(true);
            localStorage.setItem('ags_exit_popup_shown', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Popup Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="flex flex-col">
            {/* Header Image/Gradient */}
            <div className="bg-primary text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                        <Gift size={32} className="text-secondary" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Wait! Don't Miss This</h3>
                    <p className="text-gray-300">Exclusive online offer expires soon.</p>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Get a FREE Stainless Steel Sink</h4>
                <p className="text-gray-600 mb-6 text-sm">
                    Book your free in-home estimate today and receive a premium stainless steel undermount sink with your kitchen countertop installation (Min. 45 sqft).
                </p>

                <div className="space-y-3">
                    <a 
                        href="#contact" 
                        onClick={() => setIsOpen(false)}
                        className="block w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        Claim My Free Sink
                    </a>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="block w-full bg-transparent text-gray-400 font-medium text-sm hover:text-gray-600"
                    >
                        No thanks, I don't need a free sink.
                    </button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Phone size={12} /> Questions? Call (404) 952-4534
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;