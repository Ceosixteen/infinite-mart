import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { PromoBannerGrid } from './components/PromoBannerGrid';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIChatAssistant } from './components/AIChatAssistant';
import { VIPOfferModal } from './components/VIPOfferModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ExchangeRateModal } from './components/ExchangeRateModal';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-sans antialiased flex flex-col selection:bg-yellow-400 selection:text-black">
        {/* Top Header & Store Selector */}
        <Header />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-8 sm:space-y-10 flex-1 w-full">
          {/* Categories Grid */}
          <CategoryNav />

          {/* Savings & Coupons Grid */}
          <PromoBannerGrid />

          {/* Hero Spotlight Deal */}
          <HeroBanner />

          {/* Full Catalog with Filters & Smooth Animations */}
          <ProductGrid />

          {/* Video Social Showcase (TikTok / Instagram) */}
          <VideoShowcaseSection />

          {/* Customer Reviews & Feedback */}
          <ReviewsSection />
        </main>

        {/* Global Footer */}
        <Footer />

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
