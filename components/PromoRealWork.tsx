import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Server component on purpose (no 'use client', no framer-motion, no state):
// this section renders on the /promo paid-traffic landing page, which needs
// to stay as light as possible. Images are lazy-loaded by default (nothing
// here uses `priority`) so they don't compete with the hero for bandwidth.
const realWork = [
  { src: '/images/projects/kitchen-navy-cabinets-white-quartz-waterfall-island-atlanta.jpg', title: 'Waterfall Island', category: 'Kitchen', alt: 'Navy blue kitchen cabinets with white quartz waterfall island countertop, Atlanta, GA' },
  { src: '/images/projects/kitchen-white-cabinets-dark-hardwood-floor-full-view-atlanta.jpg', title: 'White Kitchen Remodel', category: 'Kitchen', alt: 'White kitchen cabinets with quartz island over dark hardwood flooring, Atlanta, GA' },
  { src: '/images/projects/bathroom-navy-cabinets-white-quartz-double-vanity-atlanta.jpg', title: 'Navy Double Vanity', category: 'Bathroom', alt: 'Navy blue double vanity with white quartz countertop, Atlanta, GA' },
  { src: '/images/projects/bathroom-calacatta-marble-shower-lighted-niche-atlanta.jpg', title: 'Marble Shower Niche', category: 'Bathroom', alt: 'Calacatta marble-look shower surround with lighted recessed niche, Atlanta, GA' },
  { src: '/images/projects/kitchen-oak-cabinets-full-view-quartz-countertops-atlanta.jpg', title: 'Oak Kitchen Remodel', category: 'Kitchen', alt: 'Honey oak kitchen cabinets with quartz countertops, Atlanta, GA' },
  { src: '/images/projects/bathroom-freestanding-tub-glass-shower-walnut-vanity-atlanta.jpg', title: 'Freestanding Tub Suite', category: 'Bathroom', alt: 'Freestanding soaking tub and glass shower beside walnut vanity, Atlanta, GA' },
  { src: '/images/projects/cabinets-wet-bar-marble-backsplash-wine-storage-atlanta.jpg', title: 'Custom Wet Bar', category: 'Cabinets', alt: 'Custom wet bar cabinetry with marble backsplash and wine storage, Atlanta, GA' },
  { src: '/images/projects/fireplace-black-granite-surround-white-mantle-atlanta.jpg', title: 'Fireplace Surround', category: 'Fireplace', alt: 'Black granite fireplace surround and hearth with white mantle, Atlanta, GA' },
];

export default function PromoRealWork() {
  return (
    <section className="py-20 md:py-24 bg-neutral-50 border-y border-neutral-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-14">
          <span className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
            No Stock Photos
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-4 tracking-tight">
            Real Work, <span className="italic font-light text-secondary">Real Results</span>
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Every photo below is a job our team fabricated and installed for a homeowner right here in Metro Atlanta.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {realWork.map((item) => (
            <div
              key={item.src}
              className="group relative overflow-hidden rounded-xl aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4">
                <span className="block text-secondary text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-white text-sm sm:text-base font-serif leading-tight">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#estimate-form"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-secondary transition-colors duration-300"
          >
            Get a Project Like This <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
