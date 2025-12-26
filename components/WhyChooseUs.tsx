import React, { useEffect } from 'react';
import { Clock, Award, DollarSign, ShieldCheck, Star, Users, Briefcase } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  
  // Logic to animate elements when they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-4">The AGS Difference</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Why Atlanta Chooses Us</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We don't just install stone; we craft experiences. Here is why homeowners in Duluth, Alpharetta, and Roswell trust AGS Stones & Cabinets.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-[auto] gap-4 lg:gap-6 mb-20">
          
          {/* Main Large Card */}
          <div className="md:col-span-2 row-span-2 bg-primary rounded-3xl p-8 lg:p-12 relative overflow-hidden group text-white flex flex-col justify-between min-h-[400px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/30 transition-colors"></div>
            <div className="relative z-10">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                {/* Icon with scroll entrance + hover effect */}
                <Award className="text-secondary group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" size={32} />
              </div>
              <h4 className="text-3xl font-bold mb-4">Master Craftsmanship</h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our fabrication facility uses the latest digital laser templating technology combined with old-world stone artistry. 
                We guarantee precise seam matching and flawless edge profiles for every Granite, Quartz, and Marble countertop installation.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <span className="inline-block bg-secondary text-white font-bold px-4 py-2 rounded-lg text-sm">
                #1 Rated in Duluth
              </span>
            </div>
          </div>

          {/* Speed Card */}
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-8 border border-gray-100 flex flex-col group">
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                <Clock className="text-secondary mb-4 group-hover:scale-125 transition-transform duration-300" size={32} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">5-Day Turnaround</h4>
            <p className="text-sm text-gray-600">From template to install, we work efficiently to minimize disruption to your home life.</p>
          </div>

          {/* Price Card */}
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-8 border border-gray-100 flex flex-col group">
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                <DollarSign className="text-secondary mb-4 group-hover:scale-125 transition-transform duration-300" size={32} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">Factory Direct</h4>
            <p className="text-sm text-gray-600">We import our own slabs, cutting out the middleman to save you up to 30% on material costs.</p>
          </div>

          {/* Experience Card */}
          <div className="bg-secondary/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center md:col-span-2 lg:col-span-1 group hover:bg-secondary/20 transition-colors">
             <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
                 <h4 className="text-5xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform">20+</h4>
             </div>
             <p className="font-bold text-primary">Years Experience</p>
             <p className="text-xs text-gray-500 mt-2">Serving Metro Atlanta</p>
          </div>

          {/* Wide Bottom Card */}
          <div className="md:col-span-3 lg:col-span-1 bg-primary text-white rounded-3xl p-8 flex flex-col justify-center group">
             <div className="flex items-center gap-4 mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
                {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i*50}ms` }} />
                ))}
             </div>
             <p className="font-medium">"Absolute perfection. The team at AGS went above and beyond."</p>
             <p className="text-sm text-gray-400 mt-2">- Jennifer M., Suwanee</p>
          </div>
        </div>

        {/* SEO FAQ Section (Designed as simple Accordion) */}
        <div className="max-w-3xl mx-auto border-t border-gray-200 pt-16">
          <h4 className="text-2xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h4>
          
          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>How much do Granite countertops cost in Atlanta?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                Granite prices vary by level (rarity) and thickness. At AGS Stones in Duluth, we offer factory-direct pricing starting as low as $35/sqft installed for Level 1 granite. We service all of Metro Atlanta including Johns Creek, Alpharetta, and Roswell with competitive rates.
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>Do you install Kitchen Cabinets near me?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                Yes! We are a full-service kitchen remodeling company. We install custom and semi-custom cabinets throughout the Atlanta area. Whether you need a simple vanity replacement in Suwanee or a full chef's kitchen in Sandy Springs, our team handles the design and installation.
              </div>
            </details>

             <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>What is the difference between Quartz and Granite?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                Granite is a 100% natural stone cut from the earth, offering unique patterns and heat resistance. Quartz is an engineered stone (typically 93% natural quartz and 7% resin), which makes it non-porous and maintenance-free. We stock hundreds of slabs of both at our Duluth showroom.
              </div>
            </details>

            {/* Added New Questions for SEO */}
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>Do I need to seal my Quartz countertops?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                No, one of the main benefits of Quartz is that it is non-porous and does not require sealing. Natural stones like Granite and Marble, however, should be sealed. We apply a 15-year industrial-grade sealer to all our natural stone installations to protect against staining.
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>How long does countertop installation take?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                Once we have your template, fabrication typically takes 3-5 days. The actual installation in your home is usually completed in just one day, often within 4-6 hours. We aim to minimize downtime so you can enjoy your new kitchen sooner.
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>Do you offer sinks and faucets?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                Yes! We offer a wide selection of stainless steel, porcelain, and composite sinks. We can also provide high-quality faucets. Purchasing your sink through us ensures a perfect fit for your new stone countertops.
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 marker:content-none">
                <span>What areas in Georgia do you serve?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="group-open:animate-fadeIn mt-2 px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                We are based in Duluth but serve the entire Metro Atlanta area, including Alpharetta, Roswell, Johns Creek, Milton, Suwanee, Sandy Springs, Dunwoody, Norcross, and Lawrenceville.
              </div>
            </details>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;