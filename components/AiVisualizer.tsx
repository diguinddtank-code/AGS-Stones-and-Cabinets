import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Wand2, AlertCircle } from 'lucide-react';
import { DesignState, VisualizerMode } from '../types';
import { generateDesignImage } from '../services/geminiService';

const AiVisualizer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [design, setDesign] = useState<DesignState>({
    style: 'Modern',
    cabinetColor: 'White',
    countertopType: 'White Quartz',
    flooring: 'Hardwood',
    mode: VisualizerMode.KITCHEN
  });

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    try {
      const imageBase64 = await generateDesignImage(design);
      
      if (imageBase64) {
        setGeneratedImage(imageBase64);
      } else {
        setError("Unable to generate image at this time. Please try again.");
      }
    } catch (err: any) {
      console.error("Visualizer Logic Error:", err);
      // Check if it's the specific missing API key error
      if (err.message && err.message.includes("API Key is missing")) {
        setError("API Key missing. Please configure your .env file.");
      } else {
        setError("An unexpected error occurred during generation.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="visualizer" className="py-20 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
            <Wand2 className="text-secondary" size={20} />
            <span className="text-sm font-semibold tracking-wide">AGS Smart Design Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Visualize Your Dream Project</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Not sure what color combination works? Use our interactive tool to instantly preview different design styles and stone textures using our real-time image engine.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Design Options</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visualizer Mode</label>
                <div className="flex bg-gray-800 rounded-lg p-1">
                  {Object.values(VisualizerMode).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setDesign({ ...design, mode: m });
                        setGeneratedImage(null);
                        setError(null);
                      }}
                      className={`flex-1 py-2 text-sm rounded-md transition-all ${
                        design.mode === m ? 'bg-secondary text-white shadow-lg' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {design.mode === VisualizerMode.KITCHEN ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Design Style</label>
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary text-white"
                      value={design.style}
                      onChange={(e) => setDesign({...design, style: e.target.value})}
                    >
                      <option>Modern</option>
                      <option>Farmhouse</option>
                      <option>Traditional</option>
                      <option>Industrial</option>
                      <option>Minimalist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Cabinet Color</label>
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary text-white"
                      value={design.cabinetColor}
                      onChange={(e) => setDesign({...design, cabinetColor: e.target.value})}
                    >
                      <option>White Shaker</option>
                      <option>Navy Blue</option>
                      <option>Forest Green</option>
                      <option>Natural Oak</option>
                      <option>Black Matte</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Flooring</label>
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary text-white"
                      value={design.flooring}
                      onChange={(e) => setDesign({...design, flooring: e.target.value})}
                    >
                      <option>Hardwood</option>
                      <option>Dark Wood</option>
                      <option>Grey Tile</option>
                      <option>Marble Floor</option>
                    </select>
                  </div>
                </>
              ) : null}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {design.mode === VisualizerMode.KITCHEN ? 'Countertop Selection' : 'Stone Type'}
                </label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary text-white"
                  value={design.countertopType}
                  onChange={(e) => setDesign({...design, countertopType: e.target.value})}
                >
                  <option>Calacatta Gold Marble</option>
                  <option>Black Galaxy Granite</option>
                  <option>Pure White Quartz</option>
                  <option>Carrara Marble</option>
                  <option>Blue Bahia Granite</option>
                  <option>Concrete Quartz</option>
                </select>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-secondary to-yellow-500 hover:from-yellow-500 hover:to-secondary text-white font-bold py-4 rounded-xl shadow-lg transform transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {loading ? 'Designing...' : 'Generate Visualization'}
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-8">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 aspect-video relative flex items-center justify-center group">
              {loading ? (
                 <div className="text-center">
                    <Loader2 className="animate-spin text-secondary mx-auto mb-4" size={48} />
                    <p className="text-gray-300 text-lg font-medium animate-pulse">Generating your custom design...</p>
                    <p className="text-gray-500 text-sm mt-2">This utilizes advanced AI and may take a few seconds.</p>
                 </div>
              ) : error ? (
                <div className="text-center p-8">
                   <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                   <p className="text-white text-lg font-bold mb-2">Oops! Something went wrong.</p>
                   <p className="text-gray-400 mb-4">{error}</p>
                   <button 
                     onClick={handleGenerate} 
                     className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
                   >
                     Try Again
                   </button>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full h-full animate-in fade-in duration-700">
                  <img 
                    src={generatedImage} 
                    alt="Generated Design" 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <p className="text-white font-bold text-lg">{design.mode === VisualizerMode.KITCHEN ? `${design.style} Kitchen` : design.countertopType}</p>
                    <p className="text-gray-300 text-sm">
                      {design.mode === VisualizerMode.KITCHEN 
                        ? `Featuring ${design.cabinetColor} cabinets and ${design.countertopType} countertops.`
                        : 'Premium Grade A Natural Stone.'}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handleGenerate} className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-md transition-all hover:rotate-180">
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <Sparkles className="text-gray-700 mx-auto mb-4" size={64} />
                  <p className="text-gray-400 text-lg font-medium">Select your options on the left</p>
                  <p className="text-gray-500 text-sm">Click "Generate" to see the magic happen</p>
                </div>
              )}
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              *Images are generated by AI. Results may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiVisualizer;