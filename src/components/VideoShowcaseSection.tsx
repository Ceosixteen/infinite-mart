import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Instagram, Facebook, Play, X, Eye, ExternalLink } from 'lucide-react';
import { SHOWCASES } from '../data/showcases';
import { VideoShowcase } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatters';

export const VideoShowcaseSection: React.FC = () => {
  const { products, setQuickViewProduct, currency, rateSSP } = useStore();
  const [activeVideoModal, setActiveVideoModal] = useState<VideoShowcase | null>(null);

  const handleOpenProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
      setActiveVideoModal(null);
    }
  };

  return (
    <section id="social-showcase-section" className="bg-white border border-neutral-200/80 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
              As Seen On TikTok, Instagram & Facebook Juba
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real customer unboxing videos, product price reveals, and tech showcases in South Sudan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Facebook className="w-3.5 h-3.5 text-blue-600" />
            <span>Facebook Page</span>
          </a>
          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noreferrer"
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-black" />
            <span>TikTok Channel</span>
          </a>
        </div>
      </div>

      {/* 3-4 Grid Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {SHOWCASES.map((showcase) => (
          <div
            key={showcase.id}
            onClick={() => setActiveVideoModal(showcase)}
            className="bg-neutral-50 border border-neutral-200 hover:border-yellow-400 rounded-2xl p-3 flex gap-3 items-center group cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 shrink-0 relative">
              <img
                src={showcase.thumbnail}
                alt={showcase.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <div className="w-7 h-7 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md">
                  <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1 rounded font-bold">
                {showcase.videoDuration}
              </span>
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="text-[10px] font-bold text-amber-700 font-mono uppercase flex items-center gap-1">
                {showcase.platform === 'tiktok' && <Video className="w-3 h-3 text-black" />}
                {showcase.platform === 'instagram' && <Instagram className="w-3 h-3 text-rose-500" />}
                {showcase.platform === 'facebook' && <Facebook className="w-3 h-3 text-blue-600" />}
                <span className="truncate">{showcase.platform.toUpperCase()} JUBA</span>
              </div>

              <div className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                {showcase.title}
              </div>

              <div className="text-[10px] text-neutral-500 truncate">
                {showcase.handle} • {showcase.views}
              </div>

              <div className="text-xs font-black text-emerald-700">
                {formatPrice(showcase.priceUSD, currency, rateSSP)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-neutral-950 text-white rounded-3xl p-5 max-w-lg w-full z-10 space-y-4 border border-yellow-500/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded">
                  {activeVideoModal.platform.toUpperCase()} SHOWCASE
                </span>
                <h4 className="text-base font-bold text-white pt-1">
                  {activeVideoModal.title}
                </h4>
              </div>

              {/* Video stage preview */}
              <div className="w-full h-64 rounded-2xl bg-neutral-900 overflow-hidden relative flex items-center justify-center border border-neutral-800">
                <img
                  src={activeVideoModal.thumbnail}
                  alt=""
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40">
                  <div className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-2xl">
                    <Play className="w-6 h-6 fill-black ml-1" />
                  </div>
                  <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full">
                    Showroom Clip Preview ({activeVideoModal.views})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-xs text-neutral-400">Featured In Video:</div>
                  <div className="text-sm font-black text-yellow-400">
                    {formatPrice(activeVideoModal.priceUSD, currency, rateSSP)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenProduct(activeVideoModal.productId)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Product Details</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
