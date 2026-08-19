import { CurrencyCode, Product, CartItem } from '../types';

export function formatPrice(priceUSD: number, currency: CurrencyCode, rateSSP: number = 8000): string {
  if (currency === 'SSP') {
    const sspAmount = Math.round(priceUSD * rateSSP);
    return `${sspAmount.toLocaleString()} SSP`;
  }
  return `$${priceUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
}

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  totalUSD: number,
  currency: CurrencyCode,
  rateSSP: number,
  customerName?: string,
  deliveryArea?: string,
  paymentMethod?: string,
  appliedCoupon?: string
): string {
  const phone = '211911267703'; // Juba Fashion Hub / Infinite Mart WhatsApp Hotline
  
  let msg = `⚡ *NEW ORDER: INFINITE MART JUBA*\n\n`;
  if (customerName) msg += `👤 *Customer:* ${customerName}\n`;
  if (deliveryArea) msg += `📍 *Delivery Area:* ${deliveryArea}\n`;
  if (paymentMethod) msg += `💳 *Payment Method:* ${paymentMethod}\n`;
  if (appliedCoupon) msg += `🏷️ *Coupon Used:* ${appliedCoupon}\n`;
  
  msg += `\n🛒 *ORDERED ITEMS:*\n`;
  items.forEach((item, index) => {
    const variantStr = item.selectedVariant ? ` (${item.selectedVariant})` : '';
    const colorStr = item.selectedColor ? ` [${item.selectedColor}]` : '';
    msg += `${index + 1}. *${item.product.title}*${variantStr}${colorStr} x${item.quantity} - $${item.product.priceUSD * item.quantity}\n`;
  });

  const totalSSP = Math.round(totalUSD * rateSSP);
  msg += `\n💰 *TOTAL AMOUNT:*\n`;
  msg += `• USD: *$${totalUSD.toLocaleString()}*\n`;
  msg += `• SSP: *${totalSSP.toLocaleString()} SSP* (Rate: 1$ = ${rateSSP.toLocaleString()} SSP)\n\n`;
  msg += `🚚 Please confirm availability and express delivery schedule to my location in Juba. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
