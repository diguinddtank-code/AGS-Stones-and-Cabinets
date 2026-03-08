'use client'; // Adicionado caso use Next.js

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import ContactForm from './ContactForm';

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
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-white z-10 flex flex-col justify-center">
            <h4 className="text-2xl font-bold text-primary mb-6">Send us a message</h4>
            <ContactForm />
          </div>

          {/* Interactive Map & Service Areas Section */}
          <div className="lg:w-1/2 flex flex-col bg-gray-50">
            
            {/* Map Container */}
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
                
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Showroom</p>
                     <p className="font-bold text-primary flex items-center gap-1"><MapPin size={14} className="text-secondary" /> Duluth, GA</p>
                </div>
            </div>

            {/* Service Areas List */}
            <div className="flex-1 p-8 lg:p-10 bg-gray-100 border-t border-gray-200">
                <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <MapPin className="text-secondary" /> Granite Countertops Near You
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