
import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, getProducts, addProduct, updateProduct, deleteProduct, getCategories, addCategory, deleteCategory, getDashboardStats, DashboardStats } from '../services/db';
import { Order, OrderStatus, Product, Category } from '../types';

export const AdminPage: React.FC = () => {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // --- ADMIN PANEL STATE ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'categories'>('dashboard');
  const [loading, setLoading] = useState(true);

  // Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([]);

  // Product Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', price: 0, discount: 0, category: Category.APPLE, image: '', description: '', features: []
  });
  const [featureInput, setFeatureInput] = useState('');

  // Category Form State
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      // Polling for simulated real-time updates and notifications
      const interval = setInterval(async () => {
        const currentOrders = await getOrders();
        setOrders(prev => {
          if (currentOrders.length > prev.length && prev.length > 0) {
            // Simple check: if count increased, assume new order
            showNotification(`New Order Received! ID: ${currentOrders[0].id}`);
          }
          return currentOrders;
        });
        if (activeTab === 'dashboard') {
           getDashboardStats().then(setStats);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab, isAuthenticated]);

  const showNotification = (text: string) => {
     const id = Date.now();
     setNotifications(prev => [...prev, { id, text }]);
     setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
     }, 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'dashboard') {
      const data = await getDashboardStats();
      setStats(data);
    } else if (activeTab === 'orders') {
      const data = await getOrders();
      setOrders(data);
    } else if (activeTab === 'products') {
      const data = await getProducts();
      const cats = await getCategories();
      setProducts(data);
      setCategories(cats);
    } else if (activeTab === 'categories') {
      const data = await getCategories();
      setCategories(data);
    }
    setLoading(false);
  };

  // --- AUTH HANDLERS ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // --- ORDER HANDLERS ---
  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    fetchData();
  };

  // --- PRODUCT HANDLERS ---
  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({ ...product });
      setFeatureInput(product.features.join(', '));
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '', price: 0, discount: 0, category: categories[0] as Category || Category.APPLE, image: '', description: '', features: []
      });
      setFeatureInput('');
    }
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const features = featureInput.split(',').map(f => f.trim()).filter(f => f.length > 0);
    const productData = {
      ...productForm,
      features,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
    } as Product;

    if (editingProduct) {
      await updateProduct(productData);
    } else {
      await addProduct(productData);
    }
    setShowProductModal(false);
    fetchData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      fetchData();
    }
  };

  // --- CATEGORY HANDLERS ---
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      await addCategory(newCategory.trim());
      setNewCategory('');
      fetchData();
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    if (confirm(`Delete category "${cat}"?`)) {
      await deleteCategory(cat);
      fetchData();
    }
  };

  // --- RENDER LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-white font-black text-3xl">C</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 text-center border border-red-100 font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-shadow focus:shadow-md"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-shadow focus:shadow-md"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 border border-blue-100">
               <strong>Demo Credentials:</strong><br/>
               Username: admin<br/>
               Password: admin123
            </div>

            <button 
              type="submit" 
              className="w-full text-white bg-gray-900 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-3.5 text-center transition-all duration-300 shadow-lg"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD IF AUTHENTICATED ---
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row">
      
      {/* Notification Toast */}
      <div className="fixed top-24 right-6 z-50 space-y-2">
        {notifications.map(n => (
          <div key={n.id} className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-up border-l-4 border-blue-500">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             {n.text}
          </div>
        ))}
      </div>

      {/* Sidebar - Dark Theme */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
         <div className="p-6 flex items-center gap-2 border-b border-slate-800">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
               <span className="text-white font-bold">C</span>
            </div>
            <div>
               <h1 className="font-bold tracking-wide">ADMIN</h1>
               <p className="text-xs text-slate-400">Handyman Panel</p>
            </div>
         </div>
         
         <div className="flex-1 p-4 space-y-2">
            {[
               { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
               { id: 'orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
               { id: 'products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
               { id: 'categories', label: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 011 12V7a4 4 0 014-4z' },
            ].map((tab) => (
               <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
               >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
               {tab.label}
               </button>
            ))}
         </div>
         <div className="p-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500">v2.0.0</span>
            <button onClick={() => setIsAuthenticated(false)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
           <span className="font-bold">Admin Panel</span>
        </div>

        {/* Content Scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-end mb-2">
                 <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
                 <span className="text-sm text-slate-500">Last updated: Just now</span>
              </div>
              
              {loading || !stats ? (
                <div className="text-gray-500">Loading stats...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                       <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-2">Total Revenue</div>
                    <div className="text-3xl font-bold text-slate-900">${stats.totalRevenue.toFixed(2)}</div>
                    <div className="mt-4 text-xs text-green-500 font-bold">+12% from last week</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                       <svg className="w-20 h-20 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-2">Total Orders</div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalOrders}</div>
                    <div className="mt-4 text-xs text-purple-500 font-bold">Pending Processing</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                       <svg className="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-2">Avg. Order Value</div>
                    <div className="text-3xl font-bold text-slate-900">${stats.avgOrderValue.toFixed(2)}</div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                       <svg className="w-20 h-20 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-2">Inventory Alert</div>
                    <div className="text-3xl font-bold text-orange-600">{stats.lowStockCount}</div>
                    <div className="mt-4 text-xs text-gray-400">Items needing restock</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Order Management</h2>
              {loading ? (
                 <div className="text-center py-8">Loading...</div>
              ) : orders.length === 0 ? (
                 <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">No orders found.</div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-blue-600 font-medium">{order.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{order.customer.fullName}</div>
                            <div className="text-xs text-slate-500">{order.customer.email}</div>
                            <div className="text-xs text-slate-500">{order.customer.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${
                              order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                              order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              className="bg-white border border-gray-300 text-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer hover:border-blue-400"
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Product Inventory</h2>
                <button 
                  onClick={() => handleOpenProductModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Product
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                         <th className="px-6 py-4">Product</th>
                         <th className="px-6 py-4">Category</th>
                         <th className="px-6 py-4">Price</th>
                         <th className="px-6 py-4">Discount</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100 border border-gray-200" />
                              <div>
                                <div className="font-medium text-slate-900">{product.name}</div>
                                <div className="text-xs text-slate-500 truncate max-w-[200px]">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">${product.price}</td>
                          <td className="px-6 py-4">
                            {product.discount ? (
                              <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">
                                {product.discount}% OFF
                              </span>
                            ) : <span className="text-slate-400">-</span>}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button 
                              onClick={() => handleOpenProductModal(product)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 font-medium text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
             <div className="animate-fade-in max-w-2xl">
               <h2 className="text-2xl font-bold mb-6 text-slate-900">Category Management</h2>
               
               <form onSubmit={handleAddCategory} className="flex gap-3 mb-8">
                 <input 
                   type="text" 
                   placeholder="New Category Name" 
                   className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                   value={newCategory}
                   onChange={(e) => setNewCategory(e.target.value)}
                 />
                 <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium shadow-lg">
                   Add
                 </button>
               </form>

               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Category Name</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {categories.map(cat => (
                        <tr key={cat} className="hover:bg-slate-50">
                           <td className="px-6 py-4 text-slate-900 font-medium">{cat}</td>
                           <td className="px-6 py-4 text-right">
                             <button 
                               onClick={() => handleDeleteCategory(cat)}
                               className="text-red-600 hover:text-red-800"
                             >
                               Delete
                             </button>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
             </div>
          )}

        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
             <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
               <h3 className="text-xl font-bold text-slate-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
               <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
             </div>
             <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input required type="text" className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input required type="number" min="0" className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={productForm.price} onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value)})} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value as any})}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input type="number" min="0" max="100" className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={productForm.discount} onChange={e => setProductForm({...productForm, discount: parseFloat(e.target.value)})} />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                   <input required type="text" className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required rows={3} className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                  <input type="text" className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Waterproof, GPS, 24h Battery..." />
                </div>
                
                <div className="flex items-center gap-6 pt-2 bg-slate-50 p-3 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={productForm.isTrending} onChange={e => setProductForm({...productForm, isTrending: e.target.checked})} className="w-4 h-4 text-blue-600 rounded bg-white border-gray-300" />
                    <span className="text-sm font-medium text-gray-700">Trending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={productForm.isFeatured} onChange={e => setProductForm({...productForm, isFeatured: e.target.checked})} className="w-4 h-4 text-blue-600 rounded bg-white border-gray-300" />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                  <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md">Save Product</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};
