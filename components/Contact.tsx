import React from 'react';
import { Phone, Mail, Clock, MapPin, Send, Navigation, Info, CheckCircle2 } from 'lucide-react';

const locations = [
  "Atlanta, GA", "Alpharetta, GA", "Brookhaven, GA", "Buford, GA", 
  "College Park, GA", "Cumming, GA", "Duluth, GA", "Douglasville, GA",
  "Fairburn, GA", "Hiram, GA", "Johns Creek, GA", "Lawrenceville, GA",
  "Mableton, GA", "Marietta, GA", "Norcross, GA", "Powder Springs, GA",
  "Roswell, GA", "Sandy Springs, GA", "Suwanee, GA", "South Fulton, GA",
  "Villa Rica, GA", "Vinnings, GA"
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative bg-white pt-20">
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary">Start Your Project Today</h3>
          <p className="mt-4 text-gray-600">Request a free estimate or visit our showroom in Duluth.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          {/* Contact Form Section */}
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-white z-10">
            <h4 className="text-2xl font-bold text-primary mb-6">Send us a message</h4>
            
            <form 
                action="https://formsubmit.co/agsstonesandcabinets@gmail.com" 
                method="POST" 
                className="space-y-6"
            >
              <input type="hidden" name="_subject" value="New Lead from AGS Website!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
                  <input 
                    id="firstName"
                    name="firstName"
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                    placeholder="Jane" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
                  <input 
                    id="lastName"
                    name="lastName"
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                    placeholder="Doe" 
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone</label>
                    <input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                        placeholder="(404) 555-0123" 
                        required
                    />
                 </div>
                 <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400" 
                        placeholder="jane@example.com" 
                        required
                    />
                 </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Service Needed</label>
                <div className="relative">
                    <select 
                        id="service"
                        name="service"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none"
                    >
                        <option>Kitchen Remodeling</option>
                        <option>Countertops (Granite/Quartz)</option>
                        <option>Bathroom Vanity</option>
                        <option>Custom Cabinets</option>
                        <option>Outdoor Kitchen</option>
                        <option>Other / General Inquiry</option>
                    </select>
                  </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Project Details</label>
                <textarea 
                    id="details"
                    name="details"
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-gray-400 resize-none" 
                    placeholder="Tell us about your space, timeline, and any specific stones you are interested in..."
                ></textarea>
              </div>

              <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg text-blue-800 text-xs mb-2">
                 <Info size={16} className="shrink-0 mt-0.5" />
                 <p>We typically respond within 24 hours. For immediate assistance, please call us directly.</p>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Send size={20} /> Request Free Quote
              </button>
            </form>
          </div>

          {/* Interactive Map & Service Areas Section */}
          <div className="lg:w-1/2 flex flex-col bg-gray-50">
            
            {/* Map Container - Height optimized for desktop */}
            <div className="h-[300px] lg:h-[50%] relative w-full">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7479717757656!2d-84.17957488478635!3d34.03223198061213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59f0f9b0b0b0b%3A0x1b0b0b0b0b0b0b0b!2s4579%20Abbotts%20Bridge%20Rd%2C%20Duluth%2C%20GA%2030097!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'grayscale(0%) contrast(1.1)'}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="AGS Stones Service Area Map"
                ></iframe>
                
                {/* Floating Showroom Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Showroom</p>
                     <p className="font-bold text-primary flex items-center gap-1"><MapPin size={14} className="text-secondary" /> Duluth, GA</p>
                </div>
            </div>

            {/* Service Areas List */}
            <div className="flex-1 p-8 lg:p-10 bg-gray-100 border-t border-gray-200">
                <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <MapPin className="text-secondary" /> Areas We Serve
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-2">
                    {locations.map((loc, idx) => (
                        <div key={idx} className="flex items-center gap-2 group">
                            <MapPin size={14} className="text-secondary/60 group-hover:text-secondary shrink-0" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-primary group-hover:underline decoration-secondary underline-offset-4 decoration-2 transition-all cursor-default">
                                {loc}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                     <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Hours of Operation</p>
                        <p className="font-bold text-gray-800 text-sm">Mon-Fri: 8am - 6pm</p>
                     </div>
                     <a 
                        href="https://maps.google.com/?q=4579+Abbotts+Bridge+Rd,+Duluth,+GA+30097" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow hover:bg-gray-800 transition-colors"
                     >
                        <Navigation size={16} /> Get Directions
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