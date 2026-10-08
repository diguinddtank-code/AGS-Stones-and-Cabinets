import React from 'react';
import { ArrowRight, Ruler, Factory, Layers, Clock } from 'lucide-react';

// Each point pairs a problem homeowners run into with how AGS handles it.
// Facts come from elsewhere on the site (ProcessTimeline, Faq, StoneGallery).
const points = [
  {
    icon: Ruler,
    problem: 'Gaps at the wall and overhangs that are off by half an inch.',
    title: 'Measured with a laser, not a tape',
    fix: 'We template your cabinets with a digital laser system to 1/16". Uneven walls are accounted for before we cut.',
  },
  {
    icon: Factory,
    problem: 'Paying a showroom markup on stone they bought from someone else.',
    title: 'Cut in our own Duluth shop',
    fix: 'We import our own slabs and fabricate in-house. No middleman, which saves you up to 30%.',
  },
  {
    icon: Layers,
    problem: 'Choosing from a 2-inch sample and getting a slab that looks different.',
    title: 'You pick the actual slab',
    fix: 'Walk our showroom, see 500+ full slabs and choose yours. We lay out the veins with you before the first cut.',
  },
  {
    icon: Clock,
    problem: 'A kitchen out of commission for weeks.',
    title: 'About 5 days, template to install',
    fix: 'Installation day usually takes 4-6 hours. Floors are covered first and we clean up before we leave.',
  },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-us" className="pt-12 pb-14 md:pt-24 md:pb-24 bg-white relative z-20">
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Header */}
      <div className="max-w-2xl mb-6 md:mb-12 md:text-center md:mx-auto">
        <h2 className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-3">The AGS Difference</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">Why Atlanta Chooses Us</h3>
        <p className="text-[15px] text-gray-600 md:text-lg leading-relaxed">
          Most countertop problems start before the stone reaches your kitchen: a rough measurement, a padded quote,
          a slab you never saw. Here is how we handle each one.
        </p>
      </div>

      {/* Problem / fix list */}
      <ol className="grid md:grid-cols-2 gap-3 md:gap-5">
        {points.map(({ icon: Icon, problem, title, fix }, i) => (
          <li key={title} className="rounded-2xl border border-gray-200 overflow-hidden bg-white flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 pt-0.5 shrink-0 w-[68px]">
                The usual
              </span>
              <p className="text-[13px] md:text-sm text-gray-500 leading-snug">{problem}</p>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 flex gap-3.5 md:gap-4 flex-grow">
              <span className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary text-secondary flex items-center justify-center shrink-0">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[10.5px] md:text-[11px] font-bold uppercase tracking-wider text-secondary mb-0.5 md:mb-1">
                  AGS fix 0{i + 1}
                </p>
                <h4 className="text-[17px] md:text-xl font-bold text-primary leading-snug mb-1 md:mb-1.5">{title}</h4>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{fix}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Closing line */}
      <div className="mt-5 md:mt-6 rounded-2xl bg-primary text-white px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl md:text-4xl font-bold text-secondary leading-none">20+</span>
          <p className="text-sm md:text-base text-white/85 leading-snug">
            years fabricating and installing stone<br className="hidden sm:block" /> for homes across Metro Atlanta.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap"
        >
          Get a Free Estimate <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
