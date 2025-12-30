import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
                 <img 
                    src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
                    alt="AGS Stones & Cabinets Logo" 
                    className="h-20 w-auto mb-4 brightness-0 invert"
                  />
                  <p className="text-sm">
                      Transforming homes in Metro Atlanta with luxury stone and cabinetry.
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    <p className="font-bold text-gray-400 mb-1">Serving Areas:</p>
                    <p>Atlanta, Duluth, Alpharetta, Johns Creek, Roswell, Sandy Springs</p>
                  </div>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#services" className="hover:text-secondary" title="View our stone fabrication services">Services</a></li>
                    <li><a href="#visualizer" className="hover:text-secondary" title="Try our kitchen visualizer">Design Visualizer</a></li>
                    <li><a href="#showroom" className="hover:text-secondary" title="Visit our Duluth Showroom">Showroom</a></li>
                    <li><a href="#contact" className="hover:text-secondary" title="Contact AGS Stones">Contact</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                    <li>Granite Countertops</li>
                    <li>Quartz Installation</li>
                    <li>Kitchen Remodeling</li>
                    <li>Custom Cabinets</li>
                </ul>
            </div>

             <div>
                <h4 className="text-white font-bold mb-4">Contact Us</h4>
                <address className="not-italic text-sm space-y-2">
                    <p className="text-white font-medium">AGS Stones & Cabinets</p>
                    <p>4579 Abbotts Bridge Rd Suite -10</p>
                    <p>Duluth, GA 30097</p>
                </address>
                <div className="mt-4 space-y-2">
                    <a href="mailto:agsstonesandcabinets@gmail.com" className="block text-sm hover:text-secondary">agsstonesandcabinets@gmail.com</a>
                    <a href="tel:4049524534" className="block text-sm hover:text-secondary font-bold text-white">(404) 952-4534</a>
                </div>
            </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} AGS Stones and Cabinets. All rights reserved.</p>
            <p className="text-xs text-gray-600">Web Design for Stone Fabricators</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;