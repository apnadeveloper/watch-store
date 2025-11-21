
export enum Category {
  APPLE = 'Apple Compatible',
  ANDROID = 'Android Compatible',
  HYBRID = 'Hybrid Analog',
  ACCESSORY = 'Accessories'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number; // Percentage off (0-100)
  category: Category;
  image: string;
  description: string;
  features: string[];
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerDetails;
  date: string;
  status: OrderStatus;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}
