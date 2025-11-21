
import React from 'react';
import { Page } from './Navbar';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CHRONOS</span>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-gray-500">
              Defining the future of wearable technology. Premium smartwatches for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <span className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm">FB</span>
              <span className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all cursor-pointer shadow-sm">TW</span>
              <span className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all cursor-pointer shadow-sm">IG</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('shop')} className="hover:text-blue-600 transition-colors">All Products</button></li>
              <li><button onClick={() => onNavigate('categories')} className="hover:text-blue-600 transition-colors">Apple Compatible</button></li>
              <li><button onClick={() => onNavigate('categories')} className="hover:text-blue-600 transition-colors">Android Compatible</button></li>
              <li><button onClick={() => onNavigate('categories')} className="hover:text-blue-600 transition-colors">Accessories</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-bold mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-600 transition-colors">Contact</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-blue-600 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-blue-600 transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6">Stay Updated</h3>
            <p className="text-sm mb-4 text-gray-500">Subscribe for the latest drops and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 Chronos Smartwear. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <span className="text-gray-500">Secure Payment</span>
             <div className="flex gap-2">
               <div className="w-8 h-5 bg-gray-200 rounded"></div>
               <div className="w-8 h-5 bg-gray-200 rounded"></div>
               <div className="w-8 h-5 bg-gray-200 rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
