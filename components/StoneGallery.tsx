import React, { useState } from 'react';
import { ZoomIn, X, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

interface StoneImage {
  id: number;
  name: string;
  category: string; // 'Granite', 'Quartz', 'Marble', 'Quartzite'
  image: string;
  origin?: string;
}

const stones: StoneImage[] = [
  { id: 1, name: "Calacatta Laza", category: "Quartz", image: "https://cdn.msisurfaces.com/images/quartz-countertops/products/roomscenes/large/new-calacatta-laza-quartz-e.jpg", origin: "Engineered" },
  { id: 3, name: "Taj Mahal", category: "Quartzite", image: "https://terrastone.gallery/wp-content/uploads/2025/02/Taj-Mahal-Quartzite-2.jpg", origin: "Brazil" },
  { id: 2, name: "Blue Bahia", category: "Granite", image: "https://cdn.prod.website-files.com/5e1cf94f2b50942f7e1af54d/5e3b78c4c2c635fc0efe66e9_blue-bahia-detail.jpeg", origin: "Brazil" },
  { id: 9, name: "Eternal Calacatta Gold", category: "Quartz", image: "https://assetstools.cosentino.com/api/v1/bynder/image/07C05DB5-EC5F-4E84-91A66C826F28AE3C/silestone-eternal-calacatta-gold.jpg?auto=format&w=1600&h=850", origin: "Spain" },
  { id: 4, name: "Carrara White", category: "Marble", image: "https://m.media-amazon.com/images/I/61+n+bbC9rL.jpg", origin: "Italy" },
  { id: 6, name: "Statutario Nuvo", category: "Quartz", image: "https://www.igscountertops.com/wp-content/uploads/2018/01/Statuario-Nuvo-Kitchen-Island.jpg", origin: "Israel" },
  { id: 5, name: "Black Pearl", category: "Granite", image: "https://cdn.msisurfaces.com/images/roomscenes/medium/black-pearl-granite-a.jpg", origin: "India" },
  { id: 10, name: "Viscount White", category: "Granite", image: "https://images.squarespace-cdn.com/content/v1/5f5107b10f206063c983f438/2af1040a-f3e1-42a4-8a67-9430b009b499/Viscount-White-Granite-houston-countertops.png", origin: "India" },
  { id: 8, name: "Super White", category: "Quartzite", image: "https://marbleunlimited.com/wp-content/uploads/2024/03/84590983_10157691236931531_5909789482202169344_n.jpg", origin: "Brazil" },
  { id: 7, name: "Fantasy Brown", category: "Marble", image: "https://dropinblog.net/34246798/files/featured/Fantasy_Brown_Granite_A_perfect_Granite_Counter_Stone.png", origin: "India" },
];

const categories = ["All", "Quartz", "Granite", "Marble", "Quartzite"];

const StoneGallery: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<StoneImage | null>(null);

  const filteredStones = filter === "All" 
    ? stones 
    : stones.filter(s => s.category === filter);

  return (
    <section className="py-20 md:py-32 bg-neutral-900 relative border-b border-neutral-800">
      {/* Dark Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8 border-b border-neutral-800 pb-8">
            <div className="max-w-xl">
                <h2 className="text-secondary font-bold tracking-[0.2em] uppercase mb-3 text-xs md:text-sm flex items-center gap-3">
                   <span className="w-8 h-[1px] bg-secondary"></span> 
                   Curated Collection
                </h2>
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-4">The Stone Vault</h3>
                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                   Hand-selected slabs from around the globe. Whether you seek the drama of exotic quartzite or the serene consistency of quartz, explore our exclusive inventory.
                </p>
            </div>
            
            {/* Elegant Filter Tabs */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map(cat => (
                    <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-sm md:text-base font-medium transition-all duration-300 pb-1 relative group whitespace-nowrap ${
                        filter === cat 
                        ? 'text-white' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    >
                        {cat}
                        <span className={`absolute bottom-0 left-0 h-[1px] bg-secondary transition-all duration-300 ${filter === cat ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
                    </button>
                ))}
            </div>
        </div>

        {/* 
            LAYOUT LOGIC:
            Mobile: Flexbox with horizontal scroll (overflow-x-auto) + Snap
            Desktop: Grid (md:grid)
        */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {filteredStones.map((stone) => (
                <div 
                    key={stone.id}
                    onClick={() => setSelectedImage(stone)}
                    className="group cursor-pointer relative min-w-[85vw] md:min-w-0 snap-center"
                >
                    {/* Card Container */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-800 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-neutral-700/50 group-hover:border-secondary/50">
                        {/* Image */}
                        <img 
                            src={stone.image} 
                            alt={`${stone.name} ${stone.category} slab in Atlanta`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        
                        {/* Dark Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

                        {/* Content Positioning */}
                        <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-300">
                             <div className="translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block text-secondary text-[10px] font-bold uppercase tracking-widest mb-2 border border-secondary/30 px-2 py-0.5 rounded backdrop-blur-sm">
                                    {stone.category}
                                </span>
                                <h4 className="text-2xl font-serif text-white font-medium mb-1">{stone.name}</h4>
                                <p className="text-neutral-400 text-xs mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75 flex items-center gap-1">
                                    Origin: <span className="text-neutral-200">{stone.origin}</span>
                                </p>
                             </div>
                             
                             {/* CTA Line (Desktop Only) */}
                             <div className="w-full h-[1px] bg-white/20 mt-2 relative overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hidden md:block">
                                <div className="absolute top-0 left-0 w-full h-full bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                             </div>
                        </div>

                        {/* Top Right Zoom Icon */}
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full text-white md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-[-10px] md:group-hover:translate-y-0">
                            <ZoomIn size={18} />
                        </div>
                    </div>
                </div>
            ))}

            {/* "View More" CTA Card */}
            <div className="min-w-[85vw] md:min-w-0 snap-center aspect-[3/4] flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 hover:border-secondary hover:bg-neutral-800/50 transition-all group cursor-pointer p-6 text-center">
                 <a href="#showroom" className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-neutral-600 group-hover:border-secondary flex items-center justify-center transition-all group-hover:scale-110">
                        <ArrowRight className="text-neutral-400 group-hover:text-secondary" />
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-xl mb-1">View Full Inventory</h4>
                        <p className="text-neutral-500 text-xs group-hover:text-neutral-300 transition-colors">Visit our showroom to see 500+ slabs</p>
                    </div>
                 </a>
            </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-4 text-neutral-500 text-xs animate-pulse">
            <ArrowLeft size={12} /> Swipe to explore <ArrowRight size={12} />
        </div>

      </div>

      {/* Cinematic Modal (Keep Desktop style but responsive) */}
      {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-500"
            onClick={() => setSelectedImage(null)}
          >
             <button 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-50 hover:rotate-90 duration-300"
                onClick={() => setSelectedImage(null)}
             >
                 <X size={24} className="md:w-8 md:h-8" />
             </button>

             {/* Animated Card Container */}
             <div 
                className="w-full h-full md:max-w-6xl md:h-auto md:max-h-[90vh] flex flex-col md:flex-row bg-white rounded-none md:rounded-sm overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out" 
                onClick={e => e.stopPropagation()}
             >
                 <div className="h-[40vh] md:h-auto md:w-3/5 bg-neutral-900 relative group overflow-hidden">
                    <img 
                        src={selectedImage.image} 
                        alt={`${selectedImage.name} ${selectedImage.category} close up`}
                        className="w-full h-full object-cover animate-in fade-in duration-1000 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                 </div>
                 
                 <div className="flex-1 md:w-2/5 p-6 md:p-12 flex flex-col bg-white overflow-y-auto relative">
                    <div className="mb-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block bg-secondary text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                {selectedImage.category}
                            </span>
                            {selectedImage.origin && (
                                <span className="text-neutral-400 text-xs font-medium uppercase tracking-widest">
                                    From {selectedImage.origin}
                                </span>
                            )}
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6 leading-none">{selectedImage.name}</h3>
                        <div className="w-12 h-1 bg-secondary mb-8"></div>
                        
                        <div className="space-y-4 text-neutral-600 font-light text-sm md:text-base leading-relaxed">
                            <p>
                                Experience the depth and character of {selectedImage.name}. 
                                Ideally suited for creating a statement piece in your kitchen island or master bath vanity.
                            </p>
                            <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-neutral-800 mt-4">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full"></div> Polished Finish</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full"></div> 2cm & 3cm Available</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full"></div> Stain Resistant</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full"></div> High Durability</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="space-y-3 pt-8 border-t border-neutral-100 mt-8">
                        <a href="#contact" className="block w-full bg-primary hover:bg-neutral-800 text-white text-center py-4 text-sm font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1">
                            Request Quote
                        </a>
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="block w-full text-center py-2 text-neutral-400 text-xs hover:text-neutral-600 uppercase tracking-wider font-bold"
                        >
                            Back to Collection
                        </button>
                    </div>
                 </div>
             </div>
          </div>
      )}

    </section>
  );
};

export default StoneGallery;