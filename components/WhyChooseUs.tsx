'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Each point pairs a problem homeowners run into with how AGS handles it.
// Facts come from elsewhere on the site (ProcessTimeline, Faq, StoneGallery).
const points = [
  {
    spec: '± 1/16"',
    problem: 'Gaps at the wall and overhangs that are off by half an inch.',
    title: 'Measured with a laser, not a tape',
    fix: 'We template your cabinets with a digital laser system to 1/16". Uneven walls are accounted for before we cut.',
  },
  {
    spec: 'Up to 30% less',
    problem: 'Paying a showroom markup on stone they bought from someone else.',
    title: 'Cut in our own Duluth shop',
    fix: 'We import our own slabs and fabricate in-house. No middleman, which saves you up to 30%.',
  },
  {
    spec: '500+ slabs',
    problem: 'Choosing from a 2-inch sample and getting a slab that looks different.',
    title: 'You pick the actual slab',
    fix: 'Walk our showroom, see 500+ full slabs and choose yours. We lay out the veins with you before the first cut.',
  },
  {
    spec: '4–6 hr install',
    problem: 'A kitchen out of commission for weeks.',
    title: 'About 5 days, template to install',
    fix: 'Installation day usually takes 4-6 hours. Floors are covered first and we clean up before we leave.',
  },
];

const WhyChooseUs: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // years counter
      const n = root.current!.querySelector<HTMLElement>('[data-count]');
      if (n) {
        const o = { v: 0 };
        gsap.to(o, { v: 20, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 85%', once: true }, onUpdate: () => { n.textContent = String(Math.round(o.v)); } });
      }
      gsap.utils.toArray<HTMLElement>('.why-row').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 78%', once: true } });
        tl.from(row.querySelector('.why-rule'), { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'expo.out' })
          .from(row.querySelectorAll('.why-in'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, '-=0.6')
          // the usual problem gets struck through, then the fix lands
          .to(row.querySelector('.why-strike'), { backgroundSize: '100% 1px', duration: 0.7, ease: 'power2.inOut' }, '-=0.35')
          .to(row.querySelector('.why-strike'), { color: '#a8a29e', duration: 0.4 }, '<0.3')
          .from(row.querySelector('.why-spec'), { x: 16, opacity: 0, duration: 0.6, ease: 'power3.out' }, '<');
      });
    });
  }, { scope: root });

  return (
    <section ref={root} id="why-us" className="relative z-20 bg-[#faf8f5] py-16 md:py-28">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* statement column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
                <span className="h-px w-8 bg-secondary" /> The AGS Standard
              </p>
              <h2 className="font-serif text-[2.1rem] font-medium leading-[1.08] text-primary sm:text-5xl lg:text-[3.4rem]">
                Most countertop problems start before the stone reaches your kitchen.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone-600 md:text-lg">
                A rough measurement, a padded quote, a slab you never saw. Here is how we handle each one.
              </p>
              <div className="mt-10 flex items-end gap-5 border-t border-stone-300/70 pt-8">
                <p className="font-serif text-7xl leading-[0.8] text-primary md:text-8xl">
                  <span data-count>20</span><span className="text-secondary">+</span>
                </p>
                <p className="pb-1 text-sm leading-snug text-stone-500">
                  years fabricating and<br />installing stone across<br />Metro Atlanta
                </p>
              </div>
              <a href="#contact" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary py-3 pl-6 pr-3 text-sm font-semibold text-white transition hover:bg-stone-900">
                Get a free estimate
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
              </a>
            </div>
          </div>

          {/* problem → fix rows */}
          <ol data-no-motion className="lg:col-span-7">
            {points.map((p, i) => (
              <li key={p.title} className="why-row relative pb-10 pt-8 md:pb-14 md:pt-10">
                <span className="why-rule absolute inset-x-0 top-0 h-px bg-stone-300" />
                <div className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-8">
                  <span className="why-in font-serif text-[2.6rem] leading-none text-stone-300 tabular-nums md:text-6xl">0{i + 1}</span>
                  <div>
                    <div className="why-in flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">The usual</p>
                      <span className="why-spec rounded-full border border-secondary/40 px-3 py-1 font-mono text-[11px] tracking-wide text-secondary">{p.spec}</span>
                    </div>
                    <p className="why-in mt-2 text-[15px] leading-snug text-stone-600 md:text-base">
                      <span className="why-strike [box-decoration-break:clone] [-webkit-box-decoration-break:clone]" style={{ backgroundImage: 'linear-gradient(currentColor, currentColor)', backgroundRepeat: 'no-repeat', backgroundPosition: '0 58%', backgroundSize: '0% 1px' }}>
                        {p.problem}
                      </span>
                    </p>
                    <h3 className="why-in mt-6 font-serif text-2xl font-medium leading-snug text-primary md:text-[2rem]">{p.title}</h3>
                    <p className="why-in mt-3 max-w-xl text-[15px] leading-relaxed text-stone-600 md:text-base">{p.fix}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
