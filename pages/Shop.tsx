
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { getProducts, getCategories } from '../services/db';
import { Category, Product } from '../types';

interface ShopPageProps {
  initialCategory?: string | 'All';
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory = 'All' }) => {
  const [activeCategory, setActiveCategory] = useState<string | 'All'>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const p = await getProducts();
      const c = await getCategories();
      setProducts(p);
      setCategories(c);
      setLoading(false);
    };
    load();
  }, []);

  const filteredProducts = products.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return catMatch && priceMatch;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">Loading shop...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white min-h-screen">
       <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-8">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-4 text-lg">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setActiveCategory('All')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeCategory === 'All' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
             </div>

             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-4 text-lg">Price Range</h3>
                <div className="px-2">
                   <input 
                    type="range" 
                    min="0" max="1000" step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   />
                   <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                      <span>$0</span>
                      <span>${priceRange[1]}+</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === 'All' ? 'All Collections' : activeCategory}
                </h2>
                <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                  Showing {filteredProducts.length} results
                </span>
             </div>

             {filteredProducts.length === 0 ? (
               <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
                 <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                 <button onClick={() => {setActiveCategory('All'); setPriceRange([0,1000])}} className="mt-4 text-blue-600 underline">Clear Filters</button>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredProducts.map(product => (
                   <ProductCard key={product.id} product={product} />
                 ))}
               </div>
             )}
          </div>
       </div>
    </div>
  );
};
