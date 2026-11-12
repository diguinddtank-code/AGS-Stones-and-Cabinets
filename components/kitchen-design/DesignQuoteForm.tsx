'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, Send, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  summary: { label: string; value: string }[];
  previewUrl: string | null;
}

// Lead form for the Kitchen Design Studio. Submits the same way as
// components/ContactForm.tsx and attaches the chosen design.
export default function DesignQuoteForm({ open, onClose, summary, previewUrl }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const eventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`;
    const fd = new FormData(e.currentTarget);
    fd.append('access_key', '8120d187-d8e4-4348-83a8-b0248042becb');
    fd.append('subject', 'New Kitchen Design Studio lead');
    fd.append('from_name', 'AGS Kitchen Design Studio');
    fd.append('Event ID', eventId);
    fd.append('Lead Source', 'Kitchen Design Studio (3D configurator)');
    summary.forEach((s) => fd.append(`Design - ${s.label}`, s.value));
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Service down');
      setStatus('success');
      try {
        const w = window as any;
        if (w.fbq) {
          const names = String(data.name || '').trim().split(' ');
          w.fbq('init', '1660874861583892', {
            em: String(data.email || '').trim().toLowerCase(),
            ph: String(data.phone || '').replace(/\D/g, ''),
            fn: (names[0] || '').toLowerCase(),
            ln: names.slice(1).join(' ').toLowerCase(),
            country: 'us',
          });
          w.fbq('track', 'Lead', {}, { eventID: eventId });
        }
        const dataLayer = (w.dataLayer = w.dataLayer || []);
        const gtag = w.gtag || function () { dataLayer.push(arguments); }; // eslint-disable-line prefer-rest-params
        w.gtag = gtag;
        gtag('event', 'conversion', { send_to: 'AW-16885125181/R1mQCP6Dm5McEL2guvM-' });
      } catch { /* tracking is best effort */ }
      fetch('https://webhook.infra-remakingautomacoes.cloud/webhook/meta-capi-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      }).catch(() => {});
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Something went wrong. Please call us at (404) 952-4534.');
    }
  };

  const input = 'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20';

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="kd-quote-title" onClick={onClose}>
      <div className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl animate-modal-enter sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-stone-500 shadow hover:text-stone-900" aria-label="Close">
          <X size={18} />
        </button>
        {status === 'success' ? (
          <div className="flex flex-col items-center px-8 py-16 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50"><CheckCircle2 className="h-10 w-10 text-green-600" /></div>
            <h3 className="font-serif text-3xl font-bold text-primary">Your design is on its way</h3>
            <p className="mt-3 max-w-md text-stone-600">Thanks! A designer from AGS Stones will reach out shortly with pricing for this kitchen and a time to see the slabs in person at our Duluth showroom.</p>
            <button onClick={onClose} className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-stone-900">Back to my design</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-[1fr_1.1fr]">
            <div className="bg-primary p-6 text-white sm:rounded-l-3xl sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Your design</p>
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Preview of your kitchen design" className="mt-4 aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-white/10" />
              )}
              <dl className="mt-5 space-y-2.5 text-sm">
                {summary.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <dt className="text-white/60">{s.label}</dt>
                    <dd className="text-right font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
              <div>
                <h3 id="kd-quote-title" className="font-serif text-2xl font-bold text-primary">Get pricing for this kitchen</h3>
                <p className="mt-1 text-sm text-stone-500">Free estimate. No obligation. We reply within one business day.</p>
              </div>
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Full name</span>
                <input required name="name" autoComplete="name" className={input} placeholder="Jane Smith" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Phone</span>
                  <input required name="phone" type="tel" autoComplete="tel" className={input} placeholder="(404) 555-0123" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">ZIP code</span>
                  <input required name="zip" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" className={input} placeholder="30097" /></label>
              </div>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Email</span>
                <input required name="email" type="email" autoComplete="email" className={input} placeholder="you@email.com" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Anything else? (optional)</span>
                <textarea name="message" rows={3} className={input} placeholder="Approximate kitchen size, timeline, questions…" /></label>
              <button disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-secondary/30 transition hover:brightness-110 disabled:opacity-70">
                {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send my design
              </button>
              <p className="text-center text-[11px] text-stone-400">By sending, you agree to be contacted about your project. We never share your information.</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
