import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import {
  Smartphone,
  Sparkles,
  Laptop,
  Headphones,
  Heart,
  Gamepad2,
  Home,
  Watch,
  Zap,
  LayoutGrid
} from 'lucide-react';

export const CategoryNav: React.FC = () => {
  const { activeCategory, setActiveCategory, setSearchQuery } = useStore();

  const handleSelectCategory = (catSlug: string) => {
    setActiveCategory(catSlug);
    setSearchQuery(''); // clear text search when browsing category
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'smartphones':
        return <Smartphone className="w-4 h-4" />;
      case 'perfumes':
        return <Sparkles className="w-4 h-4" />;
      case 'laptops':
        return <Laptop className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'skincare':
        return <Heart className="w-4 h-4" />;
      case 'gaming':
        return <Gamepad2 className="w-4 h-4" />;
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'smartwatches':
        return <Watch className="w-4 h-4" />;
      case 'charging':
        return <Zap className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <section id="categories-section" className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight flex items-center gap-2 uppercase">
            <span>Explore Collections</span>
            <span className="text-[10px] bg-yellow-400 text-black px-2.5 py-0.5 rounded-full font-mono font-extrabold shadow-2xs">
              {CATEGORIES.length} Departments
            </span>
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Original Electronics, Arabian Perfumes, Skincare & Living Tech with Juba Warranty
          </p>
        </div>
      </div>

      {/* Modern Responsive Grid / Scroll List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              id={`cat-card-${cat.slug}`}
              type="button"
              onClick={() => handleSelectCategory(cat.slug)}
              className={`group flex flex-col items-center text-center p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-neutral-950 border-black shadow-md ring-2 ring-yellow-400 text-white scale-102'
                  : 'bg-white border-neutral-200/80 hover:border-yellow-400 hover:shadow-md text-neutral-900'
              }`}
            >
              {/* Category Image Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-neutral-100 mb-2 relative flex items-center justify-center shadow-xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div
                  className={`absolute inset-0 transition-colors flex items-center justify-center ${
                    isActive ? 'bg-black/40 text-yellow-400' : 'bg-black/10 group-hover:bg-transparent text-white opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {getCategoryIcon(cat.slug)}
                </div>
              </div>

              <span className={`text-[11px] sm:text-xs font-bold leading-tight truncate w-full ${isActive ? 'text-[#FFD600] font-black' : 'text-neutral-900 group-hover:text-amber-700'}`}>
                {cat.name.replace(' & Beauty', '').replace(' Collections', '').replace(' Consoles', '').replace(' Gadgets', '')}
              </span>
              <span
                className={`text-[9px] font-mono mt-0.5 truncate w-full ${
                  isActive ? 'text-neutral-300 font-semibold' : 'text-neutral-400'
                }`}
              >
                {cat.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

