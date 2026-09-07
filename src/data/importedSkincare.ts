import { Product } from '../types';
import { PRODUCT_IMAGE_BY_SKU } from './productImages';

const ROWS = [
  {
    "name": "Nivea Men Power 24hr Fresh Effect Shower Gel (250ml)",
    "sku": "nivea-power-24hr-shower-gel",
    "description": "Packed with a potent citrus fragrance blend and 24-hour freshness technology. Delivers a powerful clean that actively fights off body odor all day long.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men Active Clean Shower Gel (250ml)",
    "sku": "nivea-active-clean-shower-gel",
    "description": "Infused with Natural Active Charcoal, which acts like a magnet to draw out deep impurities, oil, and pollution from your pores without stripping skin moisture.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men Pure Impact Shower Gel (250ml)",
    "sku": "nivea-pure-impact-shower-gel",
    "description": "Features innovative micro-particles that gently exfoliate the skin while you wash. Scrubs away dead skin cells and deep-seated dirt for an intensely clean feeling.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men Boost Shower Gel (250ml)",
    "sku": "nivea-boost-shower-gel",
    "description": "Infused with natural Guarana Extract to give your mind and body an instant kick-start. Delivers a rich, conditioning lather with a sharp, energizing fragrance.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men Sensitive Shower Gel (250ml)",
    "sku": "nivea-sensitive-shower-gel",
    "description": "Enriched with soothing Bamboo Extract, this ultra-gentle formula cleanses without drying out or irritating sensitive skin. Provides immediate relief from redness and tightness.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men Cool Kick Shower Gel (250ml)",
    "sku": "nivea-cool-kick-shower-gel",
    "description": "Powered by cooling Menthol to deliver an instant icy wave across your skin. Cools down body temperature while effectively lifting sweat and grime.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men Energy 24hr Fresh Effect Shower Gel (250ml)",
    "sku": "nivea-energy-24hr-shower-gel",
    "description": "Formulated with invigorating Mint Extract and a fresh citrus scent that instantly wakes up your senses. Leaves you feeling energized and refreshed for a full 24 hours.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "Nivea Men All-In-1 Charcoal Face Wash (100g)",
    "sku": "nivea-all-in-1-facewash",
    "description": "The ultimate multi-action powerhouse. Fights pimples, controls oil production for up to 12 hours, clears blackheads, and prevents future breakouts while detoxifying the skin with active charcoal.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Nivea Men Deep Impact Face Wash (100g)",
    "sku": "nivea-deep-impact-facewash",
    "description": "Infused with Black Charcoal, it acts like a magnet to extract deep-seated dirt, pollution, and impurities from your pores. Leaves your skin feeling intensely refreshed, clean, and invigorated.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Nivea Men Dark Spot Reduction Face Wash (100g)",
    "sku": "nivea-dark-spot-facewash",
    "description": "Powered by whitening and vitamin-rich complexes to target dark spots caused by dirt, oil, and sun exposure. Gently cleanses while helping to visibly brighten and even out skin tone without drying out your face.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Medix 5.5 Hyaluronic Acid + Cica Body Cream",
    "sku": "medix-hyaluronic-cica-cream",
    "description": "Hyaluronic Acid draws moisture deep into the skin's surface, while Cica (Centella Asiatica) calms and soothes irritated or stressed skin, leaving a plump, dewy, bounce-back finish.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "Medix 5.5 Retinol + Ferulic Acid Age Rewind Body Cream",
    "sku": "medix-retinol-ferulic-cream",
    "description": "Infused with pure Retinol (Vitamin A) and Ferulic Acid, this body cream visibly smooths crepey skin, firms sagging areas, and softens fine lines while boosting skin elasticity.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "Medix 5.5 Argan Oil + Vitamin E Body Cream",
    "sku": "medix-argan-vite-cream",
    "description": "Blending pure Moroccan Argan Oil with conditioning Vitamin E, this body cream provides instant relief for dry, flaky, or weather-torn skin, locking in moisture for hours.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "Medix 5.5 Vitamin C + Turmeric Body Lotion",
    "sku": "medix-vitc-turmeric-lotion",
    "description": "Packed with brightening Vitamin C and antioxidant-rich turmeric, this body lotion fades sun damage, targets dark spots, and evens out skin tone while leaving you with a luminous finish.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "Head & Shoulders Daily Clean Shampoo",
    "sku": "hs-daily-clean",
    "description": "A refreshing, deep-cleaning formula designed for everyday use. Washes away daily oil, dirt, and styling buildup while maintaining your scalp's natural balance and keeping you 100% flake-free.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Head & Shoulders Extra Volume Daily Clean Shampoo",
    "sku": "hs-extra-volume",
    "description": "Lightweight, clarifying formula that washes away excess oil and buildup without weighing your hair down. Lifts hair from the roots to deliver an instant boost of body, bounce, and volume.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Head & Shoulders Total Care Shampoo",
    "sku": "hs-total-care",
    "description": "Cleanses the scalp deeply, protects against itching and dryness, and conditions the hair strands simultaneously for complete, multi-benefit care.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Head & Shoulders Silk & Smooth Shampoo",
    "sku": "hs-silk-smooth",
    "description": "Dual-action formula that fights stubborn flakes while locking in moisture. Tames frizz, smooths out unruly cuticles, and leaves your hair feeling silky, soft, and manageable from root to tip.",
    "price": 15,
    "stock": 10
  },
  {
    "name": "Dove Cocoa Butter Beauty Bar (135g)",
    "sku": "dove-cocoa-butter-beauty-bar",
    "description": "Blended with rich cocoa butter and a warm, comforting fragrance. Melts into a creamy lather that deeply nourishes parched skin while wrapping you in a soothing sensory experience.",
    "price": 6,
    "stock": 10
  },
  {
    "name": "Dove Serum Bar (Care-In-Shower / Advanced Serum Infused) (135g)",
    "sku": "dove-serum-bar",
    "description": "Upgraded with advanced skincare serum technology. Actively targets dry spots and deeply conditions the skin surface, locking in moisture long after you step out of the shower.",
    "price": 6,
    "stock": 10
  },
  {
    "name": "Dove Pink (Sensitive / Beauty Cream Bar) (135g)",
    "sku": "dove-pink-beauty-cream-bar",
    "description": "Features a delicate pink hue and a subtle, comforting fragrance while offering the same rich, nourishing 1/4 moisturizing cream blend to soften and care for delicate skin.",
    "price": 6,
    "stock": 10
  },
  {
    "name": "Dove Original Beauty Bar (135g)",
    "sku": "dove-original-beauty-bar",
    "description": "Gentle cleansers combined with Dove's signature 1/4 moisturizing cream maintain your skin's natural moisture barrier, preventing that tight, dry feeling.",
    "price": 6,
    "stock": 10
  },
  {
    "name": "CeraVe Moisturizing Cream",
    "sku": "cerave-moisturizing-cream",
    "description": "A rich, non-greasy cream that provides 24-hour hydration and helps restore the protective skin barrier with three essential ceramides and hyaluronic acid. Suitable for face, body, and hands, it leaves skin feeling soft, smooth, and comfortable.",
    "price": 30,
    "stock": 10
  },
  {
    "name": "CeraVe Resurfacing Retinol Serum",
    "sku": "cerave-retinol-serum",
    "description": "A lightweight, fast-absorbing serum that helps resurface skin, reduce the appearance of post-acne marks, and minimize pores. Encapsulated retinol works overnight while licorice root extract brightens and niacinamide soothes, all backed by three essential ceramides.",
    "price": 20,
    "stock": 10
  },
  {
    "name": "CeraVe Moisturizing Lotion",
    "sku": "cerave-moisturizing-lotion",
    "description": "A lightweight, oil-free daily lotion that hydrates and helps restore the skin barrier with three essential ceramides. MVE Technology delivers a slow release of moisture for 24-hour hydration, leaving skin feeling comfortable, never greasy.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "CeraVe Hydrating Toner",
    "sku": "cerave-hydrating-toner",
    "description": "A pH-balanced, alcohol-free toner that hydrates and smooths skin while removing leftover makeup and impurities after cleansing. Ceramides restore the skin barrier while hyaluronic acid and niacinamide calm and visibly smooth skin.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "CeraVe Hydrating Cleanser",
    "sku": "cerave-hydrating-cleanser",
    "description": "A lightweight, non-foaming gel cleanser that gently removes dirt, oil, and makeup without disturbing the skin barrier. Formulated with niacinamide, squalane, glycerin, and hyaluronic acid for normal to dry skin that needs comfort, not stripping.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "CeraVe Renewing SA Cleanser",
    "sku": "cerave-renewing-sa-cleanser",
    "description": "A gentle exfoliating cleanser with salicylic acid that softens and smooths rough, bumpy skin without harsh microbeads. Enriched with ceramides, hyaluronic acid, niacinamide, and antioxidant vitamin D to keep moisture in while sweeping away dead skin and dirt.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "CeraVe Acne Control Cleanser",
    "sku": "cerave-acne-cleanser",
    "description": "A gel-to-foam acne treatment cleanser that reduces blackheads and helps prevent new breakouts. Combines 2% salicylic acid with purifying hectorite clay and oil-absorbing technology, while three essential ceramides and niacinamide keep the skin barrier comfortable and never over-dried.",
    "price": 25,
    "stock": 10
  },
  {
    "name": "CeraVe Foaming Facial Cleanser",
    "sku": "cerave-foaming-cleanser",
    "description": "A gel-based foaming cleanser for normal to oily skin. Removes dirt, oil, and makeup without disrupting the protective skin barrier, leaving skin feeling clean, never tight or stripped.",
    "price": 25,
    "stock": 10
  }
] as const;

