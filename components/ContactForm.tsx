'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formsubmit.co/ajax/agsstonesandcabinets@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 
            'Accept': 'application/json' 
        }
      });

      if (res.ok) {
        setStatus('success');
        try {
          if (typeof window !== 'undefined') {
            if ((window as any).fbq) (window as any).fbq('track', 'Lead');
            if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
          }
        } catch(e) {}
      } else {
        alert("Something went wrong with the submission. Please call us.");
        setStatus(null);
      }
    } catch (error) {
      console.error(error);
      alert("Connection error. Please check your internet.");
      setStatus(null);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-10">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h4 className="text-3xl font-bold text-primary mb-4">Request Received!</h4>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
          Thank you for contacting <strong>AGS Stones</strong>. We received your details and our team will get back to you shortly with your estimate.
        </p>
        <button 
          onClick={() => setStatus(null)}
          className="px-8 py-3 bg-gray-100 text-primary font-bold rounded-xl hover:bg-gray-200 transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="_subject" value="New Lead from AGS Website!" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <div>
        <label htmlFor="fullName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name</label>
        <input 
          id="fullName"
          name="fullName"
          type="text" 
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
          placeholder="Jane Doe" 
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div>
            <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone</label>
            <input 
                id="phone"
                name="phone"
                type="tel" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                placeholder="(404) 555-0123" 
                required
            />
         </div>
         <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
            <input 
                id="email"
                name="email"
                type="email" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                placeholder="jane@example.com" 
                required
            />
         </div>
      </div>

      <div>
        <label htmlFor="details" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Project Details</label>
        <textarea 
            id="details"
            name="details"
            rows={4} 
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400 resize-none" 
            placeholder="Tell us about your space, timeline, and any specific stones you are interested in..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-slate-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {status === 'loading' ? (
           <><Loader2 className="animate-spin" size={20} /> <span>Sending...</span></>
        ) : (
           <>
              <Send size={20} /> Request Free Quote
           </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
