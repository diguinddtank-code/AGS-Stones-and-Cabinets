'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import type { ServiceDetail } from '@/lib/servicesData';
import { serviceConversion } from '@/lib/serviceConversionData';
import { reviewsForService } from '@/lib/reviewsData';
import TrustBadges from './TrustBadges';
import { ReviewCard } from './ReviewsMarquee';

// Short version of the 5 steps in components/ProcessTimeline.tsx
const processSteps = [
  { title: 'Consultation', when: 'Day 1', text: 'Visit the showroom or book an in-home estimate. Pick your material and finalize the design.' },
  { title: 'Laser Templating', when: 'Day 2-3', text: 'We measure your space with a digital laser system to 1/16" precision.' },
  { title: 'Fabrication', when: 'Day 4', text: 'Your stone is cut and polished at our Duluth facility, with the veins laid out before the first cut.' },
  { title: 'Clean Installation', when: 'Day 5', text: 'Floors and furniture are covered first. Most installs take 4-6 hours.' },
  { title: 'Final Inspection', when: 'Completion', text: 'We seal natural stone and walk through every detail with you.' },
];

const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const form = document.getElementById('estimate-form');
  if (!form) return;
  e.preventDefault();
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const ServiceConversionBlock: React.FC<{ service: ServiceDetail }> = ({ service }) => {
  const data = serviceConversion[service.slug];
  if (!data) return null;
  const serviceReviews = reviewsForService(service.slug, 3);

  return (
    <div className="relative z-20 bg-white text-gray-900 font-sans">
      <TrustBadges overlap="desktop" />

      {/* Why AGS for this service */}
      <section className="pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-3">Why AGS</h2>
            <p className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
              Why AGS for {data.label}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {data.reasons.map((r, i) => (
              <div key={r.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-7">
                <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm mb-5">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-primary mb-2">{r.title}</h3>
                <p className="text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project photos */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6 md:mb-8">{data.photosHeading}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {data.photos.map(p => (
              <div key={p.src} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6 md:mb-8">What homeowners say</h3>
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {serviceReviews.map(r => (
              <div key={r.name} className="snap-start flex">
                <ReviewCard review={r} className="w-[85vw] max-w-[340px] md:w-full md:max-w-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-3">Our Process</h2>
          <p className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10">From first visit to final walkthrough</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s, i) => (
              <li key={s.title} className="border border-gray-200 rounded-2xl p-5 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-secondary font-serif text-2xl font-bold">0{i + 1}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{s.when}</span>
                </div>
                <h3 className="font-bold text-primary mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 text-center">FAQ</h2>
          <p className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">{data.label} questions</p>
          <div className="space-y-3">
            {data.faqs.map(f => (
              <details key={f.q} className="group bg-white border border-gray-200 rounded-xl">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-primary">
                  {f.q}
                  <ChevronDown size={18} className="shrink-0 text-secondary transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: scrolls back to the existing estimate form */}
      <section className="pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-primary text-white rounded-3xl px-6 py-10 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-2xl md:text-4xl font-serif font-bold mb-3">Get a free estimate for your {data.label.toLowerCase()}</p>
              <ul className="space-y-2 text-white/80 text-sm md:text-base">
                <li className="flex gap-2"><Check size={18} className="text-secondary shrink-0 mt-0.5" /> Factory-direct pricing from our Duluth shop</li>
                <li className="flex gap-2"><Check size={18} className="text-secondary shrink-0 mt-0.5" /> No obligation, no pressure</li>
              </ul>
            </div>
            <a
              href="#estimate-form"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-full transition-colors whitespace-nowrap"
            >
              Get My Free Quote <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceConversionBlock;