export const IMPORTED_SKINCARE: Product[] = ROWS.map((row, index) => ({
  id: 'import-' + row.sku,
  slug: row.sku,
  title: row.name,
  category: 'skincare',
  subCategory: row.sku.startsWith('cerave-') ? 'CeraVe Skincare' : row.sku.startsWith('nivea-') ? 'Nivea Men Care' : row.sku.startsWith('medix-') ? 'Medix 5.5 Body Care' : row.sku.startsWith('dove-') ? 'Dove Beauty Bars' : 'Hair & Body Care',
  priceUSD: row.price,
  originalPriceUSD: Math.ceil(row.price * 1.2),
  discountBadge: 'ORIGINAL PRODUCT',
  rating: 4.8,
  reviewCount: 31 + (index % 91),
  images: [PRODUCT_IMAGE_BY_SKU[row.sku] || 'https://images.unsplash.com/photo-1608248597359-00994fcfd74e?auto=format&fit=crop&w=800&q=80'],
  description: row.description,
  features: ['Original branded formula', 'Sealed imported stock', 'Available for delivery across Juba'],
  specs: [{ label: 'SKU', value: row.sku }, { label: 'Unit', value: 'Each' }, { label: 'Brand', value: row.name.split(' ')[0] }],
  inStock: row.stock > 0,
  stockCount: row.stock,
  tags: row.name.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\\s+/).filter(Boolean),
  isFeatured: index < 6,
  isBestSeller: /cerave|retinol|acne|hydrating/i.test(row.name),
  warranty: '100% Authentic Product Guarantee'
}));

