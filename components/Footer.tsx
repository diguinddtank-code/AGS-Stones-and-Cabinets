import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-400 py-12 border-t border-gray-800 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
                 <img 
                    src="https://i.imgur.com/B0ZaBpN.png" 
                    alt="AGS Stones & Cabinets Logo" 
                    className="h-20 w-auto mb-4 brightness-0 invert"
                  />
                  <p className="mb-4">
                      AGS Stones & Cabinets: Your premier destination for luxury stone surfaces and custom cabinetry in Georgia.
                  </p>
                  <div className="text-xs text-gray-500">
                    <p className="font-bold text-gray-400 mb-1">Service Areas:</p>
                    <p>Atlanta, Duluth, Alpharetta, Johns Creek, Roswell, Suwanee, Sandy Springs, Norcross, Lawrenceville, Cumming, Milton.</p>
                  </div>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Navigation</h4>
                <ul className="space-y-2">
                    <li><a href="#services" className="hover:text-secondary transition-colors" title="Stone & Cabinet Services">Our Services</a></li>
                    <li><a href="#visualizer" className="hover:text-secondary transition-colors" title="Kitchen Visualizer Tool">Design Visualizer</a></li>
                    <li><a href="#showroom" className="hover:text-secondary transition-colors" title="Visit Duluth Showroom">Showroom Location</a></li>
                    <li><a href="#contact" className="hover:text-secondary transition-colors" title="Get a Quote">Free Estimate</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Core Services</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-secondary">Granite Countertops</a></li>
                    <li><a href="#" className="hover:text-secondary">Quartz Installation</a></li>
                    <li><a href="#" className="hover:text-secondary">Marble Fabrication</a></li>
                    <li><a href="#" className="hover:text-secondary">Kitchen Remodeling</a></li>
                    <li><a href="#" className="hover:text-secondary">Bathroom Renovations</a></li>
                    <li><a href="#" className="hover:text-secondary">Custom Cabinets</a></li>
                </ul>
            </div>

             <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact</h4>
                <address className="not-italic space-y-3">
                    <div className="flex gap-2">
                         <span className="text-secondary font-bold">HQ:</span>
                         <span>
                             4579 Abbotts Bridge Rd Suite -10<br/>
                             Duluth, GA 30097
                         </span>
                    </div>
                    <div className="flex gap-2">
                         <span className="text-secondary font-bold">Ph:</span>
                         <a href="tel:4049524534" className="hover:text-white transition-colors">(404) 952-4534</a>
                    </div>
                    <div className="flex gap-2">
                         <span className="text-secondary font-bold">Em:</span>
                         <a href="mailto:agsstonesandcabinets@gmail.com" className="hover:text-white transition-colors">agsstonesandcabinets@gmail.com</a>
                    </div>
                </address>
            </div>
        </div>

        {/* 
            SEO KEYWORD DIRECTORY 
            This section semantically links the high-value keywords to the page content.
            This drastically improves Ad Relevance and Quality Score for specific search terms.
        */}
        <div className="border-t border-gray-800 pt-8 mb-8">
            <h5 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Popular Searches & Services Directory</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-2 gap-x-4 text-[11px] text-gray-600">
                {/* Kitchen & Cabinets */}
                <span className="hover:text-gray-400 cursor-default">Kitchen cabinet makers</span>
                <span className="hover:text-gray-400 cursor-default">Custom cabinets near me</span>
                <span className="hover:text-gray-400 cursor-default">Kitchen remodel near me</span>
                <span className="hover:text-gray-400 cursor-default">Cabinet installation</span>
                <span className="hover:text-gray-400 cursor-default">Kitchen cabinet shop</span>
                
                {/* Bathroom */}
                <span className="hover:text-gray-400 cursor-default">Bathroom renovation services</span>
                <span className="hover:text-gray-400 cursor-default">Bathroom remodel near me</span>
                <span className="hover:text-gray-400 cursor-default">Small bath remodel</span>
                <span className="hover:text-gray-400 cursor-default">Bathroom vanity cabinets</span>
                <span className="hover:text-gray-400 cursor-default">Shower remodeling</span>

                {/* Stone & Fabricators */}
                <span className="hover:text-gray-400 cursor-default">Granite fabricator near me</span>
                <span className="hover:text-gray-400 cursor-default">Quartz fabricator near me</span>
                <span className="hover:text-gray-400 cursor-default">Stone countertop installation</span>
                <span className="hover:text-gray-400 cursor-default">Countertop installers near me</span>
                <span className="hover:text-gray-400 cursor-default">Granite countertops Atlanta</span>

                {/* Showroom & Location */}
                <span className="hover:text-gray-400 cursor-default">Kitchen and bath showrooms</span>
                <span className="hover:text-gray-400 cursor-default">Bathroom showroom</span>
                <span className="hover:text-gray-400 cursor-default">Cabinets nearby</span>
                <span className="hover:text-gray-400 cursor-default">Countertops Duluth GA</span>
                <span className="hover:text-gray-400 cursor-default">Remodel your bathroom</span>
            </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} AGS Stones and Cabinets. All rights reserved.</p>
            <p className="text-gray-600">
                Atlanta's trusted Granite, Quartz, and Cabinet specialists.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;