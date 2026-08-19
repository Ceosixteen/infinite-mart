import express from "express";
import { GoogleGenAI } from "@google/genai";

export const app = express();

app.use(express.json());

// Lazy Gemini API Client initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", store: "Infinite Mart", version: "2.0.0" });
});

// Exchange rates endpoint
app.get("/api/rates", (_req, res) => {
  res.json({
    base: "USD",
    rateSSP: 8000,
    lastUpdated: new Date().toISOString(),
  });
});

// Max AI Shopping Assistant Endpoint
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history = [], currentProduct = null } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();

    if (!ai) {
      // Fallback smart rule-based response when GEMINI_API_KEY is not configured
      return res.json({
        reply: generateSmartFallbackReply(message, currentProduct),
        source: "local-assistant",
      });
    }

    const systemPrompt = `You are "Max", the friendly, knowledgeable, and energetic VIP Sales & Shopping Assistant for Infinite Mart (The premier tech, perfume, skincare, and home gadget superstore in Juba, South Sudan).
Store Context:
- Currency: USD ($) and South Sudanese Pounds (£ SSP, rate: 1 USD = 8,000 SSP).
- Categories: Electronics (Samsung S25 Ultra, MacBook Air M3, PS5, JBL Speakers, ANC Headphones, Smartwatches, SSDs), Arabian Luxury Perfumes (Lattafa Khamrah, Asad, Yara Pink, Kismet Magic, Armaf Club De Nuit), Skincare (Petrova Argan Oils, Snail Mucin, Barrier Creams), Smart Home Gadgets (Aroma Diffuser, Robot Vacuums, Air Fryers).
- Guarantees: 6-Month Replacement Warranty, Express Doorstep Delivery in Juba, 100% Genuine Guaranteed, Payment via m-GURUSH, MTN MoMo, Card & Cash on Delivery.
- Current Promo Codes:
  * SALE200: $200 off premium 5G smartphones
  * B5G5: 15% cashback/discount on audio & accessories
  * SAVEBIG: 10% off laptops & storage
  * LUXE15: 15% off perfumes & skincare
  * FREEGIFT: Free wireless charger on orders over $200
  * VIP10: 10% storewide for VIP members

Your tone: Professional, courteous, modern, helpful, concise. Recommend specific products when relevant. Keep responses under 3-4 sentences and structured with clean bullet points if recommending items.`;

    const chatContent = [
      ...history.map((h: { sender: string; text: string }) => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: chatContent as any,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Hello! How can I assist your shopping at Infinite Mart today?";
    return res.json({ reply: replyText, source: "gemini-api" });
  } catch (error: any) {
    console.error("AI Assistant error:", error);
    return res.json({
      reply: generateSmartFallbackReply(req.body.message || "", req.body.currentProduct),
      source: "local-fallback",
    });
  }
});

function generateSmartFallbackReply(message: string, currentProduct?: any): string {
  const query = message.toLowerCase();

  if (query.includes("perfume") || query.includes("lattafa") || query.includes("fragrance") || query.includes("oud") || query.includes("khamrah") || query.includes("yara")) {
    return "✨ For authentic Arabian luxury perfumes, our top sellers in Juba are Lattafa Khamrah ($48, warm cinnamon vanilla), Lattafa Asad ($45, spicy amber wood), and Yara Pink ($38, sweet tropical vanilla)! You can use promo code **LUXE15** for 15% off fragrances today.";
  }

  if (query.includes("phone") || query.includes("samsung") || query.includes("s25") || query.includes("mobile") || query.includes("iphone")) {
    return "📱 The flagship **Samsung Galaxy S25 Ultra 5G (512GB Titanium)** is currently in stock at Juba Town Showroom for $999 (was $1,199). Use coupon code **SALE200** for an instant $200 discount!";
  }

  if (query.includes("laptop") || query.includes("macbook") || query.includes("computer") || query.includes("apple")) {
    return "💻 We have the **MacBook Air M3 15-inch (16GB RAM / 512GB SSD)** in Starlight Gold for $1,150. Use code **SAVEBIG** for an extra 10% discount!";
  }

  if (query.includes("gaming") || query.includes("ps5") || query.includes("playstation") || query.includes("console")) {
    return "🎮 The **PlayStation 5 Digital Slim Console (1TB SSD)** with DualSense controller is available for $450 with same-day express delivery across Juba.";
  }

  if (query.includes("discount") || query.includes("coupon") || query.includes("code") || query.includes("promo") || query.includes("sale")) {
    return "🎁 Here are our active Juba discount codes:\n• **SALE200**: $200 OFF on 5G Smartphones\n• **LUXE15**: 15% OFF Arabian Perfumes & Skincare\n• **B5G5**: 15% OFF Audio & Headphones\n• **SAVEBIG**: 10% OFF Laptops & Storage\n• **FREEGIFT**: Free Wireless Charger on orders >$200";
  }

  if (query.includes("delivery") || query.includes("shipping") || query.includes("location") || query.includes("juba")) {
    return "🚚 We offer same-day express delivery across Juba (Juba Town, Hai Cinema, Munuki, Gudele, Tongping, Rock City). We accept Cash on Delivery, m-GURUSH, and MTN Mobile Money.";
  }

  if (query.includes("skincare") || query.includes("hair") || query.includes("petrova") || query.includes("beauty")) {
    return "🌿 Explore our beauty line including authentic **Petrova Botanical Argan Hair Oils ($18)** and Korean Snail Mucin Essences ($24) with guaranteed genuine formulas.";
  }

  if (currentProduct) {
    return `Looking at **${currentProduct.title}**? It's currently in stock for $${currentProduct.priceUSD} (${(currentProduct.priceUSD * 3500).toLocaleString()} SSP) with a full 6-month replacement warranty and express Juba delivery!`;
  }

  return "⚡ Welcome to Infinite Mart! I can help you find smartphones, MacBooks, authentic Arabian perfumes (Lattafa), beauty essentials, smart gadgets, or give you discount coupon codes. What are you looking for today?";
}
