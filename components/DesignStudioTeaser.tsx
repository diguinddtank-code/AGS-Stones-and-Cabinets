'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Box, Layers, MoonStar, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const renders = [
  { src: '/images/kitchen-design/buckhead-island.jpg', name: 'The Buckhead', stone: 'Calacatta Gold quartz' },
  { src: '/images/kitchen-design/midtown.jpg', name: 'The Midtown', stone: 'Super White quartzite' },
  { src: '/images/kitchen-design/estate.jpg', name: 'The Alpharetta Estate', stone: 'Taj Mahal quartzite' },
];

const chips = [
  { id: 'calacatta-gold', name: 'Calacatta Gold' },
  { id: 'taj-mahal', name: 'Taj Mahal' },
  { id: 'black-galaxy', name: 'Black Galaxy' },
  { id: 'macaubas-blue', name: 'Macaubas Blue' },
];

const features = [
  { icon: Box, title: '3 signature kitchens', text: 'Transitional, contemporary and classic layouts.' },
  { icon: Layers, title: '13 premium stones', text: 'Quartz, quartzite and granite on every surface.' },
  { icon: MoonStar, title: 'Day & evening light', text: 'See how your stone looks at every hour.' },
  { icon: Send, title: 'Pricing for your design', text: 'Send it to us and get a quote in one click.' },
];

export default function DesignStudioTeaser() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // rotate the featured render
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % renders.length), 4200);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } });
      tl.from('.dst-frame', { y: 80, rotate: -2, opacity: 0, duration: 1.2, ease: 'expo.out' })
        .from('.dst-chip', { y: 30, opacity: 0, scale: 0.85, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' }, '-=0.7')
        .from('.dst-badge', { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.5');
      // gentle depth while scrolling past
      gsap.to('.dst-frame', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.dst-chips', { yPercent: -40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      // ambient glow drift
      gsap.to('.dst-glow', { xPercent: 12, yPercent: -10, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-primary py-20 text-white md:py-28" aria-labelledby="dst-title">
      <div className="dst-glow pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-secondary/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="container relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" /></span>
            New · 3D Kitchen Design Studio
          </span>
          <h2 id="dst-title" className="mt-5 font-serif text-4xl font-bold leading-[1.1] md:text-5xl">
            See your kitchen in 3D before we cut a single slab.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Pick a layout, try our stones on the island, swap cabinet colors and hardware, then turn the lights down for the evening. When it feels right, send it to us for exact pricing.
          </p>
          <ul data-reveal-stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span><span className="block text-sm font-semibold">{f.title}</span><span className="block text-xs leading-relaxed text-white/60">{f.text}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/kitchen-design" className="group inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-4 text-sm font-bold text-white shadow-xl shadow-secondary/25 transition hover:brightness-110">
              Launch the 3D designer <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="inline-flex items-center justify-center text-xs text-white/50 sm:justify-start">Free · works on phone and desktop</span>
          </div>
        </div>

        <div className="relative">
          <Link href="/kitchen-design" aria-label="Open the 3D Kitchen Design Studio" className="dst-frame group relative block aspect-[4/3] overflow-hidden rounded-[28px] shadow-2xl shadow-black/40 ring-1 ring-white/10">
            {renders.map((r, i) => (
              <Image key={r.src} src={r.src} alt={`${r.name} kitchen rendered in 3D with ${r.stone} countertops`} fill sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover transition-all duration-[1400ms] ease-out group-hover:scale-[1.03] ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{renders[active].stone}</p>
                <p className="font-serif text-xl font-semibold md:text-2xl">{renders[active].name}</p>
              </div>
              <div className="flex gap-1.5">
                {renders.map((r, i) => <span key={r.src} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />)}
              </div>
            </div>
            <span className="dst-badge absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-primary shadow-lg backdrop-blur">
              <Box className="h-3.5 w-3.5 text-secondary" /> Interactive 3D
            </span>
          </Link>

          <div className="dst-chips pointer-events-none absolute -bottom-8 -left-4 right-6 flex flex-wrap gap-2 md:-left-8">
            {chips.map((c) => (
              <span key={c.id} className="dst-chip flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-[11px] font-semibold text-primary shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/textures/stones/${c.id}-swatch.jpg`} alt="" className="h-6 w-10 rounded-full object-cover" />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
