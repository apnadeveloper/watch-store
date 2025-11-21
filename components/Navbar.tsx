
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getCategories } from '../services/db';

export type Page = 'home' | 'shop' | 'categories' | 'about' | 'contact' | 'checkout' | 'orders' | 'success' | 'admin' | 'privacy' | 'terms';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSelectCategory }) => {
  const { cart, setIsOpen } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    // Optional: Poll for new categories periodically or just fetch on mount
    const interval = setInterval(() => {
       getCategories().then(setCategories);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    onNavigate('shop');
    setIsMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  const NavLink = ({ page, label }: { page: Page, label: string }) => (
    <button 
      onClick={() => {
        onNavigate(page);
        setIsMenuOpen(false);
      }}
      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-full text-base font-bold transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:border-blue-100"
    >
      {label}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer gap-3 group" onClick={() => onNavigate('home')}>
             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-blue-500/30 shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
               <span className="text-white font-black text-2xl">C</span>
            </div>
            <span className="text-3xl font-extrabold text-gray-900 tracking-tighter">
              CHRONOS
            </span>
          </div>
          
          {/* Center - Navigation (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <NavLink page="home" label="Home" />
            <NavLink page="shop" label="Shop" />
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-full text-base font-bold transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:border-blue-100 flex items-center gap-1"
                onClick={() => onNavigate('categories')}
              >
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                <div className="py-2">
                  <button 
                     onClick={() => handleCategoryClick('All')}
                     className="block w-full text-left px-6 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-4 border-transparent hover:border-blue-600"
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="block w-full text-left px-6 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-4 border-transparent hover:border-blue-600"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <NavLink page="about" label="About" />
            <NavLink page="contact" label="Contact" />
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-3">
             {/* User Panel Icon */}
             <button 
              onClick={() => onNavigate('orders')}
              className="p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all"
              title="My Orders"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-md border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Admin Icon (Desktop) */}
            <button 
              onClick={() => onNavigate('admin')}
              className="hidden md:block px-4 py-2 text-sm font-bold text-gray-600 border-2 border-gray-200 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
              title="Admin Panel"
            >
              Admin
            </button>

             {/* Mobile Menu Button */}
             <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 p-2">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 mt-2">
            <NavLink page="home" label="Home" />
            <NavLink page="shop" label="Shop" />
            
            {/* Mobile Categories */}
            <div className="space-y-1">
              <button 
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-full text-base font-bold transition-all flex justify-between items-center"
              >
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoryDropdownOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <button 
                     onClick={() => handleCategoryClick('All')}
                     className="block w-full text-left px-5 py-3 text-base font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="block w-full text-left px-5 py-3 text-base font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink page="about" label="About" />
            <NavLink page="contact" label="Contact" />
            <button 
               onClick={() => {
                 onNavigate('admin');
                 setIsMenuOpen(false);
               }}
               className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-full text-base font-bold transition-all"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
