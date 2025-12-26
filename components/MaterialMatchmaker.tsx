import React, { useState } from 'react';
import { Flame, ShieldAlert, Sparkles, Gem, Droplets, ChevronRight, Check } from 'lucide-react';

type MaterialType = 'quartz' | 'granite' | 'marble' | 'quartzite';

interface MaterialData {
  id: MaterialType;
  name: string;
  tagline: string;
  stats: {
    heat: number;
    scratch: number;
    stain: number;
    maintenance: number; // 100 = easy, 0 = hard
  };
  pros: string[];
  bestFor: string;
  icon: React.ReactNode;
}

const materials: Record<MaterialType, MaterialData> = {
  quartz: {
    id: 'quartz',
    name: 'Quartz',
    tagline: 'Modern & Zero-Maintenance',
    stats: { heat: 60, scratch: 80, stain: 95, maintenance: 100 },
    pros: ['Non-porous (Never needs sealing)', 'Consistent color & patterns', 'Antibacterial surface', 'Stain resistant', 'Wide variety of modern styles'],
    bestFor: 'Busy family kitchens & baths',
    icon: <Sparkles size={20} />
  },
  granite: {
    id: 'granite',
    name: 'Granite',
    tagline: 'Indestructible Nature',
    stats: { heat: 100, scratch: 90, stain: 75, maintenance: 80 },
    pros: ['100% Heat resistant (Hot pans ok)', 'Unique one-of-a-kind patterns', 'High resale value', 'Scratch resistant', 'UV Resistant (Great for outdoors)'],
    bestFor: 'High-traffic & Outdoor kitchens',
    icon: <ShieldAlert size={20} />
  },
  marble: {
    id: 'marble',
    name: 'Marble',
    tagline: 'Timeless Luxury',
    stats: { heat: 90, scratch: 40, stain: 40, maintenance: 40 },
    pros: ['Unmatched natural beauty', 'Stays cool (Perfect for baking)', 'Classic elegance', 'Premium luxury appeal', 'Unique veining in every slab'],
    bestFor: 'Master baths & Fireplaces',
    icon: <Gem size={20} />
  },
  quartzite: {
    id: 'quartzite',
    name: 'Quartzite',
    tagline: 'Beauty of Marble, Strength of Granite',
    stats: { heat: 100, scratch: 95, stain: 70, maintenance: 70 },
    pros: ['Harder than glass', 'Natural stone look', 'UV resistant', 'Excellent heat resistance', 'Exotic and rare appearance'],
    bestFor: 'Luxury high-end kitchens',
    icon: <Flame size={20} />
  }
};

const MaterialMatchmaker: React.FC = () => {
  const [selected, setSelected] = useState<MaterialType>('quartz');

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gray-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-xs md:text-sm font-bold text-secondary uppercase tracking-widest mb-2">Interactive Guide</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">Find Your Perfect Stone</h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Compare materials side-by-side to find the best fit for your lifestyle.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* MOBILE NAV: Horizontal Scrollable Tabs */}
          <div className="lg:hidden col-span-12 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide flex gap-3 snap-x">
             {(Object.keys(materials) as MaterialType[]).map((key) => {
                 const mat = materials[key];
                 const isActive = selected === key;
                 return (
                    <button
                        key={key}
                        onClick={() => setSelected(key)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all border snap-center ${
                            isActive 
                            ? 'bg-primary border-primary text-white shadow-lg scale-105' 
                            : 'bg-white border-gray-200 text-gray-600'
                        }`}
                    >
                        {mat.icon}
                        <span className="font-bold text-sm">{mat.name}</span>
                    </button>
                 );
             })}
          </div>

          {/* DESKTOP NAV: Vertical Sidebar */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-3">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 ml-2">Select Material</h4>
            {(Object.keys(materials) as MaterialType[]).map((key) => {
              const mat = materials[key];
              const isActive = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`relative p-4 rounded-xl text-left transition-all duration-300 border-2 group ${
                    isActive 
                      ? 'bg-primary border-primary text-white shadow-xl translate-x-2' 
                      : 'bg-white border-transparent hover:bg-gray-50 text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg flex items-center gap-3">
                       <span className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-400 group-hover:text-secondary'}`}>
                         {mat.icon}
                       </span>
                       {mat.name}
                    </span>
                    {isActive && <ChevronRight size={16} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Display Area (Card) */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative flex flex-col min-h-[500px] transition-all duration-500">
              
              {/* Card Header */}
              <div className="bg-gray-900 text-white p-6 md:p-8 relative overflow-hidden shrink-0">
                {/* Dynamic Background Blob */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 transition-colors duration-500 ${
                    selected === 'quartz' ? 'bg-blue-400' : 
                    selected === 'granite' ? 'bg-orange-400' : 
                    selected === 'marble' ? 'bg-purple-400' : 'bg-emerald-400'
                }`}></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-secondary/80 text-sm font-bold uppercase tracking-wider">
                            {materials[selected].icon} {materials[selected].name}
                        </div>
                        <h4 className="text-2xl md:text-4xl font-bold leading-tight animate-in slide-in-from-bottom-2 fade-in duration-300 key={selected}">
                            {materials[selected].tagline}
                        </h4>
                    </div>
                    <div className="hidden md:block bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-right">
                         <span className="text-xs text-gray-400 uppercase tracking-widest block">Recommended For</span>
                         <span className="font-medium text-sm text-white">{materials[selected].bestFor}</span>
                    </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-8 grid md:grid-cols-2 gap-8 md:gap-12 flex-grow">
                
                {/* Left Col: Stats */}
                <div className="space-y-5">
                   {/* Mobile Only Best For Tag */}
                   <div className="md:hidden bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                        <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Recommended For</span>
                        <span className="font-medium text-sm text-gray-800">{materials[selected].bestFor}</span>
                   </div>

                   <h5 className="font-bold text-gray-900 text-sm md:text-base border-b border-gray-100 pb-2">Performance Score</h5>
                   
                   <StatBar label="Heat Resistance" value={materials[selected].stats.heat} color="bg-red-500" icon={<Flame size={14} />} />
                   <StatBar label="Scratch Resistance" value={materials[selected].stats.scratch} color="bg-slate-600" icon={<ShieldAlert size={14} />} />
                   <StatBar label="Stain Resistance" value={materials[selected].stats.stain} color="bg-blue-500" icon={<Droplets size={14} />} />
                   <StatBar label="Ease of Maintenance" value={materials[selected].stats.maintenance} color="bg-green-500" icon={<Sparkles size={14} />} />
                </div>

                {/* Right Col: Only Pros (Cons removed) */}
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="mb-6">
                            <h5 className="font-bold text-green-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <Check size={14} className="text-green-600"/>
                                </div> 
                                Advantages & Benefits
                            </h5>
                            <ul className="space-y-3">
                                {materials[selected].pros.map((pro, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 ml-2">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 shrink-0"></span> 
                                        <span className="leading-snug">{pro}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                         <a href="#contact" className="flex items-center justify-center w-full text-center bg-secondary hover:bg-yellow-600 text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                             Get Quote for {materials[selected].name}
                         </a>
                    </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBar: React.FC<{ label: string; value: number; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
    <div>
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
            <span className="flex items-center gap-1.5">{icon} {label}</span>
            <span>{value === 100 ? 'Perfect' : `${value}/100`}</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
                className={`h-full ${color} transition-all duration-1000 ease-out`} 
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

export default MaterialMatchmaker;