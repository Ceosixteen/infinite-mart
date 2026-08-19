import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, CurrencyCode, VideoShowcase } from '../types';
import { COUPONS } from '../data/coupons';
import { getEffectiveProducts } from '../admin/data';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warn';
}

interface StoreContextType {
  products: Product[];
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rateSSP: number;
  setRateSSP: (rate: number) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string, color?: string) => void;
  removeFromCart: (productId: string, variant?: string, color?: string) => void;
  updateQuantity: (productId: string, delta: number, variant?: string, color?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalUSD: number;
  cartDiscountUSD: number;
  cartTotalUSD: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isVIPModalOpen: boolean;
  setIsVIPModalOpen: (open: boolean) => void;
  isExchangeRateModalOpen: boolean;
  setIsExchangeRateModalOpen: (open: boolean) => void;
  activeVideo: VideoShowcase | null;
  setActiveVideo: (v: VideoShowcase | null) => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warn') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(() => {
    try {
      return getEffectiveProducts().filter((p) => !p.hidden);
    } catch {
      return [];
    }
  });
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [rateSSP, setRateSSP] = useState<number>(8000);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isVIPModalOpen, setIsVIPModalOpen] = useState<boolean>(false);
  const [isExchangeRateModalOpen, setIsExchangeRateModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<VideoShowcase | null>(null);
  
  // Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load persistence from local storage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('infinitemart_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('infinitemart_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedRate = localStorage.getItem('infinitemart_rateSSP');
      if (savedRate && Number(savedRate) > 0 && Number(savedRate) !== 3500) {
        setRateSSP(Number(savedRate));
      } else {
        setRateSSP(8000);
      }
      const savedCurrency = localStorage.getItem('infinitemart_currency');
      if (savedCurrency === 'SSP' || savedCurrency === 'USD') setCurrency(savedCurrency);
    } catch (e) {
      console.error('Error restoring localStorage data', e);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('infinitemart_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('infinitemart_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('infinitemart_rateSSP', rateSSP.toString());
      localStorage.setItem('infinitemart_currency', currency);
    } catch (e) {}
  }, [rateSSP, currency]);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, variant?: string, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === variant &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant: variant, selectedColor: color }];
    });
    showToast(`Added ${quantity}x "${product.title}" to your cart!`);
  };

  const removeFromCart = (productId: string, variant?: string, color?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === variant &&
            item.selectedColor === color
          )
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, delta: number, variant?: string, color?: string) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedVariant === variant &&
            item.selectedColor === color
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        const updated = prev.filter((id) => id !== productId);
        showToast('Removed from saved wishlist', 'info');
        return updated;
      } else {
        showToast('Saved to your wishlist! ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCouponCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const foundCoupon = COUPONS.find((c) => c.code.toUpperCase() === cleanCode);

    if (!foundCoupon) {
      if (cleanCode === 'VIP10') {
        const vipCoupon: Coupon = {
          code: 'VIP10',
          title: '10% VIP Storewide Discount',
          subtitle: 'VIP Member Welcome Offer',
          discountPercent: 10,
          minSpendUSD: 20,
          expiry: 'Valid on this session',
          accentColor: 'purple'
        };
        setAppliedCoupon(vipCoupon);
        showToast('🎉 VIP 10% Discount Applied!');
        return { success: true, message: 'VIP 10% discount applied successfully!' };
      }
      return { success: false, message: `Coupon code "${code}" is invalid or expired.` };
    }

    const subtotal = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
    if (subtotal < foundCoupon.minSpendUSD) {
      return {
        success: false,
        message: `Coupon requires a minimum spend of $${foundCoupon.minSpendUSD} USD.`
      };
    }

    setAppliedCoupon(foundCoupon);
    showToast(`🎉 Coupon "${foundCoupon.code}" applied!`);
    return { success: true, message: `Promo code ${foundCoupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  let cartDiscountUSD = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      if (appliedCoupon.categoryLimit) {
        const eligibleSubtotal = cart
          .filter((item) => item.product.category === appliedCoupon.categoryLimit)
          .reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
        cartDiscountUSD = Math.round((eligibleSubtotal * appliedCoupon.discountPercent) / 100);
      } else {
        cartDiscountUSD = Math.round((cartSubtotalUSD * appliedCoupon.discountPercent) / 100);
      }
    } else if (appliedCoupon.discountFixedUSD) {
      cartDiscountUSD = appliedCoupon.discountFixedUSD;
    }
  }
  cartDiscountUSD = Math.min(cartDiscountUSD, cartSubtotalUSD);
  const cartTotalUSD = Math.max(0, cartSubtotalUSD - cartDiscountUSD);

  return (
    <StoreContext.Provider
      value={{
        products,
        currency,
        setCurrency,
        rateSSP,
        setRateSSP,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalUSD,
        cartDiscountUSD,
        cartTotalUSD,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isVIPModalOpen,
        setIsVIPModalOpen,
        isExchangeRateModalOpen,
        setIsExchangeRateModalOpen,
        activeVideo,
        setActiveVideo,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
