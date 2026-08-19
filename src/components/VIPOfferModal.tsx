import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, X, Sparkles, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

export const VIPOfferModal: React.FC = () => {
  const { isVIPModalOpen, setIsVIPModalOpen, applyCouponCode, showToast } = useStore();
  const [claimed, setClaimed] = useState(false);

  const handleClaimVIPOffer = () => {
    setClaimed(true);
    applyCouponCode('VIP10');
    navigator.clipboard.writeText('VIP10');
    showToast('🎉 VIP10 Claimed! 10% Storewide Discount Activated!');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  return (
    <>
      {/* Floating Bottom-Left VIP Offer Trigger */}
      <button
        id="vip-offer-fab-btn"
        type="button"
        onClick={() => setIsVIPModalOpen(true)}
        className="fixed bottom-6 left-4 sm:left-6 z-40 bg-gray-900 border border-gray-700 hover:border-yellow-400 text-white px-3.5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer backdrop-blur-md"
      >
        <Gift className="w-4 h-4 text-yellow-400 animate-bounce" />
        <span>Get VIP Offers (10% OFF)</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isVIPModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVIPModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-br from-gray-950 via-neutral-900 to-black text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-yellow-500/50 shadow-2xl z-10 text-center space-y-4 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-yellow-400/20 rounded-full blur-2xl" />

              <button
                type="button"
                onClick={() => setIsVIPModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 bg-yellow-400 text-black rounded-3xl flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
                🎁
              </div>

              <div>
                <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-yellow-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  VIP Member Welcome Gift
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Unlock 10% OFF Storewide
                </h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Enjoy an exclusive instant discount across all electronics, Arabian perfumes (Lattafa), beauty essentials, and home gadgets in Juba!
                </p>
              </div>

              {/* Coupon Box */}
              <div className="bg-gray-900 border-2 border-dashed border-yellow-400/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-mono font-bold">VIP Promo Code:</div>
                  <div className="text-xl font-black text-yellow-400 font-mono tracking-wider">VIP10</div>
                </div>
                <button
                  type="button"
                  onClick={handleClaimVIPOffer}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                >
                  {claimed ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
                  <span>{claimed ? 'Applied!' : 'Claim Code'}</span>
                </button>
              </div>

              <div className="text-[11px] text-gray-400">
                ✓ Valid on all current catalog items • No expiry during this session
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
