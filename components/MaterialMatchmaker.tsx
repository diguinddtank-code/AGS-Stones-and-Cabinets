'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Box } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MaterialType = 'quartz' | 'quartzite' | 'granite' | 'marble';

interface MaterialData {
  id: MaterialType;
  name: string;
  tagline: string;
  origin: string;
  slab: string; // representative slab texture
  slabName: string;
  stats: { heat: number; scratch: number; stain: number; maintenance: number };
  pros: string[];
  bestFor: string;
}

const materials: MaterialData[] = [
  {
    id: 'quartz', name: 'Quartz', tagline: 'Modern and zero-maintenance', origin: 'Engineered stone',
    slab: '/textures/stones/calacatta-gold.jpg', slabName: 'Calacatta Gold',
    stats: { heat: 60, scratch: 80, stain: 95, maintenance: 100 },
    pros: ['Non-porous, never needs sealing', 'Consistent color and pattern', 'Antibacterial surface', 'Stain resistant', 'Wide range of modern styles'],
    bestFor: 'Busy family kitchens and baths',
  },
  {
    id: 'quartzite', name: 'Quartzite', tagline: 'The beauty of marble, the strength of granite', origin: 'Natural · Brazil',
    slab: '/textures/stones/taj-mahal.jpg', slabName: 'Taj Mahal',
    stats: { heat: 100, scratch: 95, stain: 70, maintenance: 70 },
    pros: ['Harder than glass', 'Natural stone movement', 'UV resistant', 'Excellent heat resistance', 'Rare, exotic patterns'],
    bestFor: 'Luxury, high-end kitchens',
  },
  {
    id: 'granite', name: 'Granite', tagline: 'Built to take anything', origin: 'Natural · Worldwide',
    slab: '/textures/stones/black-galaxy.jpg', slabName: 'Black Galaxy',
    stats: { heat: 100, scratch: 90, stain: 75, maintenance: 80 },
    pros: ['Hot pans are fine', 'One-of-a-kind patterns', 'High resale value', 'Scratch resistant', 'UV resistant, great outdoors'],
    bestFor: 'High-traffic and outdoor kitchens',
  },
  {
    id: 'marble', name: 'Marble', tagline: 'Timeless luxury', origin: 'Natural · Italy',
    slab: '/textures/stones/statuario.jpg', slabName: 'Statuario look',
    stats: { heat: 90, scratch: 40, stain: 40, maintenance: 40 },
    pros: ['Unmatched natural beauty', 'Stays cool, perfect for baking', 'Classic elegance', 'Unique veining in every slab', 'Premium luxury appeal'],
    bestFor: 'Primary baths and fireplaces',
  },
];

const statRows: { key: keyof MaterialData['stats']; label: string }[] = [
  { key: 'heat', label: 'Heat' },
  { key: 'scratch', label: 'Scratch' },
  { key: 'stain', label: 'Stain' },
  { key: 'maintenance', label: 'Easy care' },
];

// 1–5 rating shown as segments, like a spec sheet
const Rating = ({ value }: { value: number }) => {
  const filled = Math.max(1, Math.round(value / 20));
  return (
    <span className="flex gap-1" aria-label={`${filled} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`mm-seg h-2 w-7 rounded-[2px] sm:w-9 ${i < filled ? 'bg-primary' : 'bg-stone-200'}`} />
      ))}
    </span>
  );
};

const MaterialMatchmaker: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const m = materials[idx];

  const { contextSafe } = useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.mm-tab', { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.mm-tabs', start: 'top 85%', once: true } });
    });
  }, { scope: root });

  // new slab wipes in over the previous one; copy and ratings re-enter
  useGSAP(() => {
    if (prev === null) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo('.mm-slab-new', { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' });
    gsap.fromTo('.mm-slab-new img', { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'expo.out' });
    // fromTo with explicit end values so rapid clicks never leave copy half-faded
    gsap.fromTo('.mm-copy > *', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', overwrite: true });
    gsap.fromTo('.mm-seg', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.35, stagger: 0.015, ease: 'power2.out', delay: 0.15, overwrite: true });
  }, { scope: root, dependencies: [idx] });

  const choose = contextSafe((i: number) => {
    if (i === idx) return;
    setPrev(idx);
    setIdx(i);
  });

  return (
    <section ref={root} className="relative z-30 bg-[#faf8f5] py-16 md:py-28">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Interactive Guide
            </p>
            <h2 className="font-serif text-[2.3rem] font-medium leading-[1.05] text-primary sm:text-5xl lg:text-[3.6rem]">
              Find your perfect stone
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-stone-600 md:text-lg lg:col-span-5 lg:justify-self-end">
            Four materials, compared honestly. Pick one to see how it performs and where it shines.
          </p>
        </div>

        {/* material selector: big serif words */}
        <div data-no-motion role="tablist" aria-label="Stone materials" className="mm-tabs -mx-5 mb-8 flex gap-6 overflow-x-auto border-b border-stone-300/70 px-5 [scrollbar-width:none] md:mx-0 md:mb-12 md:gap-10 md:px-0">
          {materials.map((mat, i) => {
            const on = i === idx;
            return (
              <button key={mat.id} role="tab" aria-selected={on} onClick={() => choose(i)}
                className="mm-tab group relative shrink-0 pb-4 text-left">
                <span className="mr-2 align-top font-mono text-[11px] text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                <span className={`font-serif text-[1.7rem] leading-none transition-colors duration-300 md:text-[2.6rem] ${on ? 'text-primary' : 'text-stone-300 group-hover:text-stone-500'}`}>{mat.name}</span>
                <span className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-secondary transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
            );
          })}
        </div>

        <div data-no-motion role="tabpanel" className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          {/* slab */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-stone-200 shadow-[0_30px_60px_-30px_rgba(15,23,42,.45)] ring-1 ring-black/5 lg:aspect-[4/3]">
              {prev !== null && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={materials[prev].slab} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
              <div key={m.id} className="mm-slab-new absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.slab} alt={`${m.slabName} ${m.name} slab`} className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/45 to-transparent p-4 text-white md:p-5">
                <span><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Shown</span><span className="font-serif text-lg">{m.slabName}</span></span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">{m.origin}</span>
              </div>
            </div>
          </div>

          {/* spec sheet */}
          <div className="mm-copy lg:col-span-6">
            <h3 className="font-serif text-[1.9rem] font-medium leading-tight text-primary md:text-[2.4rem]">{m.tagline}</h3>
            <p className="mt-2 text-sm text-stone-500">Best for <span className="font-semibold text-stone-700">{m.bestFor}</span></p>

            <dl className="mt-7 divide-y divide-stone-200 border-y border-stone-200">
              {statRows.map((r) => (
                <div key={r.key} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-500">{r.label}</dt>
                  <dd><Rating value={m.stats[r.key]} /></dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {m.pros.map((p) => (
                <li key={p} className="flex gap-2.5 text-[14px] leading-snug text-stone-600"><span className="mt-[7px] h-px w-3 shrink-0 bg-secondary" />{p}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-semibold text-white transition hover:bg-stone-900">
                Get a quote for {m.name}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
              </a>
              <Link href="/kitchen-design" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary">
                <Box size={16} className="text-secondary" /> Try it on a kitchen in 3D
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialMatchmaker;
