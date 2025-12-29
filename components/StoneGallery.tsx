import React, { useState } from 'react';
import { ZoomIn, X, ChevronRight } from 'lucide-react';

interface StoneImage {
  id: number;
  name: string;
  category: string; // 'Granite', 'Quartz', 'Marble', 'Quartzite'
  image: string;
}

const stones: StoneImage[] = [
  { id: 1, name: "Calacatta Laza", category: "Quartz", image: "https://cdn.msisurfaces.com/images/quartz-countertops/products/roomscenes/large/new-calacatta-laza-quartz-e.jpg" },
  { id: 6, name: "Statutario Nuvo", category: "Quartz", image: "https://www.igscountertops.com/wp-content/uploads/2018/01/Statuario-Nuvo-Kitchen-Island.jpg" },
  { id: 9, name: "Eternal Calacatta Gold", category: "Quartz", image: "https://assetstools.cosentino.com/api/v1/bynder/image/07C05DB5-EC5F-4E84-91A66C826F28AE3C/silestone-eternal-calacatta-gold.jpg?auto=format&w=1600&h=850" },
  { id: 2, name: "Blue Bahia", category: "Granite", image: "https://cdn.prod.website-files.com/5e1cf94f2b50942f7e1af54d/5e3b78c4c2c635fc0efe66e9_blue-bahia-detail.jpeg" },
  { id: 5, name: "Black Pearl", category: "Granite", image: "https://cdn.msisurfaces.com/images/roomscenes/medium/black-pearl-granite-a.jpg" },
  { id: 10, name: "Viscount White", category: "Granite", image: "https://images.squarespace-cdn.com/content/v1/5f5107b10f206063c983f438/2af1040a-f3e1-42a4-8a67-9430b009b499/Viscount-White-Granite-houston-countertops.png" },
  { id: 4, name: "Carrara White", category: "Marble", image: "https://m.media-amazon.com/images/I/61+n+bbC9rL.jpg" },
  { id: 7, name: "Fantasy Brown", category: "Marble", image: "https://dropinblog.net/34246798/files/featured/Fantasy_Brown_Granite_A_perfect_Granite_Counter_Stone.png" },
  { id: 3, name: "Taj Mahal", category: "Quartzite", image: "https://terrastone.gallery/wp-content/uploads/2025/02/Taj-Mahal-Quartzite-2.jpg" },
  { id: 8, name: "Super White", category: "Quartzite", image: "https://marbleunlimited.com/wp-content/uploads/2024/03/84590983_10157691236931531_5909789482202169344_n.jpg" },
];

const categories = ["Quartz", "Granite", "Marble", "Quartzite"];

const StoneGallery: React.FC = () => {
  const [filter, setFilter] = useState("Quartz");
  const [selectedImage, setSelectedImage] = useState<StoneImage | null>(null);

  const filteredStones = stones.filter(s => s.category === filter);
  
  // Duplicate array logic for infinite scroll
  let displayStones = [...filteredStones];
  // Ensure we have enough items for the marquee to look good even with few filtered results
  while (displayStones.length < 6) {
    displayStones = [...displayStones, ...filteredStones];
  }
  const marqueeStones = [...displayStones, ...displayStones];

  return (
    <section className="py-12 md:py-24 bg-gray-50 relative border-b border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
                <h2 className="text-secondary font-bold tracking-widest uppercase mb-2 text-xs md:text-sm">Curated Inventory</h2>
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-primary">Browse Slabs</h3>
            </div>
            
            {/* Horizontal Filter Tabs */}
            <div className="flex bg-white p-1 rounded-full shadow-sm border border-gray-200 overflow-x-auto scrollbar-hide z-10 relative max-w-full">
                {categories.map(cat => (
                    <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        filter === cat 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                    }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full group/gallery mt-4 md:mt-8">
          
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 h-full w-8 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 h-full w-8 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          <div 
              className="flex gap-4 md:gap-8 animate-scroll hover:[animation-play-state:paused] w-max px-4"
              style={{ animationDuration: `${Math.max(30, marqueeStones.length * 4)}s` }}
          >
              {marqueeStones.map((stone, index) => (
                  <div 
                      key={`${stone.id}-${index}`} 
                      // RESIZED: Changed w-[140px] to w-[220px] on mobile for better visibility
                      className="w-[220px] md:w-[320px] aspect-[3/4] flex-shrink-0 relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-white group/card"
                      onClick={() => setSelectedImage(stone)}
                  >
                      <img 
                          src={stone.image} 
                          alt={stone.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      
                      {/* Overlay - Always visible title on mobile (bottom gradient), Hover on Desktop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                          <span className="text-secondary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 opacity-90 shadow-black drop-shadow-md">{stone.category}</span>
                          <h4 className="text-white text-lg md:text-2xl font-serif font-bold leading-tight line-clamp-2 drop-shadow-md">{stone.name}</h4>
                          <div className="mt-2 hidden md:flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider">
                              <ZoomIn size={14} /> View Slab
                          </div>
                      </div>
                  </div>
              ))}
              
              {/* "View More" Card */}
              <div className="w-[220px] md:w-[320px] aspect-[3/4] flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-xl md:rounded-2xl border-2 border-dashed border-gray-300 hover:border-secondary hover:bg-white transition-all cursor-pointer group/more">
                  <a href="#showroom" className="flex flex-col items-center gap-2 text-gray-400 group-hover/more:text-secondary transition-colors p-4 text-center w-full">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-200 group-hover/more:border-secondary flex items-center justify-center transition-all bg-white">
                            <ChevronRight size={24} className="md:w-8 md:h-8" />
                      </div>
                      <span className="font-bold text-sm md:text-base">View 500+ Slabs <br/> in Showroom</span>
                  </a>
              </div>
          </div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center">
          <p className="text-xs md:text-sm text-gray-400 flex items-center justify-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
             Swipe to explore our collection
          </p>
      </div>

      {/* Lightbox Modal with Cinematic Animation */}
      {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500"
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
                className="max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out" 
                onClick={e => e.stopPropagation()}
             >
                 <div className="h-[45vh] md:h-auto md:w-3/5 bg-gray-900 relative group overflow-hidden">
                    <img 
                        src={selectedImage.image} 
                        alt={selectedImage.name} 
                        className="w-full h-full object-cover animate-in fade-in duration-1000 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                 </div>
                 
                 <div className="flex-1 md:w-2/5 p-6 md:p-12 flex flex-col bg-white overflow-y-auto relative">
                    <div className="mb-auto">
                        <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            {selectedImage.category}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4 leading-none">{selectedImage.name}</h3>
                        <div className="w-12 h-1 bg-secondary mb-6"></div>
                        <p className="text-gray-500 mb-8 text-sm md:text-base leading-relaxed font-light">
                            Experience the depth and character of {selectedImage.name}. 
                            Ideal for creating a statement piece in your kitchen island or master bath vanity.
                            Durability meets luxury in this premium slab.
                        </p>
                    </div>
                    
                    <div className="space-y-3 pt-6 border-t border-gray-100">
                        <a href="#contact" className="block w-full bg-primary hover:bg-gray-800 text-white text-center py-4 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 text-sm md:text-base uppercase tracking-wide">
                            Get Quote for this Stone
                        </a>
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="block w-full text-center py-2 text-gray-400 text-xs hover:text-gray-600 uppercase tracking-wider font-bold"
                        >
                            Close Preview
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