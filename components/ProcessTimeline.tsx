'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Check, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  details: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Consultation",
    subtitle: "Day 1",
    description: "Visit our showroom or schedule an in-home estimate. We help you select the perfect slab and finalize the design details.",
    image: "https://i.imgur.com/RnEnmeO.png",
    details: [
      "Free design consultation with our stone experts",
      "Walk-through of our slab yard (500+ options)",
      "Selection of edge profiles (Bullnose, Eased, Ogee)",
      "Preliminary budget estimation and timeline planning"
    ]
  },
  {
    id: 2,
    title: "Laser Templating",
    subtitle: "Day 2-3",
    description: "Our technicians visit your home with advanced digital laser systems to measure your cabinets with 1/16\" precision. No manual errors.",
    image: "https://i.imgur.com/2o8eFqx.png",
    details: [
      "Digital Laser Template (LT-2D3D) for exact fit",
      "Review of seam locations and overhangs",
      "Verification of sink and faucet compatibility",
      "Cabinet structural assessment to ensure support"
    ]
  },
  {
    id: 3,
    title: "CNC Fabrication",
    subtitle: "Day 4",
    description: "Your stone is cut using waterjet technology at our Duluth facility. We layout the veins perfectly before the first cut is made.",
    image: "https://i.imgur.com/CpVRozW.png",
    details: [
      "Digital slab layout for vein matching (Flow optimization)",
      "High-precision Waterjet and Bridge Saw cutting",
      "Multi-step automated edge polishing",
      "Quality control inspection under special lighting"
    ]
  },
  {
    id: 4,
    title: "Clean Installation",
    subtitle: "Day 5",
    description: "We treat your home with respect. Our team covers your floors and furniture before bringing in a single tool. Installation typically takes just 4-6 hours.",
    image: "https://i.imgur.com/oHj79ZL.png",
    badge: "No-Mess Guarantee",
    details: [
      "Floor protection runners and dust containment",
      "Professional mounting of undermount sinks",
      "Drilling of faucet and soap dispenser holes on-site",
      "Thorough cleanup of the workspace"
    ]
  },
  {
    id: 5,
    title: "Final Inspection",
    subtitle: "Completion",
    description: "We seal your stone and perform a final walkthrough with you to ensure every detail meets our 5-star standard.",
    image: "https://i.imgur.com/4MQSwFE.png",
    details: [
      "Application of premium stone sealer (15-year protection)",
      "Client walkthrough and satisfaction checklist",
      "Care and maintenance instructions provided",
      "Warranty registration and final sign-off"
    ]
  }
];


// Desktop: the section pins and the five days slide past horizontally.
// Tablet / phone: a vertical timeline whose rail fills as you scroll.
const ProcessTimeline: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current!;
      const labels = gsap.utils.toArray<HTMLElement>('.pt-label');
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      const slide = gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set('.pt-fill', { scaleX: self.progress });
            const idx = Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1)));
            labels.forEach((l, i) => l.toggleAttribute('data-on', i <= idx));
          },
        },
      });
      // photos drift inside their frames while the track moves
      gsap.utils.toArray<HTMLElement>('.pt-photo').forEach((img) => {
        gsap.fromTo(img, { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('.pt-copy').forEach((c) => {
        gsap.from(c.children, { y: 30, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: c, containerAnimation: slide, start: 'left 85%', toggleActions: 'play none none reverse' } });
      });
    });
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.pt-vfill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: track.current, start: 'top 65%', end: 'bottom 65%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.pt-step').forEach((s) => {
        gsap.from(s.querySelectorAll('.pt-m'), { y: 28, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 80%', once: true } });
      });
    });
  }, { scope: root });

  return (
    <section ref={root} data-no-motion data-expand className="relative bg-[#10141a] text-white">
      <div ref={pin} className="relative lg:flex lg:h-[100svh] lg:flex-col lg:overflow-hidden">
        {/* header */}
        <div className="container mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24 lg:pt-[max(7rem,14vh)]">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
                <span className="h-px w-8 bg-secondary" /> Transparent Process
              </p>
              <h2 className="font-serif text-[2.3rem] font-medium leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
                Template to install<br className="hidden sm:block" /> in about five days.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/60 md:text-lg lg:col-span-5 lg:justify-self-end">
              Worried about the mess? Don&apos;t be. We&apos;ve refined our 5-step process over 20 years to be seamless, fast, and remarkably clean.
            </p>
          </div>
          {/* day rail (desktop) */}
          <div className="relative mt-10 hidden lg:block">
            <div className="h-px w-full bg-white/15" />
            <div className="pt-fill absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-secondary" />
            <div className="mt-4 grid grid-cols-5">
              {steps.map((s, i) => (
                <span key={s.id} data-on={i === 0 ? '' : undefined} className="pt-label group flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35 transition-colors duration-300 data-[on]:text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/25 transition-colors group-data-[on]:bg-secondary" />{s.subtitle}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* steps */}
        <div className="relative flex-1 lg:flex lg:items-center">
          <ol ref={track} className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8 lg:mx-0 lg:flex lg:w-max lg:max-w-none lg:gap-10 lg:py-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[12vw]">
            {/* vertical rail (mobile / tablet) */}
            <span className="absolute bottom-20 left-[calc(1.25rem+11px)] top-12 w-px bg-white/15 md:left-[calc(2rem+11px)] lg:hidden" aria-hidden="true" />
            <span className="pt-vfill absolute bottom-20 left-[calc(1.25rem+11px)] top-12 w-px origin-top bg-secondary md:left-[calc(2rem+11px)] lg:hidden" aria-hidden="true" />
            {steps.map((s, i) => (
              <li key={s.id} className="pt-step relative pb-14 pl-12 last:pb-0 md:pl-16 lg:grid lg:w-[min(74vw,1080px)] lg:shrink-0 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:p-0">
                <span className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-secondary bg-[#10141a] text-[10px] font-bold text-secondary lg:hidden">{i + 1}</span>
                <div className="pt-m relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 lg:max-h-[54svh] lg:w-full">
                  <Image src={s.image} alt={`${s.title}: ${s.description}`} fill sizes="(min-width:1024px) 40vw, 90vw" className="pt-photo scale-[1.16] object-cover" />
                  {s.badge && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-primary shadow-lg">
                      <ShieldCheck size={14} className="text-secondary" /> {s.badge}
                    </span>
                  )}
                </div>
                <div className="pt-copy mt-6 lg:mt-0">
                  <div className="pt-m flex items-baseline gap-4">
                    <span className="pt-num font-serif text-6xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.35)] lg:text-8xl">0{i + 1}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{s.subtitle}</span>
                  </div>
                  <h3 className="pt-m mt-4 font-serif text-[1.9rem] font-medium leading-tight lg:text-[2.6rem]">{s.title}</h3>
                  <p className="pt-m mt-3 max-w-lg text-[15px] leading-relaxed text-white/65 md:text-base">{s.description}</p>
                  <ul className="pt-m pt-details mt-6 max-w-lg divide-y divide-white/10 border-y border-white/10">
                    {s.details.map((d) => (
                      <li key={d} className="flex gap-3 py-2.5 text-[13px] text-white/75 md:text-sm"><Check size={15} className="mt-0.5 shrink-0 text-secondary" />{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
