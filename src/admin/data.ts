import { Product } from '../types';
import { PRODUCTS as BASE_PRODUCTS } from '../data/products';

const NS = 'infinitemart_admin_';

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {}
}

// ---------- Orders ----------
export interface AdminOrderItem {
  productId: string;
  title: string;
  quantity: number;
  priceUSD: number;
  variant?: string;
  color?: string;
}

export type OrderStatus = 'pending' | 'delivered' | 'canceled';

export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryArea: string;
  specificAddress?: string;
  items: AdminOrderItem[];
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  couponCode?: string;
  paymentMethod: string;
  status: OrderStatus;
  placedAt: string;
}

function buildSeedOrders(): AdminOrder[] {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  return [
    {
      id: 'IM-JUBA-501234',
      customerName: 'Akol Garang',
      phone: '+211 921 445 210',
      email: 'akol.garang@example.com',
      deliveryArea: 'Juba Town Commercial Hub (Showroom Pickup)',
      items: [{ productId: 'prod-s25-ultra', title: 'Samsung Galaxy S25 Ultra 5G (512GB)', quantity: 1, priceUSD: 999 }],
      subtotalUSD: 999,
      discountUSD: 200,
      totalUSD: 799,
      couponCode: 'SALE200',
      paymentMethod: 'CASH ON DELIVERY',
      status: 'delivered',
      placedAt: new Date(now - 5 * day).toISOString()
    },
    {
      id: 'IM-JUBA-501987',
      customerName: 'Nyandeng Chol',
      phone: '+211 917 802 331',
      deliveryArea: 'Munuki Block 1 & 2, Juba',
      items: [{ productId: 'prod-macbook-air-m3', title: 'MacBook Air M3 15-inch (16GB RAM / 512GB SSD)', quantity: 1, priceUSD: 1150 }],
      subtotalUSD: 1150,
      discountUSD: 115,
      totalUSD: 1035,
      couponCode: 'SAVEBIG',
      paymentMethod: 'MGURUSH',
      status: 'delivered',
      placedAt: new Date(now - 3 * day).toISOString()
    },
    {
      id: 'IM-JUBA-502115',
      customerName: 'Peter Lomude',
      phone: '+211 900 112 004',
      deliveryArea: 'Gudele Block 7, 8 & 9',
      items: [{ productId: 'prod-lattafa-khamrah', title: 'Lattafa Khamrah Eau De Parfum', quantity: 2, priceUSD: 48 }],
      subtotalUSD: 96,
      discountUSD: 14.4,
      totalUSD: 81.6,
      couponCode: 'LUXE15',
      paymentMethod: 'MOMO',
      status: 'pending',
      placedAt: new Date(now - 1 * day).toISOString()
    },
    {
      id: 'IM-JUBA-502290',
      customerName: 'Grace Aluel',
      phone: '+211 928 663 771',
      deliveryArea: 'Hai Cinema, Juba',
      items: [{ productId: 'prod-ps5-slim', title: 'PlayStation 5 Digital Slim Console (1TB)', quantity: 1, priceUSD: 450 }],
      subtotalUSD: 450,
      discountUSD: 0,
      totalUSD: 450,
      paymentMethod: 'CASH ON DELIVERY',
      status: 'canceled',
      placedAt: new Date(now - 8 * day).toISOString()
    },
    {
      id: 'IM-JUBA-502444',
      customerName: 'Simon Deng Wol',
      phone: '+211 921 445 210',
      deliveryArea: 'Rock City Residential',
      items: [{ productId: 'prod-s25-ultra', title: 'Samsung Galaxy S25 Ultra 5G (512GB)', quantity: 1, priceUSD: 999, variant: 'Titanium Black' }],
      subtotalUSD: 999,
      discountUSD: 0,
      totalUSD: 999,
      paymentMethod: 'CARD',
      status: 'pending',
      placedAt: new Date(now - 0.4 * day).toISOString()
    }
  ];
}

export function getOrders(): AdminOrder[] {
  const existing = read<AdminOrder[]>('orders');
  if (existing) return existing;
  const seeded = buildSeedOrders();
  write('orders', seeded);
  return seeded;
}

