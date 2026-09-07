import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Heart, Star, Check, Zap, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    currency,
    rateSSP,
    addToCart,
    setQuickViewProduct,
    isInWishlist,
    toggleWishlist,
    cart
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isFavorited = isInWishlist(product.id);

  // Check if item is already in cart
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]?.options[0]);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Calculate secondary currency price for luxury dual-display
  const secondaryFormatted =
    currency === 'USD'
      ? `${(product.priceUSD * rateSSP).toLocaleString()} SSP`
      : `$${product.priceUSD.toLocaleString()} USD`;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => { window.location.href = `/product/${product.slug}`; }}
      className="bg-white border border-neutral-200/90 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-yellow-400 hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
    >
      {/* Top Badges & Wishlist Action */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {product.discountBadge && (
          <span className="bg-black text-[#FFD600] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Zap className="w-3 h-3 fill-[#FFD600]" />
            {product.discountBadge}
          </span>
        )}
        {product.isBestSeller && !product.discountBadge && (
          <span className="bg-neutral-900 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider shadow-xs">
            ★ Best Seller
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleWishlist}
        title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-neutral-600 hover:text-rose-500 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-neutral-100"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'
          }`}
        />
      </button>

      {/* Product Image Stage */}
      <div
        className="w-full h-48 sm:h-52 rounded-2xl bg-neutral-50 overflow-hidden mb-3 relative group-hover:scale-101 transition-transform duration-300 flex items-center justify-center"
        onMouseEnter={() => {
          if (product.images.length > 1) setActiveImageIndex(1);
        }}
        onMouseLeave={() => setActiveImageIndex(0)}
      >
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
          <button
            type="button"
            onClick={handleQuickView}
            className="bg-white hover:bg-neutral-100 text-black px-4 py-2 rounded-xl text-xs font-black shadow-lg cursor-pointer flex items-center gap-1.5 transform active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-900" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Multi-image thumbnail indicator dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
            {product.images.slice(0, 3).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === i ? 'w-4 bg-yellow-400' : 'w-1.5 bg-black/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            <span>{product.subCategory || product.category}</span>
            <span className="text-emerald-700 font-semibold lowercase">
              ● {product.stockCount} in stock
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-black text-neutral-900 line-clamp-2 mt-1 group-hover:text-amber-700 transition-colors leading-snug">
            {product.title}
          </h4>

          <a href={`/product/${product.slug}`} onClick={(event) => event.stopPropagation()} className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-amber-700 hover:underline">View full offer</a>

          <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 pt-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-neutral-400 font-normal">
            ({product.reviewCount})
          </span>
          <span className="ml-auto text-[10px] font-semibold text-neutral-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Warranty</span>
          </span>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2 mt-2">
          <div>
            <div className="text-sm sm:text-base font-black text-neutral-900 leading-none">
              {formatPrice(product.priceUSD, currency, rateSSP)}
            </div>
            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
              ≈ {secondaryFormatted}
            </div>
          </div>

          <button
            id={`add-btn-${product.id}`}
            type="button"
            onClick={handleQuickAdd}
            className="bg-[#FFD600] hover:bg-yellow-400 active:scale-95 text-black font-black text-xs px-3 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
            <span>{quantityInCart > 0 ? `Add (${quantityInCart})` : 'Add'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
