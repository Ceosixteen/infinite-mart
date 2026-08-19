import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Sparkles,
  Heart,
  Settings,
  Zap,
  Folder,
  X,
  Store,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    currency,
    setCurrency,
    rateSSP,
    cartCount,
    cartTotalUSD,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAIAssistantOpen,
    setIsExchangeRateModalOpen,
    searchQuery,
    setSearchQuery,
    products,
    setQuickViewProduct
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  return (
    <>
      {/* 1. Brand Announcement Top Strip */}
      <div id="announcement-strip" className="bg-[#E5C000] text-black text-[11px] font-bold py-1.5 px-4 text-center border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5 truncate">
            <Zap className="w-3.5 h-3.5 fill-black shrink-0" />
            <span className="font-extrabold">Juba Superstore</span> — 100% Authentic Electronics, Arabian Perfumes, Skincare & Express Same-Day Delivery!
          </span>
          <div className="hidden md:flex items-center gap-4 text-[11px] font-extrabold shrink-0">
            <a
              href="https://wa.me/211911267703"
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <span>📞 Hotline: +211 911 267 703</span>
            </a>
            <span>📍 Juba Town Commercial Showroom</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Navigation */}
      <header id="main-header" className="sticky top-0 z-40 bg-[#FFD600] border-b border-yellow-500/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-black text-[#FFD600] rounded-2xl flex items-center justify-center font-black text-xl shadow-md transform hover:scale-105 transition-transform">
              ⚡
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-black tracking-tight flex items-center gap-1.5 leading-none">
                <span>INFINITE MART</span>
                <span className="text-[9px] sm:text-[10px] bg-black text-[#FFD600] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs">
                  SUPERSTORE
                </span>
              </h1>
              <p className="text-[10px] font-bold text-black/75 tracking-wide uppercase mt-0.5">
                Electronics • Perfumes • Skincare • Home
              </p>
            </div>
          </div>

          {/* Search Box with Autocomplete (Desktop & Tablet) */}
          <div ref={searchRef} className="hidden sm:flex flex-1 max-w-lg relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search Samsung, MacBook, Lattafa Khamrah, PS5, Petrova Oils, JBL..."
              className="w-full bg-white border border-yellow-600/40 text-neutral-900 placeholder:text-neutral-500 rounded-xl pl-10 pr-9 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div id="search-suggestions-dropdown" className="absolute top-full mt-1.5 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 p-2 space-y-1 animate-fade-in">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 flex items-center justify-between">
                  <span>Quick Product Matches</span>
                  <span className="text-amber-600">{searchSuggestions.length} found</span>
                </div>
                {searchSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setQuickViewProduct(prod);
                      setIsSearchFocused(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-yellow-50 flex items-center gap-3 transition-colors group cursor-pointer"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-10 h-10 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-neutral-900 truncate group-hover:text-amber-700">
                        {prod.title}
                      </div>
                      <div className="text-[10px] text-neutral-500 flex items-center gap-2">
                        <span className="capitalize">{prod.category}</span>
                        <span>•</span>
                        <span className="font-bold text-neutral-900">
                          {formatPrice(prod.priceUSD, currency, rateSSP)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Tools: Currency Toggle, Rate Settings, AI Button, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Multi-Currency USD / SSP Switcher */}
            <div className="flex items-center gap-1.5">
              <div className="flex bg-gray-900 border border-black/40 rounded-xl p-0.5 shadow-sm">
                <button
                  id="currency-usd-btn"
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-yellow-400 text-black shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>USD</span>
                  <span className="text-[10px] opacity-80">($)</span>
                </button>
                <button
                  id="currency-ssp-btn"
                  type="button"
                  onClick={() => setCurrency('SSP')}
                  className={`flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    currency === 'SSP'
                      ? 'bg-yellow-400 text-black shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>SSP</span>
                  <span className="text-[10px] opacity-80">(£)</span>
                </button>
              </div>
            </div>

            {/* Max AI Assistant Button */}
            <button
              id="header-ai-assistant-btn"
              type="button"
              onClick={() => setIsAIAssistantOpen(true)}
              className="bg-black text-[#FFD600] hover:bg-neutral-800 font-extrabold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD600] animate-pulse" />
              <span className="hidden md:inline">Ask Max AI</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              className="relative bg-white hover:bg-yellow-50 text-black border border-yellow-600/30 p-2 sm:p-2.5 rounded-xl flex items-center gap-1.5 font-bold text-xs shadow-xs cursor-pointer transition-all"
              title="Saved Favorites"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-black'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white hover:bg-yellow-50 text-black border border-yellow-600/30 px-3 py-2 rounded-xl flex items-center gap-2 font-black text-xs shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">
                {formatPrice(cartTotalUSD, currency, rateSSP)}
              </span>
              {cartCount > 0 && (
                <span className="bg-black text-yellow-400 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 pb-2.5 pt-0.5">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones, perfumes, MacBooks, skincare..."
              className="w-full bg-white border border-yellow-600/40 text-neutral-900 placeholder:text-neutral-500 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-black shadow-inner"
            />
          </div>
        </div>
      </header>
    </>
  );
};
