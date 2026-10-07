import React from 'react';
import { CalendarCheck, Factory, Hammer, Layers } from 'lucide-react';
import { YelpLogo, ThumbtackLogo, NextdoorLogo } from './BrandLogos';

// Only facts already published on the site. "5.0 on Google" was left out
// on purpose: the Google Business Profile has no public reviews yet.
const medals = [
  { title: '20+ Years', subtitle: 'In business in Metro Atlanta', icon: CalendarCheck },
  { title: 'Factory‑Direct', subtitle: 'Pricing with no middleman', icon: Factory },
  { title: 'Fabricated Locally', subtitle: 'In our Duluth, GA shop', icon: Hammer },
  { title: '500+ Slabs', subtitle: 'In our showroom', icon: Layers },
];

// Rosette edge: a circle with 32 small notches.
const rosettePath = (() => {
  const points = 64;
  const cx = 50, cy = 46;
  let d = '';
  for (let i = 0; i < points; i++) {
    const r = i % 2 === 0 ? 42 : 39;
    const a = (Math.PI * 2 * i) / points - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return d + 'Z';
})();

const Medal: React.FC<{ icon: React.ElementType }> = ({ icon: Icon }) => (
  <div className="relative w-[40px] h-[46px] md:w-[46px] md:h-[52px] shrink-0">
    <svg viewBox="0 0 100 114" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Ribbon tails */}
      <path d="M30 70 L20 112 L33 104 L42 113 L50 78 Z" fill="#a16207" />
      <path d="M70 70 L80 112 L67 104 L58 113 L50 78 Z" fill="#ca8a04" />
      {/* Seal */}
      <path d={rosettePath} fill="#ca8a04" />
      <circle cx="50" cy="46" r="35" fill="#0f172a" />
      <circle cx="50" cy="46" r="30.5" fill="none" stroke="#ca8a04" strokeWidth="1.2" />
      <circle cx="50" cy="46" r="27.5" fill="none" stroke="#ca8a04" strokeWidth="0.5" strokeDasharray="1.5 2" />
    </svg>
    <div className="absolute left-0 right-0 top-0 h-[81%] flex items-center justify-center">
      <Icon className="text-white w-[15px] h-[15px] md:w-[17px] md:h-[17px]" strokeWidth={2} />
    </div>
  </div>
);

interface TrustBadgesProps {
  /** Pull the card up over the bottom of the section above it ('desktop' = md and up only). */
  overlap?: boolean | 'desktop';
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ overlap = false, className = '' }) => (
  <section
    aria-label="Why homeowners trust AGS Stones"
    className={`relative z-30 px-4 ${overlap === 'desktop' ? 'pt-8 md:pt-0 md:-mt-12' : overlap ? '-mt-10 md:-mt-12' : ''} ${className}`}
  >
    <div className="container mx-auto max-w-5xl">
      <div className="bg-white rounded-2xl shadow-[0_12px_40px_-12px_rgba(15,23,42,0.22)] border border-gray-100">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 px-3 py-4 md:px-6 md:py-5 lg:divide-x lg:divide-gray-100">
          {medals.map(({ title, subtitle, icon }) => (
            <li key={title} className="flex items-center gap-2.5 md:gap-3 px-1 md:px-4 lg:justify-center">
              <Medal icon={icon} />
              <div className="min-w-0">
                <p className="font-extrabold uppercase tracking-wide text-primary text-[11px] md:text-[13px] leading-tight lg:whitespace-nowrap">
                  {title}
                </p>
                <p className="mt-0.5 text-[10.5px] md:text-xs text-gray-500 leading-snug">{subtitle}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 px-4 py-2.5 md:py-3 flex items-center justify-center gap-x-6 md:gap-x-10 opacity-80">
          <NextdoorLogo />
          <ThumbtackLogo />
          <YelpLogo />
        </div>
      </div>
    </div>
  </section>
);

export default TrustBadges;
