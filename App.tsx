
import React, { useState, useEffect } from 'react';
import { Navbar, Page } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider, useCart } from './context/CartContext';
import { Order } from './types';
import { AIAssistant } from './components/AIAssistant';
import { saveOrder, getOrders } from './services/db';

// Pages
import { HomePage } from './pages/Home';
import { ShopPage } from './pages/Shop';
import { AdminPage } from './pages/Admin';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './pages/Static';

const CheckoutPage: React.FC<{ onCancel: () => void; onSuccess: (order: Order) => void }> = ({ onCancel, onSuccess }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const order = await saveOrder(formData, cart, cartTotal);
      clearCart();
      onSuccess(order);
    } catch (error) {
      alert("Something went wrong processing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen bg-white">
      <button onClick={onCancel} className="mb-6 text-gray-500 hover:text-blue-600 flex items-center gap-2 transition-colors font-medium">
        ← Back to Shop
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Field at Top */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
               <label className="block text-sm font-bold text-blue-900 mb-1">Mobile Phone Number</label>
               <input required type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white border border-blue-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input required type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
              </div>
            </div>

            {/* Payment Section */}
            <div className="pt-6">
               <h3 className="text-lg font-bold text-gray-900 mb-3">Payment Method</h3>
               <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed opacity-80">
                  <input type="radio" checked readOnly className="w-5 h-5 text-blue-600" />
                  <span className="ml-3 font-medium text-gray-700">Cash on Delivery (COD)</span>
               </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg flex justify-center items-center transition-all"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                `Place Order - $${cartTotal.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="text-lg text-gray-900 font-bold">Total</span>
            <span className="text-2xl text-blue-600 font-bold">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
   const [orders, setOrders] = useState<Order[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     getOrders().then(data => {
       // In a real app, filter by user ID. Here we show all for demo purposes or simulate user
       setOrders(data);
       setLoading(false);
     });
   }, []);
 
   return (
     <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen bg-white">
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
           <button onClick={onBack} className="text-blue-600 font-medium hover:underline">Back to Store</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar */}
           <div className="bg-gray-50 p-6 rounded-xl h-fit">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">U</div>
                 <div>
                    <div className="font-bold text-gray-900">Demo User</div>
                    <div className="text-xs text-gray-500">user@example.com</div>
                 </div>
              </div>
              <ul className="space-y-2 text-sm">
                 <li className="bg-white shadow-sm rounded-lg p-3 font-medium text-blue-600 border-l-4 border-blue-600">My Orders</li>
                 <li className="p-3 text-gray-500 hover:text-gray-900 cursor-pointer">Account Settings</li>
                 <li className="p-3 text-gray-500 hover:text-gray-900 cursor-pointer">Addresses</li>
                 <li className="p-3 text-gray-500 hover:text-gray-900 cursor-pointer">Logout</li>
              </ul>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
              
              {loading ? (
                <div className="text-center text-gray-500 py-12">Loading your orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center text-gray-500 bg-gray-50 p-12 rounded-lg border border-gray-200">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                         <div className="flex gap-6">
                            <div>
                               <span className="text-xs text-gray-500 block uppercase tracking-wider">Order Placed</span>
                               <span className="text-sm font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div>
                               <span className="text-xs text-gray-500 block uppercase tracking-wider">Total</span>
                               <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                            </div>
                            <div>
                               <span className="text-xs text-gray-500 block uppercase tracking-wider">Order #</span>
                               <span className="text-sm font-medium text-gray-900 font-mono">{order.id}</span>
                            </div>
                         </div>
                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                             order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                             order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                             order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                             'bg-gray-100 text-gray-600 border-gray-200'
                           }`}>
                             {order.status}
                           </span>
                      </div>
                      <div className="p-6">
                         <div className="space-y-3">
                           {order.items.map(item => (
                             <div key={item.id} className="flex justify-between items-center">
                               <div className="flex items-center gap-4">
                                  <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-md bg-gray-100" />
                                  <div>
                                     <div className="font-medium text-gray-900">{item.name}</div>
                                     <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                  </div>
                               </div>
                               <div className="font-medium text-gray-900">${item.price.toFixed(2)}</div>
                             </div>
                           ))}
                         </div>
                         <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4">
                            <button className="text-blue-600 font-medium text-sm hover:underline">View Invoice</button>
                            <button className="text-blue-600 font-medium text-sm hover:underline">Track Shipment</button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>
     </div>
   )
 }

const AppContent: React.FC = () => {
  const [view, setView] = useState<Page>('home');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 flex flex-col">
      {/* Navbar is sticky, so it stays on top */}
      <Navbar 
        onNavigate={(page) => {
          setView(page);
          if (page === 'home' || page === 'shop') {
             // Optional: reset category when navigating via main links, unless it was a category selection
          }
        }}
        onSelectCategory={(cat) => {
           setSelectedCategory(cat);
           setView('shop');
        }}
      />
      
      <main className="flex-grow">
        {view === 'home' && <HomePage onNavigate={setView} />}
        {view === 'shop' && <ShopPage initialCategory={selectedCategory} />}
        {view === 'categories' && <ShopPage initialCategory="All" />}
        {view === 'about' && <AboutPage />}
        {view === 'contact' && <ContactPage />}
        {view === 'privacy' && <PrivacyPage />}
        {view === 'terms' && <TermsPage />}
        {view === 'admin' && <AdminPage />}
        
        {view === 'checkout' && (
          <CheckoutPage 
            onCancel={() => setView('shop')} 
            onSuccess={(order) => {
              setLastOrder(order);
              setView('success');
            }} 
          />
        )}

        {view === 'orders' && <UserDashboard onBack={() => setView('home')} />}

        {view === 'success' && lastOrder && (
          <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-2xl text-center border border-green-200 shadow-xl animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 mb-6">Thank you {lastOrder.customer.fullName}. Your order <span className="text-blue-600 font-mono">#{lastOrder.id}</span> has been placed successfully.</p>
            <div className="space-y-3">
              <button onClick={() => setView('orders')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg transition-colors font-medium">
                View Order Status
              </button>
              <button onClick={() => setView('home')} className="w-full bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors font-medium shadow-md">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>

      {view !== 'admin' && <Footer onNavigate={setView} />}
      
      <CartDrawer onCheckout={() => setView('checkout')} />
      <AIAssistant />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
