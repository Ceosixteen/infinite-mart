import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { ModernStorefront } from './components/ModernStorefront';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIChatAssistant } from './components/AIChatAssistant';
import { VIPOfferModal } from './components/VIPOfferModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ExchangeRateModal } from './components/ExchangeRateModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
        <ModernStorefront />
        <main className="max-w-7xl mx-auto px-4 py-14">
          <ProductGrid />
        </main>

        {/* Global Modals & Drawers */}
        <QuickViewModal />
        <CartDrawer />
        <CheckoutModal />
        <WishlistDrawer />
        <ExchangeRateModal />
        <VIPOfferModal />
        <AIChatAssistant />
        <Toast />
      </div>
    </StoreProvider>
  );
}
