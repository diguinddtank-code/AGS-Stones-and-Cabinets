import React, { useState, useEffect, useRef } from 'react';
import { Layers, Box, Hammer, Droplet, ChefHat, Grid, X, Check, Bath, Phone, Plus, ArrowUpRight, Calendar } from 'lucide-react';

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
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
        {/* Decorative Background Elements */}
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

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isLast = index === services.length - 1;
            const gridClasses = isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : "";

            return (
                <div 
                key={index} 
                onClick={() => setSelectedService(service)}
                className={`service-card-anim ${gridClasses} opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group relative h-[420px] cursor-pointer`}
                style={{ transitionDelay: `${index * 80}ms` }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${service.title}`}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedService(service);
                    }
                }}
                >
                    {/* Glassmorphism Effect Applied Here */}
                    <div className="relative h-full w-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-white/50 transition-all duration-500 overflow-hidden group-hover:-translate-y-2 group-hover:scale-[1.02]">
                        
                        {/* Image Half */}
                        <div className="h-1/2 overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img 
                                src={service.image} 
                                alt={`${service.title} Services in Atlanta GA`}
                                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                loading="lazy"
                            />
                            {/* Floating Icon Badge - Glass Style */}
                            <div className="absolute -bottom-7 right-8 w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center z-20 border border-white/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                {service.icon}
                            </div>
                        </div>

                        {/* Text Half */}
                        <div className="h-1/2 p-8 pt-12 flex flex-col relative">
                            <h4 className="text-2xl font-serif font-medium text-primary mb-3 group-hover:text-secondary transition-colors duration-300">{service.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                {service.shortDesc}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors">View Details</span>
                                <div className="w-10 h-10 rounded-full bg-white/50 border border-white/40 group-hover:bg-secondary group-hover:border-secondary flex items-center justify-center transition-all duration-300">
                                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
          })}
        </div>
      </div>

      {/* 
        ----------------------------------------------------
        REFINED LUXURY MODAL (ACCESSIBLE)
        ----------------------------------------------------
      */}
      {selectedService && (
        <div 
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
          {/* Backdrop with stronger blur for focus */}
          <div 
            className="absolute inset-0 bg-primary/60 backdrop-blur-md animate-in fade-in duration-500"
            onClick={() => setSelectedService(null)}
            aria-hidden="true"
          ></div>
          
          <div 
            className="bg-white/95 backdrop-blur-xl w-full md:w-[90%] md:max-w-6xl max-h-[90dvh] h-[90dvh] md:h-[85vh] rounded-t-[2rem] md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row relative animate-in slide-in-from-bottom-12 duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 overflow-hidden border border-white/20" 
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button - Floats nicely above everything */}
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-50 bg-white/50 hover:bg-white backdrop-blur-md text-primary p-2.5 rounded-full shadow-sm transition-all border border-white/40 hover:scale-110"
              aria-label="Close details"
            >
              <X size={22} />
            </button>

            {/* Left Side: Visuals (Top on Mobile) */}
            <div className="h-64 md:h-auto md:w-5/12 relative overflow-hidden group shrink-0">
              <img 
                src={selectedService.image} 
                alt={`${selectedService.title} - Best in Atlanta & Duluth`}
                className="w-full h-full object-cover transition-transform duration-[3s] ease-linear scale-105 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent"></div>
              
              {/* Mobile Only overlay Text */}
              <div className="absolute bottom-0 left-0 p-6 w-full md:hidden">
                 <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold uppercase tracking-widest text-[10px] mb-2 border border-white/10">
                    {selectedService.icon}
                    <span>Service</span>
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-white leading-none drop-shadow-md">{selectedService.title}</h3>
              </div>
            </div>

            {/* Right Side: Content & Actions (Bottom on Mobile) */}
            <div className="flex-1 flex flex-col bg-white/60 relative overflow-hidden">
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-28 custom-scrollbar">
                
                {/* Desktop Title (Hidden on Mobile) */}
                <div className="hidden md:block mb-8">
                     <div className="inline-flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full text-primary font-bold uppercase tracking-widest text-[10px] mb-4">
                        {selectedService.icon}
                        <span>Service Detail</span>
                     </div>
                    <h3 id="modal-title" className="text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight">{selectedService.title}</h3>
                </div>

                <div className="mb-8">
                    <h4 className="font-bold text-primary text-lg mb-3">Overview</h4>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                        {selectedService.longDesc}
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 flex justify-between items-center">
                        What's Included
                        <span className="text-secondary normal-case tracking-normal text-[10px] bg-secondary/10 px-2 py-0.5 rounded-full">All Inclusive</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {selectedService.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/50 border border-transparent hover:border-gray-200 hover:bg-white/80 transition-all group/item">
                            <div className="bg-white p-1.5 rounded-full text-secondary shadow-sm group-hover/item:scale-110 transition-transform border border-gray-100">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                        </div>
                        ))}
                    </div>
                </div>
              </div>

              {/* 
                THE "ACTION BAR" 
                Sticks to the bottom, creates a unified control area 
              */}
              <div className="absolute bottom-0 left-0 w-full z-20">
                {/* Fade mask to smooth text scrolling behind the bar */}
                <div className="h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                
                {/* Glassmorphic Bar */}
                <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 p-4 md:p-6 flex flex-row gap-3 md:gap-4 items-center shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                    <a 
                        href="#contact"
                        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-gray-800 text-white font-bold py-3.5 md:py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-sm md:text-base"
                    >
                        <Calendar size={18} />
                        <span>Book Consultation</span>
                    </a>
                    
                    <a 
                        href="tel:4049524534"
                        className="flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3.5 md:py-4 px-5 rounded-xl border border-gray-200 transition-all hover:border-secondary hover:text-secondary active:scale-95"
                        title="Call Specialist"
                        aria-label="Call Specialist"
                    >
                        <Phone size={20} />
                        <span className="hidden md:inline">Call Now</span>
                    </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;