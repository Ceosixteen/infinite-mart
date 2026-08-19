import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Zap, Flame, Clock, Check, Eye, ShoppingBag, Award, CreditCard } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

export const HeroBanner: React.FC = () => {
  const { setActiveCategory, setQuickViewProduct, products, addToCart, currency, rateSSP, applyCouponCode, showToast } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  // Featured Spotlight Hero Slides
  const heroSlides = [
    {
      productId: 'prod-s25-ultra',
      badge: '2026 FLAGSHIP LAUNCH',
      title: 'Samsung Galaxy S25 Ultra 5G',
      subtitle: 'Snapdragon 8 Gen 3 • 200MP AI Quad Camera • Built-in S-Pen • Titanium Gray',
      priceUSD: 999,
      originalPriceUSD: 1199,
      discountBadge: '$200 OFF',
      category: 'smartphones',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      specs: ['Titanium Frame', '200MP Camera', '512GB NVMe', '5000mAh Battery']
    },
    {
      productId: 'prod-lattafa-khamrah',
      badge: 'ARABIAN LUXURY PERFUME',
      title: 'Lattafa Khamrah Eau De Parfum (100ml)',
      subtitle: 'Original Dubai Import • Warm Cinnamon, Cognac, Praline & Vanilla Amber',
      priceUSD: 48,
      originalPriceUSD: 65,
      discountBadge: 'BESTSELLER',
      category: 'perfumes',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      specs: ['100% Dubai Import', '14hr+ Projection', 'Unisex Luxury', 'Velvet Box']
    },
    {
      productId: 'prod-macbook-air-m3',
      badge: 'PRO PERFORMANCE',
      title: 'Apple MacBook Air M3 15-inch',
      subtitle: 'Apple M3 Chip • 16GB Unified RAM • 512GB SSD • Liquid Retina 500 Nits',
      priceUSD: 1150,
      originalPriceUSD: 1299,
      discountBadge: 'SAVE $149',
      category: 'laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      specs: ['Apple M3 Silicon', '18h Battery Life', '15.3" Liquid Retina', 'MagSafe 3']
    }
  ];

  // Timer countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slide autoplay
  useEffect(() => {
    const autoPlay = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(autoPlay);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[currentSlide];

  const handleHeroCTA = (category: string) => {
    setActiveCategory(category);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductQuickView = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) setQuickViewProduct(prod);
  };

  const handleQuickAddToCart = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod, 1);
      showToast(`Added ${prod.title} to cart! 🛍️`);
    }
  };

  return (
    <section id="hero-showcase-section" className="space-y-4">
      {/* Bento Layout: Main Banner (Left 8 cols) + Side Deals (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Main Interactive Spotlight Carousel */}
        <div className="lg:col-span-8 bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between border border-neutral-800 shadow-xl min-h-[440px] sm:min-h-[480px]">
          
          {/* Ambient Glow Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Pill Header & Slide Selectors */}
          <div className="flex items-center justify-between z-10 gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#FFD600] text-black font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                {activeSlide.badge}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-white/10 text-white/90 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-white/15 backdrop-blur-xs">
                <Truck className="w-3 h-3 text-[#FFD600]" />
                Same-Day Juba Delivery
              </span>
            </div>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-xs">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-6 bg-[#FFD600]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Middle Main Content Slide */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto py-4 z-10">
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  {activeSlide.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed max-w-lg">
                  {activeSlide.subtitle}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeSlide.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-[11px] font-semibold bg-white/10 text-neutral-200 border border-white/10 px-2.5 py-0.5 rounded-lg"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Price & Savings Pill */}
              <div className="flex items-baseline gap-3 pt-2">
                <div className="text-2xl sm:text-3xl font-black text-[#FFD600] tracking-tight">
                  {formatPrice(activeSlide.priceUSD, currency, rateSSP)}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 line-through">
                  {formatPrice(activeSlide.originalPriceUSD, currency, rateSSP)}
                </div>
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  {activeSlide.discountBadge}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleProductQuickView(activeSlide.productId)}
                  className="bg-[#FFD600] hover:bg-yellow-400 text-black font-black text-xs px-5 sm:px-6 py-3 rounded-xl uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>Quick View & Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAddToCart(activeSlide.productId)}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 border border-white/20 backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FFD600]" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Right Image Cutout Stage */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div
                onClick={() => handleProductQuickView(activeSlide.productId)}
                className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden bg-neutral-900/80 border border-white/10 p-2 group cursor-pointer shadow-2xl hover:scale-105 transition-transform duration-500"
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-bold text-[#FFD600] flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-xs">
                    <Eye className="w-3 h-3" /> Tap to view specs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Micro Warranty Footer */}
          <div className="border-t border-white/10 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 z-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-neutral-300 font-semibold">100% Genuine Sealed Stock • 6 to 12 Months Warranty</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>Showroom: Juba Town Commercial Center</span>
            </div>
          </div>
        </div>

        {/* Right Bento Box 1: Flash Deal Countdown + Arabian Scent Vault */}
        <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
          
          {/* Card 1: Today's Flash Deal Box */}
          <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-black rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden flex-1 flex flex-col justify-between border border-yellow-400">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-black text-[#FFD600] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-[#FFD600]" />
                Flash Deal
              </span>
              
              {/* Countdown Digits */}
              <div className="flex items-center gap-1 text-[11px] font-mono font-black bg-black/20 px-2.5 py-1 rounded-lg">
                <Clock className="w-3 h-3" />
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>

            <div className="my-3 flex items-center gap-3">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/40 border border-black/10 shrink-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
                  alt="Sony WH-1000XM5"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-black leading-snug truncate">
                  Sony WH-1000XM5 Wireless ANC
                </h3>
                <p className="text-[11px] text-black/80 font-medium line-clamp-1">
                  Industry-leading Noise Cancelling
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-black text-black">
                    {formatPrice(340, currency, rateSSP)}
                  </span>
                  <span className="text-xs text-black/60 line-through">
                    {formatPrice(399, currency, rateSSP)}
                  </span>
                </div>
              </div>
            </div>

            {/* Scarcity Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>Stock Left: 3 units</span>
                <span>85% Sold</span>
              </div>
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full w-[85%]" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleProductQuickView('prod-sony-xm5')}
              className="mt-3 w-full bg-black text-[#FFD600] hover:bg-neutral-900 font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-[#FFD600]" />
              <span>Claim Flash Deal Now</span>
            </button>
          </div>

          {/* Card 2: Arabian Scent Vault Promo */}
          <div className="bg-white border border-neutral-200/80 hover:border-amber-300 rounded-3xl p-5 shadow-sm flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black text-neutral-900 uppercase tracking-tight">
                  Arabian Scent Vault
                </span>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                15% Off Code: LUXE15
              </span>
            </div>

            <p className="text-xs text-neutral-600 my-2">
              Authentic Dubai Perfumes: Lattafa Khamrah, Asad, Yara Pink & Petrova Essential Oils in stock.
            </p>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  applyCouponCode('LUXE15');
                  setActiveCategory('perfumes');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black py-2 rounded-xl text-center shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                Apply 15% & Shop Scents
              </button>

              <button
                type="button"
                onClick={() => handleHeroCTA('skincare')}
                className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl cursor-pointer"
              >
                Skincare
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Trust & Reassurance Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-neutral-900">Same-Day Juba Delivery</div>
            <div className="text-[10px] text-neutral-500 font-medium">To Hai Cinema, Munuki, Town & Beyond</div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-neutral-900">Official Warranty</div>
            <div className="text-[10px] text-neutral-500 font-medium">6 to 12-Month Replacement Cover</div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-neutral-900">Flexible Payment</div>
            <div className="text-[10px] text-neutral-500 font-medium">m-GURUSH, MTN MoMo, Cash on Delivery</div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-700 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-neutral-900">100% Genuine Guaranteed</div>
            <div className="text-[10px] text-neutral-500 font-medium">Direct Imports from Dubai & USA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

