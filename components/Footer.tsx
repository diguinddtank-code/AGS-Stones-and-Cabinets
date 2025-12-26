import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
                 <img 
                    src="https://agsstonefabricators.com/wp-content/uploads/2024/05/Design-sem-nome-16.png" 
                    alt="AGS Logo" 
                    className="h-20 w-auto mb-4 brightness-0 invert"
                  />
                  <p className="text-sm">
                      Transforming homes in Metro Atlanta with luxury stone and cabinetry.
                  </p>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#services" className="hover:text-secondary">Services</a></li>
                    <li><a href="#visualizer" className="hover:text-secondary">Design Visualizer</a></li>
                    <li><a href="#showroom" className="hover:text-secondary">Showroom</a></li>
                    <li><a href="#contact" className="hover:text-secondary">Contact</a></li>
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
                <h4 className="text-white font-bold mb-4">Connect</h4>
                <a href="mailto:agsstonesandcabinets@gmail.com" className="block text-sm hover:text-secondary mb-2">agsstonesandcabinets@gmail.com</a>
                <a href="tel:4049524534" className="block text-sm hover:text-secondary">(404) 952-4534</a>
            </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} AGS Stones and Cabinets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;