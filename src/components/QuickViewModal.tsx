import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Check, Share2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, buildWhatsAppOrderUrl } from '../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    currency,
    rateSSP,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsCartOpen,
    showToast
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  // Set default variants if available
  const variantGroup1 = quickViewProduct.variants?.[0];
  const variantGroup2 = quickViewProduct.variants?.[1];

  const currentVariant1 = selectedVariant || variantGroup1?.options[0] || '';
  const currentVariant2 = selectedColor || variantGroup2?.options[0] || '';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedQuantity, currentVariant1, currentVariant2);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const singleItemCart = [{
      product: quickViewProduct,
      quantity: selectedQuantity,
      selectedVariant: currentVariant1,
      selectedColor: currentVariant2
    }];
    const totalUSD = quickViewProduct.priceUSD * selectedQuantity;
    const url = buildWhatsAppOrderUrl(singleItemCart, totalUSD, currency, rateSSP);
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: quickViewProduct.title,
        text: `Check out ${quickViewProduct.title} at Infinite Mart Juba!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard! 📋');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 p-5 sm:p-7"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Column: Gallery Images */}
            <div className="md:col-span-6 space-y-3">
              <div className="w-full h-72 sm:h-96 rounded-2xl bg-neutral-50 overflow-hidden relative border border-neutral-200 shadow-inner flex items-center justify-center">
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.discountBadge && (
                  <span className="absolute top-3 left-3 bg-black text-yellow-400 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                    {quickViewProduct.discountBadge}
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-yellow-500 scale-105 shadow-xs'
                          : 'border-neutral-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Badges Reassurance */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-neutral-700">
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{quickViewProduct.warranty}</span>
                </div>
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Express Juba Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-700 tracking-wider bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {quickViewProduct.subCategory || quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShare}
                      title="Share product"
                      className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-neutral-900 leading-snug">
                  {quickViewProduct.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-neutral-400 font-normal">({quickViewProduct.reviewCount} customer reviews)</span>
                </div>

                {/* Price Display */}
                <div className="bg-yellow-50/80 border border-yellow-200/80 p-3 rounded-2xl flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-neutral-900">
                      {formatPrice(quickViewProduct.priceUSD, currency, rateSSP)}
                    </span>
                    {quickViewProduct.originalPriceUSD > quickViewProduct.priceUSD && (
                      <span className="text-xs text-neutral-400 line-through ml-2">
                        {formatPrice(quickViewProduct.originalPriceUSD, currency, rateSSP)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-600">
                    Rate: 1$ = {rateSSP.toLocaleString()} SSP
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Key Features Bullet list */}
                {quickViewProduct.features.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Key Highlights:</span>
                    <ul className="text-xs space-y-1 text-neutral-700">
                      {quickViewProduct.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Variant Selector 1 */}
                {variantGroup1 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-neutral-800">{variantGroup1.name}:</span>
                    <div className="flex flex-wrap gap-2">
                      {variantGroup1.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedVariant(opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentVariant1 === opt
                              ? 'bg-black text-yellow-400 shadow-xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variant Selector 2 */}
                {variantGroup2 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-neutral-800">{variantGroup2.name}:</span>
                    <div className="flex flex-wrap gap-2">
                      {variantGroup2.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedColor(opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentVariant2 === opt
                              ? 'bg-black text-yellow-400 shadow-xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity and CTA Buttons */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-700">Quantity:</span>
                  <div className="flex items-center bg-neutral-100 rounded-xl p-1 border border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center font-bold text-neutral-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-extrabold">{selectedQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center font-bold text-neutral-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold ml-auto">
                    ● {quickViewProduct.stockCount} in stock (Juba Showroom)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    id="modal-add-cart-btn"
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-98 text-black font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatPrice(quickViewProduct.priceUSD * selectedQuantity, currency, rateSSP)})</span>
                  </button>

                  <button
                    id="modal-whatsapp-btn"
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
