import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'SALE200',
    title: 'Extra $200 Off',
    subtitle: 'On 5G Smartphones & Flagships',
    discountFixedUSD: 200,
    minSpendUSD: 800,
    categoryLimit: 'smartphones',
    expiry: 'Ends in 3 days',
    accentColor: 'amber'
  },
  {
    code: 'LUXE15',
    title: '15% Off Arabian Perfumes',
    subtitle: 'On Lattafa, Asad, Yara & Petrova Oils',
    discountPercent: 15,
    minSpendUSD: 30,
    categoryLimit: 'perfumes',
    expiry: 'Active Today',
    accentColor: 'rose'
  },
  {
    code: 'B5G5',
    title: 'Buy 2, Get 15% Off',
    subtitle: 'On ANC Audio, Earbuds & Boombox',
    discountPercent: 15,
    minSpendUSD: 60,
    categoryLimit: 'audio',
    expiry: 'Limited Juba Stock',
    accentColor: 'yellow'
  },
  {
    code: 'SAVEBIG',
    title: 'Extra 10% Off Up To $100',
    subtitle: 'On MacBooks, Laptops & NVMe Storage',
    discountPercent: 10,
    minSpendUSD: 100,
    categoryLimit: 'laptops',
    expiry: 'Weekend Flash Deal',
    accentColor: 'orange'
  },
  {
    code: 'FREEGIFT',
    title: 'Free 3-in-1 Wireless Charger',
    subtitle: 'Worth $35 on all orders over $200',
    discountFixedUSD: 35,
    minSpendUSD: 200,
    expiry: 'First 50 Orders',
    accentColor: 'amber'
  }
];
