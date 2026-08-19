import { VideoShowcase, CustomerReview } from '../types';

export const SHOWCASES: VideoShowcase[] = [
  {
    id: 'vid-1',
    platform: 'tiktok',
    title: 'Samsung S25 Ultra 5G Unboxing in Juba Town Showroom',
    handle: '@InfiniteMart_Juba',
    views: '48.2K views',
    priceUSD: 999,
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-s25-ultra',
    videoDuration: '0:45'
  },
  {
    id: 'vid-2',
    platform: 'instagram',
    title: 'Lattafa Khamrah & Yara Pink Sillage Test in Juba',
    handle: '@infinitemart.ss',
    views: '36.8K views',
    priceUSD: 48,
    thumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-lattafa-khamrah',
    videoDuration: '0:58'
  },
  {
    id: 'vid-3',
    platform: 'facebook',
    title: 'PlayStation 5 Slim Digital Unboxing & DualSense Haptics',
    handle: 'Infinite Mart Electronics Juba',
    views: '31.9K views',
    priceUSD: 450,
    thumbnail: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-ps5-slim',
    videoDuration: '1:12'
  },
  {
    id: 'vid-4',
    platform: 'tiktok',
    title: 'Petrova Hair Care Argan Oil Before & After Results',
    handle: '@InfiniteMart_Beauty',
    views: '54.1K views',
    priceUSD: 18,
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-00994fcfd74e?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-petrova-hair-oil',
    videoDuration: '0:35'
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Emmanuel Lado',
    location: 'Hai Cinema, Juba',
    rating: 5,
    date: 'August 2026',
    title: '100% Authentic Lattafa Khamrah!',
    comment: 'The projection on this perfume is phenomenal. Smells like warm spiced cinnamon and vanilla. Delivered to my office in Hai Cinema within 2 hours of ordering on WhatsApp!',
    verifiedPurchase: true,
    helpfulCount: 28,
    productTitle: 'Lattafa Khamrah Eau De Parfum'
  },
  {
    id: 'rev-2',
    author: 'Achol Deng',
    location: 'Munuki Block 2, Juba',
    rating: 5,
    date: 'August 2026',
    title: 'Samsung S25 Ultra is a beast',
    comment: 'Got my titanium S25 Ultra with the $200 promo discount. Camera is unbelievably clear, and the 12-month warranty card gave me huge peace of mind. Paid with m-GURUSH.',
    verifiedPurchase: true,
    helpfulCount: 41,
    productTitle: 'Samsung Galaxy S25 Ultra 5G'
  },
  {
    id: 'rev-3',
    author: 'John Baptist',
    location: 'Tongping, Juba',
    rating: 5,
    date: 'July 2026',
    title: 'Super fast MacBook Air M3 delivery',
    comment: 'The laptop is feather light and battery lasts 2 full days of work. Infinite Mart is definitely the most trusted electronics hub in South Sudan.',
    verifiedPurchase: true,
    helpfulCount: 19,
    productTitle: 'MacBook Air M3 15-inch'
  },
  {
    id: 'rev-4',
    author: 'Grace Kiden',
    location: 'Gudele, Juba',
    rating: 5,
    date: 'July 2026',
    title: 'Petrova Argan Oil saved my natural hair',
    comment: 'My hair was dry from the hot weather, but this oil restored the natural shine without feeling greasy. Will be buying the 3-pack next time!',
    verifiedPurchase: true,
    helpfulCount: 33,
    productTitle: 'Petrova Botanical Hair Care Argan Oil'
  }
];
