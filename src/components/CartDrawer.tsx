import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, MessageCircle, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, buildWhatsAppOrderUrl } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotalUSD,
    cartDiscountUSD,
    cartTotalUSD,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    currency,
    rateSSP,
    setIsCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 150;
  const progressPercent = Math.min(100, Math.round((cartSubtotalUSD / freeDeliveryThreshold) * 100));
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotalUSD);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCouponCode(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    const url = buildWhatsAppOrderUrl(
      cart,
      cartTotalUSD,
      currency,
      rateSSP,
      undefined,
      undefined,
      'Direct WhatsApp Order',
      appliedCoupon?.code
    );
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer content */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-yellow-400">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h3 className="font-black text-black text-base uppercase tracking-tight">
                Your Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-yellow-50 px-4 py-2.5 border-b border-yellow-200 text-xs">
            <div className="flex items-center justify-between font-bold text-neutral-800 mb-1.5">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                {remainingForFreeDelivery === 0 ? (
                  <span className="text-emerald-700 font-extrabold">🎉 You unlocked FREE Juba Delivery!</span>
                ) : (
                  <span>Add <strong>{formatPrice(remainingForFreeDelivery, currency, rateSSP)}</strong> more for Free Delivery!</span>
                )}
              </span>
              <span className="font-mono text-[10px]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-neutral-900 text-sm">Your cart is currently empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore top deals on smartphones, Arabian luxury perfumes, laptops, and home gadgets.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-black text-yellow-400 text-xs font-black px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant}-${item.selectedColor}-${idx}`}
                  className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 flex gap-3 items-center relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-neutral-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-neutral-900 truncate">
                      {item.product.title}
                    </h5>

                    {(item.selectedVariant || item.selectedColor) && (
                      <div className="text-[10px] text-neutral-500 font-medium">
                        {item.selectedVariant && <span>{item.selectedVariant}</span>}
                        {item.selectedVariant && item.selectedColor && <span> • </span>}
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                      </div>
                    )}

                    <div className="text-xs font-black text-neutral-900 mt-1">
                      {formatPrice(item.product.priceUSD * item.quantity, currency, rateSSP)}
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-neutral-400 font-normal ml-1">
                          ({formatPrice(item.product.priceUSD, currency, rateSSP)} each)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedColor)}
                      className="text-neutral-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, -1, item.selectedVariant, item.selectedColor)}
                        className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded text-xs font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, 1, item.selectedVariant, item.selectedColor)}
                        className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Section */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-3 shadow-lg">
              {/* Promo code entry */}
              <div>
                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code: <strong>{appliedCoupon.code}</strong></span>
                      <span className="text-[10px] text-emerald-600 font-medium">({appliedCoupon.title})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-rose-600 text-xs font-bold underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError(null);
                        }}
                        placeholder="Enter Promo Code (e.g. LUXE15, SALE200)"
                        className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-black uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="bg-black hover:bg-neutral-800 text-yellow-400 text-xs font-black px-3.5 py-1.5 rounded-xl cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[10px] text-rose-600 font-medium">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Subtotal / Discount / Total Calculation */}
              <div className="space-y-1.5 text-xs border-t border-neutral-100 pt-2">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">
                    {formatPrice(cartSubtotalUSD, currency, rateSSP)}
                  </span>
                </div>

                {cartDiscountUSD > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied</span>
                    <span>-{formatPrice(cartDiscountUSD, currency, rateSSP)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Delivery in Juba</span>
                  <span className="font-bold text-emerald-600">
                    {remainingForFreeDelivery === 0 ? 'FREE' : 'Express (Calculated at checkout)'}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-black text-neutral-900 pt-1 border-t border-neutral-200">
                  <span>Total Amount</span>
                  <div className="text-right">
                    <div>{formatPrice(cartTotalUSD, currency, rateSSP)}</div>
                    {currency === 'USD' && (
                      <div className="text-[10px] text-neutral-400 font-normal font-mono">
                        ≈ {Math.round(cartTotalUSD * rateSSP).toLocaleString()} SSP
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="cart-proceed-checkout-btn"
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-98 text-black font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="cart-whatsapp-order-btn"
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
