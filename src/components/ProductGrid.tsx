import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpDown, X, AlertCircle, Sparkles, Filter, Grid3X3, Grid2X2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/categories';

export const ProductGrid: React.FC = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'reviews'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickFilter, setQuickFilter] = useState<'all' | 'bestsellers' | 'deals' | 'under100' | 'luxury'>('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchCat && !matchDesc && !matchTags) {
            return false;
          }
        }
        // In stock filter
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Quick filters
        if (quickFilter === 'bestsellers' && !p.isBestSeller) return false;
        if (quickFilter === 'deals' && !p.discountBadge && p.originalPriceUSD <= p.priceUSD) return false;
        if (quickFilter === 'under100' && p.priceUSD > 100) return false;
        if (quickFilter === 'luxury' && p.priceUSD < 300) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, searchQuery, inStockOnly, quickFilter, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === activeCategory) || CATEGORIES[0];

  return (
    <section id="products-section" className="space-y-5 pt-2">
      {/* Category Sub-Navigation & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-tight flex items-center gap-2.5">
            <span>{searchQuery ? `Search Results` : activeCategoryObj.name}</span>
            <span className="text-xs bg-black text-[#FFD600] font-mono font-black px-2.5 py-0.5 rounded-full shadow-2xs">
              {filteredProducts.length} Items
            </span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {searchQuery
              ? `Showing real-time stock matches for "${searchQuery}" in Juba`
              : `100% Genuine guaranteed with 6-12 month replacement warranty`}
          </p>
        </div>

        {/* Action Controls & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setQuickFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                quickFilter === 'all'
                  ? 'bg-neutral-950 text-[#FFD600] shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              All Items
            </button>
            <button
              type="button"
              onClick={() => setQuickFilter('bestsellers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                quickFilter === 'bestsellers'
                  ? 'bg-neutral-950 text-[#FFD600] shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              ★ Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setQuickFilter('deals')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                quickFilter === 'deals'
                  ? 'bg-neutral-950 text-[#FFD600] shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              ⚡ Flash Promos
            </button>
            <button
              type="button"
              onClick={() => setQuickFilter('under100')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                quickFilter === 'under100'
                  ? 'bg-neutral-950 text-[#FFD600] shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              Under $100
            </button>
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <select
                id="sort-select-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-white border border-neutral-300 text-neutral-800 text-xs font-bold rounded-xl pl-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-2xs"
              >
                <option value="featured">🔥 Featured Deals</option>
                <option value="price-low">💵 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviewed</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* In stock toggle */}
            <button
              type="button"
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                inStockOnly
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
              <span className="hidden sm:inline">In Stock Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {(searchQuery || activeCategory !== 'all' || quickFilter !== 'all' || inStockOnly) && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-neutral-500 font-medium">Active filters:</span>
          {activeCategory !== 'all' && (
            <span className="bg-yellow-100 text-yellow-900 border border-yellow-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
              <span>Category: {activeCategoryObj.name}</span>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="bg-neutral-100 text-neutral-900 border border-neutral-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
              <span>Keyword: "{searchQuery}"</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {quickFilter !== 'all' && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
              <span className="capitalize">Filter: {quickFilter}</span>
              <button
                type="button"
                onClick={() => setQuickFilter('all')}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setQuickFilter('all');
              setInStockOnly(false);
            }}
            className="text-amber-700 hover:underline font-bold text-xs ml-2 cursor-pointer"
          >
            Reset all
          </button>
        </div>
      )}

      {/* Product Grid / Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h4 className="text-base font-bold text-neutral-900">No items found matching your filters</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try resetting your search query or browsing our complete department catalog.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setQuickFilter('all');
              setInStockOnly(false);
            }}
            className="mt-2 bg-[#FFD600] text-black font-black text-xs px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-all cursor-pointer"
          >
            View All Products
          </button>
        </div>
      ) : (
        <motion.div
          id="product-catalog-grid"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

