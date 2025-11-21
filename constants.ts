
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
    isTrending: true,
    isFeatured: true
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
    features: ['30-day Battery', 'Real Mechanical Hands', 'E-Ink Display'],
    isFeatured: true
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
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
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
    isTrending: true,
    isFeatured: true
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
  },
  // --- NEW PRODUCTS ADDED FOR LAYOUT ---
  {
    id: '9',
    name: 'Chronos Series 9 Steel',
    price: 699,
    discount: 0,
    category: Category.APPLE,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&q=80',
    description: 'Stainless steel finish with sapphire crystal display.',
    features: ['Steel Case', 'Cellular', 'Fast Charge'],
    isFeatured: true
  },
  {
    id: '10',
    name: 'Chronos Sport Loop',
    price: 49,
    discount: 0,
    category: Category.ACCESSORY,
    image: 'https://images.unsplash.com/photo-1510017098667-27dfc7150acb?auto=format&fit=crop&w=800&q=80',
    description: 'Soft, breathable nylon weave with an easily adjustable hook-and-loop fastener.',
    features: ['Nylon Weave', 'Breathable', 'Lightweight']
  },
  {
    id: '11',
    name: 'Galaxy Watch Classic',
    price: 399,
    discount: 10,
    category: Category.ANDROID,
    image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=800&q=80',
    description: 'The rotating bezel is back. Classic design, modern tech.',
    features: ['Rotating Bezel', 'Wear OS', 'Sleep Tracking']
  },
  {
    id: '12',
    name: 'Vintage Hybrid',
    price: 199,
    discount: 0,
    category: Category.HYBRID,
    image: 'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?auto=format&fit=crop&w=800&q=80',
    description: 'Looks like a traditional watch, acts like a smartwatch.',
    features: ['6-month Battery', 'Notifications', 'Step Tracking']
  },
  {
    id: '13',
    name: 'Titanium Link Bracelet',
    price: 349,
    discount: 0,
    category: Category.ACCESSORY,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from the same titanium alloy as the case.',
    features: ['Titanium', 'Butterfly Closure', 'Diamond-like Carbon']
  },
  {
    id: '14',
    name: 'Active Pro 5',
    price: 299,
    discount: 5,
    category: Category.ANDROID,
    image: 'https://images.unsplash.com/photo-1557431177-36141475cdd9?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced fitness tracking for the dedicated athlete.',
    features: ['GPS', 'VO2 Max', 'Recovery Time'],
    isTrending: true
  },
  {
    id: '15',
    name: 'Minimalist Hybrid',
    price: 179,
    discount: 0,
    category: Category.HYBRID,
    image: 'https://images.unsplash.com/photo-1619161353293-bd323724d681?auto=format&fit=crop&w=800&q=80',
    description: 'A slim, minimal watch that tracks your activity silently.',
    features: ['Slim Profile', 'Activity Tracking', 'Silent Alarm']
  },
  {
    id: '16',
    name: 'Chronos Ultra Orange',
    price: 799,
    discount: 0,
    category: Category.APPLE,
    image: 'https://images.unsplash.com/photo-1461141346587-763ab02bced9?auto=format&fit=crop&w=800&q=80',
    description: 'The Ultra watch with the signature international orange action button.',
    features: ['Action Button', 'Siren', 'Precision Start']
  },
  {
    id: '17',
    name: 'Heritage Hybrid',
    price: 259,
    discount: 15,
    category: Category.HYBRID,
    image: 'https://images.unsplash.com/photo-1508057198894-247b6d788d93?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless design inspired by aviation instruments.',
    features: ['World Time', 'Chronograph', 'Leather Strap'],
    isFeatured: true
  },
  {
    id: '18',
    name: 'Sport Silicone Band',
    price: 29,
    discount: 0,
    category: Category.ACCESSORY,
    image: 'https://images.unsplash.com/photo-1608677503993-6681034da00c?auto=format&fit=crop&w=800&q=80',
    description: 'Made from a custom high-performance fluoroelastomer.',
    features: ['Waterproof', 'Durable', 'Pin-and-tuck']
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
  },
  {
    id: 't4',
    name: 'David Miller',
    role: 'Adventure Guide',
    text: "Navigation features are spot on. I take this on every hike and it has never let me down.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e'
  },
  {
    id: 't5',
    name: 'Lisa Wong',
    role: 'Corporate Executive',
    text: "Seamless notifications and calls allow me to stay connected without being glued to my phone.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f'
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
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    link: 'shop'
  }
];
