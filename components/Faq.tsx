import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Faq: React.FC = () => {
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

        const animElements = document.querySelectorAll('.animate-faq-scroll');
        animElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

  return (
    <section className="py-24 bg-white relative z-20 pointer-events-auto">
      <div className="container mx-auto px-4">
        {/* FAQ Section - Using Semantic <details> for SEO */}
        <div 
            className="max-w-3xl mx-auto animate-faq-scroll opacity-0 translate-y-10 transition-all duration-700"
        >
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

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  return (
    <details className="group rounded-xl overflow-hidden border border-gray-100 bg-gray-50 open:bg-white open:border-secondary/40 open:shadow-lg transition-all duration-300">
      <summary className="flex items-center justify-between p-6 font-medium cursor-pointer list-none focus:outline-none">
        <span className="text-base md:text-lg text-gray-900 group-hover:text-primary group-open:text-secondary group-open:font-bold transition-colors">
          {question}
        </span>
        <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400 group-open:text-secondary">
           <ChevronDown size={24} />
        </span>
      </summary>
      
      <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-transparent group-open:border-gray-100 group-open:pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
        {answer}
      </div>
    </details>
  );
};

export default Faq;