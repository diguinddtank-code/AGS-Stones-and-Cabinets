import React from 'react';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

const Showroom: React.FC = () => {
  return (
    <section id="showroom" className="relative min-h-[600px] flex items-center justify-center py-20 bg-gray-900 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1618221639263-d656c1f52576?q=80&w=1920&auto=format&fit=crop" 
                alt="AGS Stone Showroom Gallery" 
                className="w-full h-full object-cover opacity-40"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                
                {/* Text Content */}
                <div className="lg:w-1/2 text-white">
                    <div className="inline-block bg-secondary/20 text-secondary border border-secondary/50 rounded-full px-4 py-1 text-sm font-bold mb-6 backdrop-blur-md">
                        Open to the Public
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Touch & Feel <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Your Future Kitchen</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                        Photos can't capture the depth and texture of natural stone. Visit our Duluth showroom to browse over 500+ full-size slabs of Granite, Marble, Quartzite, and Quartz.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-start gap-4">
                             <div className="bg-white/10 p-3 rounded-lg">
                                 <MapPin className="text-secondary" />
                             </div>
                             <div>
                                 <h4 className="font-bold">Easy Access</h4>
                                 <p className="text-sm text-gray-400">Located conveniently off Abbotts Bridge Rd in Duluth.</p>
                             </div>
                        </div>
                        <div className="flex items-start gap-4">
                             <div className="bg-white/10 p-3 rounded-lg">
                                 <Calendar className="text-secondary" />
                             </div>
                             <div>
                                 <h4 className="font-bold">No Appointment?</h4>
                                 <p className="text-sm text-gray-400">Walk-ins are always welcome during business hours.</p>
                             </div>
                        </div>
                    </div>

                    <a href="#contact" className="inline-flex items-center gap-2 bg-secondary hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(202,138,4,0.3)]">
                        Get Directions <ArrowRight size={18} />
                    </a>
                </div>

                {/* Glassmorphism Card */}
                <div className="lg:w-1/2 w-full">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                         {/* Card Decor */}
                         <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                         
                         <h3 className="text-2xl font-bold text-white mb-6">What to Expect</h3>
                         
                         <div className="space-y-4">
                             {[
                                 "Personal Design Consultation",
                                 "Free Samples to Take Home",
                                 "Full Slab Viewing (Not tiny samples)",
                                 "Cabinet Hardware Display",
                                 "Sink & Faucet Options"
                             ].map((item, i) => (
                                 <div key={i} className="flex items-center gap-3 text-gray-200 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                     <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(202,138,4,0.8)]"></div>
                                     {item}
                                 </div>
                             ))}
                         </div>

                         <div className="mt-8 bg-black/40 rounded-xl p-4 flex items-center justify-between">
                             <div>
                                 <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Current Wait Time</p>
                                 <p className="text-white font-bold flex items-center gap-2">
                                     <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                     Immediate Assistance
                                 </p>
                             </div>
                             <Clock className="text-gray-500" />
                         </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default Showroom;