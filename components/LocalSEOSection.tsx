'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, Gem, Hammer, Sparkles } from 'lucide-react';

const locations = [
  { id: 'alpharetta', name: 'Alpharetta, GA', lat: '34.0754', lng: '-84.2941', desc: 'Custom farmhouses & high-end townhome surfaces.' },
  { id: 'johns-creek', name: 'Johns Creek, GA', lat: '34.0289', lng: '-84.1986', desc: 'Country club estate luxury & premium bookmatched quartzite.' },
  { id: 'sandy-springs', name: 'Sandy Springs, GA', lat: '33.9304', lng: '-84.3733', desc: 'Wooded nature-deck kitchens & contemporary quartz.' },
  { id: 'buckhead', name: 'Buckhead, GA', lat: '33.8398', lng: '-84.3796', desc: 'Peachtree mansion custom marble & dual waterfall islands.' },
  { id: 'roswell', name: 'Roswell, GA', lat: '34.0232', lng: '-84.3616', desc: 'Restored historic cottages & textured leathered split-level countertops.' },
  { id: 'atlanta', name: 'Atlanta, GA', lat: '33.7490', lng: '-84.3880', desc: 'Historic bungalows, urban lofts & modern waterfall counter profiles.' },
  { id: 'duluth', name: 'Duluth, GA', lat: '34.0029', lng: '-84.1446', desc: 'Our flagship studio HQ. Spacious suburban estates & master cabinets.' },
  { id: 'suwanee', name: 'Suwanee, GA', lat: '34.0515', lng: '-84.0714', desc: 'Multi-generational family spaces & stain-proof quartzite surfaces.' },
  { id: 'marietta', name: 'Marietta, GA', lat: '33.9526', lng: '-84.5499', desc: 'Vintage square estates & rustic leathered granite matches.' }
];

const servicePrefixes = [
  { prefix: 'countertops', label: 'Custom Countertops', icon: <Gem className="text-[#c1a168] w-4 h-4" /> },
  { prefix: 'quartz-countertops', label: 'Quartz Countertops', icon: <Sparkles className="text-[#c1a168] w-4 h-4" /> },
  { prefix: 'granite-countertops', label: 'Granite Countertops', icon: <MapPin className="text-[#c1a168] w-4 h-4" /> },
  { prefix: 'cabinets', label: 'Wood Cabinets', icon: <Hammer className="text-[#c1a168] w-4 h-4" /> }
];

export default function LocalSEOSection() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <section id="local-coverage" className="py-24 bg-gray-50 text-primary relative overflow-hidden border-t border-gray-100">
      {/* Light gradient highlight */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c1a168]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-2">
            <span className="w-6 h-px bg-secondary"></span> 100% Local Precision Coverage
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary tracking-tight mb-6 leading-tight">
            Our Neighborhood <span className="italic font-normal text-secondary">Footprint</span>
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            We operate fully equipped local fabrication and detailing teams in each city below. 
            By eliminating expensive retail intermediaries, we provide <strong>factory-direct pricing</strong> 
            and guaranteed flawless layouts across North Metro Atlanta.
          </p>
        </div>

        {/* Interactive Coverage Hub for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* List of Cities on left */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Select Your Metro Area</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {locations.map((loc) => {
                const isActive = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive 
                        ? 'bg-white border-secondary/40 text-primary shadow-lg shadow-secondary/5' 
                        : 'bg-transparent border-gray-200 text-gray-600 hover:text-primary hover:border-gray-300 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="font-medium text-base block">{loc.name}</span>
                        <span className="text-xs text-paragraph text-gray-500 block truncate max-w-[200px] lg:max-w-xs">{loc.desc}</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className={`transition-transform duration-300 text-secondary ${
                      isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic local details and link matrix on right */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-8 md:p-12 relative overflow-hidden h-full shadow-sm">
            <div className="absolute top-0 right-0 p-8 text-gray-100 text-6xl font-serif select-none pointer-events-none font-bold opacity-50">
              {selectedLocation.id.toUpperCase().substring(0, 3)}
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck size={12} /> Active Dedicated Installers
            </span>

            <h3 className="text-2xl md:text-4xl font-serif font-medium text-primary mb-4">
              Premium Upgrades in {selectedLocation.name}
            </h3>
            
            <p className="text-gray-600 text-base font-light mb-8 leading-relaxed">
              {selectedLocation.desc} Our local crews provide laser digital templating at your residence, custom fabricate within our nearby facility, and ensure a pristine install with completely unnoticeable seams.
            </p>

            {/* Link Permutations Matrix */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-secondary border-b border-gray-100 pb-2">
                Launch Local Design Portal:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicePrefixes.map(({ prefix, label, icon }) => {
                  const hrefLink = `/${prefix}-${selectedLocation.id}-ga`;
                  return (
                    <Link
                      key={prefix}
                      href={hrefLink}
                      className="group flex flex-col justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {icon}
                        <span className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors">{label}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-light mb-4 text-left">
                        Explore styling & pricing for {selectedLocation.name}.
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold mt-auto self-start">
                        <span>Read neighborhood guide</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* The Absolute SEO authority grid: Raw crawlable direct links for GSC INDEXATION speed */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold mb-6 text-center">
            Complete Northern Georgia Service Area Index & Core Slugs
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4 text-xs">
            {locations.map((loc) => (
              <div key={loc.id} className="space-y-2 border-r border-gray-100 last:border-0 pr-2">
                <span className="text-primary font-bold block truncate pb-1 border-b border-gray-100 mb-2">{loc.name.split(',')[0]}</span>
                <ul className="space-y-1.5">
                  {servicePrefixes.map(({ prefix, label }) => {
                    const shortLabel = label.replace(' Countertops', '').replace(' Wood', '');
                    return (
                      <li key={prefix}>
                        <Link 
                          href={`/${prefix}-${loc.id}-ga`}
                          className="text-gray-500 hover:text-secondary transition-colors block truncate hover:underline"
                          title={`${label} in ${loc.name}`}
                        >
                          {shortLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
