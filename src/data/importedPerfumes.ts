import { Product } from '../types';
import { PRODUCT_IMAGE_BY_SKU } from './productImages';

const PERFUME_IMAGES = [
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80'
];

const IMPORTED_ROWS = [
  {
    "name": "Lattafa Tharwah Gold",
    "sku": "sig-tharwah-gold",
    "description": "Tharwah Gold opens with aromatic lavender and bergamot, blossoming into an opulent orange blossom and Egyptian jasmine heart. The vanilla-amber-vetiver base delivers a bold, sweet-floral signature that suits day or night.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Ansaam Silver",
    "sku": "sig-ansaam-silver",
    "description": "Ansaam Silver is alluring, chic, and dynamic — a striking blend of sweet fruits and fresh spices layered over a warm, comforting floral-vanilla core. Modern, versatile, and date-night ready.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Shaheen",
    "sku": "sig-shaheen",
    "description": "Shaheen is regal, striking, and smooth — a rich fruity and floral introduction that unfolds over deep, luxurious undertones. A commanding scent built for special occasions and upscale evenings.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Oud Mood",
    "sku": "sig-oud-mood",
    "description": "Oud Mood is warm, smoky, and resinous, pairing sweet floral notes with dry woody accords and gentle hints of oud. Wrapped in amber, caramel, and incense, it is a deep, wintry pick for oriental-scent lovers.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Raghba",
    "sku": "sig-raghba",
    "description": "A legendary warm oriental-gourmand classic, Raghba blends sweet vanilla, sugar, and oud, balanced by incense, amber, sandalwood, and musk. Budget-friendly luxury with a rich, cozy character.",
    "price": 30,
    "stock": 10
  },
  {
    "name": "Lattafa Mayar Blue",
    "sku": "sig-mayar-blue",
    "description": "A clean, crisp, and refreshing take on the Mayar family, Blue delivers an uplifting aquatic profile infused with bright fruit notes and soft florals. Cool, breezy, and effortlessly energizing.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Mayar",
    "sku": "sig-mayar-pink",
    "description": "Mayar opens with vibrant raspberry and litchi, blooming into a radiant white rose and jasmine heart. The smooth vanilla-musk trail keeps it energetic yet elegant, perfect for vibrant summer daytime wear.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Al Nashama",
    "sku": "sig-al-nashama",
    "description": "Al Nashama is elegant, modern, and sophisticated — a crisp citrus and subtle spice opening leads into an exquisite floral heart, before settling into a warm, magnetic woody-amber base. Classy signature styling for the professional woman.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Washwasha",
    "sku": "sig-washwasha",
    "description": "Washwasha opens with tart raspberry, pink pepper, and bitter orange, blooming into a lush tuberose-orange flower-osmanthus heart. The tonka bean, vanilla, benzoin, and amber base makes it a sweet, comforting everyday wear.",
    "price": 30,
    "stock": 10
  },
  {
    "name": "Lattafa Khamrah",
    "sku": "sig-khamrah",
    "description": "The iconic Lattafa masterpiece — a decadent heart of dates, praline, and tuberose drenched in warm cinnamon and nutmeg, finished with a rich vanilla-amber base. Ultimate gourmand luxury for romantic autumn and winter nights.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Khamrah Dukhan",
    "sku": "sig-khamrah-dukhan",
    "description": "A darker, smokier twist on the iconic Khamrah DNA, Dukhan wraps smoked woods and warm spices around a rich, sweet balsamic base. Bold, mysterious, and built for unisex-leaning statement wear.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Awaan",
    "sku": "sig-awaan",
    "description": "Awaan opens with sparkling bergamot and mandarin, moving into an elegant white-floral heart. The warm, inviting amber-musk finish makes it a clean, everyday-elegant signature for warm Juba days.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Bade'e Al Oud Sublime",
    "sku": "sig-oud-sublime",
    "description": "Sublime opens with crisp apple, litchi, and rose, deepening into a rich plum-jasmine-moss heart. The vanilla-patchouli base gives it a sophisticated, transitional-season character perfect for upscale evenings.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Bade'e Al Oud Amethyst",
    "sku": "sig-oud-amethyst",
    "description": "A dark, royal, and magnetic rose-oud composition opening with sharp pink pepper before unfolding into a rich Turkish and Bulgarian rose heart. The velvety amber-vanilla-agarwood base gives it a commanding, luxurious presence.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Fakhar White",
    "sku": "sig-fakhar-white",
    "description": "A radiant white-floral bouquet of tuberose, jasmine, and gardenia takes center stage, balanced by soft powdery undertones. The vanilla-musk finish keeps it clean, elegant, and effortlessly polished.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Victoria",
    "sku": "sig-victoria",
    "description": "Victoria opens with a crisp, bright citrus lift before blossoming into a romantic floral heart. The clean, warm woody-musky base makes it a versatile everyday signature for office and errands alike.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Yara Tous",
    "sku": "sig-yara-tous",
    "description": "A tropical-sunshine take on the Yara line, Tous bursts with mango, coconut, and passionfruit before softening into a smooth vanilla-musk-cashmeran base. Bright, breezy, and instantly transportive.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Yara Moi",
    "sku": "sig-yara-moi",
    "description": "Yara Moi opens with delicate jasmine and juicy peach, warming into a caramel-amber heart, and settling into a grounded patchouli-sandalwood base. A more mature, textured take on the Yara signature.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Yara Candy",
    "sku": "sig-yara-candy",
    "description": "A playful, juicy update to the Yara family, Candy pours on sugary red fruits and sweet syrup for a bright, candy-like radiance. Fun, youthful, and instantly craveable for anyone who loves a sweeter signature.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Yara",
    "sku": "sig-yara-pink",
    "description": "The beloved Yara classic — a powdery-sweet blend of orchid and heliotrope brightened with tropical notes, settling into a creamy, fluffy vanilla-musk dry-down. Effortlessly charming and endlessly comforting.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Sakeena",
    "sku": "sig-sakeena",
    "description": "Sakeena opens with a bright burst of passionfruit, mandarin, and a breezy ozonic freshness, before blooming into a sugary raspberry-rose heart. A toffee-vanilla base gives it a warm, standout finish that lingers beautifully.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Eclaire",
    "sku": "sig-eclaire",
    "description": "Named after the beloved pastry, Eclaire is a mouth-watering blend of creamy caramel, warm milk, and spun sugar, softened by delicate white flowers. The rich vanilla musk dry-down makes it an irresistible, mouth-watering gourmand.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Nebras",
    "sku": "sig-nebras",
    "description": "A viral gourmand sensation, Nebras opens with juicy red berries and mandarin before diving into a rich cocoa-vanilla heart. The base wraps everything in sugared musk and amber for an irresistible, dessert-like signature scent.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Teriaq Pink",
    "sku": "sig-teriaq-pink",
    "description": "Teriaq Pink opens with a luscious rush of ripe fruit before melting into a caramelized sweetness that feels indulgent without being heavy. A soft floral heart and a cloud-like musk trail make it addictively wearable for daily signature use.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Haya",
    "sku": "sig-haya",
    "description": "A sparkling, celebratory opening of champagne, strawberry, and mandarin gives way to a lush white-floral heart of gardenia, jasmine, and orchid. The dry-down is a warm, elegant amber-sandalwood-vanilla finish perfect for daytime elegance.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Rave Now For Her",
    "sku": "sig-rave-now-for-her",
    "description": "A playful, juicy tropical fruit opening bursts into a sweet floral heart, before settling into a warm, comforting musk-vanilla base. Rave Now For Her is an easygoing, universally likeable everyday scent built for Juba's sunny days.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Liam by Lattafa",
    "sku": "men-liam-lattafa",
    "description": "Clean, classy, and modern — a refined blend of cardamom, fig, and black tea unfolds over iris and smooth sandalwood. A polished signature for the modern professional.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Najdia by Lattafa",
    "sku": "men-najdia",
    "description": "Ultra-fresh and aquatic — lemon and lemongrass burst open, joined by lavender and a touch of cinnamon. A clean amber-musk base keeps it grounded and office-appropriate.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Shaheen Gold by Lattafa",
    "sku": "men-shaheen-gold",
    "description": "Tropical, fruity, and smooth — pineapple and fig open bright, softened by lavender and a creamy vanilla base. An easygoing, warm-weather-friendly option with a gold-standard finish.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Al Areeq by Lattafa",
    "sku": "men-al-areeq",
    "description": "A sophisticated blend of leather, dark fruits, and smoky amber. Al Areeq is understated but confident, ideal for dinner dates and cool-weather elegance.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Qaed by Lattafa",
    "sku": "men-qaed",
    "description": "A rich, resinous, deeply masculine fragrance built for long-lasting performance. Qaed leans dark and bold, holding its ground from morning meetings into late-night events.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Mahir Black by Lattafa",
    "sku": "men-mahir-black",
    "description": "Dark, brooding, and gothic — black pepper and rosemary open sharp, moving into smoky leather and labdanum. Patchouli and oud in the base make this one of the most talked-about dark scents in Juba.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Awraq Al Oud by Lattafa",
    "sku": "men-awraq-al-oud",
    "description": "An earthy, rich woody composition grounded in authentic Middle-Eastern oud character. Traditional, dignified, and long-lasting.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Al Qiam Gold by Lattafa",
    "sku": "men-al-qiam-gold",
    "description": "Luxurious and warm-spicy — raspberry and saffron open into a leather and patchouli heart, finished with rich oud. Built for special occasions and statement luxury wear.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Al Noble Safir by Lattafa",
    "sku": "men-al-noble-safir",
    "description": "Fresh, green, and herbal — bergamot and artemisia open with a sharp, sophisticated edge, softened by leather and grounded in warm frankincense. Elegant year-round sophistication.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Oud Mood by Lattafa",
    "sku": "men-oud-mood",
    "description": "Warm, smoky, and resinous — soft floral notes are blended with amber and incense before settling into a sweet, smooth oud base. A refined everyday oud for cooler months.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Eclaire",
    "sku": "men-eclaire",
    "description": "A creamy caramel, warm milk, and spun-sugar gourmand treat. Eclaire is sweet, comforting, and unmistakable — a compliment-magnet for cozy winter nights.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Al Ameed by Lattafa",
    "sku": "men-al-ameed",
    "description": "A powerful, dignified blend of deep woods, leather, and rich oriental spices. Al Ameed carries a mature, commanding character built for formal presence.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Qaed Al Fursan by Lattafa",
    "sku": "men-qaed-al-fursan",
    "description": "A sweet, tropical pineapple and saffron masterpiece wrapped in woody-amber depth. Versatile enough for daily wear yet distinctive enough to stand out.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Ramz Gold by Lattafa",
    "sku": "men-ramz-gold",
    "description": "Rich, warm, and inviting — sweet fruits and spice blend into resinous woods for a luxurious, comforting trail. The gold companion to Ramz Silver, built for cooler evenings.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Ramz Silver by Lattafa",
    "sku": "men-ramz-silver",
    "description": "A magnetic, modern sweet-amber powerhouse — mint, lavender, bergamot, and pear open bright and clean, backed by warm cinnamon and clary sage. The tonka bean and vanilla heart make it a nightlife favorite.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud Sublime by Lattafa",
    "sku": "men-oud-sublime",
    "description": "Fruity, sophisticated, and vibrant — a lush opening of apple, litchi, and rose is anchored by plum, jasmine, and moss. Rich patchouli in the base keeps it grounded and long-lasting.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud Black by Lattafa (For Oud Lovers)",
    "sku": "men-oud-black",
    "description": "Deep, smoky, and majestic — a rich fusion of rare oud, exotic spice, and dark resinous woods builds an intensely commanding aura. Made for oud purists who want maximum presence.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Asad Zanzibar by Lattafa",
    "sku": "men-asad-zanzibar",
    "description": "An exotic, tropical take on the Asad family — fresh marine notes and spice open into a smooth coconut water, iris, and sea-salt heart. Finishes with a warm vanilla-incense base that keeps it grounded and sensual.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Asad Bourbon by Lattafa",
    "sku": "men-asad-bourbon",
    "description": "A spicy-sweet twist on the Asad line — pink pepper, lavender, and plum open into a rich cacao-davana-nutmeg core. The base is a warm, boozy bourbon vanilla wrapped in vetiver and amber for an unforgettable trail.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Asad Black by Lattafa",
    "sku": "men-asad-black",
    "description": "A bold, magnetic opening of black pepper, pineapple, and tobacco leaf leads into a dark coffee-patchouli-iris heart. The rich vanilla-amber base is deeply addictive and instantly recognizable — Lattafa's most viral men's release in Juba right now.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Lattafa Fakhar Black",
    "sku": "men-fakhar-black",
    "description": "Opens crisp and sharp with green apple, bergamot, and a dash of spice, then softens into a clean lavender-floral heart. A rich, woody-amber dry-down gives it enough depth to move from the office straight into a date night.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Rave Now Black by Lattafa",
    "sku": "men-rave-now-black",
    "description": "A high-energy, mouth-watering fruity opener of pineapple and blackcurrant that moves into a smooth patchouli-birch-jasmine heart. Settles into a clean, warm musk-vanilla base that keeps it wearable all day. Built for casual daily wear and warm-weather energy.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "9PM Pour Femme by Afnan",
    "sku": "9pm-pour-femme",
    "description": "An elegant, alluring feminine fragrance designed for aesthetic elegance. Opens with a mouth-watering, luscious, and bright berry-fruit opening of Raspberry, Apple, Violet, and Orange, blooming into a luxurious powdery floral heart, and anchored by a unique earthy woody-amber base.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "9AM Dive by Afnan",
    "sku": "9am-dive",
    "description": "An ultra-refreshing, zesty, and minty aquatic explosion for daytime wear. Opens with Mint, Lemon, Black Currant, and Pink Pepper, grounded by a crisp fruity core with a mysterious, clean hint of incense, and finishing with a woody, spicy, clean-cut base.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "9PM Black (Classic) by Afnan",
    "sku": "9pm-normal",
    "description": "The world-famous compliment magnet! Features a sweet, spicy, and fruit-forward introduction of Apple, Cinnamon, Wild Lavender, and Bergamot, balanced by clean aromatic florals and anchored by a warm, intoxicating amber-vanilla trail offering legendary longevity.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "9PM Elixir by Afnan",
    "sku": "9pm-elixir",
    "description": "The pinnacle of luxury in the 9PM line. Opens with a warm, opulent, and boldly spiced opening of Cardamom, Nutmeg, and Elemi, unfolding into a rich, masculine floral-leathery heart, and settling into a dark, resinous, and deeply sophisticated dry-down.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "9PM Rebel by Afnan",
    "sku": "9pm-rebel",
    "description": "A bold, intoxicating night fragrance engineered for maximum presence. Opens with an explosive, crisp, and fruity initial burst of Mandarin, Pineapple, and Granny Smith Apple, transitioning into a smooth earthy heart, and finishing with a deep, rich, and decadent caramel-wood dry-down that clings powerfully to the skin.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Khamrah Dukhan",
    "sku": "khamrah-dukhan",
    "description": "A smoky, mysterious, and rich opening of Warm Spices and Resins gives way to a dark, smooth balance of Sweet Gourmand Notes and Woody Accords, before drying down into a deep, smoky-sweet, long-lasting oriental trail of Smoked Woods, Amber, and Vanilla. Khamrah Dukhan is the collection's most nocturnal, mysterious edition.",
    "price": 50,
    "stock": 10
  },
  {
    "name": "Lattafa Khamrah Qahwa",
    "sku": "khamrah-qahwa",
    "description": "A punchy, warm aromatic spice intro of Cinnamon, Cardamom, and Ginger blooms into a sweet, rich, and indulgent heart of Praline, Candied Fruits, and White Flowers, finishing on a deep, roasted coffee-infused gourmand base of Vanilla, Tonka Bean, and Musk. Khamrah Qahwa is Lattafa's beloved coffee-lover's edition.",
    "price": 45,
    "stock": 10
  },
  {
    "name": "Lattafa Khamrah",
    "sku": "khamrah",
    "description": "A warm, spicy, and utterly inviting opening of Cinnamon, Nutmeg, and Bergamot melts into a luscious, ultra-sweet gourmand heart of Dates, Praline, and Tuberose, before settling into a deep, resinous, velvety-sweet dry-down of Vanilla, Myrrh, and Amberwood. The original Lattafa Khamrah — a modern gourmand icon.",
    "price": 45,
    "stock": 10
  },
  {
    "name": "Hawas Pink (Pour Femme) by Rasasi",
    "sku": "hawas-pink",
    "description": "A luscious, sparkling, and sweet-tart fruity opening of Grapefruit, Pomegranate, and Green Apple, blooming into a luxurious, powdery, deeply feminine floral-fruit heart of Jasmine Absolute, Iris, Peach, and Sambac Jasmine, and anchored by a creamy, sweet-gourmand trail with an addictive praline finish.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Hawas Fire by Rasasi",
    "sku": "hawas-fire",
    "description": "A hot, vibrant, and aggressively warm opening of Blood Orange, Spiced Pepper, and Cardamom, blazing into a spicy-floral core of Cinnamon, Chili, Lavender, and Geranium that packs a serious punch, and finishing with a rich, molten, intoxicatingly warm base of Amber, Leather, Cedarwood, and Tonka Bean.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Hawas Black by Rasasi",
    "sku": "hawas-black",
    "description": "A sharp, sophisticated, and deeper citrus-fruit opening of Bergamot, Grapefruit, Lemon, and Dark Berries, moving into a dark, aromatic, smoky-woody transition of Lavender, Patchouli, and Aquatic Accords, and settling into a rich, earthy, mysterious dry-down that leans mature and nocturnal.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Hawas Ice by Rasasi",
    "sku": "hawas-ice",
    "description": "An arctic, ultra-crisp, and hyper-refreshing citrus-mint explosion built for extreme heat. Opens with Apple, Bergamot, Lemon, Mint, and Italian Lemon, moving into a vibrant, sweet-spicy core that keeps the original Hawas DNA with an iced twist, and finishing with a clean, icy, woody-musky dry-down with nuclear longevity.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Hawas for Him by Rasasi",
    "sku": "hawas-for-him",
    "description": "The original, mass-appealing Rasasi signature. Opens with a sparkling, bright, and mouth-watering fruity-citrus blast of Apple, Bergamot, Lemon, and Cinnamon, unfolding into an aquatic sweet-fruity heart balanced by clean florals and soft spice, and settling into a legendary, salty-sweet ambergris trail with immense depth.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Armaf Club de Nuit Iconic Man EDP",
    "sku": "cdn-iconic",
    "description": "The Iconic Man is a bold, elegant statement. It opens with a crisp burst of bergamot, lemon, and pineapple, evolving into a heart of jasmine, rose, and green tea. The base settles into a warm trail of oakmoss, sandalwood, musk, and vanilla — combining freshness with masculine depth in a timeless blue-bottle icon.",
    "price": 70,
    "stock": 10
  },
  {
    "name": "Armaf Club de Nuit For Women",
    "sku": "cdn-for-women",
    "description": "Luminous, sophisticated, and deeply feminine. Sparkles with a bright fruit opening of orange, bergamot, grapefruit, and peach, flowing into a romantic heart of rose, jasmine, litchi, and geranium. Settles on a warm, sensual base of patchouli, vanilla, musk, and vetiver.",
    "price": 75,
    "stock": 10
  },
  {
    "name": "Armaf Club de Nuit Intense Man",
    "sku": "cdn-intense-man",
    "description": "A powerhouse of smoky-masculine energy. Opens with a sharp, vibrant burst of lemon, pineapple, blackcurrant, bergamot, and apple — melting into a rich heart of birch, jasmine, and rose. The base anchors deep with musk, ambergris, patchouli, and vanilla. Immense longevity and powerhouse projection.",
    "price": 80,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud White (Honor & Glory)",
    "sku": "oud-white",
    "description": "A uniquely decadent, sweet, and creamy-fruity introduction of Pineapple and Crème Brûlée unfolds into a warm, exotic, and richly spiced heart of Cinnamon, Turmeric, Black Pepper, and Benzoin, settling into a smooth, woody, and comforting gourmand-oriental dry-down of Vanilla, Sandalwood, Cashmeran, and Moss. The luminous companion to Bade'e Al Oud Black.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud Noble Blush (Noble Rush)",
    "sku": "oud-noble-blush",
    "description": "A delicate, creamy, and soft floral-lactonic introduction of Rose Milk unfolds into a sugary, nutty, and comforting gourmand heart of Almond and Meringue, finishing with a velvety, warm, and sensual wood-infused base of Sandalwood, Vanilla, and Musk.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud Sublime",
    "sku": "oud-sublime",
    "description": "A fresh, ultra-juicy, and sweet fruity-floral opening of Litchi, Rose, and Apple leads into an exotic, lush, and rich fruity-floral core of Jasmine and Plum, grounded by a creamy, warm, and grounding earthy-sweet base of Moss, Vanilla, and Patchouli.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud Amethyst",
    "sku": "oud-amethyst",
    "description": "A bright, zesty, and sparkling spicy-citrus opening of Pink Pepper and Bergamot blooms into a lavish, romantic, and opulent floral heart of Turkish Rose, Bulgarian Rose, and Jasmine, before settling into a warm, sweet, and deeply sophisticated gourmand-oud finish of Amber, Vanilla, and Agarwood.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Bade'e Al Oud Black (Oud for Glory)",
    "sku": "oud-black",
    "description": "A majestic, warm, and spicy introduction of Saffron, Lavender, and Nutmeg unfolds into a rich, resinous, and exotic core of Natural Oud Wood and Agarwood, settling into a deep, mysterious, and incredibly long-lasting Patchouli-Musk trail. Eastern luxury at its most commanding.",
    "price": 40,
    "stock": 10
  },
  {
    "name": "Lattafa Asad Zanzibar Perfumed Deodorant Spray",
    "sku": "lattafa-asad-zanzibar-perfumed-deodorant-spray",
    "description": "Experience the unique blend of spicy, marine, floral, and gourmand notes in this perfumed deodorant spray, perfect for unisex use. With its 6.67-ounce capacity, this deodorant spray is designed to keep you fresh and confident all day. The Lattafa Asad Zanzibar deodorant spray is a great addition to your daily beauty routine, providing long-lasting fragrance and protection against body odor.",
    "price": 13.34,
    "stock": 10
  },
  {
    "name": "Lattafa Asad Zanzibar",
    "sku": "lattafa-asad-zanzibar",
    "description": "Embark on a journey with Lattafa Asad Zanzibar, a captivating fragrance that evokes the spirit of discovery and the allure of exotic destinations. This scent captures the essence of the tropical island of Zanzibar, with its pristine beaches and vibrant culture. With notes of lavender, black pepper, and vanilla, this fragrance is perfect for the modern man who craves adventure and sophistication. Experience the thrill of exploration with every spritz of Lattafa Asad Zanzibar.",
    "price": 44.99,
    "stock": 10
  },
  {
    "name": "Lattafa Asad Perfumed Deodorant Spray for Men",
    "sku": "lattafa-asad-perfumed-deodorant-spray-for-men",
    "description": "Stay fresh and confident all day with Lattafa Asad Perfumed Deodorant Spray, a long-lasting and effective deodorant designed specifically for men. With its unique fragrance and 6.7-ounce size, this deodorant is perfect for daily use. Whether you're heading to the office or hitting the gym, Lattafa Asad Perfumed Deodorant Spray has got you covered, providing a fresh and clean scent that lasts all day. Its compact size makes it easy to take on-the-go, ensuring you stay fresh and confident wherever you are.",
    "price": 6.86,
    "stock": 10
  },
  {
    "name": "Asad by Lattafa Perfumes",
    "sku": "asad-by-lattafa-perfumes",
    "description": "Asad is a captivating Amber fragrance for men, launched in 2021. This scent features a blend of Black Pepper, Pineapple, and Tobacco top notes, with Patchouli, Coffee, and Iris middle notes, and Vanilla, Amber, Dry Wood, Benzoin, and Labdanum base notes. Perfect for those who appreciate a rich and complex fragrance, Asad is a great choice for any occasion. With its unique blend of notes, Asad is sure to leave a lasting impression. Whether you're looking for a fragrance for everyday wear or a special occasion, Asad is a great option to consider.",
    "price": 35,
    "stock": 10
  },
  {
    "name": "Asad Bourbon Deodorant",
    "sku": "asad-bourbon-deodorant",
    "description": "Indulge in the rich aroma of Asad Bourbon Deodorant, a luxurious blend of spicy and amber notes that will leave you feeling fresh and confident all day. With top notes of pink pepper, lavender, and mirabelle plum, this deodorant is perfect for those who appreciate a sophisticated scent. The heart notes of cocoa, davana, and nutmeg add a depth of flavor, while the base notes of vetiver, bourbon vanilla, and amber provide a warm and inviting finish.",
    "price": 4.32,
    "stock": 10
  },
  {
    "name": "Asad Bourbon",
    "sku": "asad-bourbon",
    "description": "Experience the perfect blend of elegance and sophistication with Asad Bourbon, a unisex fragrance that combines vibrant top notes, warm heart notes, and luxurious base notes. This versatile scent is ideal for anyone seeking a balance of boldness and refinement, making it perfect for any occasion. With its unique blend of pink pepper, lavender, and mirabelle plum, Asad Bourbon is sure to leave a lasting impression.",
    "price": 34.27,
    "stock": 10
  }
] as const;

