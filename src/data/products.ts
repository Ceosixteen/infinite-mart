import { Product } from '../types';
import { IMPORTED_PERFUMES } from './importedPerfumes';

const BASE_PRODUCTS: Product[] = [
  // --- SMARTPHONES & COMPUTING ---
  {
    id: 'prod-s25-ultra',
    slug: 'samsung-galaxy-s25-ultra',
    title: 'Samsung Galaxy S25 Ultra 5G (512GB)',
    category: 'smartphones',
    subCategory: 'Flagship Mobiles',
    priceUSD: 999,
    originalPriceUSD: 1199,
    discountBadge: 'PROMO $200 OFF',
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The pinnacle of smartphone engineering. Titanium construction, built-in S-Pen, revolutionary 200MP AI Quad Camera system, and Snapdragon 8 Gen 3 processor for supreme performance.',
    features: [
      'Snapdragon 8 Gen 3 for Galaxy Ultra Processor',
      '200MP Quad Camera with 100x Space Zoom',
      '6.8-inch Dynamic AMOLED 2X 120Hz Display',
      '5,000mAh Battery with 45W Fast Charging',
      'Integrated S-Pen Stylus with Bluetooth gestures'
    ],
    specs: [
      { label: 'Storage', value: '512GB NVMe' },
      { label: 'RAM', value: '12GB LPDDR5X' },
      { label: 'Network', value: '5G Dual SIM + eSIM' },
      { label: 'Water Resistance', value: 'IP68 Certified' }
    ],
    inStock: true,
    stockCount: 14,
    tags: ['5g', 'samsung', 'flagship', 'camera', 'titanium'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '12-Month Official Manufacturer Warranty',
    variants: [
      { name: 'Color', options: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'] },
      { name: 'Storage', options: ['512GB', '1TB'] }
    ]
  },
  {
    id: 'prod-macbook-air-m3',
    slug: 'macbook-air-m3-15-inch',
    title: 'MacBook Air M3 15-inch (16GB RAM / 512GB SSD)',
    category: 'laptops',
    subCategory: 'Apple Computers',
    priceUSD: 1150,
    originalPriceUSD: 1299,
    discountBadge: 'SAVE $149',
    rating: 4.9,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Impossibly thin and incredibly fast. Powered by Apple M3 chip with 10-core GPU, stunning Liquid Retina 15.3-inch display, and up to 18 hours of all-day battery life.',
    features: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      '15.3-inch Liquid Retina display with 500 nits brightness',
      '1080p FaceTime HD camera with three-mic array',
      'MagSafe 3 charging port with two Thunderbolt ports',
      'Six-speaker sound system with Spatial Audio'
    ],
    specs: [
      { label: 'Memory', value: '16GB Unified RAM' },
      { label: 'Storage', value: '512GB Superfast SSD' },
      { label: 'Weight', value: '1.51 kg' },
      { label: 'Battery', value: 'Up to 18 Hours' }
    ],
    inStock: true,
    stockCount: 8,
    tags: ['apple', 'macbook', 'm3', 'laptop', 'starlight'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '1-Year Apple International Warranty',
    variants: [
      { name: 'Color', options: ['Starlight Gold', 'Midnight Black', 'Space Gray', 'Silver'] }
    ]
  },
  {
    id: 'prod-ps5-slim',
    slug: 'playstation-5-digital-slim',
    title: 'PlayStation 5 Digital Slim Console + DualSense Controller',
    category: 'gaming',
    subCategory: 'Next-Gen Consoles',
    priceUSD: 450,
    originalPriceUSD: 499,
    discountBadge: 'HOT GAMING',
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience lightning-fast loading with an ultra-high speed 1TB SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    features: [
      'Custom 1TB Ultra-High Speed SSD',
      'Ray Tracing hardware acceleration at 4K 120Hz',
      'DualSense Wireless Controller with Haptic Feedback',
      'Tempest 3D AudioTech acoustic engine',
      'Slim & compact aerodynamic chassis'
    ],
    specs: [
      { label: 'Storage', value: '1TB Custom NVMe' },
      { label: 'Resolution', value: '4K 120Hz / 8K Output' },
      { label: 'Audio', value: 'Tempest 3D Audio' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.1, HDMI 2.1' }
    ],
    inStock: true,
    stockCount: 11,
    tags: ['sony', 'ps5', 'gaming', 'console', '4k'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '12-Month Official Warranty',
    variants: [
      { name: 'Edition', options: ['Digital Slim', 'Disc Slim Edition'] }
    ]
  },

  // --- ARABIAN LUXURY PERFUMES ---
  {
    id: 'prod-lattafa-khamrah',
    slug: 'lattafa-khamrah-eau-de-parfum',
    title: 'Lattafa Khamrah Eau De Parfum (100ml)',
    category: 'perfumes',
    subCategory: 'Arabian Luxury Fragrances',
    priceUSD: 48,
    originalPriceUSD: 65,
    discountBadge: 'BESTSELLER PERFUME',
    rating: 4.95,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The world-famous oriental warm spicy fragrance. Lattafa Khamrah opens with cinnamon, nutmeg, and bergamot, developing into delicious dates, praline, and tuberose, anchored by roasted tonka bean, benzoin, and rich vanilla wood.',
    features: [
      '100% Authentic Lattafa UAE Hologram Verified',
      'Long-lasting sillage (12+ hours skin longevity)',
      'Luxury crystal decanter presentation bottle',
      'Top Notes: Cinnamon, Nutmeg, Bergamot',
      'Base Notes: Vanilla, Tonka Bean, Benzoin, Akigalawood'
    ],
    specs: [
      { label: 'Volume', value: '100ml / 3.4 fl. oz.' },
      { label: 'Concentration', value: 'Eau De Parfum (EDP)' },
      { label: 'Origin', value: 'Dubai, UAE' },
      { label: 'Gender', value: 'Unisex Luxury' }
    ],
    inStock: true,
    stockCount: 35,
    tags: ['perfume', 'lattafa', 'khamrah', 'vanilla', 'cinnamon', 'arabian'],
    isFeatured: true,
    isBestSeller: true,
    warranty: 'Guaranteed 100% Original Authentic UAE Batch',
    variants: [
      { name: 'Edition', options: ['Original Khamrah EDP', 'Khamrah Qahwa (Coffee Edition)'] }
    ]
  },
  {
    id: 'prod-lattafa-asad',
    slug: 'lattafa-asad-eau-de-parfum',
    title: 'Lattafa Asad Men Eau De Parfum (100ml)',
    category: 'perfumes',
    subCategory: 'Arabian Luxury Fragrances',
    priceUSD: 45,
    originalPriceUSD: 60,
    discountBadge: 'VIRAL SCENT',
    rating: 4.9,
    reviewCount: 290,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A bold, commanding masculine fragrance with black pepper, pineapple, and tobacco notes entwined with coffee, patchouli, and rich dry amber wood. One of the highest-rated Arab perfumes globally.',
    features: [
      'Heavy magnetic cap luxury black & gold bottle',
      'High-projection projection and compliment puller',
      'Top Notes: Black Pepper, Pineapple, Tobacco',
      'Heart Notes: Coffee, Patchouli, Iris',
      'Base Notes: Amber, Vanilla, Dry Woods, Labdanum'
    ],
    specs: [
      { label: 'Volume', value: '100ml' },
      { label: 'Concentration', value: 'Eau De Parfum' },
      { label: 'Scent Profile', value: 'Spicy Amber Wood' },
      { label: 'Origin', value: 'Dubai, UAE' }
    ],
    inStock: true,
    stockCount: 28,
    tags: ['asad', 'lattafa', 'mens perfume', 'amber', 'tobacco'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '100% Authentic UAE Imported',
    variants: [
      { name: 'Size', options: ['100ml Full Bottle', '100ml + Deodorant Gift Set'] }
    ]
  },
  {
    id: 'prod-lattafa-yara',
    slug: 'lattafa-yara-pink-edp',
    title: 'Lattafa Yara Pink Eau De Parfum for Women (100ml)',
    category: 'perfumes',
    subCategory: 'Arabian Luxury Fragrances',
    priceUSD: 38,
    originalPriceUSD: 50,
    discountBadge: 'TRENDING #1',
    rating: 4.88,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An enchanting sweet gourmand bouquet. Creamy vanilla milkshake, heliotrope, tropical fruits, and delicate marshmallow florals drying down into warm sandalwood and sensual white musk.',
    features: [
      'Signature baby pink velvet luxury bottle',
      'Fluffy marshmallow and tropical floral notes',
      'Gentle, ultra-feminine, and long lasting',
      'Top Notes: Heliotrope, Orchid, Tangerine',
      'Heart Notes: Gourmand accord, Tropical Fruits',
      'Base Notes: Vanilla, Sandalwood, Musk'
    ],
    specs: [
      { label: 'Volume', value: '100ml' },
      { label: 'Concentration', value: 'Eau De Parfum' },
      { label: 'Profile', value: 'Sweet Creamy Floral Vanilla' },
      { label: 'Origin', value: 'Dubai, UAE' }
    ],
    inStock: true,
    stockCount: 40,
    tags: ['yara', 'pink', 'lattafa', 'vanilla', 'marshmallow', 'sweet'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '100% Genuine Lattafa Guaranteed',
    variants: [
      { name: 'Edition', options: ['Yara Pink (Original)', 'Yara Tous (Mango Yellow)', 'Yara Moi (White Peach)'] }
    ]
  },
  {
    id: 'prod-armaf-club-de-nuit',
    slug: 'armaf-club-de-nuit-intense-man',
    title: 'Club De Nuit Intense Man by Armaf (105ml)',
    category: 'perfumes',
    subCategory: 'Designer Fragrances',
    priceUSD: 42,
    originalPriceUSD: 58,
    discountBadge: 'ICONIC',
    rating: 4.92,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The legendary citrus-smoky woody masterpiece. Sharp lemon and blackcurrant opening bursting into smoky birch, jasmine, and deep ambergris musk.',
    features: [
      'Iconic black gem bottle with rhinestone chain',
      'Extreme longevity & beast-mode projection',
      'Top Notes: Lemon, Blackcurrant, Apple, Bergamot',
      'Base Notes: Ambergris, Birch, Musk, Patchouli'
    ],
    specs: [
      { label: 'Volume', value: '105ml' },
      { label: 'Concentration', value: 'Eau De Toilette / Parfum' },
      { label: 'Origin', value: 'Armaf Sterling Perfumes' }
    ],
    inStock: true,
    stockCount: 22,
    tags: ['armaf', 'club de nuit', 'smoky', 'citrus', 'creed vibe'],
    isFeatured: false,
    isBestSeller: true,
    warranty: 'Original UAE Stock',
    variants: [
      { name: 'Concentration', options: ['105ml EDT', '200ml Pure Parfum'] }
    ]
  },

  // --- AUDIO & WIRELESS HEADPHONES ---
  {
    id: 'prod-anc-headphones',
    slug: 'ultra-wireless-anc-headphones-pro',
    title: 'Ultra Wireless Noise-Canceling Headphones Pro',
    category: 'audio',
    subCategory: 'Over-Ear Headphones',
    priceUSD: 85,
    originalPriceUSD: 120,
    discountBadge: 'TOP SELLER',
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immerse in pure acoustics with Hybrid Active Noise Cancellation (ANC). 40mm titanium diaphragm drivers, 40-hour playtime, low latency gaming mode, and ultra-plush protein leather ear cushions.',
    features: [
      'Hybrid Active Noise Cancellation (-38dB reduction)',
      '40-Hour Battery Life with USB-C Fast Charge',
      'Transparency Ambient Mode for conversations',
      'Multipoint Bluetooth 5.3 connection (2 devices)'
    ],
    specs: [
      { label: 'Driver', value: '40mm Dynamic Titanium' },
      { label: 'Playtime', value: '40 Hours (ANC on) / 60h (ANC off)' },
      { label: 'Bluetooth', value: 'V5.3 + AAC / LDAC Codec' },
      { label: 'Microphones', value: 'Quad AI Noise Reduction' }
    ],
    inStock: true,
    stockCount: 19,
    tags: ['audio', 'anc', 'headphones', 'wireless', 'music'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '6-Month Store Warranty',
    variants: [
      { name: 'Color', options: ['Matte Black', 'Silver Moon', 'Sand Beige'] }
    ]
  },
  {
    id: 'prod-jbl-boombox-3',
    slug: 'jbl-boombox-3-bluetooth-speaker',
    title: 'JBL Boombox 3 Waterproof Bluetooth Speaker',
    category: 'audio',
    subCategory: 'Portable Speakers',
    priceUSD: 380,
    originalPriceUSD: 450,
    discountBadge: '24H BATTERY',
    rating: 4.9,
    reviewCount: 82,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Monstrous sound and the deepest bass. Features an upgraded 3-way acoustic system with a powerful racetrack-shaped subwoofer, dual tweeters, and rugged metal handle with silicone grips.',
    features: [
      'Massive 24-hour non-stop battery life',
      'IP67 waterproof and dustproof design',
      'Built-in Powerbank to charge your phone',
      'PartyBoost pairing for multi-speaker synchronization'
    ],
    specs: [
      { label: 'Output Power', value: '180W RMS (AC mode)' },
      { label: 'Waterproof', value: 'IP67 Submersible' },
      { label: 'Battery Capacity', value: '10,000mAh Li-ion' },
      { label: 'Weight', value: '6.7 kg' }
    ],
    inStock: true,
    stockCount: 6,
    tags: ['jbl', 'speaker', 'bluetooth', 'waterproof', 'party'],
    isFeatured: false,
    isBestSeller: true,
    warranty: '12-Month Official Warranty',
    variants: [
      { name: 'Color', options: ['Stealth Black', 'Squad Camo'] }
    ]
  },

  // --- SMART WATCHES & WEARABLES ---
  {
    id: 'prod-smart-watch-pro',
    slug: 'smart-watch-pro-oled-series-8',
    title: 'Smart Watch Pro OLED Series 8',
    category: 'smartwatches',
    subCategory: 'Fitness & Health',
    priceUSD: 65,
    originalPriceUSD: 95,
    discountBadge: '30% OFF',
    rating: 4.8,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Vibrant 2.0-inch HD AMOLED curved screen. Real-time heart rate, blood oxygen (SpO2), sleep monitoring, Bluetooth calling, GPS workout tracking, and 100+ sport modes.',
    features: [
      'Always-On High-Res AMOLED Display',
      'HD Bluetooth calling & message push notifications',
      'Biometric sensors for 24/7 cardiac tracking',
      'IP68 waterproof for swimming and daily sports'
    ],
    specs: [
      { label: 'Screen', value: '2.02" HD AMOLED 410x494' },
      { label: 'Battery', value: '7-10 Days Normal Use' },
      { label: 'Compatibility', value: 'iOS & Android' },
      { label: 'Material', value: 'Zinc Alloy + Ceramic Back' }
    ],
    inStock: true,
    stockCount: 25,
    tags: ['watch', 'smartwatch', 'fitness', 'oled', 'health'],
    isFeatured: false,
    isBestSeller: true,
    warranty: '6-Month Warranty',
    variants: [
      { name: 'Strap Color', options: ['Obsidian Black', 'Silver Frost', 'Ocean Blue', 'Orange Sport'] }
    ]
  },

  // --- STORAGE & ACCESSORIES ---
  {
    id: 'prod-sandisk-2tb',
    slug: 'sandisk-2tb-extreme-portable-ssd',
    title: 'SanDisk 2TB Extreme Portable Rugged NVMe SSD',
    category: 'storage',
    subCategory: 'High Speed Drives',
    priceUSD: 120,
    originalPriceUSD: 160,
    discountBadge: 'CODE SAVEBIG',
    rating: 4.9,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Get blazing NVMe solid-state performance with 1050MB/s read and 1000MB/s write speeds in a portable, high-capacity drive that is perfect for creating amazing content or capturing incredible footage.',
    features: [
      'Up to 1050MB/s Read & 1000MB/s Write Speed',
      'IP55 Water and Dust Resistance',
      '2-Meter Drop Protection with silicone bumper',
      'Handy carabiner loop to secure to your backpack'
    ],
    specs: [
      { label: 'Capacity', value: '2TB (2000GB)' },
      { label: 'Interface', value: 'USB 3.2 Gen 2 (Type-C)' },
      { label: 'Encryption', value: '256-bit AES Hardware' },
      { label: 'Warranty', value: 'Official 3-Year Warranty' }
    ],
    inStock: true,
    stockCount: 15,
    tags: ['sandisk', 'ssd', 'nvme', 'storage', 'backup'],
    isFeatured: false,
    isBestSeller: false,
    warranty: '3-Year Manufacturer Warranty',
    variants: [
      { name: 'Capacity', options: ['1TB', '2TB', '4TB'] }
    ]
  },
  {
    id: 'prod-wireless-charger-3in1',
    slug: 'fast-wireless-3in1-charging-stand',
    title: 'Fast Wireless 3-in-1 Inductive Charging Stand',
    category: 'charging',
    subCategory: 'Power & Cables',
    priceUSD: 35,
    originalPriceUSD: 50,
    discountBadge: 'ESSENTIAL',
    rating: 4.9,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clean up your desk. Charges your smartphone (15W Max), Apple Watch / Smartwatch (3W), and wireless earbuds (5W) simultaneously with smart temperature control.',
    features: [
      '15W Fast Qi Magnetic / Inductive Wireless Power',
      'Foldable travel-friendly design',
      'Smart LED charging status ring with touch shutoff',
      'Foreign object detection & thermal protection'
    ],
    specs: [
      { label: 'Input', value: '9V/2A, 12V/1.5A Type-C' },
      { label: 'Output Total', value: '23W Max' },
      { label: 'Dimensions', value: '140 x 110 x 25 mm' },
      { label: 'Weight', value: '210g' }
    ],
    inStock: true,
    stockCount: 45,
    tags: ['charger', 'wireless', 'stand', 'magsafe', '3in1'],
    isFeatured: false,
    isBestSeller: false,
    warranty: '6-Month Store Warranty',
    variants: [
      { name: 'Color', options: ['Matte Black', 'Arctic White'] }
    ]
  },
  {
    id: 'prod-4k-action-camera',
    slug: '4k-ultra-hd-action-sports-camera',
    title: '4K Ultra HD Action Sports Camera with Dual Screens',
    category: 'cameras',
    subCategory: 'Photography & Video',
    priceUSD: 110,
    originalPriceUSD: 150,
    discountBadge: '4K ACTION',
    rating: 4.7,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Capture high-octane sports and adventures in crisp 4K 60FPS. Includes 30m waterproof casing, 6-axis electronic image stabilization (EIS), Wi-Fi instant phone transfer, and 15 accessory mounts.',
    features: [
      '4K 60FPS Video + 20MP High-Definition Photos',
      'Dual color LCD screens (rear touch screen + front selfie screen)',
      '30-meter IPX8 waterproof housing included',
      'EIS 2.0 anti-shake gyroscope stabilization'
    ],
    specs: [
      { label: 'Sensor', value: 'Sony Exmor HD Sensor' },
      { label: 'Lens', value: '170° Ultra-Wide Angle 6G' },
      { label: 'Battery', value: '2x 1350mAh Rechargeable Batteries' },
      { label: 'Storage', value: 'Supports MicroSD up to 128GB' }
    ],
    inStock: true,
    stockCount: 12,
    tags: ['camera', 'action cam', '4k', 'waterproof', 'sports'],
    isFeatured: false,
    isBestSeller: false,
    warranty: '6-Month Store Warranty',
    variants: [
      { name: 'Package', options: ['Standard Kit (15 Mounts)', 'Deluxe Kit (+32GB Card + Extra Battery)'] }
    ]
  },

  // --- SKINCARE & BEAUTY ---
  {
    id: 'prod-petrova-hair-oil',
    slug: 'petrova-botanical-hair-oil-elixir',
    title: 'Petrova Botanical Hair Care & Nourishing Argan Oil Elixir (200ml)',
    category: 'skincare',
    subCategory: 'Hair & Scalp Treatments',
    priceUSD: 18,
    originalPriceUSD: 25,
    discountBadge: 'JUBA BEAUTY #1',
    rating: 4.95,
    reviewCount: 340,
    images: [
      'https://images.unsplash.com/photo-1608248597359-00994fcfd74e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Enriched with pure Moroccan Argan Oil, Macadamia, and Vitamin E. Deeply repairs heat damage, seals split ends, stimulates hair growth, and leaves hair silky smooth with a brilliant radiant shine in the Juba climate.',
    features: [
      '100% Pure Botanical Extracts with Vitamin E',
      'Lightweight, non-greasy rapid scalp absorption',
      'Controls frizz, hydrates curls, and prevents breakage',
      'Safe for color-treated and natural hair textures'
    ],
    specs: [
      { label: 'Volume', value: '200ml / 6.7 fl. oz.' },
      { label: 'Key Ingredients', value: 'Moroccan Argan, Jojoba, Sweet Almond' },
      { label: 'Origin', value: 'Petrova Naturals' },
      { label: 'Skin/Hair Type', value: 'All Hair Textures' }
    ],
    inStock: true,
    stockCount: 60,
    tags: ['petrova', 'hair oil', 'argan', 'beauty', 'skincare', 'botanical'],
    isFeatured: true,
    isBestSeller: true,
    warranty: '100% Authentic Guaranteed',
    variants: [
      { name: 'Formula', options: ['Moroccan Argan Elixir', 'Black Castor & Rosemary Growth', 'Coconut & Shea Moisture'] }
    ]
  },
  {
    id: 'prod-snail-mucin-essence',
    slug: 'advanced-snail-96-mucin-power-essence',
    title: 'Advanced Snail 96 Mucin Power Hydration Glow Essence (100ml)',
    category: 'skincare',
    subCategory: 'Face Serums & Essences',
    priceUSD: 24,
    originalPriceUSD: 32,
    discountBadge: 'GLOW SKIN',
    rating: 4.9,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Formulated with 96.3% Snail Secretion Filtrate, this essence repairs and rejuvenates dry and aging skin. Improves skin vitality by reducing dullness and soothing dehydrated skin.',
    features: [
      '96.3% Filtered Snail Mucin for intense cellular repair',
      'Soothes redness, sunburns, and uneven texture',
      'Lightweight gel texture with non-sticky glass skin finish',
      'Dermatologist tested, fragrance-free, and hypoallergenic'
    ],
    specs: [
      { label: 'Volume', value: '100ml' },
      { label: 'Formulation', value: 'Hydrating Essence Gel' },
      { label: 'Key Ingredient', value: 'Snail Secretion Filtrate, Sodium Hyaluronate' }
    ],
    inStock: true,
    stockCount: 30,
    tags: ['skincare', 'snail mucin', 'essence', 'hydration', 'k-beauty'],
    isFeatured: false,
    isBestSeller: true,
    warranty: 'Original Sealed Korean Batch',
    variants: [
      { name: 'Size', options: ['100ml Full Bottle', 'Dual Pack (2x 100ml)'] }
    ]
  },

  // --- HOME GADGETS & SMART LIVING ---
  {
    id: 'prod-flame-diffuser',
    slug: 'ultrasonic-flame-aromatherapy-diffuser',
    title: 'Ultrasonic Flame Aromatherapy Diffuser & Ambient LED Humidifier',
    category: 'home',
    subCategory: 'Smart Living & Decor',
    priceUSD: 29,
    originalPriceUSD: 42,
    discountBadge: 'COZY HOME',
    rating: 4.85,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Transform your room atmosphere. Simulates realistic burning campfire and amber flame effects using ultra-fine ultrasonic mist and amber/blue smart LED lights. Add 2-3 drops of essential oils for fragrant, calming relaxation.',
    features: [
      'Realistic 3D Fire Flame Simulation Lighting',
      'Ultra-quiet operation (<25dB whisper silent)',
      'Auto-off safety protection when water runs out',
      'Compatible with all natural essential and perfume oils'
    ],
    specs: [
      { label: 'Tank Capacity', value: '250ml' },
      { label: 'Power', value: 'USB Type-C 5V/2A' },
      { label: 'Run Time', value: 'Up to 9 Hours' },
      { label: 'Lighting Modes', value: 'Sunset Flame / Ice Blue / Cycle' }
    ],
    inStock: true,
    stockCount: 38,
    tags: ['home', 'diffuser', 'flame', 'aromatherapy', 'gadgets'],
    isFeatured: false,
    isBestSeller: true,
    warranty: '6-Month Store Warranty',
    variants: [
      { name: 'Chassis Color', options: ['Matte Noir Black', 'Pure Glacier White'] }
    ]
  },
  {
    id: 'prod-smart-air-fryer',
    slug: 'smart-touch-digital-air-fryer-5l',
    title: 'Smart Touch Digital Air Fryer XL (5.5L Rapid 360° Air Crisp)',
    category: 'home',
    subCategory: 'Kitchen Tech',
    priceUSD: 89,
    originalPriceUSD: 125,
    discountBadge: 'HEALTHY COOKING',
    rating: 4.88,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1585672840545-eb4d90d79d1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cook delicious crispy meals with up to 85% less oil. 8 one-touch preset programs, non-stick dishwasher-safe basket, 1500W rapid vortex heat circulation, and sleek tempered glass touch controls.',
    features: [
      '5.5-Liter Family Size Cooking Basket',
      '8 Smart Cooking Presets (Chicken, Fries, Steak, Cake, Fish, Pizza, Dehydrate)',
      'Overheat auto-shutoff and cool-touch handle',
      'High-speed 360° thermo-convection'
    ],
    specs: [
      { label: 'Capacity', value: '5.5 Liters' },
      { label: 'Power', value: '1500 Watts 220V' },
      { label: 'Temperature Range', value: '80°C - 200°C' },
      { label: 'Display', value: 'Digital LED One-Touch' }
    ],
    inStock: true,
    stockCount: 16,
    tags: ['air fryer', 'kitchen', 'home', 'cooking', 'smart gadget'],
    isFeatured: false,
    isBestSeller: false,
    warranty: '12-Month Store Warranty',
    variants: [
      { name: 'Color', options: ['Obsidian Black & Gold', 'Emerald Green & Gold'] }
    ]
  }
];

export const PRODUCTS: Product[] = [
  ...BASE_PRODUCTS.filter((product) => product.category !== 'perfumes'),
  ...IMPORTED_PERFUMES
];
