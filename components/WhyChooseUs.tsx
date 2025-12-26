import React, { useEffect, useState } from 'react';
import { Clock, Award, DollarSign, Star, ChevronDown } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  // Animation logic for visual elements only
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
        { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    // Z-index 30 ensures it's above normal content (z-0 to z-10) but below sticky navs (z-40+)
    <section id="why-us" className="py-24 bg-white relative z-30 pointer-events-auto">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-4">The AGS Difference</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Why Atlanta Chooses Us</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We don't just install stone; we craft experiences. Here is why homeowners in Duluth, Alpharetta, and Roswell trust AGS Stones & Cabinets.
          </p>
        </div>

        {/* Grid Layout - Visual Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-[auto] gap-4 lg:gap-6 mb-20">
          
          {/* Main Large Card */}
          <div className="md:col-span-2 row-span-2 bg-primary rounded-3xl p-8 lg:p-12 relative overflow-hidden group text-white flex flex-col justify-between min-h-[400px] shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/30 transition-colors pointer-events-none"></div>
            <div className="relative z-10">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Award className="text-secondary" size={32} />
              </div>
              <h4 className="text-3xl font-bold mb-4">Master Craftsmanship</h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our fabrication facility uses the latest digital laser templating technology combined with old-world stone artistry. 
                We guarantee precise seam matching and flawless edge profiles.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <span className="inline-block bg-secondary text-white font-bold px-4 py-2 rounded-lg text-sm">
                #1 Rated in Duluth
              </span>
            </div>
          </div>

          {/* Speed Card */}
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-8 border border-gray-100 flex flex-col shadow-sm">
            <div className="mb-4">
                <Clock className="text-secondary" size={32} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">5-Day Turnaround</h4>
            <p className="text-sm text-gray-600">From template to install, we work efficiently to minimize disruption.</p>
          </div>

          {/* Price Card */}
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-8 border border-gray-100 flex flex-col shadow-sm">
            <div className="mb-4">
                <DollarSign className="text-secondary" size={32} />
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">Factory Direct</h4>
            <p className="text-sm text-gray-600">We import our own slabs, cutting out the middleman to save you up to 30%.</p>
          </div>

          {/* Experience Card */}
          <div className="bg-secondary/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center md:col-span-2 lg:col-span-1 group hover:bg-secondary/20 transition-colors shadow-sm">
             <h4 className="text-5xl font-bold text-secondary mb-2">20+</h4>
             <p className="font-bold text-primary">Years Experience</p>
             <p className="text-xs text-gray-500 mt-2">Serving Metro Atlanta</p>
          </div>

          {/* Wide Bottom Card */}
          <div className="md:col-span-3 lg:col-span-1 bg-primary text-white rounded-3xl p-8 flex flex-col justify-center shadow-xl">
             <div className="flex items-center gap-4 mb-4">
                {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" />
                ))}
             </div>
             <p className="font-medium">"Absolute perfection. The team at AGS went above and beyond."</p>
             <p className="text-sm text-gray-400 mt-2">- Jennifer M., Suwanee</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto border-t border-gray-200 pt-16 relative z-20 pointer-events-auto">
          <h4 className="text-2xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h4>
          
          <div className="space-y-4">
            <FaqItem 
              question="How much do Granite countertops cost in Atlanta?" 
              answer="Granite prices vary by level (rarity) and thickness. At AGS Stones in Duluth, we offer factory-direct pricing starting as low as $35/sqft installed for Level 1 granite. We service all of Metro Atlanta including Johns Creek, Alpharetta, and Roswell with competitive rates." 
            />
            <FaqItem 
              question="Do you install Kitchen Cabinets near me?" 
              answer="Yes! We are a full-service kitchen remodeling company. We install custom and semi-custom cabinets throughout the Atlanta area. Whether you need a simple vanity replacement in Suwanee or a full chef's kitchen in Sandy Springs, our team handles the design and installation." 
            />
            <FaqItem 
              question="What is the difference between Quartz and Granite?" 
              answer="Granite is a 100% natural stone cut from the earth, offering unique patterns and heat resistance. Quartz is an engineered stone (typically 93% natural quartz and 7% resin), which makes it non-porous and maintenance-free." 
            />
            <FaqItem 
              question="Do I need to seal my Quartz countertops?" 
              answer="No, one of the main benefits of Quartz is that it is non-porous and does not require sealing. Natural stones like Granite and Marble, however, should be sealed. We apply a 15-year industrial-grade sealer to all our natural stone installations." 
            />
            <FaqItem 
              question="How long does countertop installation take?" 
              answer="Once we have your template, fabrication typically takes 3-5 days. The actual installation in your home is usually completed in just one day, often within 4-6 hours." 
            />
            <FaqItem 
              question="What areas in Georgia do you serve?" 
              answer="We are based in Duluth but serve the entire Metro Atlanta area, including Alpharetta, Roswell, Johns Creek, Milton, Suwanee, Sandy Springs, Dunwoody, Norcross, and Lawrenceville." 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

// Robust controlled component
const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-gray-50 rounded-xl overflow-hidden border transition-colors duration-300 ${isOpen ? 'border-gray-200 bg-white shadow-sm' : 'border-gray-100'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 font-medium text-gray-900 hover:bg-gray-100 transition-colors text-left touch-manipulation cursor-pointer active:bg-gray-100"
        type="button"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg pr-4">{question}</span>
        <span className={`transition-transform duration-300 text-gray-400 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronDown size={24} />
        </span>
      </button>
      
      {/* Content */}
      <div 
        className={`px-6 text-gray-600 text-sm md:text-base leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
      >
        {answer}
      </div>
    </div>
  );
};

export default WhyChooseUs;