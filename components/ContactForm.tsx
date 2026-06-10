'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactFormProps {
  theme?: 'light' | 'dark';
}

const ContactForm: React.FC<ContactFormProps> = ({ theme = 'light' }) => {
  const [status, setStatus] = useState<'loading' | 'success' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const eventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', '8120d187-d8e4-4348-83a8-b0248042becb');
    formData.append('Event ID', eventId);
    
    const submitData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        body: JSON.stringify(submitData)
      });

      if (res.ok) {
        setStatus('success');
        try {
          if (typeof window !== 'undefined') {
            if ((window as any).fbq) {
              const nameStr = (submitData.name as string) || '';
              const names = nameStr.trim().split(' ');
              const firstName = names[0] || '';
              const lastName = names.slice(1).join(' ') || '';
              
              const phoneStr = (submitData.phone as string) || '';
              const emailStr = (submitData.email as string) || '';
              
              (window as any).fbq('init', '1660874861583892', {
                em: emailStr.trim().toLowerCase(),
                ph: phoneStr.replace(/\D/g, ''),
                fn: firstName.toLowerCase(),
                ln: lastName.toLowerCase(),
                country: 'us'
              });
              (window as any).fbq('track', 'Lead', {}, { eventID: eventId });
            }
            if ((window as any).gtag) (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
          }
        } catch(e) {}
        try {
          fetch("https://webhook.infra-remakingautomacoes.cloud/webhook/meta-capi-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          }).catch(() => {});
        } catch(e) {}
      } else {
        throw new Error('Service down');
      }
    } catch (error) {
      console.error(error);
      setStatus(null);
      alert("Something went wrong. Please call us directly.");
    }
  };

  const isDark = theme === 'dark';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-10">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm ${isDark ? 'bg-secondary/20' : 'bg-green-100'}`}>
          <CheckCircle2 className={`w-12 h-12 ${isDark ? 'text-secondary' : 'text-green-600'}`} />
        </div>
        <h4 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-primary'}`}>Request Received!</h4>
        <p className={`mb-8 max-w-sm mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Thank you for contacting <strong>AGS Stones</strong>. We received your details and our team will get back to you shortly with your estimate.
        </p>
        <button 
          onClick={() => setStatus(null)}
          className={`px-8 py-3 font-bold rounded-xl transition-all ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}
        >
          Send another message
        </button>
      </div>
    );
  }

  const labelClass = `block text-xs font-bold uppercase tracking-wide mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`;
  const inputClass = `w-full px-4 py-3 rounded-lg border outline-none transition-all ${
    isDark 
      ? 'bg-[#1a1a1a] border-white/10 text-white placeholder-gray-600 focus:border-secondary focus:ring-2 focus:ring-secondary/20' 
      : 'bg-gray-50 border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder-gray-400'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="_subject" value="New Lead from AGS Website!" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <div>
        <label htmlFor="fullName" className={labelClass}>Full Name</label>
        <input 
          id="fullName"
          name="fullName"
          type="text" 
          className={inputClass} 
          placeholder="Jane Doe" 
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input 
                id="phone"
                name="phone"
                type="tel" 
                className={inputClass} 
                placeholder="(404) 555-0123" 
                required
            />
         </div>
         <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input 
                id="email"
                name="email"
                type="email" 
                className={inputClass} 
                placeholder="jane@example.com" 
                required
            />
         </div>
      </div>

      <div>
        <label htmlFor="details" className={labelClass}>Project Details</label>
        <textarea 
            id="details"
            name="details"
            rows={4} 
            className={`${inputClass} resize-none`} 
            placeholder="Tell us about your space, timeline, and any specific stones you are interested in..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className={`w-full font-bold py-4 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed ${
          isDark
            ? 'bg-secondary text-[#090909] hover:bg-white disabled:bg-secondary/50'
            : 'bg-primary hover:bg-slate-800 text-white disabled:bg-gray-400'
        }`}
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
