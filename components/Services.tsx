import React, { useState, useEffect, useRef } from 'react';
import { Layers, Box, Hammer, Droplet, ChefHat, Grid, ArrowRight, X, Check, Bath, Phone, Plus } from 'lucide-react';

interface ServiceDetail {
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  image: string;
  longDesc: string;
  features: string[];
  keywords: string[];
}

const services: ServiceDetail[] = [
  {
    icon: <Layers size={24} className="text-secondary" />,
    title: "Premium Countertops",
    shortDesc: "Exquisite Granite, Marble, and Quartz fabrication.",
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/03/blue-mare-quartz-countertop-1024x602.jpg-768x452.webp", 
    longDesc: "We are the leading fabricators of Granite, Marble, Quartzite, and Quartz countertops in Duluth and Metro Atlanta. Our state-of-the-art facility uses laser templating for precision fitting.",
    features: ["Laser Templating Precision", "In-House Fabrication", "Seam Matching Technology", "15-Year Sealer Options"],
    keywords: ["granite countertops atlanta", "quartz kitchen island", "marble fabrication duluth"]
  },
  {
    icon: <Box size={24} className="text-secondary" />,
    title: "Custom Cabinets",
    shortDesc: "Tailor-made cabinetry to fit your space perfectly.",
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Untitled.jpg",
    longDesc: "Upgrade your storage with our custom and semi-custom cabinetry solutions. We offer solid wood construction, soft-close hinges, and dovetail drawers.",
    features: ["Solid Wood Construction", "Soft-Close Hardware", "3D Cabinet Design", "Custom Colors & Finishes"],
    keywords: ["custom cabinets near me", "kitchen cabinet installation", "modern shaker cabinets"]
  },
  {
    icon: <ChefHat size={24} className="text-secondary" />,
    title: "Kitchen Remodeling",
    shortDesc: "Full-scale kitchen renovations from start to finish.",
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Custom-vs.-Pre-Fabricated-Kitchen-Cabinets-1-1-522x600.jpg",
    longDesc: "AGS Stones offers complete turnkey kitchen remodeling services. We handle demolition, plumbing, electrical adjustments, and installation.",
    features: ["Turnkey Project Management", "Demolition & Disposal", "Plumbing & Electrical Prep", "Backsplash & Lighting"],
    keywords: ["kitchen remodel near me", "turnkey renovation atlanta", "kitchen design services"]
  },
  {
    icon: <Bath size={24} className="text-secondary" />,
    title: "Bathroom Remodeling",
    shortDesc: "Create a spa-like retreat in your own home.",
    image: "https://www.dfwimproved.com/wp-content/uploads/2021/12/How-to-plan-a-bathroom-remodel-scaled.jpg",
    longDesc: "Transform your outdated bathroom into a luxurious sanctuary. We handle everything from shower conversions and freestanding tub installations to custom tile work.",
    features: ["Walk-in Shower Conversions", "Freestanding Tub Installation", "Custom Tile & Grout", "Complete Demolition & Rebuild"],
    keywords: ["bathroom remodel atlanta", "master bath renovation", "custom shower installation"]
  },
  {
    icon: <Droplet size={24} className="text-secondary" />,
    title: "Bath Vanities",
    shortDesc: "Transform your bathroom into a spa experience.",
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Custom-vs.-Pre-Fabricated-Kitchen-Cabinets-1-2.jpg",
    longDesc: "Elevate your master bath or powder room with our custom vanity tops and cabinets. We specialize in fabricating vanity tops from remnants or full slabs.",
    features: ["Custom Vanity Tops", "Undermount Sinks", "Master Bath Renovation", "Remnant Program for Small Projects"],
    keywords: ["bathroom vanity tops", "bathroom remodel alpharetta", "custom quartz vanity"]
  },
  {
    icon: <Hammer size={24} className="text-secondary" />,
    title: "Outdoor Kitchens",
    shortDesc: "Durable and stylish outdoor cooking spaces.",
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Custom-vs.-Pre-Fabricated-Kitchen-Cabinets-1-3.jpg",
    longDesc: "Take the party outside with a custom outdoor kitchen. We use UV-resistant stones like Granite and Dekton that withstand Georgia's weather.",
    features: ["Weather-Resistant Materials", "Built-in BBQ Stations", "Outdoor Bar Tops", "Dekton & Granite Options"],
    keywords: ["outdoor kitchen builder", "granite bbq countertops", "patio kitchen design"]
  },
  {
    icon: <Grid size={24} className="text-secondary" />,
    title: "Tile Work & Backsplash",
    shortDesc: "Professional flooring and backsplash installation.",
    image: "https://howtonestforless.com/wp-content/uploads/2014/10/kitchen-backsplash-tutorial.jpg",
    longDesc: "The perfect kitchen needs the perfect backsplash. Our skilled tile setters install subway tile, mosaics, herringbone patterns, and large format porcelain flooring.",
    features: ["Backsplash Installation", "Porcelain & Ceramic Tile", "Shower Walls", "Custom Mosaics"],
    keywords: ["backsplash installation", "tile contractors duluth", "kitchen flooring"]
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-16', 'scale-95');
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedService]);

  return (
    <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-gray-200/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-3">Our Expertise</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-medium text-primary mb-6">Mastering the Art of Stone</h3>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            From precision laser cuts to hand-polished finishes, explore our premium services designed for the discerning homeowner.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isLast = index === services.length - 1;
            const gridClasses = isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : "";

            return (
                <div 
                key={index} 
                onClick={() => setSelectedService(service)}
                className={`service-card-anim ${gridClasses} opacity-0 translate-y-16 scale-95 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group relative h-[420px] cursor-pointer perspective-1000`}
                style={{ transitionDelay: `${index * 80}ms` }}
                >
                    <div className="relative h-full w-full bg-white rounded-[2rem] shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                        
                        {/* Image Half */}
                        <div className="h-1/2 overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            {/* Floating Icon Badge */}
                            <div className="absolute -bottom-6 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center z-20 border border-gray-50 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                        </div>

                        {/* Text Half */}
                        <div className="h-1/2 p-8 pt-10 flex flex-col relative">
                            <h4 className="text-2xl font-serif font-medium text-primary mb-3 group-hover:text-secondary transition-colors duration-300">{service.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                {service.shortDesc}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors">Explore</span>
                                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all">
                                    <Plus size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/10 rounded-[2rem] pointer-events-none transition-colors duration-500"></div>
                        </div>
                    </div>
                </div>
            );
          })}
        </div>
      </div>

      {/* Improved Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setSelectedService(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"></div>
          
          <div 
            className="bg-white w-full max-w-6xl max-h-[95vh] h-full md:h-auto md:rounded-3xl shadow-2xl flex flex-col md:flex-row relative animate-in slide-in-from-bottom-10 duration-500 z-10 overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white md:text-gray-800 md:bg-white md:hover:bg-gray-100 p-2 rounded-full shadow-lg transition-colors border border-white/20 md:border-gray-100"
            >
              <X size={24} />
            </button>

            {/* Modal Image Side - Editorial Style */}
            <div className="h-[40vh] md:h-auto md:w-5/12 relative overflow-hidden group">
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
                className="w-full h-full object-cover transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs mb-2">
                    {selectedService.icon}
                    <span>Service Detail</span>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-none">{selectedService.title}</h3>
              </div>
            </div>

            {/* Modal Content Side */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto bg-white">
              <div className="hidden md:block mb-8">
                 <span className="text-5xl font-serif text-gray-100 font-bold -ml-1">0{services.indexOf(selectedService) + 1}</span>
              </div>

              <h4 className="font-bold text-primary text-xl mb-4">Overview</h4>
              <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
                {selectedService.longDesc}
              </p>

              <div className="mb-12">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">What's Included</h4>
                <div className="grid grid-cols-1 gap-4">
                  {selectedService.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="bg-white p-1 rounded-full text-secondary shadow-sm mt-0.5">
                          <Check size={14} />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky Action Bar for Mobile / Regular for Desktop */}
              <div className="mt-auto border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white md:static p-4 md:p-0 -mx-8 md:mx-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-none">
                <a 
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1"
                >
                  Book Consultation
                </a>
                <a 
                   href="tel:4049524534"
                   className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-secondary hover:text-secondary text-gray-600 font-bold py-4 px-6 rounded-xl transition-all"
                >
                   <Phone size={18} /> Call Specialist
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;