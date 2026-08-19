import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, Printer, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { formatPrice, buildWhatsAppOrderUrl } from '../utils/formatters';
import { addOrder } from '../admin/data';

const JUBA_AREAS = [
  'Juba Town Commercial Hub (Showroom Pickup)',
  'Hai Cinema, Juba',
  'Munuki Block 1 & 2, Juba',
  'Tongping / Airport Road',
  'Gudele Block 7, 8 & 9',
  'Rock City Residential',
  'Atlabara / Custom Market Area',
  'Other Juba Location (Doorstep Delivery)'
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotalUSD,
    cartDiscountUSD,
    cartTotalUSD,
    appliedCoupon,
    currency,
    rateSSP
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+211 ');
  const [email, setEmail] = useState('');
  const [deliveryArea, setDeliveryArea] = useState(JUBA_AREAS[0]);
  const [specificAddress, setSpecificAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'mgurush' | 'momo' | 'card'>('cash_on_delivery');
  const [notes, setNotes] = useState('');

  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please provide your full name and phone number for delivery dispatch.');
      return;
    }

    const newOrderId = `IM-JUBA-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(newOrderId);
    setOrderConfirmed(true);

    addOrder({
      id: newOrderId,
      customerName: fullName,
      phone,
      email: email || undefined,
      deliveryArea,
      specificAddress: specificAddress || undefined,
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        priceUSD: item.product.priceUSD,
        variant: item.selectedVariant,
        color: item.selectedColor
      })),
      subtotalUSD: cartSubtotalUSD,
      discountUSD: cartDiscountUSD,
      totalUSD: cartTotalUSD,
      couponCode: appliedCoupon?.code,
      paymentMethod: paymentMethod.toUpperCase().replace(/_/g, ' '),
      status: 'pending',
      placedAt: new Date().toISOString()
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSendWhatsAppConfirmation = () => {
    const url = buildWhatsAppOrderUrl(
      cart,
      cartTotalUSD,
      currency,
      rateSSP,
      fullName,
      `${deliveryArea} (${specificAddress || 'Call on arrival'})`,
      paymentMethod.toUpperCase().replace(/_/g, ' '),
      appliedCoupon?.code
    );
    window.open(url, '_blank');
  };

  const handleCloseAndReset = () => {
    clearCart();
    setOrderConfirmed(false);
    setIsCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !orderConfirmed && setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto z-10 p-5 sm:p-7"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={orderConfirmed ? handleCloseAndReset : () => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!orderConfirmed ? (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div>
                <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
                  Express Order Dispatch
                </span>
                <h3 className="text-xl font-black text-neutral-900 mt-0.5">
                  Complete Your Infinite Mart Order
                </h3>
                <p className="text-xs text-neutral-500">
                  Fast same-day delivery across Juba. Guaranteed authentic items with replacement warranty.
                </p>
              </div>

              {/* Order Summary Pill Box */}
              <div className="bg-yellow-50/80 border border-yellow-300/80 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-neutral-900 border-b border-yellow-200/80 pb-2">
                  <span>Ordered Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="font-black text-base">{formatPrice(cartTotalUSD, currency, rateSSP)}</span>
                </div>
                <div className="max-h-24 overflow-y-auto space-y-1 text-neutral-600">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="truncate pr-2">• {item.product.title} x{item.quantity}</span>
                      <span className="font-mono font-bold text-neutral-900 shrink-0">
                        {formatPrice(item.product.priceUSD * item.quantity, currency, rateSSP)}
                      </span>
                    </div>
                  ))}
                </div>
                {appliedCoupon && (
                  <div className="text-emerald-700 font-bold flex justify-between pt-1">
                    <span>Coupon ({appliedCoupon.code}) Discount:</span>
                    <span>-{formatPrice(cartDiscountUSD, currency, rateSSP)}</span>
                  </div>
                )}
              </div>

              {/* Delivery Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  1. Delivery Details in Juba
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Emmanuel Lado"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                      Phone Number (WhatsApp / m-GURUSH) *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+211 911 267 703"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-black focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                      Juba Delivery Area / Showroom *
                    </label>
                    <select
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-black focus:outline-none cursor-pointer"
                    >
                      {JUBA_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                      Specific Landmark or Building
                    </label>
                    <input
                      type="text"
                      value={specificAddress}
                      onChange={(e) => setSpecificAddress(e.target.value)}
                      placeholder="e.g. Near Catholic University or Total Station"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  2. Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-black bg-yellow-50 shadow-sm ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Cash on Delivery</div>
                      <div className="text-[10px] text-neutral-500">Pay when order arrives in Juba</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mgurush')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'mgurush'
                        ? 'border-black bg-yellow-50 shadow-sm ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">m-GURUSH Mobile Money</div>
                      <div className="text-[10px] text-neutral-500">Fast SSP / USD Direct Transfer</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'momo'
                        ? 'border-black bg-yellow-50 shadow-sm ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">MTN MoMo South Sudan</div>
                      <div className="text-[10px] text-neutral-500">Instant mobile wallet checkout</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-black bg-yellow-50 shadow-sm ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Visa / Mastercard / POS</div>
                      <div className="text-[10px] text-neutral-500">Card payment at showroom or doorstep</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-neutral-200">
                <button
                  id="checkout-confirm-order-btn"
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3.5 px-5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Confirm Order ({formatPrice(cartTotalUSD, currency, rateSSP)})</span>
                </button>
              </div>
            </form>
          ) : (
            /* Order Confirmed Receipt View */
            <div id="printable-receipt" className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ✓ Order Successfully Confirmed
                </span>
                <h3 className="text-2xl font-black text-neutral-900 mt-2">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-mono font-bold">
                  Order Reference: {confirmedOrderId}
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="font-bold text-neutral-900 border-b border-neutral-200 pb-2">
                  Invoice & Delivery Summary
                </div>
                <div className="grid grid-cols-2 gap-2 text-neutral-600">
                  <div><strong>Customer:</strong> {fullName}</div>
                  <div><strong>Phone:</strong> {phone}</div>
                  <div><strong>Delivery Destination:</strong> {deliveryArea}</div>
                  <div><strong>Payment Mode:</strong> {paymentMethod.toUpperCase()}</div>
                  <div><strong>Total (USD):</strong> ${cartTotalUSD.toLocaleString()}</div>
                  <div><strong>Total (SSP):</strong> {Math.round(cartTotalUSD * rateSSP).toLocaleString()} SSP</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSendWhatsAppConfirmation}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp Hotline</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-yellow-400 font-bold px-4 py-3 rounded-xl text-xs cursor-pointer"
                >
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
