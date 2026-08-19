import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, RefreshCw, Check, DollarSign } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ExchangeRateModal: React.FC = () => {
  const {
    isExchangeRateModalOpen,
    setIsExchangeRateModalOpen,
    rateSSP,
    setRateSSP,
    currency,
    setCurrency,
    showToast
  } = useStore();

  const [inputRate, setInputRate] = useState(rateSSP.toString());

  if (!isExchangeRateModalOpen) return null;

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(inputRate);
    if (!isNaN(val) && val > 0) {
      setRateSSP(val);
      showToast(`Exchange rate updated: 1 USD = ${val.toLocaleString()} SSP`);
      setIsExchangeRateModalOpen(false);
    }
  };

  const handlePreset = (presetValue: number) => {
    setInputRate(presetValue.toString());
    setRateSSP(presetValue);
    showToast(`Set rate to 1 USD = ${presetValue.toLocaleString()} SSP`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExchangeRateModalOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-neutral-200 shadow-2xl z-10 space-y-4"
        >
          <button
            type="button"
            onClick={() => setIsExchangeRateModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-neutral-900 text-base">
                Market Exchange Rate Settings
              </h3>
              <p className="text-xs text-neutral-500">
                South Sudan Pound (SSP) to USD Conversion
              </p>
            </div>
          </div>

          {/* Current Rate Display */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 text-center space-y-1">
            <div className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
              Current Active Store Rate:
            </div>
            <div className="text-2xl font-black text-neutral-900 font-mono">
              1 USD ($) = {rateSSP.toLocaleString()} SSP (£)
            </div>
          </div>

          {/* Rate Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700">Quick Market Presets:</label>
            <div className="grid grid-cols-3 gap-2">
              {[3400, 3500, 3600].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    rateSSP === preset
                      ? 'bg-black text-yellow-400 shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                  }`}
                >
                  {preset.toLocaleString()} SSP
                </button>
              ))}
            </div>
          </div>

          {/* Custom rate form */}
          <form onSubmit={handleSaveRate} className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Custom Rate (SSP per 1 USD):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={inputRate}
                  onChange={(e) => setInputRate(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-mono font-bold focus:ring-2 focus:ring-black focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-bold">
                  SSP
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs py-3 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Apply Custom Rate
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrency(currency === 'USD' ? 'SSP' : 'USD');
                  setIsExchangeRateModalOpen(false);
                }}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs px-4 py-3 rounded-xl cursor-pointer"
              >
                Toggle to {currency === 'USD' ? 'SSP (£)' : 'USD ($)'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
