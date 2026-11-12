'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info, X } from 'lucide-react';
import { gsap } from 'gsap';
import { photoById, type Project } from '@/lib/portfolioData';

interface Props {
  project: Project | null;
  start: number;
  onClose: () => void;
}

// Fullscreen project viewer: arrows / keyboard / swipe, thumbnails, details.
export default function ProjectViewer({ project, start, onClose }: Props) {
  const [i, setI] = useState(start);
  const [showInfo, setShowInfo] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => { setI(start); setShowInfo(false); }, [project, start]);

  const n = project?.photoIds.length ?? 0;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  // open animation, scroll lock, keyboard
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (root.current) gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [project, go, onClose]);

  // soft fade + settle each time the photo changes
  useEffect(() => {
    const el = photoRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(el, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', overwrite: true });
  }, [i, project]);

  // keep the active thumbnail in view
  useEffect(() => {
    const el = thumbs.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [i]);

  if (!project) return null;
  const photo = photoById(project.photoIds[i]);

  const details = (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">{project.category} · {project.scope}</p>
      <h2 id="pv-title" className="mt-3 font-serif text-3xl leading-tight lg:text-[2.4rem]">{project.title}</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-white/65">{project.summary}</p>
      <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
        <div className="flex justify-between gap-4 py-3"><dt className="text-white/45">Location</dt><dd>Metro Atlanta, GA</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-white/45">Materials</dt><dd className="text-right">{project.materials.join(', ')}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-white/45">Built by</dt><dd>AGS crews, Duluth shop</dd></div>
      </dl>
      <Link href="/quote" className="group mt-6 inline-flex w-full items-center justify-between gap-3 rounded-full bg-secondary py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:brightness-110">
        Get a quote for a project like this
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
      </Link>
    </>
  );

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="pv-title" className="fixed inset-0 z-[90] flex flex-col bg-[#0b0e13] text-white lg:grid lg:grid-cols-[1fr_380px]">
      {/* stage */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-5">
          <p className="font-mono text-xs text-white/50 tabular-nums">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowInfo((s) => !s)} className="flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-semibold lg:hidden" aria-expanded={showInfo}>
              <Info size={15} /> Details
            </button>
            <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20" aria-label="Close project">
              <X size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative min-h-0 flex-1 touch-pan-y select-none"
          onPointerDown={(e) => { swipe.current = { x: e.clientX, y: e.clientY }; }}
          onPointerUp={(e) => {
            const s = swipe.current; swipe.current = null;
            if (!s) return;
            const dx = e.clientX - s.x, dy = e.clientY - s.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
          }}
        >
          <Image key={photo.id} ref={photoRef} src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 70vw, 100vw" priority className="object-contain px-2 lg:px-16" draggable={false} />
          {n > 1 && (
            <>
              <button onClick={() => go(-1)} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/25 sm:flex" aria-label="Previous photo"><ArrowLeft size={20} /></button>
              <button onClick={() => go(1)} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/25 sm:flex" aria-label="Next photo"><ArrowRight size={20} /></button>
            </>
          )}
        </div>

        <p className="px-4 pt-3 text-center text-sm text-white/70 lg:px-6">{photo.title}</p>
        {n > 1 && (
          <div ref={thumbs} className="flex gap-2 overflow-x-auto px-4 pb-4 pt-3 [scrollbar-width:none] lg:justify-center lg:px-6 lg:pb-6">
            {project.photoIds.map((id, k) => {
              const t = photoById(id);
              return (
                <button key={id} onClick={() => setI(k)} aria-label={`Photo ${k + 1}: ${t.title}`}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition ${k === i ? 'opacity-100 ring-2 ring-secondary' : 'opacity-45 hover:opacity-80'}`}>
                  <Image src={t.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* details: side panel on desktop, sheet on mobile */}
      <aside className="hidden overflow-y-auto border-l border-white/10 p-8 lg:block">{details}</aside>
      {showInfo && (
        <div className="absolute inset-x-0 bottom-0 z-10 max-h-[75svh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-[#12161d] p-6 shadow-2xl lg:hidden">
          <button onClick={() => setShowInfo(false)} className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-white/20" aria-label="Hide details" />
          {details}
        </div>
      )}
    </div>
  );
}
