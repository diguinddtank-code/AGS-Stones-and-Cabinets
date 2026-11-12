'use client';

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Box, Images } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import Header from './Header';
import Footer from './Footer';
import ProjectViewer from './portfolio/ProjectViewer';
import { CATEGORIES, photoById, photos, portfolio, type Category, type Project } from '@/lib/portfolioData';

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

// Kept for the home page's ProjectsShowcase (it picks photos by id).
export type ProjectImage = (typeof photos)[number];
export const projects = photos;

const FEATURED = ['walnut-blue-quartzite-bath', 'navy-white-quartz-kitchen', 'white-waterfall-kitchen'];

export default function ProjectsGallery() {
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [open, setOpen] = useState<{ p: Project; i: number } | null>(null);

  const featured = FEATURED.map((s) => portfolio.find((p) => p.slug === s)!);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: portfolio.length };
    portfolio.forEach((p) => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, []);
  const rowA = photos.filter((_, k) => k % 2 === 0);
  const rowB = photos.filter((_, k) => k % 2 === 1);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // hero: title lines rise, filmstrip rows slide in opposite directions with scroll
      gsap.from('.pf-hero-line', { yPercent: 110, duration: 1.1, stagger: 0.08, ease: 'power4.out', delay: 0.15 });
      gsap.from('.pf-hero-fade', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.45 });
      gsap.fromTo('.pf-row-a', { xPercent: 0 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: '.pf-strip', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.pf-row-b', { xPercent: -22 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.pf-strip', start: 'top bottom', end: 'bottom top', scrub: true } });
      // featured: cover opens up, photo settles, copy follows
      gsap.utils.toArray<HTMLElement>('.pf-feature').forEach((f) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: f, start: 'top 75%', once: true } });
        tl.fromTo(f.querySelector('.pf-cover'), { clipPath: 'inset(12% 8% 12% 8% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.3, ease: 'expo.out' })
          .from(f.querySelectorAll('.pf-in'), { y: 30, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, '-=1');
        gsap.fromTo(f.querySelector('.pf-cover-img'), { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.from('.pf-card', { y: 50, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.pf-grid', start: 'top 85%', once: true } });
    });
  }, { scope: root });

  // animate the grid re-layout when the filter changes
  const changeFilter = (f: 'All' | Category) => {
    if (f === filter) return;
    flipState.current = Flip.getState('.pf-card');
    setFilter(f);
  };
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.7,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.35 }),
    });
    flipState.current = null;
    ScrollTrigger.refresh();
  }, [filter]);

  const openProject = (p: Project, i = 0) => setOpen({ p, i });

  return (
    <div ref={root} className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {/* ============ HERO ============ */}
        <section data-no-motion className="relative overflow-hidden bg-[#0d1016] pb-16 pt-32 text-white md:pb-24 md:pt-44">
          <div className="container mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="pf-hero-fade mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
                  <span className="h-px w-8 bg-secondary" /> Portfolio · Metro Atlanta
                </p>
                <h1 className="font-serif text-[22vw] font-medium leading-[0.86] tracking-tight sm:text-[9rem] lg:text-[11rem]">
                  <span className="block overflow-hidden pb-[0.06em]"><span className="pf-hero-line block">Our</span></span>
                  <span className="block overflow-hidden pb-[0.06em]"><span className="pf-hero-line block">Work<span className="text-secondary">.</span></span></span>
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pb-4">
                <p className="pf-hero-fade max-w-sm text-[15px] leading-relaxed text-white/65 md:text-lg">
                  Real kitchens, baths and built-ins we templated, fabricated and installed. No stock photos, just finished work.
                </p>
                <dl className="pf-hero-fade mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {[[String(portfolio.length), 'Projects'], [String(photos.length), 'Photos'], ['100%', 'Own crews']].map(([v, l]) => (
                    <div key={l}><dt className="font-serif text-3xl md:text-4xl">{v}</dt><dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/45">{l}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* filmstrip */}
          <div className="pf-strip mt-14 space-y-3 md:mt-20 md:space-y-4" aria-hidden="true">
            {[rowA, rowB].map((row, r) => (
              <div key={r} className={`flex w-max gap-3 md:gap-4 ${r === 0 ? 'pf-row-a' : 'pf-row-b'}`}>
                {[...row, ...row.slice(0, 6)].map((p, k) => (
                  <div key={`${p.id}-${k}`} className="relative h-28 shrink-0 overflow-hidden rounded-xl bg-white/5 sm:h-40 md:h-56" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                    <Image src={p.src} alt="" fill sizes="(min-width: 768px) 300px, 160px" className="object-cover opacity-80" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ============ FEATURED ============ */}
        <section className="bg-[#faf8f5] py-16 md:py-28">
          <div className="container mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
              <div>
                <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary"><span className="h-px w-8 bg-secondary" /> Featured</p>
                <h2 className="font-serif text-[2.3rem] font-medium leading-[1.05] text-primary sm:text-5xl lg:text-[3.6rem]">Selected projects</h2>
              </div>
              <p className="hidden max-w-xs text-sm leading-relaxed text-stone-500 md:block">Tap any project to walk through every photo.</p>
            </div>

            <div className="space-y-20 md:space-y-32">
              {featured.map((p, k) => {
                const cover = photoById(p.photoIds[0]);
                const portrait = cover.h > cover.w;
                const reverse = k % 2 === 1;
                return (
                  <article key={p.slug} data-no-motion className="pf-feature grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                    <button onClick={() => openProject(p)} className={`pf-cover group relative block w-full overflow-hidden rounded-2xl bg-stone-200 text-left lg:col-span-7 ${reverse ? 'lg:order-2' : ''} ${portrait ? 'aspect-[4/5] lg:aspect-[4/4.6]' : 'aspect-[4/3]'}`} aria-label={`Open ${p.title}`}>
                      <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="pf-cover-img scale-[1.1] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.15]" />
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-primary shadow-lg backdrop-blur">
                        <Images size={14} className="text-secondary" /> {p.photoIds.length} photos
                      </span>
                    </button>
                    <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
                      <p className="pf-in font-mono text-xs text-stone-400">{String(k + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</p>
                      <p className="pf-in mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">{p.category} · {p.scope}</p>
                      <h3 className="pf-in mt-3 font-serif text-[2rem] font-medium leading-[1.08] text-primary md:text-5xl">{p.title}</h3>
                      <p className="pf-in mt-4 max-w-md text-[15px] leading-relaxed text-stone-600 md:text-base">{p.summary}</p>
                      <ul className="pf-in mt-5 flex flex-wrap gap-2">
                        {p.materials.map((m) => <li key={m} className="rounded-full border border-stone-300 px-3 py-1 text-xs text-stone-600">{m}</li>)}
                      </ul>
                      <div className="pf-in mt-7 grid grid-cols-3 gap-2.5">
                        {p.photoIds.slice(1, 4).map((id, j) => {
                          const t = photoById(id);
                          return (
                            <button key={id} onClick={() => openProject(p, j + 1)} className="group relative aspect-square overflow-hidden rounded-lg bg-stone-200" aria-label={`Open photo: ${t.title}`}>
                              <Image src={t.src} alt={t.alt} fill sizes="140px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </button>
                          );
                        })}
                      </div>
                      <button onClick={() => openProject(p)} className="pf-in group mt-7 inline-flex items-center gap-3 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-semibold text-white transition hover:bg-stone-900">
                        View project
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ INDEX ============ */}
        <section id="all-projects" className="bg-white py-16 md:py-28">
          <div className="container mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-8 grid gap-6 md:mb-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary"><span className="h-px w-8 bg-secondary" /> Index</p>
                <h2 className="font-serif text-[2.3rem] font-medium leading-[1.05] text-primary sm:text-5xl lg:text-[3.6rem]">Every project</h2>
              </div>
              <div data-no-motion role="tablist" aria-label="Filter projects" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:col-span-6 lg:mx-0 lg:justify-end lg:px-0">
                {CATEGORIES.map((c) => {
                  const on = filter === c.id;
                  return (
                    <button key={c.id} role="tab" aria-selected={on} onClick={() => changeFilter(c.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${on ? 'bg-primary text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                      {c.label}<span className={`text-[11px] tabular-nums ${on ? 'text-secondary' : 'text-stone-400'}`}>{counts[c.id] ?? 0}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div data-no-motion className="pf-grid grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:gap-4 lg:auto-rows-[230px] lg:grid-cols-4">
              {portfolio.map((p) => {
                const cover = photoById(p.photoIds[0]);
                const tall = cover.h > cover.w;
                const hidden = filter !== 'All' && p.category !== filter;
                return (
                  <button key={p.slug} data-flip-id={p.slug} onClick={() => openProject(p)}
                    className={`pf-card group relative overflow-hidden rounded-xl bg-stone-200 text-left ${tall ? 'row-span-2' : ''} ${hidden ? 'hidden' : ''}`}
                    aria-label={`Open ${p.title}, ${p.photoIds.length} photos`}>
                    <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">{p.category}</span>
                      <span className="mt-0.5 block font-serif text-[15px] leading-tight text-white sm:text-lg md:text-xl">{p.title}</span>
                      <span className="mt-1 block text-[11px] text-white/60">{p.photoIds.length} photo{p.photoIds.length > 1 ? 's' : ''}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section data-expand className="bg-[#10141a] py-20 text-white md:py-28">
          <div className="container mx-auto max-w-5xl px-5 text-center md:px-8">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">Your project</p>
            <h2 className="font-serif text-[2.4rem] font-medium leading-[1.05] sm:text-5xl lg:text-6xl">Your kitchen could be next.</h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/60 md:text-lg">Pick your slab in our Duluth showroom or start with a design in 3D. Either way, we measure, fabricate and install it ourselves.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/quote" className="group inline-flex items-center justify-center gap-3 rounded-full bg-secondary py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:brightness-110">
                Get a free estimate
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
              </Link>
              <Link href="/kitchen-design" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/50">
                <Box size={16} className="text-secondary" /> Design it in 3D
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ProjectViewer project={open?.p ?? null} start={open?.i ?? 0} onClose={() => setOpen(null)} />
    </div>
  );
}