export function addOrder(order: AdminOrder) {
  write('orders', [order, ...getOrders()]);
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  write(
    'orders',
    getOrders().map((o) => (o.id === id ? { ...o, status } : o))
  );
}

export function deleteOrder(id: string) {
  write(
    'orders',
    getOrders().filter((o) => o.id !== id)
  );
}

// ---------- Email leads ----------
export interface EmailLead {
  email: string;
  source: string;
  capturedAt: string;
}

export function getEmailLeads(): EmailLead[] {
  return read<EmailLead[]>('leads') ?? [];
}

export function addEmailLead(email: string, source = 'Homepage') {
  const leads = getEmailLeads();
  if (leads.some((l) => l.email.toLowerCase() === email.toLowerCase())) return false;
  write('leads', [{ email, source, capturedAt: new Date().toISOString() }, ...leads]);
  return true;
}

// ---------- Campaigns ----------
export interface Campaign {
  id: string;
  title: string;
  message: string;
  sentAt: string;
  recipientCount: number;
}

export function getCampaigns(): Campaign[] {
  return read<Campaign[]>('campaigns') ?? [];
}

export function addCampaign(title: string, message: string) {
  const recipientCount = getClients().length;
  const campaign: Campaign = {
    id: `CMP-${Date.now()}`,
    title,
    message,
    sentAt: new Date().toISOString(),
    recipientCount
  };
  write('campaigns', [campaign, ...getCampaigns()]);
  return campaign;
}

// ---------- Product overrides (admin edits on top of static catalog) ----------
export interface ProductOverride {
  hidden?: boolean;
  priceUSD?: number;
  stockCount?: number;
}

export function getProductOverrides(): Record<string, ProductOverride> {
  return read<Record<string, ProductOverride>>('product_overrides') ?? {};
}

export function setProductOverride(productId: string, patch: Partial<ProductOverride>) {
  const all = getProductOverrides();
  all[productId] = { ...all[productId], ...patch };
  write('product_overrides', all);
}

export interface EffectiveProduct extends Product {
  hidden: boolean;
}

export function getEffectiveProducts(): EffectiveProduct[] {
  const overrides = getProductOverrides();
  return BASE_PRODUCTS.map((p) => {
    const o = overrides[p.id];
    const stockCount = o?.stockCount ?? p.stockCount;
    return {
      ...p,
      priceUSD: o?.priceUSD ?? p.priceUSD,
      stockCount,
      inStock: stockCount > 0,
      hidden: o?.hidden ?? false
    };
  });
}

// ---------- Clients (derived from orders) ----------
export interface AdminClient {
  name: string;
  phone: string;
  email?: string;
  orders: number;
  totalSpentUSD: number;
}

export function getClients(): AdminClient[] {
  const orders = getOrders();
  const map = new Map<string, AdminClient>();
  orders.forEach((o) => {
    const existing = map.get(o.phone);
    if (existing) {
      existing.orders += 1;
      existing.totalSpentUSD += o.totalUSD;
      if (o.email && !existing.email) existing.email = o.email;
    } else {
      map.set(o.phone, {
        name: o.customerName,
        phone: o.phone,
        email: o.email,
        orders: 1,
        totalSpentUSD: o.totalUSD
      });
    }
  });
  return Array.from(map.values()).sort((a, b) => b.totalSpentUSD - a.totalSpentUSD);
}

// ---------- Overview aggregates ----------
export function getRevenueByCategory(): { category: string; revenueUSD: number }[] {
  const orders = getOrders().filter((o) => o.status === 'delivered');
  const products = getEffectiveProducts();
  const byId = new Map(products.map((p) => [p.id, p]));
  const totals = new Map<string, number>();
  orders.forEach((o) => {
    o.items.forEach((item) => {
      const product = byId.get(item.productId);
      const category = product?.category ?? 'other';
      totals.set(category, (totals.get(category) ?? 0) + item.priceUSD * item.quantity);
    });
  });
  return Array.from(totals.entries())
    .map(([category, revenueUSD]) => ({ category, revenueUSD }))
    .sort((a, b) => b.revenueUSD - a.revenueUSD);
}
