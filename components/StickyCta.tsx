import React, { useState, useEffect } from 'react';
import { Phone, X, MessageSquare, Send, MessageCircle } from 'lucide-react';

const StickyCta: React.FC = () => {
  // Stages: 'initial' (hidden) -> 'typing' (dots) -> 'bubble' (text invitation) -> 'open' (full widget)
  const [stage, setStage] = useState<'initial' | 'typing' | 'bubble' | 'open'>('initial');
  
  // Track if user explicitly closed the bubble (so we don't annoy them, but keep avatar)
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  
  // Track if we should show the "1" notification badge on the avatar
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);

  useEffect(() => {
    // Sequence the entrance
    const startTimer = setTimeout(() => {
      setStage('typing');
      
      // After typing for 2.5 seconds, show the text bubble
      const typeTimer = setTimeout(() => {
        setStage((prev) => prev === 'open' ? 'open' : 'bubble');
      }, 2500);

      return () => clearTimeout(typeTimer);
    }, 2000); // Wait 2s after page load to appear

    return () => clearTimeout(startTimer);
  }, []);

  const handleOpen = () => {
      setStage('open');
      setShowNotificationBadge(false); // Clear notification when opening
  };

  const handleClose = () => setStage('bubble');
  
  const handleDismissBubble = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent opening the chat
      setIsBubbleDismissed(true);
      setShowNotificationBadge(true); // Show notification badge
  };

  // Profile Image URL (Professional Support Agent)
  const avatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&fm=webp&fit=crop";

  if (stage === 'initial') return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[60] flex flex-col items-end pointer-events-none">
      
      {/* 
        -------------------------------------------
        STATE: TYPING or BUBBLE (Collapsed View)
        -------------------------------------------
      */}
      {stage !== 'open' && (
        <div className="flex flex-col items-end pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
          
          {/* The Speech Bubble */}
          {!isBubbleDismissed && (
             <div 
               className={`bg-white text-gray-800 shadow-xl rounded-2xl mb-3 relative transform transition-all origin-bottom-right border border-gray-100 max-w-[240px] md:max-w-xs mr-2
               ${stage === 'typing' ? 'p-3' : 'p-4'}`}
             >
                {stage === 'typing' ? (
                  <div className="flex items-center gap-1 h-5 px-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Close Button (Small X) */}
                    <button 
                        onClick={handleDismissBubble}
                        className="absolute -top-3 -right-3 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-full p-1 transition-colors shadow-sm border border-gray-200"
                        aria-label="Dismiss message"
                    >
                        <X size={12} />
                    </button>

                    <div onClick={handleOpen} className="cursor-pointer group">
                        <p className="text-sm font-medium text-gray-700 mb-3 leading-relaxed pr-1">
                            Hi! I'm Jessica. <br/>
                            Can I help you with a <strong>Free Quote</strong>?
                        </p>
                        
                        {/* Internal CTA Button */}
                        <button 
                            className="w-full bg-secondary hover:bg-yellow-600 text-white text-sm font-bold py-2 rounded-lg shadow-md transition-all group-hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={16} /> Start Chat
                        </button>
                    </div>
                  </div>
                )}
                
                {/* Tail pointing down towards avatar */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
             </div>
          )}

          {/* Action Buttons Container */}
          <div className="flex items-center gap-4">
              
              {/* The Avatar Head (Clickable to open chat) */}
              <button 
                onClick={handleOpen}
                className="relative group cursor-pointer"
                aria-label="Chat with Jessica"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden transition-transform group-hover:scale-105 relative z-10 bg-white">
                  <img 
                    src={avatarUrl} 
                    alt="Jessica Support Agent" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Notification Badge (Shows when bubble is dismissed) */}
                {showNotificationBadge && (
                    <div className="absolute -top-1 -right-1 z-30">
                        <span className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 text-white text-[10px] font-bold items-center justify-center border-2 border-white">
                            1
                          </span>
                        </span>
                    </div>
                )}

                {/* Online Status Dot (Only show if no notification to avoid clutter) */}
                {!showNotificationBadge && (
                    <div className="absolute bottom-1 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-20 animate-pulse"></div>
                )}
              </button>
          </div>
        </div>
      )}

      {/* 
        -------------------------------------------
        STATE: OPEN (Expanded Widget)
        -------------------------------------------
      */}
      {stage === 'open' && (
        <div className="pointer-events-auto w-full max-w-sm animate-in slide-in-from-bottom-5 fade-in zoom-in-95 duration-300 origin-bottom-right">
            
            {/* Close Button Bubble */}
            <div className="flex justify-end mb-2">
                <button 
                    onClick={handleClose}
                    className="bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 rounded-full p-2 shadow-sm border border-gray-200 transition-colors"
                    aria-label="Close chat"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Main Chat Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                
                {/* Header with Jessica */}
                <div className="bg-primary p-6 flex items-center gap-4 relative overflow-hidden">
                     {/* Decorative blur */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative">
                        <img 
                            src={avatarUrl} 
                            alt="Jessica" 
                            className="w-12 h-12 rounded-full border-2 border-white object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full"></div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg leading-none mb-1">Jessica M.</h4>
                        <p className="text-secondary text-xs font-bold uppercase tracking-wider">Design Specialist</p>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="p-6">
                    <div className="bg-gray-50 rounded-xl rounded-tl-none p-4 mb-6 text-sm text-gray-700 leading-relaxed border border-gray-100 relative">
                        "Hello! I can help you with a free estimate for your kitchen or bathroom project. Would you like to schedule a call or get a quick quote?"
                        <div className="absolute -top-2 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-gray-50 border-r-[10px] border-r-transparent"></div>
                    </div>

                    <div className="space-y-3">
                        <a 
                            href="tel:4049524534" 
                            className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 group"
                        >
                            <Phone size={18} className="group-hover:animate-pulse" />
                            Call (404) 952-4534
                        </a>
                        
                        <a 
                            href="#contact"
                            onClick={handleClose}
                            className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 text-primary font-bold py-3.5 rounded-xl border border-gray-200 transition-all hover:border-secondary active:scale-95"
                        >
                            <Send size={18} className="text-secondary" />
                            Request Quote Online
                        </a>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                        <p className="text-xs text-gray-400">Usually replies instantly during business hours.</p>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default StickyCta;