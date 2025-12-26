import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, ScanLine, Settings, ShieldCheck, Heart, ChevronRight, X, CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  badge?: string;
  details: string[]; // Added for the modal content
}

const steps: Step[] = [
  {
    id: 1,
    title: "Consultation",
    subtitle: "Day 1",
    description: "Visit our showroom or schedule an in-home estimate. We help you select the perfect slab and finalize the design details.",
    icon: <MessageSquare size={20} />,
    image: "https://i.imgur.com/RnEnmeO.png",
    details: [
      "Free design consultation with our stone experts",
      "Walk-through of our slab yard (500+ options)",
      "Selection of edge profiles (Bullnose, Eased, Ogee)",
      "Preliminary budget estimation and timeline planning"
    ]
  },
  {
    id: 2,
    title: "Laser Templating",
    subtitle: "Day 2-3",
    description: "Our technicians visit your home with advanced digital laser systems to measure your cabinets with 1/16\" precision. No manual errors.",
    icon: <ScanLine size={20} />,
    image: "https://i.imgur.com/2o8eFqx.png",
    details: [
      "Digital Laser Template (LT-2D3D) for exact fit",
      "Review of seam locations and overhangs",
      "Verification of sink and faucet compatibility",
      "Cabinet structural assessment to ensure support"
    ]
  },
  {
    id: 3,
    title: "CNC Fabrication",
    subtitle: "Day 4",
    description: "Your stone is cut using waterjet technology at our Duluth facility. We layout the veins perfectly before the first cut is made.",
    icon: <Settings size={20} />,
    image: "https://i.imgur.com/CpVRozW.png",
    details: [
      "Digital slab layout for vein matching (Flow optimization)",
      "High-precision Waterjet and Bridge Saw cutting",
      "Multi-step automated edge polishing",
      "Quality control inspection under special lighting"
    ]
  },
  {
    id: 4,
    title: "Clean Installation",
    subtitle: "Day 5",
    description: "We treat your home with respect. Our team covers your floors and furniture before bringing in a single tool. Installation typically takes just 4-6 hours.",
    icon: <ShieldCheck size={20} />,
    image: "https://i.imgur.com/oHj79ZL.png",
    badge: "No-Mess Guarantee",
    details: [
      "Floor protection runners and dust containment",
      "Professional mounting of undermount sinks",
      "Drilling of faucet and soap dispenser holes on-site",
      "Thorough cleanup of the workspace"
    ]
  },
  {
    id: 5,
    title: "Final Inspection",
    subtitle: "Completion",
    description: "We seal your stone and perform a final walkthrough with you to ensure every detail meets our 5-star standard.",
    icon: <Heart size={20} />,
    image: "https://i.imgur.com/4MQSwFE.png",
    details: [
      "Application of premium stone sealer (15-year protection)",
      "Client walkthrough and satisfaction checklist",
      "Care and maintenance instructions provided",
      "Warranty registration and final sign-off"
    ]
  }
];

