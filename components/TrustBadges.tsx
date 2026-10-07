import React from 'react';
import { CalendarCheck, Factory, Hammer, Layers } from 'lucide-react';
import { GoogleGLogo, NextdoorLogo } from './BrandLogos';

// Only facts already published on the site. "5.0 on Google" was left out
// on purpose: the Google Business Profile has no public reviews yet.
const medals = [
  { title: '20+ Years', subtitle: 'In business in Metro Atlanta', icon: CalendarCheck },
  { title: 'Factory-Direct', subtitle: 'Pricing with no middleman', icon: Factory },
  { title: 'Fabricated Locally', subtitle: 'In our own Duluth, GA shop', icon: Hammer },
  { title: '500+ Slabs', subtitle: 'On display in our showroom', icon: Layers },
];

// Profiles confirmed to belong to AGS Stones & Cabinets.
const platforms = [
  {
    name: 'Google',
    href: 'https://maps.google.com/?q=AGS+STONES+%26+CABINETS,+4579+Abbotts+Bridge+Rd+Suite+-10,+Duluth,+GA+30097,+United+States',
    logo: (
      <span className="inline-flex items-center gap-2">
        <GoogleGLogo className="w-4 h-4" />
        <span className="font-semibold text-[15px] text-gray-700 tracking-tight">Google</span>
      </span>
    ),
  },
  {
    name: 'Nextdoor',
    href: 'https://nextdoor.com/pages/ags-stones-cabinets-llc-duluth-ga/',
    logo: <NextdoorLogo />,
  },
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
  <div className="relative w-[84px] h-[96px] md:w-[96px] md:h-[110px] shrink-0">
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
      <Icon className="text-white w-6 h-6 md:w-7 md:h-7" strokeWidth={1.75} />
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
    className={`relative z-30 px-4 ${overlap === 'desktop' ? 'pt-10 md:pt-0 md:-mt-20' : overlap ? '-mt-14 md:-mt-20' : ''} ${className}`}
  >
    <div className="container mx-auto max-w-6xl">
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] border border-gray-100">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 px-4 py-8 md:px-10 md:py-10">
          {medals.map(({ title, subtitle, icon }) => (
            <li key={title} className="flex flex-col items-center text-center">
              <Medal icon={icon} />
              <p className="mt-3 font-extrabold uppercase tracking-wide text-primary text-[13px] md:text-base leading-tight">
                {title}
              </p>
              <p className="mt-1 text-xs md:text-sm text-gray-500 leading-snug max-w-[180px]">{subtitle}</p>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 px-4 py-4 md:py-5 flex flex-nowrap items-center justify-center gap-x-5 md:gap-x-10">
          <span className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-gray-400 whitespace-nowrap">
            Find us on
          </span>
          {platforms.map(p => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`AGS Stones & Cabinets on ${p.name}`}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              {p.logo}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustBadges;
