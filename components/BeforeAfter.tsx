import React from 'react';

const BeforeAfter: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transformations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">See the difference quality stone and cabinets can make in a home.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-bold z-10">BEFORE</div>
                <img 
                    src="https://i.imgur.com/EWnnkrO.png" 
                    alt="Old Kitchen" 
                    className="w-full h-80 object-cover"
                />
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                 <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded text-sm font-bold z-10">AFTER</div>
                <img 
                    src="https://i.imgur.com/nI4AulC.png" 
                    alt="New Kitchen with Granite" 
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        </div>
        
      </div>
    </section>
  );
};

export default BeforeAfter;