
import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const discountedPrice = product.discount && product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative h-full flex flex-col">
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl transition-colors pointer-events-none z-10"></div>
      
      <div className="relative overflow-hidden h-64 bg-gray-100 group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
           {product.isTrending && (
             <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
               HOT
             </div>
           )}
           {product.discount && product.discount > 0 && (
             <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
               -{product.discount}% OFF
             </div>
           )}
        </div>

        <div className="absolute bottom-3 left-3 z-20">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-md backdrop-blur-md bg-opacity-90">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-blue-600">${discountedPrice.toFixed(2)}</span>
            {product.discount && product.discount > 0 && (
               <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 h-10 overflow-hidden text-ellipsis line-clamp-2">
          {product.description}
        </p>

        <button 
          onClick={() => addToCart(product)}
          className="mt-auto w-full bg-gray-900 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
