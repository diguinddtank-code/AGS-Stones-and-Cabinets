'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Gem, Hammer, MapPin, PencilRuler, Phone } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import Configurator from './Configurator';

const compare = [
  { k: 'What it is', quartz: 'Engineered: about 93% quartz bound with resin', quartzite: '100% natural metamorphic stone', granite: '100% natural igneous stone' },
  { k: 'Look', quartz: 'Consistent veining, wide color range', quartzite: 'Marble-like movement, every slab unique', granite: 'Speckled or swirled crystals' },
  { k: 'Maintenance', quartz: 'No sealing needed', quartzite: 'Seal once a year', granite: 'Seal every 1–2 years' },
  { k: 'Heat', quartz: 'Use trivets', quartzite: 'Very heat resistant', granite: 'Very heat resistant' },
  { k: 'Price level', quartz: '$$ – $$$', quartzite: '$$$ – $$$$', granite: '$ – $$' },
];

const steps = [
  { icon: PencilRuler, title: 'Design it here', text: 'Choose a layout, your stone, cabinet colors and details. Send it to us in one click.' },
  { icon: Gem, title: 'Pick your slab', text: 'Walk our Duluth showroom and choose the exact slab for your kitchen, with a designer by your side.' },
  { icon: Hammer, title: 'We build & install', text: 'Laser templating, in-house fabrication and a clean one-day countertop install.' },
];

export default function KitchenDesignClient() {
  // The fixed header's height drives the sticky 3D stage offset.
  useEffect(() => {
    const update = () => {
      const h = document.querySelector('header[role="banner"]')?.parentElement as HTMLElement | null;
      if (h) document.documentElement.style.setProperty('--kd-header', `${h.offsetHeight}px`);
    };
    update();
    window.addEventListener('resize', update);
    const id = setTimeout(update, 600);
    return () => { window.removeEventListener('resize', update); clearTimeout(id); };
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header lightNav />
      <main className="flex-grow pt-[var(--kd-header,96px)]">
        <Configurator />

        {/* how it works */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">From screen to stone</p>
            <h2 className="mt-2 text-center font-serif text-3xl font-bold text-primary md:text-4xl">Your design, built by the people who designed it</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title} className="relative rounded-3xl border border-stone-200 bg-stone-50/60 p-7">
                  <span className="absolute right-6 top-5 font-serif text-5xl text-stone-200">{i + 1}</span>
                  <s.icon className="h-8 w-8 text-secondary" />
                  <h3 className="mt-4 font-serif text-xl font-semibold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* stone guide */}
        <section className="bg-[#f5f3ef] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">Stone guide</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">Quartz, quartzite or granite?</h2>
            <p className="mt-3 max-w-2xl text-stone-600">All three make a beautiful, long-lasting countertop. Here is how they compare.</p>
            <div className="mt-10 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-stone-200">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-primary">
                    <th className="p-5 font-sans text-xs font-bold uppercase tracking-wider text-stone-400" />
                    {['Quartz', 'Quartzite', 'Granite'].map((h) => <th key={h} className="p-5 font-serif text-lg font-semibold">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {compare.map((r) => (
                    <tr key={r.k} className="border-b border-stone-100 last:border-0">
                      <td className="p-5 text-xs font-bold uppercase tracking-wider text-stone-400">{r.k}</td>
                      <td className="p-5 text-stone-700">{r.quartz}</td>
                      <td className="p-5 text-stone-700">{r.quartzite}</td>
                      <td className="p-5 text-stone-700">{r.granite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">See the real slabs in person</h2>
            <p className="mt-3 max-w-xl text-white/70">Hundreds of slabs in stock at our Duluth showroom, serving all of Metro Atlanta.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#studio" className="flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-white hover:brightness-110">Back to my design <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:4049524534" className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20"><Phone className="h-4 w-4" /> (404) 952-4534</a>
              <Link href="/contact" className="flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white/80 hover:text-white"><MapPin className="h-4 w-4" /> Visit the showroom</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
