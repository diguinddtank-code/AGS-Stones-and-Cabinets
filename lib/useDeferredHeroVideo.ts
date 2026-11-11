'use client';

import { RefObject, useEffect } from 'react';

export interface HeroVideoSources {
  desktop: string;
  mobile: string;
}

// /promo hero: original footage re-encoded from 4K/60fps (265 MB) to
// 720p for desktop and 480p for phones. Same footage, same look.
export const PROMO_HERO_VIDEO: HeroVideoSources = {
  desktop: '/videos/promo-hero-720.mp4',
  mobile: '/videos/promo-hero-480.mp4',
};

// Home hero: kitchen countertop montage (granite and quartz kitchens) cut
// from free Pexels clips 3444432, 19227878, 3444430, 19227875, 5744242 and
// 3444431 (Pexels license: free commercial use, no attribution required).
export const HOME_HERO_VIDEO: HeroVideoSources = {
  desktop: '/videos/hero-kitchen-720.mp4',
  mobile: '/videos/hero-kitchen-480.mp4',
};
// First frame of the home montage, shown until the video is playing so the
// switch from still image to video is invisible.
export const HOME_HERO_POSTER = '/images/hero/hero-kitchen-poster.jpg';

// /promo poster, served through the Next.js image optimizer.
export const HERO_VIDEO_POSTER = `/_next/image?url=${encodeURIComponent('https://kitchenandbathshop.com/wp-content/uploads/2020/11/5d7ff4ab763f7-scaled.jpg')}&w=1200&q=75`;

/**
 * Attaches the hero video source only once the page has finished loading and
 * the browser is idle, so the video never competes with the headline and the
 * form for bandwidth. Skipped for data-saver / 2G visitors (poster stays).
 * Sets data-ready on the <video> once it is actually playing, which the
 * [data-hero-video] CSS in globals.css uses to fade it in.
 */
export function useDeferredHeroVideo(ref: RefObject<HTMLVideoElement>, sources: HeroVideoSources = PROMO_HERO_VIDEO) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as any).connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;

    const markReady = () => video.setAttribute('data-ready', '');
    video.addEventListener('playing', markReady, { once: true });

    let idleId: number | undefined;
    const start = () => {
      video.src = window.innerWidth < 768 ? sources.mobile : sources.desktop;
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
      video.removeEventListener('playing', markReady);
      const w = window as any;
      if (idleId !== undefined) (w.cancelIdleCallback ? w.cancelIdleCallback(idleId) : clearTimeout(idleId));
    };
  }, [ref, sources]);
}
