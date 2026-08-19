import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    currency,
    rateSSP,
    setQuickViewProduct
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-black text-base uppercase tracking-tight">
                Saved Favorites ({wishlistedProducts.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-neutral-900 text-sm">No saved items yet</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click the heart icon on any smartphone, perfume, MacBook, or beauty product to save it here.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-neutral-50 border border-neutral-200 rounded-2xl p-3 flex gap-3 items-center group relative"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => {
                      setQuickViewProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-neutral-200 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0">
                    <h5
                      onClick={() => {
                        setQuickViewProduct(product);
                        setIsWishlistOpen(false);
                      }}
                      className="text-xs font-bold text-neutral-900 truncate hover:text-amber-600 cursor-pointer"
                    >
                      {product.title}
                    </h5>
                    <div className="text-xs font-black text-neutral-900 mt-0.5">
                      {formatPrice(product.priceUSD, currency, rateSSP)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product.id);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