export const IMPORTED_PERFUMES: Product[] = IMPORTED_ROWS.map((row, index) => ({
  id: 'import-' + row.sku,
  slug: row.sku,
  title: row.name,
  category: 'perfumes',
  subCategory: row.name.toLowerCase().includes('deodorant') ? 'Perfumed Deodorant' : 'Luxury Fragrances',
  priceUSD: row.price,
  originalPriceUSD: Math.ceil(row.price * 1.2),
  discountBadge: 'IMPORTED COLLECTION',
  rating: 4.8,
  reviewCount: 24 + (index % 73),
  images: [PRODUCT_IMAGE_BY_SKU[row.sku] || PERFUME_IMAGES[index % PERFUME_IMAGES.length]],
  description: row.description,
  features: ['Authentic imported fragrance', 'Long-lasting scent profile', 'Available for delivery across Juba'],
  specs: [{ label: 'SKU', value: row.sku }, { label: 'Unit', value: 'Each' }, { label: 'Collection', value: row.name.split(' ')[0] }],
  inStock: row.stock > 0,
  stockCount: row.stock,
  tags: row.name.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\\s+/).filter(Boolean),
  isFeatured: index < 8,
  isBestSeller: /khamrah|yara|asad|hawas|club de nuit|9pm/i.test(row.name),
  warranty: '100% Authentic Product Guarantee'
}));
