export type CurrencyCode = 'USD' | 'SSP';

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  subCategory?: string;
  priceUSD: number;
  originalPriceUSD: number;
  discountBadge?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  warranty: string;
  variants?: {
    name: string;
    options: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  iconName: string;
  image: string;
  subtitle: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  title: string;
  subtitle: string;
  discountPercent?: number;
  discountFixedUSD?: number;
  minSpendUSD: number;
  categoryLimit?: string;
  expiry: string;
  accentColor: string;
}

export interface VideoShowcase {
  id: string;
  platform: 'tiktok' | 'instagram' | 'facebook';
  title: string;
  handle: string;
  views: string;
  priceUSD: number;
  thumbnail: string;
  productId: string;
  videoDuration: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  productTitle: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedProductIds?: string[];
}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  deliveryArea: string;
  specificAddress: string;
  paymentMethod: 'cash_on_delivery' | 'mgurush' | 'momo' | 'card';
  notes: string;
}
