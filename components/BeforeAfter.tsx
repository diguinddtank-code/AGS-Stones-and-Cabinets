import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section className="py-24 bg-white relative z-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-secondary mb-4">
             <Sparkles size={20} className="animate-pulse" />
             <span className="text-sm font-bold uppercase tracking-widest">Real Transformations</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary mb-6">See The Difference</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Slide to reveal how we transform outdated spaces into modern masterpieces. 
            Drag the slider to compare.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-gray-100 group"
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onTouchMove={onTouchMove}
          >
            {/* Image 2 (After) - The Base Layer */}
            <img 
              src="https://i.imgur.com/nI4AulC.png" 
              alt="After Renovation" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-6 right-6 bg-secondary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                AFTER
            </div>

            {/* Image 1 (Before) - The Clipped Layer */}
            <div 
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img 
                    src="https://i.imgur.com/EWnnkrO.png" 
                    alt="Before Renovation" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                 <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    BEFORE
                </div>
            </div>

            {/* Slider Handle */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-secondary border-4 border-white/20 hover:scale-110 transition-transform">
                    <ChevronLeft size={20} className="-mr-1" />
                    <ChevronRight size={20} className="-ml-1" />
                </div>
            </div>
            
            {/* Instructions overlay (fades out on interaction) */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-sm font-medium tracking-wide">Drag slider to compare</span>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

export default BeforeAfter;