import React from 'react';
import { Phone, Mail, Clock, MapPin, Send, Navigation, Info } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative bg-white pt-20">
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">Start Your Project Today</h3>
          <p className="mt-4 text-gray-600">Request a free estimate or visit our showroom.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          {/* Contact Form Section */}
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-white z-10">
            <h4 className="text-2xl font-bold text-primary mb-6">Send us a message</h4>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                    placeholder="Jane" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                    placeholder="Doe" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone</label>
                    <input 
                        type="tel" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                        placeholder="(404) 555-0123" 
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                    <input 
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                        placeholder="jane@example.com" 
                    />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Service Needed</label>
                <div className="relative">
                    <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none">
                        <option>Kitchen Remodeling</option>
                        <option>Countertops (Granite/Quartz)</option>
                        <option>Bathroom Vanity</option>
                        <option>Custom Cabinets</option>
                        <option>Outdoor Kitchen</option>
                        <option>Other / General Inquiry</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Project Details</label>
                <textarea 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400 resize-none" 
                    placeholder="Tell us about your space, timeline, and any specific stones you are interested in..."
                ></textarea>
              </div>

              <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg text-blue-800 text-xs mb-2">
                 <Info size={16} className="shrink-0 mt-0.5" />
                 <p>We typically respond within 24 hours. For immediate assistance, please call us directly.</p>
              </div>

              <button className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Send size={20} /> Request Free Quote
              </button>
            </form>
          </div>

          {/* Interactive Map Section - "Creative Map" */}
          <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-full bg-gray-200">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7479717757656!2d-84.17957488478635!3d34.03223198061213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59f0f9b0b0b0b%3A0x1b0b0b0b0b0b0b0b!2s4579%20Abbotts%20Bridge%20Rd%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'grayscale(0%) contrast(1.1)'}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
            ></iframe>
            
            {/* Overlay Info Card - Improved Design */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/40">
               <div className="flex items-start gap-4 mb-4">
                  <div className="bg-secondary p-3 rounded-xl text-white shadow-lg shadow-secondary/30">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-lg">AGS Showroom</h5>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Duluth, GA</p>
                  </div>
               </div>
               
               <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  4579 Abbotts Bridge Rd Suite -10<br/>
                  Duluth, GA 30097
               </p>

               <div className="space-y-3 mb-4">
                 <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500 flex items-center gap-2"><Clock size={14} /> Mon-Fri</span>
                    <span className="font-bold text-gray-800">8:00 AM - 6:00 PM</span>
                 </div>
                 <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center gap-2"><Clock size={14} /> Saturday & Sunday</span>
                    <span className="font-medium">Closed</span>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-3 mt-2">
                  <a href="tel:4049524534" className="flex items-center justify-center gap-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 text-primary py-2 rounded-lg transition-colors">
                    <Phone size={16} /> Call
                  </a>
                  <a 
                    href="https://maps.google.com/?q=4579+Abbotts+Bridge+Rd,+Duluth,+GA+30097" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm font-bold bg-primary hover:bg-slate-800 text-white py-2 rounded-lg transition-colors shadow-md"
                  >
                    <Navigation size={16} /> Directions
                  </a>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;