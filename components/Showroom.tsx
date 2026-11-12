'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const expect = [
  'Personal design consultation',
  'Full slabs, not 2-inch samples',
  'Free samples to take home',
  'Cabinet and hardware displays',
  'Sink and faucet options',
];

// Hours and address match the LocalBusiness schema in app/layout.tsx.
const hours = [
  { d: 'Mon – Fri', h: '8:00 – 6:00' },
  { d: 'Saturday', h: '9:00 – 3:00' },
  { d: 'Sunday', h: 'Closed' },
];

const MAPS = 'https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States';

const Showroom: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      // photos drift at different speeds while the section passes
      gsap.fromTo('.sr-main-img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.sr-slab', { yPercent: 18 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.sr-stat', { scale: 0.7, opacity: 0, duration: 0.8, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.sr-stat', start: 'top 88%', once: true } });
      gsap.from('.sr-li', { y: 18, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.sr-list', start: 'top 85%', once: true } });
      gsap.from('.sr-rule', { scaleX: 0, transformOrigin: 'left', duration: 0.9, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '.sr-list', start: 'top 85%', once: true } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="showroom" data-expand className="relative overflow-hidden bg-[#10141a] py-16 text-white md:py-28">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* images */}
          <div data-no-motion className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-[5/6] xl:aspect-[4/4.4]">
              <Image
                src="https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg"
                alt="Full-size stone slabs on display at the AGS Stones showroom in Duluth, GA"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="sr-main-img scale-[1.14] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10141a]/50 via-transparent to-transparent" />
            </div>
            {/* slab sample card */}
            <div className="sr-slab absolute -bottom-8 right-4 w-[38%] max-w-[230px] overflow-hidden rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:right-8 lg:-right-8 lg:bottom-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/textures/stones/taj-mahal-swatch.jpg" alt="" className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">In stock</p>
                <p className="font-serif text-sm text-white">Taj Mahal Quartzite</p>
              </div>
            </div>
            {/* stat */}
            <div className="sr-stat absolute left-4 top-4 rounded-2xl bg-white px-4 py-3 text-primary shadow-xl sm:left-6 sm:top-6 sm:px-5 sm:py-4">
              <p className="font-serif text-3xl leading-none sm:text-4xl">500<span className="text-secondary">+</span></p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Full slabs on site</p>
            </div>
          </div>

          {/* copy */}
          <div className="pt-6 lg:col-span-5 lg:pt-0">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Visit the showroom
            </p>
            <h2 className="font-serif text-[2.3rem] font-medium leading-[1.05] sm:text-5xl lg:text-[3.3rem]">
              Touch and feel your future kitchen.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65 md:text-lg">
              Photos can&apos;t capture the depth of natural stone. Walk our Duluth showroom and see granite, marble, quartzite and quartz as full slabs. Walk-ins welcome.
            </p>

            <ol data-no-motion className="sr-list mt-8">
              {expect.map((e, i) => (
                <li key={e} className="sr-li relative flex items-baseline gap-4 py-3">
                  <span className="sr-rule absolute inset-x-0 top-0 h-px bg-white/10" />
                  <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] text-white/85">{e}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary"><MapPin size={13} /> Address</p>
                <p className="text-sm leading-relaxed text-white/80">4579 Abbotts Bridge Rd Suite -10<br />Duluth, GA 30097</p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">Hours</p>
                <dl className="space-y-1 text-sm">
                  {hours.map((x) => (
                    <div key={x.d} className="flex justify-between gap-4"><dt className="text-white/55">{x.d}</dt><dd className="tabular-nums text-white/85">{x.h}</dd></div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 rounded-full bg-secondary py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:brightness-110">
                Get directions
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
              </a>
              <a href="tel:4049524534" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50">
                <Phone size={15} className="text-secondary" /> (404) 952-4534
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;
