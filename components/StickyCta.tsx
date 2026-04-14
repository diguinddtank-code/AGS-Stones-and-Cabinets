'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Send, User, Loader2, CheckCircle2, ChevronDown, MessageSquare } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text?: string;
  isOptions?: boolean;
  options?: { label: string; value: string }[];
  isForm?: boolean;
  isTyping?: boolean;
};

const CONVERSATION_FLOW = [
  {
    aiText: "Hi there! 👋 Welcome to AGS Stones. What kind of project are you looking to start?",
    options: [
      { label: "Kitchen Remodel", value: "kitchen" },
      { label: "Bathroom Vanity", value: "bathroom" },
      { label: "Countertops", value: "countertops" },
      { label: "Custom Cabinets", value: "cabinets" },
      { label: "Multiple Projects", value: "both" }
    ]
  },
  {
    aiText: "Awesome choice! We have amazing factory-direct deals for that right now. Do you already have measurements or are you just starting?",
    options: [
      { label: "I have measurements", value: "measurements" },
      { label: "Just starting out", value: "starting" }
    ]
  },
  {
    aiText: "Got it! To make sure we give you the best options, do you have a rough budget in mind for this project?",
    options: [
      { label: "Under $3,000", value: "under_3k" },
      { label: "$3,000 - $5,000", value: "3k_5k" },
      { label: "$5,000 - $10,000", value: "5k_10k" },
      { label: "Over $10,000", value: "over_10k" },
      { label: "Not sure yet", value: "not_sure" }
    ]
  },
  {
    aiText: "Perfect, that helps a lot! Let's get you a free, no-obligation estimate.",
    delayNext: true, // Flag to indicate we should delay the next action
    nextAiText: "Just drop your details below and our design team will reach out with pricing tailored for you.",
    showForm: true
  }
];

