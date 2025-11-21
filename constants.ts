
import { Product, Category, Testimonial, Banner } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chronos Ultra Series 9',
    price: 799,
    discount: 10,
    category: Category.APPLE,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate rugged watch for adventure with titanium case.',
    features: ['49mm Titanium Case', '100m Water Resistance', '36h Battery'],
    isTrending: true
  },
  {
    id: '2',
    name: 'Pixel Pulse 2',
    price: 349,
    discount: 0,
    category: Category.ANDROID,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: 'Beautifully designed with the best of Google built-in.',
    features: ['Always-on Display', 'ECG App', '24h Battery']
  },
  {
    id: '3',
    name: 'Galaxy Orbit 6',
    price: 449,
    discount: 15,
    category: Category.ANDROID,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    description: 'Your wellness partner with advanced sleep coaching.',
    features: ['Sapphire Crystal', 'Body Composition', 'Fast Charging'],
    isTrending: true
  },
  {
    id: '4',
    name: 'Horizon Hybrid X',
    price: 299,
    discount: 0,
    category: Category.HYBRID,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Classic style meets modern smarts. Real hands, hidden display.',
    features: ['30-day Battery', 'Real Mechanical Hands', 'E-Ink Display']
  },
  {
    id: '5',
    name: 'Chronos Air SE',
    price: 249,
    discount: 5,
    category: Category.APPLE,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy on features. Light on price. Essential tracking.',
    features: ['Retina Display', 'Fall Detection', 'Swimproof'],
    isTrending: true
  },
  {
    id: '6',
    name: 'Leather Link Strap',
    price: 89,
    discount: 0,
    category: Category.ACCESSORY,
    image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted leather strap compatible with all Chronos watches.',
    features: ['Genuine Leather', 'Magnetic Clasp', 'Sweat Resistant']
  },
  {
    id: '7',
    name: 'Alpine Loop',
    price: 99,
    discount: 20,
    category: Category.ACCESSORY,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged and capable, perfect for the outdoors.',
    features: ['Woven Textile', 'G-Hook', 'Orange Accent'],
    isTrending: true
  },
  {
    id: '8',
    name: 'Pro Diver 300',
    price: 599,
    discount: 0,
    category: Category.ANDROID,
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grade diving smartwatch.',
    features: ['300m Depth Rating', 'Dive Computer', 'Sapphire Lens']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Fitness Enthusiast',
    text: "The Chronos Ultra has completely transformed my marathon training. The battery life is insane!",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Tech Reviewer',
    text: "I've tested dozens of smartwatches, and the build quality here is second to none. Highly recommended.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 't3',
    name: 'Emma Wilson',
    role: 'Designer',
    text: "Finally, a smartwatch that actually looks good with formal wear. The Hybrid X is a masterpiece.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c'
  }
];

export const BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'New Arrivals',
    subtitle: 'Check out the latest tech',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80',
    link: 'shop'
  },
  {
    id: 'b2',
    title: 'Accessories',
    subtitle: 'Upgrade your style',
    image: 'https://images.unsplash.com/photo-1517502474097-f9b30659dadb?auto=format&fit=crop&w=800&q=80',
    link: 'shop'
  },
  {
    id: 'b3',
    title: 'Sale Event',
    subtitle: 'Up to 30% off selected items',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80',
    link: 'shop'
  }
];