const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedDetail, setSelectedDetail] = useState<Step | null>(null); // State for the modal
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the mobile menu to keep active item in view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.children[activeStep - 1] as HTMLElement;
      if (activeElement) {
        scrollContainerRef.current.scrollTo({
          left: activeElement.offsetLeft - scrollContainerRef.current.clientWidth / 2 + activeElement.clientWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeStep]);

  // Scroll Animations for Timeline Steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const stepElements = document.querySelectorAll('.timeline-step-anim');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-2 text-xs md:text-sm">Transparent Process</h2>
          <h3 className="text-2xl md:text-5xl font-bold text-primary mb-3 md:mb-6">Your Journey to a Dream Kitchen</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2">
            Worried about the mess? Don't be. We've refined our 5-step process over 20 years to be seamless, fast, and remarkably clean.
          </p>
        </div>

        {/* Timeline Navigation - Horizontal Scroll on Mobile, Full Width on Desktop */}
        <div className="relative mb-8 md:mb-12">
          {/* Desktop Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div 
            ref={scrollContainerRef}
            className="flex md:justify-between items-start md:items-center relative z-10 gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory px-4 md:px-0 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="timeline-step-anim opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col items-center cursor-pointer group min-w-[85px] md:min-w-0 snap-center shrink-0 pt-2"
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setActiveStep(step.id)}
              >
                {/* Dot/Icon */}
                <div 
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-lg shrink-0 ${
                    activeStep === step.id 
                      ? 'bg-secondary border-white scale-110 ring-2 ring-secondary/20' 
                      : activeStep > step.id 
                        ? 'bg-primary border-primary text-secondary' 
                        : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  <div className="transform scale-75 md:scale-100 flex items-center justify-center">
                    {activeStep === step.id ? <span className="text-white">{step.icon}</span> : step.icon}
                  </div>
                </div>
                
                {/* Text Label */}
                <div className="mt-2 md:mt-4 text-center w-full">
                   <h4 className={`font-bold text-[11px] md:text-base leading-tight md:leading-normal transition-colors px-1 ${activeStep === step.id ? 'text-primary' : 'text-gray-400'}`}>
                     {step.title}
                   </h4>
                   <span className="text-[9px] md:text-xs text-secondary font-semibold block mt-1">{step.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="flex md:hidden justify-center gap-1 mt-1">
            {steps.map((s) => (
               <div key={s.id} className={`h-1 rounded-full transition-all ${activeStep === s.id ? 'w-4 bg-secondary' : 'w-1 bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {/* Content Display Area */}
        <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-xl border border-gray-100 transition-all duration-500 min-h-[450px] md:min-h-[400px]">
          {steps.map((step) => (
            activeStep === step.id && (
              <div key={step.id} className="grid md:grid-cols-2 gap-6 md:gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Text Content */}
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="bg-primary text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-md">
                      {step.id}
                    </span>
                    <h4 className="text-xl md:text-3xl font-bold text-primary">{step.title}</h4>
                  </div>
                  
                  <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-5 md:mb-6">
                    {step.description}
                  </p>

                  {step.id === 4 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 md:p-4 flex items-start gap-3 animate-pulse mb-4 md:mb-0">
                       <ShieldCheck className="text-green-600 shrink-0 mt-1 w-5 h-5 md:w-6 md:h-6" />
                       <div>
                         <h5 className="font-bold text-green-800 text-sm md:text-base">Our Clean Home Promise</h5>
                         <p className="text-xs md:text-sm text-green-700 mt-1">We use heavy-duty floor runners and seal off the work area. We leave your home cleaner than we found it.</p>
                       </div>
                    </div>
                  )}

                  <div className="mt-4 md:mt-8 flex justify-between items-center">
                     <button 
                       onClick={() => setSelectedDetail(step)}
                       className="text-secondary font-bold hover:underline underline-offset-4 flex items-center gap-1 group/btn text-sm md:text-base"
                     >
                       Learn details <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                     
                     {/* Mobile Next Button */}
                     {activeStep < 5 && (
                       <button 
                         onClick={(e) => { e.stopPropagation(); setActiveStep(activeStep + 1); }}
                         className="md:hidden bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-600 shadow-sm active:bg-gray-100"
                       >
                         Next Step
                       </button>
                     )}
                  </div>
                </div>

                {/* Media Content */}
                <div className="order-1 md:order-2 relative h-48 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg group bg-gray-200">
                   <img 
                     src={step.image} 
                     alt={step.title} 
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                     loading="lazy"
                   />
                   
                   {step.badge && (
                     <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-secondary text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-sm font-bold shadow-lg">
                       {step.badge}
                     </div>
                   )}
                </div>

              </div>
            )
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedDetail(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary p-5 md:p-6 text-white flex justify-between items-start shrink-0">
               <div>
                  <div className="flex items-center gap-2 mb-1 md:mb-2 text-secondary">
                    {selectedDetail.icon}
                    <span className="font-bold text-xs md:text-sm uppercase tracking-wider">{selectedDetail.subtitle}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">{selectedDetail.title}</h3>
               </div>
               <button 
                 onClick={() => setSelectedDetail(null)}
                 className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
               <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  <div className="md:w-1/2 shrink-0">
                    <img 
                      src={selectedDetail.image} 
                      alt={selectedDetail.title} 
                      className="w-full h-40 md:h-48 object-cover rounded-xl shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h4 className="font-bold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">What happens in this step:</h4>
                    <ul className="space-y-2 md:space-y-3">
                      {selectedDetail.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-600">
                          <CheckCircle size={16} className="text-secondary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
               
               <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedDetail(null)}
                    className="bg-secondary hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm md:text-base"
                  >
                    Got it
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ProcessTimeline;