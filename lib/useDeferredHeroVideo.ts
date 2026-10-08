'use client';

import { RefObject, useEffect } from 'react';

// Hero background video, re-encoded from the original 4K/60fps file (265 MB)
// to 720p for desktop and 480p for phones. Same footage, same look.
export const HERO_VIDEO_DESKTOP = '/videos/promo-hero-720.mp4';
export const HERO_VIDEO_MOBILE = '/videos/promo-hero-480.mp4';

// Same poster image as before, served through the Next.js image optimizer.
export const HERO_VIDEO_POSTER = `/_next/image?url=${encodeURIComponent('https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg')}&w=1200&q=75`;

/**
 * Attaches the hero video source only once the page has finished loading and
 * the browser is idle, so the video never competes with the headline and the
 * form for bandwidth. Skipped for data-saver / 2G visitors (poster stays).
 */
export function useDeferredHeroVideo(ref: RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as any).connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;

    let idleId: number | undefined;
    const start = () => {
      video.src = window.innerWidth < 768 ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP;
      video.play().catch(() => {});
    };
    const schedule = () => {
      const w = window as any;
      idleId = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      const w = window as any;
      if (idleId !== undefined) (w.cancelIdleCallback ? w.cancelIdleCallback(idleId) : clearTimeout(idleId));
    };
  }, [ref]);
}
