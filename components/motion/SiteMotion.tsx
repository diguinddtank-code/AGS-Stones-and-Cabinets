'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Site-wide motion layer, mounted once in app/layout.tsx.
// - Lenis smooth scrolling on desktop (synced with ScrollTrigger).
// - Display headings: words rise out of a line mask as they scroll in.
// - Copy and image blocks under them: soft fade / clip reveal.
// It only touches elements that have no animation of their own (no
// opacity-0 / translate classes, no inline transform from framer-motion),
// skips anything above the fold on load, and opts out with data-no-motion.

const DONE = 'data-gsap';
const OWN_ANIMATION = '[data-no-motion],[class*="opacity-0"],[class*="animate-"],[style*="transform"],[style*="opacity"],header,footer,nav,[role="dialog"]';

// React tags a DOM node with a __reactFiber$ key once it has hydrated it.
// Touching server markup before that breaks hydration, so wait for it.
const hydrated = (el: Element) => { for (const k in el) if (k.startsWith('__reactFiber$')) return true; return false; };
const isSkippable = (el: Element) => !!el.closest(OWN_ANIMATION) || el.hasAttribute(DONE);
const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

const safe = <T,>(fn: (el: T) => void) => (el: T) => {
  try { fn(el); } catch (err) { if (process.env.NODE_ENV !== 'production') console.warn('[SiteMotion]', err, el); }
};

function setup(root: HTMLElement, ctx: gsap.Context): number {
  let added = 0;
  ctx.add(() => {
    // 1) display headings
    root.querySelectorAll<HTMLElement>('main h1, main h2, main h3').forEach(safe((h) => {
      if (isSkippable(h) || !hydrated(h)) return;
      h.setAttribute(DONE, ''); // evaluated once, animated or not
      const fs = parseFloat(getComputedStyle(h).fontSize);
      if (!belowFold(h) || fs < 26 || (h.textContent ?? '').length > 140) return;
      added++;
      SplitText.create(h, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          // line masks clip descenders (g, p, y) on tight leading; give them room
          (self.masks as HTMLElement[] | undefined)?.forEach((mk) => { mk.style.paddingBottom = '0.14em'; mk.style.marginBottom = '-0.14em'; });
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.035,
            scrollTrigger: { trigger: h, start: 'top 88%', once: true },
          });
        },
      });
      // eyebrow above + paragraph below fade in with the heading
      const near = [h.previousElementSibling, h.nextElementSibling].filter(
        (n): n is HTMLElement => !!n && /^(P|SPAN|DIV|H2|H4)$/.test(n.tagName) && !isSkippable(n) && hydrated(n) && (n.textContent ?? '').length < 400 && n.querySelectorAll('img,a,button').length === 0,
      );
      near.forEach((n) => {
        n.setAttribute(DONE, '');
        gsap.from(n, { y: 18, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
      });
    }));

    // 2) large images: clip reveal on their rounded wrapper
    root.querySelectorAll<HTMLImageElement>('main section img').forEach(safe((img) => {
      const wrap = img.closest<HTMLElement>('.overflow-hidden');
      if (!wrap || isSkippable(wrap) || !hydrated(wrap) || wrap.closest('[class*="marquee"],[class*="scroll"]') || !belowFold(wrap)) return;
      if (wrap.offsetHeight < 220 || wrap.offsetWidth < 220) return;
      wrap.setAttribute(DONE, '');
      added++;
      const r = getComputedStyle(wrap).borderRadius || '0px';
      gsap.fromTo(wrap,
        { clipPath: `inset(10% 6% 10% 6% round ${r})` },
        { clipPath: `inset(0% 0% 0% 0% round ${r})`, duration: 1.3, ease: 'expo.out', clearProps: 'clipPath', scrollTrigger: { trigger: wrap, start: 'top 90%', once: true } });
    }));

    // 3) opt-in hooks for new sections: data-reveal / data-reveal-stagger / data-parallax
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(safe((el) => {
      if (el.hasAttribute(DONE) || !hydrated(el)) return;
      el.setAttribute(DONE, '');
      added++;
      gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    }));
    root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach(safe((el) => {
      if (el.hasAttribute(DONE) || !hydrated(el)) return;
      el.setAttribute(DONE, '');
      added++;
      gsap.from(el.children, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    }));
    // section transition: a dark section opens out of a rounded frame
    root.querySelectorAll<HTMLElement>('[data-expand]').forEach(safe((el) => {
      if (el.hasAttribute(DONE) || !hydrated(el)) return;
      el.setAttribute(DONE, '');
      added++;
      const side = window.innerWidth < 768 ? 3 : 4.5;
      const radius = window.innerWidth < 768 ? 22 : 40;
      gsap.fromTo(el,
        { clipPath: `inset(0% ${side}% 0% ${side}% round ${radius}px)` },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: true } });
    }));
    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach(safe((el) => {
      if (el.hasAttribute(DONE) || !hydrated(el)) return;
      el.setAttribute(DONE, '');
      added++;
      const amt = parseFloat(el.dataset.parallax || '12');
      gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } });
    }));
  });
  return added;
}

export default function SiteMotion() {
  const pathname = usePathname();

  // smooth scrolling (desktop pointer only)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: true, allowNestedScroll: true, prevent: (node) => !!node.closest?.('canvas,[data-lenis-prevent],[role="dialog"]') });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // pause while a modal or the mobile menu locks the body
    const mo = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') lenis.stop(); else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => { mo.disconnect(); gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  // reveals, re-scanned as dynamic sections mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const main = document.querySelector('main');
    if (!main) return;
    const ctx = gsap.context(() => {}, main);
    let t: ReturnType<typeof setTimeout> | undefined;
    let first: ReturnType<typeof setTimeout> | undefined;
    let started = false;
    const run = () => { if (setup(main, ctx) > 0) { ScrollTrigger.sort(); ScrollTrigger.refresh(); } };
    const schedule = () => { if (!started) return; clearTimeout(t); t = setTimeout(run, 250); };
    // Never touch server-rendered markup before React has hydrated it (lazy
    // Suspense sections hydrate after their chunks arrive). Start once the
    // page has loaded and the main thread is idle; everything we animate is
    // below the fold, so nothing visibly pops.
    const start = () => {
      const go = () => { started = true; run(); };
      const ric = (window as any).requestIdleCallback as ((cb: () => void, o?: { timeout: number }) => number) | undefined;
      first = setTimeout(() => (ric ? ric(go, { timeout: 1500 }) : go()), 900);
    };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
    // only react to newly mounted elements (lazy sections), not text updates
    const mo = new MutationObserver((list) => { if (list.some((m) => Array.from(m.addedNodes).some((n) => n.nodeType === 1 && !(n as Element).closest?.('[data-gsap]')))) schedule(); });
    mo.observe(main, { childList: true, subtree: true });
    // late-hydrating sections: rescan (throttled) as the user scrolls
    let last = 0;
    const onScroll = () => { const now = Date.now(); if (started && now - last > 500) { last = now; schedule(); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('load', start); clearTimeout(first); clearTimeout(t); mo.disconnect(); ctx.revert(); main.querySelectorAll(`[${DONE}]`).forEach((el) => el.removeAttribute(DONE)); };
  }, [pathname]);

  return null;
}
