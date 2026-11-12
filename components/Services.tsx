'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { services } from '@/lib/servicesData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Editorial index of services. On pointer devices a photo of the hovered
// service follows the cursor; on touch each row carries its own thumbnail.
const Services: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row, i) => {
        gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
          .from(row.querySelector('.svc-rule'), { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'expo.out', delay: (i % 3) * 0.04 })
          .from(row.querySelectorAll('.svc-in'), { yPercent: 60, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, '-=0.75');
      });
    });
    mm.add('(pointer: fine) and (min-width: 1024px)', () => {
      const el = preview.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
      // the cursor doesn't move while the page scrolls, so hide the preview
      const onScroll = () => {
        if (gsap.getProperty(el, 'opacity') === 0) return;
        setActive(null);
        gsap.to(el, { scale: 0.6, opacity: 0, duration: 0.25, overwrite: 'auto' });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    });
  }, { scope: root });

  const move = contextSafe((e: React.PointerEvent) => {
    const el = preview.current;
    if (!el || !root.current || e.pointerType !== 'mouse') return;
    const r = root.current.getBoundingClientRect();
    gsap.to(el, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
  });
  const enter = contextSafe((i: number, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    setActive(i);
    gsap.to(preview.current, { scale: 1, opacity: 1, rotate: (i % 2 ? 2 : -2), duration: 0.5, ease: 'expo.out' });
  });
  const leave = contextSafe(() => {
    setActive(null);
    gsap.to(preview.current, { scale: 0.6, opacity: 0, rotate: 0, duration: 0.4, ease: 'power3.in' });
  });

  return (
    <section ref={root} id="services" onPointerMove={move} className="relative overflow-hidden bg-white py-16 md:py-28">
      <div className="container relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Our Expertise
            </p>
            <h2 className="font-serif text-[2.4rem] font-medium leading-[1.04] text-primary sm:text-5xl lg:text-[4rem]">
              Mastering the<br className="hidden sm:block" /> art of stone
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-stone-600 md:text-lg lg:col-span-5 lg:justify-self-end">
            From precision laser templating to hand-polished edges. Every service is done by our own team, out of our own shop.
          </p>
        </div>

        <ul data-no-motion onPointerLeave={leave}>
          {services.map((s, i) => (
            <li key={s.slug} className="svc-row relative">
              <span className="svc-rule absolute inset-x-0 top-0 h-px bg-stone-200" />
              <Link
                href={`/services/${s.slug}`}
                onPointerEnter={(e) => enter(i, e)}
                aria-label={`${s.title}: ${s.shortDesc}`}
                className={`group grid grid-cols-[2.2rem_1fr_auto] items-center gap-x-3 py-5 transition-colors duration-300 sm:grid-cols-[3.5rem_1fr_auto] md:py-7 lg:grid-cols-[5rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] ${active !== null && active !== i ? 'lg:text-stone-300' : ''}`}
              >
                <span className="svc-in font-mono text-xs text-stone-400 tabular-nums md:text-sm">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-in block min-w-0">
                  <span className={`block pb-1 font-serif text-[1.4rem] leading-[1.15] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] sm:text-3xl lg:text-[2.35rem] lg:group-hover:translate-x-3 ${active !== null && active !== i ? 'lg:text-stone-300' : 'text-primary'}`}>
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-stone-500 lg:hidden">{s.shortDesc}</span>
                </span>
                <span className="svc-in hidden text-[15px] leading-relaxed text-stone-500 lg:block">{s.shortDesc}</span>
                <span className="svc-in flex items-center gap-3">
                  {/* touch thumbnail */}
                  <span className="relative block h-14 w-20 overflow-hidden rounded-lg bg-stone-100 sm:h-16 sm:w-24 lg:hidden">
                    <Image src={s.image} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                  <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-primary transition-all duration-300 group-hover:rotate-45 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white sm:flex">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className="svc-row relative h-px"><span className="svc-rule absolute inset-x-0 top-0 h-px bg-stone-200" /></li>
        </ul>
      </div>

      {/* cursor-following preview (desktop) */}
      <div ref={preview} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[260px] w-[360px] overflow-hidden rounded-2xl shadow-2xl shadow-black/25 lg:block" style={{ opacity: 0 }}>
        {services.map((s, i) => (
          <Image key={s.slug} src={s.image} alt="" fill sizes="360px" className={`object-cover transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
    </section>
  );
};

export default Services;
