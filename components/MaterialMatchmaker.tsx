import React, { useState } from 'react';
import { Flame, ShieldAlert, Sparkles, Gem, AlertTriangle, Droplets } from 'lucide-react';

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
  cons: string[];
  bestFor: string;
  icon: React.ReactNode;
}

const materials: Record<MaterialType, MaterialData> = {
  quartz: {
    id: 'quartz',
    name: 'Quartz',
    tagline: 'The Modern, Zero-Maintenance Choice',
    stats: { heat: 60, scratch: 80, stain: 95, maintenance: 100 },
    pros: ['Non-porous (No sealing needed)', 'Consistent patterns', 'Antibacterial'],
    cons: ['Not UV resistant (Indoor only)', 'Can be damaged by extreme heat'],
    bestFor: 'Busy kitchens, bathrooms, and modern designs.',
    icon: <Sparkles size={24} />
  },
  granite: {
    id: 'granite',
    name: 'Granite',
    tagline: 'Natural Beauty & Indestructible Durability',
    stats: { heat: 100, scratch: 90, stain: 75, maintenance: 80 },
    pros: ['100% Heat resistant', 'Unique natural patterns', 'Adds high resale value'],
    cons: ['Requires sealing (every 1-2 years)', 'Patterns vary (no two slabs alike)'],
    bestFor: 'Culinary enthusiasts, outdoor kitchens, and high-traffic areas.',
    icon: <ShieldAlert size={24} />
  },
  marble: {
    id: 'marble',
    name: 'Marble',
    tagline: 'Timeless Luxury & Elegance',
    stats: { heat: 90, scratch: 40, stain: 40, maintenance: 40 },
    pros: ['Unmatched aesthetic beauty', 'Stays cool (great for baking)', 'Classic luxury look'],
    cons: ['Etches and scratches easily', 'Porous (stains if not sealed often)'],
    bestFor: 'Master baths, fireplace surrounds, and baking stations.',
    icon: <Gem size={24} />
  },
  quartzite: {
    id: 'quartzite',
    name: 'Quartzite',
    tagline: 'Look of Marble, Strength of Granite',
    stats: { heat: 100, scratch: 95, stain: 70, maintenance: 70 },
    pros: ['Harder than glass', 'Natural marble look', 'UV resistant'],
    cons: ['More expensive', 'Hard to fabricate (higher labor cost)'],
    bestFor: 'Luxury kitchens that want the marble look without the fragility.',
    icon: <Flame size={24} />
  }
};

const MaterialMatchmaker: React.FC = () => {
  const [selected, setSelected] = useState<MaterialType>('quartz');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Interactive Guide</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">Find Your Perfect Stone</h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Not sure which material is right for your lifestyle? Select a stone type below to see how they stack up.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar / Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {(Object.keys(materials) as MaterialType[]).map((key) => {
              const mat = materials[key];
              const isActive = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`relative p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-primary border-primary text-white shadow-xl scale-105 z-10' 
                      : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-lg flex items-center gap-3">
                       <span className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 text-secondary'}`}>
                         {mat.icon}
                       </span>
                       {mat.name}
                    </span>
                    {isActive && <div className="w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_#ca8a04]"></div>}
                  </div>
                  <p className={`text-xs ml-12 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                    {mat.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Display Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col">
              
              {/* Header with gradient based on selection */}
              <div className="bg-gray-900 text-white p-8 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4 transition-colors duration-500 ${
                    selected === 'quartz' ? 'bg-blue-400' : 
                    selected === 'granite' ? 'bg-orange-400' : 
                    selected === 'marble' ? 'bg-white' : 'bg-green-400'
                }`}></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h4 className="text-4xl font-bold mb-2 animate-in slide-in-from-left-4 duration-300 key={selected}">{materials[selected].name}</h4>
                        <p className="text-gray-300 italic">{materials[selected].tagline}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                         <span className="text-xs text-gray-400 uppercase tracking-widest block">Best Application</span>
                         <span className="font-medium text-sm">{materials[selected].bestFor}</span>
                    </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="p-8 flex-grow grid md:grid-cols-2 gap-12">
                
                {/* Progress Bars */}
                <div className="space-y-6">
                   <h5 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Performance Stats</h5>
                   
                   <StatBar label="Heat Resistance" value={materials[selected].stats.heat} color="bg-red-500" icon={<Flame size={14} />} />
                   <StatBar label="Scratch Resistance" value={materials[selected].stats.scratch} color="bg-slate-600" icon={<ShieldAlert size={14} />} />
                   <StatBar label="Stain Resistance" value={materials[selected].stats.stain} color="bg-blue-500" icon={<Droplets size={14} />} />
                   <StatBar label="Ease of Maintenance" value={materials[selected].stats.maintenance} color="bg-green-500" icon={<Sparkles size={14} />} />
                </div>

                {/* Pros & Cons */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h5 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500"></div> Why you'll love it
                        </h5>
                        <ul className="space-y-2 mb-6">
                            {materials[selected].pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="text-green-500 font-bold">✓</span> {pro}
                                </li>
                            ))}
                        </ul>

                        <h5 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-orange-500"></div> Things to consider
                        </h5>
                        <ul className="space-y-2">
                            {materials[selected].cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <AlertTriangle size={14} className="text-orange-500 mt-0.5 shrink-0" /> {con}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                         <a href="#contact" className="block w-full text-center bg-gray-100 hover:bg-secondary hover:text-white text-gray-800 font-bold py-3 rounded-xl transition-colors">
                             Get a Quote for {materials[selected].name}
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
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
            <span className="flex items-center gap-1">{icon} {label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
                className={`h-full ${color} transition-all duration-1000 ease-out`} 
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

export default MaterialMatchmaker;