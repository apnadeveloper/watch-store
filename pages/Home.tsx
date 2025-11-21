
import React, { useState, useEffect } from 'react';
import { Page } from '../components/Navbar';
import { TESTIMONIALS, BANNERS } from '../constants';
import { getProducts } from '../services/db';
import { ProductCard } from '../components/ProductCard';
import { Category, Product } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    getProducts().then(setProducts);
    
    // Timer Interval
    const timer = setInterval(() => {
       setTimeLeft(prev => {
          if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
          if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
          return { hours: 24, minutes: 0, seconds: 0 }; // Reset
       });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const heroProducts = products.length > 0 ? products.slice(0, 3) : [];
  
  useEffect(() => {
    if (heroProducts.length > 1) {
      const timer = setInterval(() => {
        setCurrentHero((prev) => (prev + 1) % heroProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroProducts.length]);

  if (products.length === 0) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;

  // --- SECTION DATA ---
  const latestProducts = products.slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured || p.price > 500).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="bg-white">
      {/* 1. Hero Section - Sliding Product */}
      <section className="relative h-[600px] sm:h-[750px] overflow-hidden flex items-center bg-gray-50">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-[0.03]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6 animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold tracking-wider text-sm border border-blue-200">
                NEW RELEASE
              </span>
              <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 leading-tight">
                {heroProducts[currentHero]?.name}
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                {heroProducts[currentHero]?.description}
              </p>
              <div className="flex gap-4 pt-4">
                <button onClick={() => onNavigate('shop')} className="px-8 py-4 bg-gray-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105">
                  Shop Now
                </button>
                <button onClick={() => onNavigate('about')} className="px-8 py-4 bg-transparent border-2 border-gray-300 hover:border-gray-900 text-gray-900 font-bold rounded-lg transition-all">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
              {heroProducts.map((prod, idx) => (
                <div 
                  key={prod.id}
                  className={`absolute transition-all duration-1000 ease-in-out transform ${
                    idx === currentHero 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 translate-x-full scale-75'
                  }`}
                >
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="max-w-[300px] sm:max-w-[450px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-3xl object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators / Features */}
      <section className="py-12 border-b border-gray-100 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900">Free Shipping</h4>
                     <p className="text-sm text-gray-500">On all orders over $100</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900">Authenticity</h4>
                     <p className="text-sm text-gray-500">100% Genuine Products</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900">24/7 Support</h4>
                     <p className="text-sm text-gray-500">Dedicated support team</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900">Secure Payment</h4>
                     <p className="text-sm text-gray-500">Encrypted transactions</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Shop by Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[Category.APPLE, Category.ANDROID, Category.HYBRID, Category.ACCESSORY].map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => onNavigate('categories')}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                <img 
                  src={`https://picsum.photos/400/600?random=${10+idx}`} 
                  alt={cat} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <h4 className="text-xl font-bold text-white">{cat}</h4>
                  <span className="inline-flex items-center text-sm text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explore Collection →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Deal of the Day Section (New) */}
      <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
               <span className="text-blue-400 font-bold tracking-widest uppercase mb-2 block">Limited Time Offer</span>
               <h2 className="text-4xl md:text-6xl font-black mb-4">DEAL OF THE DAY</h2>
               <p className="text-gray-300 text-lg mb-8 max-w-md">Get 20% off the Alpine Loop Pro. Built for endurance athletes and outdoor adventurers.</p>
               
               {/* Timer */}
               <div className="flex justify-center md:justify-start gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-20 text-center border border-white/20">
                     <div className="text-2xl font-bold">{timeLeft.hours}</div>
                     <div className="text-xs text-gray-400 uppercase">Hours</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-20 text-center border border-white/20">
                     <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                     <div className="text-xs text-gray-400 uppercase">Mins</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-20 text-center border border-white/20">
                     <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                     <div className="text-xs text-gray-400 uppercase">Secs</div>
                  </div>
               </div>
               
               <button onClick={() => onNavigate('shop')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all">
                  Grab the Deal
               </button>
            </div>
            <div className="flex-1">
               <img src="https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80" alt="Deal" className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/10" />
            </div>
         </div>
      </section>

      {/* 5. Recent Products (Formerly Latest Drops) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
             <div>
               <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Fresh Arrivals</span>
               <h3 className="text-3xl font-bold text-gray-900 mt-1">Recent Products</h3>
             </div>
             <button onClick={() => onNavigate('shop')} className="text-gray-500 hover:text-blue-600 font-medium transition-colors">View All →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Featured Collection</h3>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Hand-picked by our editors for their exceptional design, performance, and value.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Brands Marquee (New) */}
      <section className="py-12 border-y border-gray-100 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 font-medium uppercase tracking-widest mb-8">Compatible with leading brands</p>
            <div className="flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap gap-8">
               {/* Simple text placeholders or SVGs for brands */}
               <span className="text-2xl font-black text-gray-800">APPLE</span>
               <span className="text-2xl font-black text-gray-800">SAMSUNG</span>
               <span className="text-2xl font-black text-gray-800">GOOGLE</span>
               <span className="text-2xl font-black text-gray-800">GARMIN</span>
               <span className="text-2xl font-black text-gray-800">FITBIT</span>
            </div>
         </div>
      </section>

      {/* 8. Trending Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center pb-6">Trending Now</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {trendingProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                   <div className="w-full sm:w-1/2 h-64 sm:h-auto relative overflow-hidden">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">HOT</div>
                   </div>
                   <div className="p-8 flex flex-col justify-center w-full sm:w-1/2 bg-gray-50 group-hover:bg-white transition-colors">
                     <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">{product.category}</div>
                     <h4 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h4>
                     <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{product.description}</p>
                     <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                           <span className="text-2xl font-bold text-gray-900">${product.discount ? (product.price * (1 - product.discount/100)).toFixed(2) : product.price}</span>
                           {product.discount && product.discount > 0 && <span className="text-sm text-gray-400 line-through">${product.price}</span>}
                        </div>
                        <button onClick={() => onNavigate('shop')} className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-1">
                          Buy Now <span className="text-lg">→</span>
                        </button>
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. Banners */}
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BANNERS.map(banner => (
                <div key={banner.id} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-md" onClick={() => onNavigate('shop')}>
                   <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col justify-center items-center text-center p-4">
                      <h4 className="text-2xl font-bold text-white mb-2">{banner.title}</h4>
                      <p className="text-gray-200 mb-4 font-medium">{banner.subtitle}</p>
                      <span className="inline-block px-6 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white transition-colors shadow-lg">
                        Discover
                      </span>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-blue-600 font-bold uppercase tracking-wider mb-2">Testimonials</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Trusted by Thousands</h2>
          
          <div className="relative bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-xl">
             <div className="mt-4">
                <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed font-light">
                  "{TESTIMONIALS[currentTestimonial].text}"
                </p>
                <div className="flex flex-col items-center">
                   <img 
                    src={TESTIMONIALS[currentTestimonial].avatar} 
                    alt={TESTIMONIALS[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 mb-3 object-cover"
                   />
                   <h4 className="text-gray-900 font-bold text-lg">{TESTIMONIALS[currentTestimonial].name}</h4>
                   <span className="text-gray-500 text-sm">{TESTIMONIALS[currentTestimonial].role}</span>
                </div>
             </div>

             <div className="flex justify-center gap-2 mt-8">
                {TESTIMONIALS.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                  />
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