const StickyCta: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agsLogoUrl = "https://i.imgur.com/B0ZaBpN.png";

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start chat sequence
      setMessages([{ id: 'typing-initial', sender: 'ai', isTyping: true }]);
      setTimeout(() => {
        setMessages([
          { id: 'msg-0', sender: 'ai', text: CONVERSATION_FLOW[0].aiText },
          { id: 'opt-0', sender: 'ai', isOptions: true, options: CONVERSATION_FLOW[0].options }
        ]);
      }, 1500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOptionClick = (option: { label: string; value: string }) => {
    // Remove options from previous message
    setMessages(prev => prev.filter(m => !m.isOptions));
    
    // Add user message
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: option.label }]);

    // Add AI typing
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingId, sender: 'ai', isTyping: true }]);

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== typingId)); // Remove typing
      
      const stepData = CONVERSATION_FLOW[nextStep];
      
      const aiMsgId = (Date.now() + 2).toString();
      setMessages(prev => [...prev, { id: aiMsgId, sender: 'ai', text: stepData.aiText }]);

      if (stepData.delayNext) {
        // Add typing indicator again for the delayed message
        const delayedTypingId = (Date.now() + 3).toString();
        setMessages(prev => [...prev, { id: delayedTypingId, sender: 'ai', isTyping: true }]);
        
        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== delayedTypingId)); // Remove typing
          
          if (stepData.nextAiText) {
            const nextAiMsgId = (Date.now() + 4).toString();
            setMessages(prev => [...prev, { id: nextAiMsgId, sender: 'ai', text: stepData.nextAiText }]);
          }
          
          if (stepData.showForm) {
            const formMsgId = (Date.now() + 5).toString();
            setMessages(prev => [...prev, { id: formMsgId, sender: 'ai', isForm: true }]);
          }
        }, 2000); // 2 second delay before showing the form and second part of message
      } else {
        if (stepData.showForm) {
          const formMsgId = (Date.now() + 3).toString();
          setMessages(prev => [...prev, { id: formMsgId, sender: 'ai', isForm: true }]);
        } else if (stepData.options) {
          const optionsMsgId = (Date.now() + 4).toString();
          setMessages(prev => [...prev, { id: optionsMsgId, sender: 'ai', isOptions: true, options: stepData.options }]);
        }
      }
    }, 1500);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    formData.append('_subject', 'New Estimate Request from Chat Assistant');
    formData.append('_captcha', 'false');

    try {
      const res = await fetch("https://formsubmit.co/ajax/agsstonesandcabinets@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setMessages(prev => prev.filter(m => !m.isForm));
          setMessages(prev => [
            ...prev, 
            { id: Date.now().toString(), sender: 'ai', text: "Thank you! Your request has been received. Our design team will contact you shortly with your estimate." }
          ]);
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[60] flex flex-col items-end pointer-events-none">
      
      {/* Collapsed State */}
      {!isOpen && (
        <div className="flex flex-col items-end pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
          
          {/* Bubble */}
          {!isBubbleDismissed && showNotification && (
             <div className="bg-white text-gray-800 shadow-xl rounded-2xl mb-3 relative origin-bottom-right border border-gray-100 max-w-[240px] p-4 mr-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsBubbleDismissed(true); }}
                    className="absolute -top-3 -right-3 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-full p-1 transition-colors shadow-sm border border-gray-200"
                >
                    <X size={12} />
                </button>
                <div onClick={() => setIsOpen(true)} className="cursor-pointer group">
                    <p className="text-sm font-medium text-gray-700 mb-3 leading-relaxed pr-1">
                        Hi! 👋 Looking for a <strong>Free Estimate</strong>? <br/>
                        Let's get started!
                    </p>
                    <button className="w-full bg-secondary hover:bg-yellow-600 text-white text-sm font-bold py-2 rounded-lg shadow-md transition-all group-hover:scale-[1.02] flex items-center justify-center gap-2">
                        <MessageSquare size={16} /> Get Estimate
                    </button>
                </div>
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
             </div>
          )}

          {/* Avatar Button */}
          <button 
            onClick={() => { setIsOpen(true); setShowNotification(false); setIsBubbleDismissed(true); }}
            className="relative group cursor-pointer"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden transition-transform group-hover:scale-105 relative z-10 bg-white flex items-center justify-center p-2">
              <Image 
                src={agsLogoUrl} 
                alt="AGS Stones" 
                width={48} 
                height={48} 
                className="object-contain w-full h-full"
              />
            </div>
            
            {showNotification && !isBubbleDismissed && (
                <div className="absolute -top-1 -right-1 z-30">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 text-white text-[10px] font-bold items-center justify-center border-2 border-white">
                        1
                      </span>
                    </span>
                </div>
            )}
          </button>
        </div>
      )}

      {/* Open State */}
      {isOpen && (
        <div className="pointer-events-auto w-full max-w-sm sm:w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 fade-in zoom-in-95 duration-300 origin-bottom-right">
            
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-slate-700 shadow-inner p-1">
                        <Image 
                          src={agsLogoUrl} 
                          alt="AGS Stones" 
                          width={32} 
                          height={32} 
                          className="object-contain w-full h-full"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-base leading-none mb-1">AGS Assistant</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <p className="text-slate-300 text-xs font-medium">Online</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setIsOpen(false)}
                    className="relative z-10 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full p-2 transition-colors"
                >
                    <ChevronDown size={20} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mr-2 mt-1 shadow-sm border border-gray-100 p-1">
                        <Image 
                          src={agsLogoUrl} 
                          alt="AGS Stones" 
                          width={24} 
                          height={24} 
                          className="object-contain w-full h-full"
                        />
                      </div>
                    )}

                    <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
                      {msg.isTyping ? (
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 shadow-sm inline-block">
                          <div className="flex items-center gap-1 h-4 px-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                          </div>
                        </div>
                      ) : msg.text ? (
                        <div className={`p-3 shadow-sm text-sm leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-secondary text-white rounded-2xl rounded-tr-none' 
                            : 'bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      ) : null}

                      {msg.isOptions && msg.options && (
                        <div className="mt-2 flex flex-col gap-2">
                          {msg.options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(opt)}
                              className="text-left bg-white border border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 text-yellow-700 text-sm font-medium py-2 px-3 rounded-xl shadow-sm transition-colors animate-in fade-in slide-in-from-bottom-2"
                              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.isForm && (
                        <div className="mt-2 bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-in fade-in zoom-in-95">
                          {formStatus === 'success' ? (
                            <div className="text-center py-4">
                              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                              <p className="text-green-700 font-bold">Estimate Request Sent!</p>
                            </div>
                          ) : (
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                              <h5 className="font-bold text-slate-800 text-sm mb-1">Your Details</h5>
                              <input 
                                type="text" 
                                name="name" 
                                required 
                                placeholder="Your Name" 
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                              />
                              <input 
                                type="tel" 
                                name="phone" 
                                required 
                                placeholder="Phone Number" 
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                              />
                              <input 
                                type="email" 
                                name="email" 
                                required 
                                placeholder="Email Address" 
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                              />
                              <textarea 
                                name="project_details" 
                                placeholder="Any additional details? (Optional)" 
                                rows={2}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                              ></textarea>
                              
                              {formStatus === 'error' && (
                                <p className="text-red-500 text-xs">An error occurred. Please try again.</p>
                              )}

                              <button 
                                type="submit" 
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-secondary hover:bg-yellow-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-1 disabled:opacity-70"
                              >
                                {formStatus === 'submitting' ? (
                                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                ) : (
                                  <><Send className="w-4 h-4" /> Get Free Estimate</>
                                )}
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
      )}

    </div>
  );
};

export default StickyCta;