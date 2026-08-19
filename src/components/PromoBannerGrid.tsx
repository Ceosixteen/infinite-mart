import React, { useState } from 'react';
import { Gift, Copy, Check, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { COUPONS } from '../data/coupons';
import { useStore } from '../context/StoreContext';

export const PromoBannerGrid: React.FC = () => {
  const { applyCouponCode, showToast, setActiveCategory, appliedCoupon } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyAndApply = (code: string, categoryLimit?: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    showToast(`Applied code "${code}" to checkout! 🎉`);
    setTimeout(() => setCopiedCode(null), 2500);

    if (categoryLimit) {
      setActiveCategory(categoryLimit);
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const couponImages: Record<string, string> = {
    SALE200: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80',
    LUXE15: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80',
    B5G5: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    SAVEBIG: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    FREEGIFT: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=300&q=80'
  };

  return (
    <section id="promo-coupons-section" className="space-y-3 pt-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-600" />
          <h2 className="text-base sm:text-lg font-black text-neutral-900 uppercase tracking-tight">
            VIP Voucher Vault & Discounts
          </h2>
        </div>
        <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3 h-3 text-amber-700" />
          <span>Tap any code to auto-apply at checkout</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {COUPONS.map((coupon) => {
          const isCopied = copiedCode === coupon.code || appliedCoupon?.code === coupon.code;
          return (
            <div
              key={coupon.code}
              id={`coupon-card-${coupon.code}`}
              className={`rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all relative overflow-hidden border cursor-pointer group ${
                isCopied
                  ? 'bg-amber-50/90 border-yellow-500 ring-2 ring-yellow-400/40'
                  : 'bg-white border-neutral-200/90 hover:border-yellow-400'
              }`}
              onClick={() => handleCopyAndApply(coupon.code, coupon.categoryLimit)}
            >
              {/* Left Ticket Cutout */}
              <div className="space-y-1.5 flex-1 z-10 min-w-0">
                <div className="text-xs font-black text-neutral-900 leading-tight">
                  {coupon.title}
                </div>
                <div className="text-[10px] text-neutral-500 font-medium truncate">
                  {coupon.subtitle}
                </div>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    className={`text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black text-[#FFD600] group-hover:bg-neutral-800'
                    }`}
                  >
                    <span>{isCopied ? 'Applied' : 'Code:'}</span>
                    <span className="font-mono">{coupon.code}</span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-80" />
                    )}
                  </button>
                </div>
              </div>

              {/* Right Thumbnail */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/60 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <img
                  src={couponImages[coupon.code] || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=300&q=80'}
                  alt={coupon.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

