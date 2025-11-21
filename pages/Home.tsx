
import React, { useState, useEffect } from 'react';
import { Page } from '../components/Navbar';
import { TESTIMONIALS } from '../constants';
import { getProducts } from '../services/db';
import { ProductCard } from '../components/ProductCard';
import { Category, Product } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  
  // Tab State
  const [activeTab, setActiveTab] = useState<Category>(Category.APPLE);

  // Category Images Map
  const categoryImages = {
    [Category.APPLE]: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    [Category.ANDROID]: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    [Category.HYBRID]: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    [Category.ACCESSORY]: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80'
  };

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

  // Auto Slide Testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
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

  // --- FILTERED DATA ---
  const recentProducts = [...products].reverse().slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  // Calculate visible testimonials for the carousel
  const visibleTestimonials = [
    TESTIMONIALS[testimonialIndex % TESTIMONIALS.length],
    TESTIMONIALS[(testimonialIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(testimonialIndex + 2) % TESTIMONIALS.length],
  ];

  const getProductsByCategory = (cat: Category) => products.filter(p => p.category === cat).slice(0, 4);
  const tabProducts = products.filter(p => p.category === activeTab).slice(0, 8); // Show up to 8 in tab view

  return (
    <div className="bg-white">
      {/* 1. Hero Section - Sliding Product (Mobile Responsive Fixed) */}
      <section className="relative min-h-[850px] lg:min-h-0 lg:h-[750px] overflow-hidden flex items-center bg-gray-50 py-16 lg:py-0">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-[0.03]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-blue-200/30 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Text Content - Order 2 on mobile, Order 1 on desktop */}
            <div className="text-center lg:text-left space-y-6 animate-fade-in-up order-2 lg:order-1">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold tracking-wider text-xs sm:text-sm border border-blue-200">
                NEW RELEASE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                {heroProducts[currentHero]?.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {heroProducts[currentHero]?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <button onClick={() => onNavigate('shop')} className="px-8 py-4 bg-gray-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105">
                  Shop Now
                </button>
                <button onClick={() => onNavigate('about')} className="px-8 py-4 bg-transparent border-2 border-gray-300 hover:border-gray-900 text-gray-900 font-bold rounded-lg transition-all">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Image Carousel - Order 1 on mobile, Order 2 on desktop */}
            <div className="relative h-[350px] sm:h-[450px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2 w-full">
              {heroProducts.map((prod, idx) => (
                <div 
                  key={prod.id}
                  className={`absolute transition-all duration-1000 ease-in-out transform w-full flex justify-center ${
                    idx === currentHero 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 translate-x-full scale-75'
                  }`}
                >
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-3xl object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="py-16 bg-white">
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
                  src={categoryImages[cat]} 
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

      {/* 3. "Wire Choice" (Why Choose Us / Trust Indicators) */}
      <section className="py-16 border-y border-gray-100 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
               <h3 className="text-3xl font-bold text-gray-900">Why Choose Chronos</h3>
               <p className="text-gray-500 mt-2">Experience the difference of premium service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On all worldwide orders over $100.</p>
               </div>
               <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Authenticity</h4>
                  <p className="text-sm text-gray-500">Guaranteed 100% genuine products.</p>
               </div>
               <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">24/7 Support</h4>
                  <p className="text-sm text-gray-500">Dedicated team available anytime.</p>
               </div>
               <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Secure Payment</h4>
                  <p className="text-sm text-gray-500">Encrypted for your safety.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Recent Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
             <div>
               <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Just In</span>
               <h3 className="text-3xl font-bold text-gray-900 mt-1">Recent Products</h3>
             </div>
             <button onClick={() => onNavigate('shop')} className="text-gray-500 hover:text-blue-600 font-medium transition-colors">View All →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Featured Collection</h3>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Hand-picked by our editors for their exceptional design and performance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trending Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">Trending Now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {trendingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
             ))}
          </div>
        </div>
      </section>

      {/* 7. Four Products in Each Category */}
      <div className="bg-gray-50 py-12 space-y-16">
        {[Category.APPLE, Category.ANDROID, Category.HYBRID, Category.ACCESSORY].map((cat) => (
          <section key={cat} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
               <h3 className="text-2xl font-bold text-gray-900">{cat}</h3>
               <button onClick={() => onNavigate('categories')} className="text-sm font-bold text-blue-600 hover:text-blue-800">
                 See More {cat}
               </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getProductsByCategory(cat).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 8. Tab-based Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Collections</h2>
              <div className="flex flex-wrap justify-center gap-4">
                 {[Category.APPLE, Category.ANDROID, Category.HYBRID, Category.ACCESSORY].map(cat => (
                   <button
                     key={cat}
                     onClick={() => setActiveTab(cat)}
                     className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                       activeTab === cat 
                         ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 animate-fade-in">
              {tabProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
           </div>
           
           <div className="flex justify-center">
              <button 
                onClick={() => onNavigate('shop')}
                className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
              >
                View Full Shop
              </button>
           </div>
        </div>
      </section>

      {/* 10. Deal of the Day */}
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

      {/* 11. Brands Marquee */}
      <section className="py-12 border-y border-gray-100 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 font-medium uppercase tracking-widest mb-8">Compatible with leading brands</p>
            <div className="flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap gap-8">
               <span className="text-2xl font-black text-gray-800">APPLE</span>
               <span className="text-2xl font-black text-gray-800">SAMSUNG</span>
               <span className="text-2xl font-black text-gray-800">GOOGLE</span>
               <span className="text-2xl font-black text-gray-800">GARMIN</span>
               <span className="text-2xl font-black text-gray-800">FITBIT</span>
            </div>
         </div>
      </section>

      {/* 12. Testimonials - Sliding 3 cards */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-blue-600 font-bold uppercase tracking-wider mb-2">Testimonials</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Trusted by Thousands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {visibleTestimonials.map((item, i) => (
                <div key={`${item.id}-${i}`} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full animate-fade-in">
                   <div className="relative mb-6">
                     <img 
                       src={item.avatar} 
                       alt={item.name}
                       className="w-20 h-20 rounded-full border-4 border-blue-50 object-cover shadow-sm"
                     />
                     <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     </div>
                   </div>
                   <p className="text-gray-600 italic mb-6 flex-1 leading-relaxed">
                     "{item.text}"
                   </p>
                   <div>
                      <h4 className="text-gray-900 font-bold text-lg">{item.name}</h4>
                      <span className="text-blue-500 text-sm font-medium uppercase tracking-wide">{item.role}</span>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-10">
             {TESTIMONIALS.map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => setTestimonialIndex(idx)}
                 className={`h-2 rounded-full transition-all duration-300 ${
                   idx === testimonialIndex % TESTIMONIALS.length ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                 }`}
               />
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};
