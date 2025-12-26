import React, { useState, useEffect, useRef } from 'react';
import { Layers, Box, Hammer, Droplet, ChefHat, Grid, ArrowRight, X, Check, Bath, Phone, Navigation, PlusCircle } from 'lucide-react';

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
    icon: <Layers size={24} className="text-white" />,
    title: "Premium Countertops",
    shortDesc: "Exquisite Granite, Marble, and Quartz fabrication.",
    // Updated to specific Unsplash image for Stone/Countertops
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/03/blue-mare-quartz-countertop-1024x602.jpg-768x452.webp", 
    longDesc: "We are the leading fabricators of Granite, Marble, Quartzite, and Quartz countertops in Duluth and Metro Atlanta. Our state-of-the-art facility uses laser templating for precision fitting. Whether you want the timeless elegance of Carrara Marble or the durability of Cambria Quartz, we have the perfect slab for your kitchen island or perimeter counters.",
    features: ["Laser Templating Precision", "In-House Fabrication", "Seam Matching Technology", "15-Year Sealer Options"],
    keywords: ["granite countertops atlanta", "quartz kitchen island", "marble fabrication duluth"]
  },
  {
    icon: <Box size={24} className="text-white" />,
    title: "Custom Cabinets",
    shortDesc: "Tailor-made cabinetry to fit your space perfectly.",
    // Updated to specific Unsplash image for Cabinets
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Untitled.jpg",
    longDesc: "Upgrade your storage with our custom and semi-custom cabinetry solutions. We offer solid wood construction, soft-close hinges, and dovetail drawers. From modern frameless European styles to traditional shaker cabinets, we design layouts that maximize functionality in your kitchen remodeling project.",
    features: ["Solid Wood Construction", "Soft-Close Hardware", "3D Cabinet Design", "Custom Colors & Finishes"],
    keywords: ["custom cabinets near me", "kitchen cabinet installation", "modern shaker cabinets"]
  },
  {
    icon: <ChefHat size={24} className="text-white" />,
    title: "Kitchen Remodeling",
    shortDesc: "Full-scale kitchen renovations from start to finish.",
    // Updated to specific Unsplash image for Luxury Kitchen Remodel
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Custom-vs.-Pre-Fabricated-Kitchen-Cabinets-1-1-522x600.jpg",
    longDesc: "AGS Stones offers complete turnkey kitchen remodeling services. We handle demolition, plumbing, electrical adjustments, and installation. Stop searching for multiple contractors; we manage the entire project timeline to deliver your dream kitchen faster and within budget.",
    features: ["Turnkey Project Management", "Demolition & Disposal", "Plumbing & Electrical Prep", "Backsplash & Lighting"],
    keywords: ["kitchen remodel near me", "turnkey renovation atlanta", "kitchen design services"]
  },
  {
    icon: <Bath size={24} className="text-white" />,
    title: "Bathroom Remodeling",
    shortDesc: "Create a spa-like retreat in your own home.",
    // New Service added as requested
    image: "https://www.dfwimproved.com/wp-content/uploads/2021/12/How-to-plan-a-bathroom-remodel-scaled.jpg",
    longDesc: "Transform your outdated bathroom into a luxurious sanctuary. We handle everything from shower conversions and freestanding tub installations to custom tile work and lighting. Our team ensures proper waterproofing and a flawless finish for your master bath or guest suite.",
    features: ["Walk-in Shower Conversions", "Freestanding Tub Installation", "Custom Tile & Grout", "Complete Demolition & Rebuild"],
    keywords: ["bathroom remodel atlanta", "master bath renovation", "custom shower installation"]
  },
  {
    icon: <Droplet size={24} className="text-white" />,
    title: "Bath Vanities",
    shortDesc: "Transform your bathroom into a spa experience.",
    // Updated to specific Unsplash image for Bathroom Vanity
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Custom-vs.-Pre-Fabricated-Kitchen-Cabinets-1-2.jpg",
    longDesc: "Elevate your master bath or powder room with our custom vanity tops and cabinets. We specialize in fabricating vanity tops from remnants or full slabs, offering porcelain sinks, modern faucets, and expert installation for a spa-like retreat.",
    features: ["Custom Vanity Tops", "Undermount Sinks", "Master Bath Renovation", "Remnant Program for Small Projects"],
    keywords: ["bathroom vanity tops", "bathroom remodel alpharetta", "custom quartz vanity"]
  },
  {
    icon: <Hammer size={24} className="text-white" />,
    title: "Outdoor Kitchens",
    shortDesc: "Durable and stylish outdoor cooking spaces.",
    // Updated to specific Unsplash image for Outdoor Kitchen
    image: "https://agsstonefabricators.com/wp-content/uploads/2025/11/Custom-vs.-Pre-Fabricated-Kitchen-Cabinets-1-3.jpg",
    longDesc: "Take the party outside with a custom outdoor kitchen. We use UV-resistant stones like Granite and Dekton that withstand Georgia's weather. From built-in BBQ grills to outdoor bar tops, we create the ultimate entertainment zone.",
    features: ["Weather-Resistant Materials", "Built-in BBQ Stations", "Outdoor Bar Tops", "Dekton & Granite Options"],
    keywords: ["outdoor kitchen builder", "granite bbq countertops", "patio kitchen design"]
  },
  {
    icon: <Grid size={24} className="text-white" />,
    title: "Tile Work & Backsplash",
    shortDesc: "Professional flooring and backsplash installation.",
    // Updated to specific Unsplash image for Tile/Backsplash
    image: "https://howtonestforless.com/wp-content/uploads/2014/10/kitchen-backsplash-tutorial.jpg",
    longDesc: "The perfect kitchen needs the perfect backsplash. Our skilled tile setters install subway tile, mosaics, herringbone patterns, and large format porcelain flooring. We ensure proper waterproofing and grout sealing for longevity.",
    features: ["Backsplash Installation", "Porcelain & Ceramic Tile", "Shower Walls", "Custom Mosaics"],
    keywords: ["backsplash installation", "tile contractors duluth", "kitchen flooring"]
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  
  // Ref for the container of cards
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Updated animation classes for a faster entrance
            entry.target.classList.remove('opacity-0', 'translate-y-16', 'scale-95');
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            // Stop observing once animated
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
    <section id="services" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">Services We Offer</h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Click on any service below to learn more about our process and materials.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Logic to center the last item if it's an orphan
            // On md (2 columns), item 7 is odd, so we can make it span 2 columns to center it.
            // On lg (3 columns), item 7 is 3,3,1. We place it in col-start-2 to center it.
            const isLast = index === services.length - 1;
            const gridClasses = isLast 
                ? "md:col-span-2 lg:col-span-1 lg:col-start-2" 
                : "";

            return (
                <div 
                key={index} 
                onClick={() => setSelectedService(service)}
                className={`service-card-anim ${gridClasses} opacity-0 translate-y-16 scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 cursor-pointer border border-gray-100`}
                style={{ transitionDelay: `${index * 50}ms` }}
                >
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                    <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-secondary p-3 rounded-xl z-20 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                    {service.icon}
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex-grow flex flex-col">
                    <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{service.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{service.shortDesc}</p>
                    
                    {/* 
                    Action Area 
                    Changed from invisible link to a clearly visible clickable area 
                    */}
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 group/btn">
                    <span className="text-sm font-bold text-secondary flex items-center gap-2">
                        <PlusCircle size={16} />
                        View Details
                    </span>
                    
                    {/* Separate Link for Direct Quote to avoid propagation issues */}
                    <a 
                        href="#contact"
                        onClick={(e) => {
                        e.stopPropagation();
                        }}
                        className="flex items-center text-sm font-bold text-gray-400 hover:text-primary transition-colors gap-1"
                    >
                        Get Quote <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                    </a>
                    </div>
                </div>
                </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedService(null)}>
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Image Side */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                <h3 className="text-3xl font-bold text-white">{selectedService.title}</h3>
              </div>
            </div>

            {/* Modal Content Side */}
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-3xl font-bold text-primary mb-4 hidden md:block">{selectedService.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {selectedService.longDesc}
              </p>

              <div className="mb-8">
                <h4 className="font-bold text-secondary uppercase tracking-wider text-sm mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="bg-green-100 text-green-600 p-1 rounded-full">
                        <Check size={16} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Two Buttons: Free Estimate & Direction */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="tel:4049524534" 
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
                >
                  <Phone size={18} />
                  Free Estimate
                </a>

                <a 
                  href="https://maps.google.com/?q=4579+Abbotts+Bridge+Rd,+Duluth,+GA+30097" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
                >
                  <Navigation size={18} />
                  Get Directions
                </a>
              </div>
              
              {/* Subtle SEO keywords at bottom of modal */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Related: {selectedService.keywords.join(", ")}
                </p>
              </div>

              {/* Hidden SEO Section */}
              <div className="hidden">
                 <h3>SEO Keywords for {selectedService.title}</h3>
                 <ul>
                    {selectedService.keywords.map((keyword, idx) => (
                        <li key={idx}>{keyword}</li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;