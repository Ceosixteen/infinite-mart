import React from 'react';
import { ShieldCheck, Truck, Smartphone, CheckCircle, MapPin, Phone, Mail, MessageCircle, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleCategoryClick = (catSlug: string) => {
    setActiveCategory(catSlug);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-neutral-900 text-white mt-14 pt-12 pb-24 sm:pb-16 border-t border-neutral-800 select-none">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Top Store Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-neutral-800 pb-8 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-white">6-Month Warranty</div>
              <div className="text-[11px] text-neutral-400">Guaranteed Replacement</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-white">Express Juba Delivery</div>
              <div className="text-[11px] text-neutral-400">Doorstep Same-Day Arrival</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-white">m-GURUSH & MoMo</div>
              <div className="text-[11px] text-neutral-400">Mobile Money & Cash on Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-white">100% Genuine Products</div>
              <div className="text-[11px] text-neutral-400">Authentic UAE & US Imports</div>
            </div>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 text-black font-black rounded-xl flex items-center justify-center text-lg">
                ⚡
              </div>
              <span className="font-black text-lg tracking-tight text-white">INFINITE MART</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Your Premier Electronics, Arabian Perfume & Smart Home Mega Store in Juba, South Sudan. Guaranteed authentic smartphones, Apple MacBooks, Lattafa fragrances, and beauty essentials.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://wa.me/211911267703"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-2.5">
            <div className="font-bold text-yellow-400 uppercase tracking-wider">Mega Catalog</div>
            <ul className="space-y-1.5 text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('smartphones')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Smartphones (Samsung S25 & iPhone)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('perfumes')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Arabian Perfumes (Lattafa Khamrah, Asad)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('laptops')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  MacBooks & Gaming Computers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('skincare')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Petrova Hair Oils & Korean Skincare
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('gaming')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  PlayStation 5 & Gaming Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantees Col */}
          <div className="space-y-2.5">
            <div className="font-bold text-yellow-400 uppercase tracking-wider">Store Guarantees</div>
            <ul className="space-y-1.5 text-neutral-400">
              <li>✓ 6-Month Official Replacement Warranty</li>
              <li>✓ Same-Day Express Juba Town Delivery</li>
              <li>✓ Mobile Money (m-GURUSH / MTN MoMo)</li>
              <li>✓ Cash on Delivery & Showroom Pickup</li>
              <li>✓ Verified UAE Hologram Perfumes</li>
            </ul>
          </div>

          {/* Showroom Contact Col */}
          <div className="space-y-2.5">
            <div className="font-bold text-yellow-400 uppercase tracking-wider">Juba Showroom Contact</div>
            <div className="space-y-2 text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Juba Town Commercial Hub, Main Street, Juba, South Sudan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>+211 911 267 703</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>sales@infinitemart.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2026 Infinite Mart South Sudan. Part of the ASAI Holdings Network.
          </div>
          <div className="flex items-center gap-4">
            <span>Showroom Hours: Mon - Sun (8:00 AM - 9:00 PM)</span>
            <span>•</span>
            <span className="text-yellow-400 font-bold">1$ = 8,000 SSP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
