
import { Order, CustomerDetails, CartItem, OrderStatus, Product } from '../types';
import { PRODUCTS } from '../constants';

const ORDERS_KEY = 'chronos_orders_db';
const PRODUCTS_KEY = 'chronos_products_db';
const CATEGORIES_KEY = 'chronos_categories_db';

// Simulate Network Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- INIT ---
const initDB = () => {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
  }
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    // Extract unique categories from initial products
    const cats = Array.from(new Set(PRODUCTS.map(p => p.category)));
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
  }
};

// --- ORDERS ---

export const saveOrder = async (customer: CustomerDetails, items: CartItem[], total: number): Promise<Order> => {
  await delay(1000);
  const newOrder: Order = {
    id: `ORD-${Date.now().toString().slice(-6)}`,
    items,
    total,
    customer,
    date: new Date().toISOString(),
    status: 'pending'
  };
  const existingOrdersStr = localStorage.getItem(ORDERS_KEY);
  const existingOrders: Order[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
  const updatedOrders = [newOrder, ...existingOrders];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  return newOrder;
};

export const getOrders = async (): Promise<Order[]> => {
  await delay(500);
  const str = localStorage.getItem(ORDERS_KEY);
  return str ? JSON.parse(str) : [];
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  await delay(500);
  const str = localStorage.getItem(ORDERS_KEY);
  if (str) {
    const orders: Order[] = JSON.parse(str);
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  }
};

// --- PRODUCTS ---

export const getProducts = async (): Promise<Product[]> => {
  initDB();
  await delay(300);
  const str = localStorage.getItem(PRODUCTS_KEY);
  return str ? JSON.parse(str) : PRODUCTS;
};

export const addProduct = async (product: Product): Promise<void> => {
  const products = await getProducts();
  products.push(product);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const updateProduct = async (product: Product): Promise<void> => {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index !== -1) {
    products[index] = product;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== productId);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
};

// --- CATEGORIES ---

export const getCategories = async (): Promise<string[]> => {
  initDB();
  await delay(200);
  const str = localStorage.getItem(CATEGORIES_KEY);
  return str ? JSON.parse(str) : [];
};

export const addCategory = async (category: string): Promise<void> => {
  const cats = await getCategories();
  if (!cats.includes(category)) {
    cats.push(category);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
  }
};

export const deleteCategory = async (category: string): Promise<void> => {
  const cats = await getCategories();
  const filtered = cats.filter(c => c !== category);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
};

// --- DASHBOARD STATS ---

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  lowStockCount: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const orders = await getOrders();
  const products = await getProducts();
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Simulation: Assume low stock is random for now since we don't track real stock in this mockup
  const lowStockCount = Math.floor(products.length * 0.2);

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    lowStockCount
  };
};
