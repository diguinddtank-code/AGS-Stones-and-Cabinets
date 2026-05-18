'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { services } from '@/lib/servicesData';

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.service-card-anim');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-gray-200/50 rounded-full blur-3xl mix-blend-multiply"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-3">Our Expertise</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-medium text-primary mb-6">Mastering the Art of Stone</h3>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            From precision laser cuts to hand-polished finishes, explore our premium services designed for the discerning homeowner.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const isLast = index === services.length - 1;
            const gridClasses = isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : "";

            return (
                <Link 
                    href={`/services/${service.slug}`}
                    key={index} 
                    className={`service-card-anim ${gridClasses} opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group relative h-[180px] md:h-[400px] block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl ring-1 ring-black/5`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                    aria-label={`View details for ${service.title}`}
                >
                    <Image 
                        src={service.image} 
                        alt={`${service.title} Services in Atlanta GA`}
                        className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>

                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-3xl transition-colors duration-500 pointer-events-none"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end h-full">
                        
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                            <div className="mb-3 text-secondary bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                                {service.icon}
                            </div>

                            <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 drop-shadow-lg tracking-wide flex items-center gap-2">
                                {service.title}
                                <ChevronRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                            </h4>
                        </div>

                        <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-[max-height] duration-500 ease-in-out">
                            <p className="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pb-2 border-l-2 border-secondary pl-3 mt-2">
                                {service.shortDesc}
                            </p>
                        </div>
                        
                        <div className="w-full h-[3px] bg-white/10 mt-4 relative overflow-hidden rounded-full">
                            <div className="absolute top-0 left-0 w-full h-full bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                        </div>
                    </div>
                </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;