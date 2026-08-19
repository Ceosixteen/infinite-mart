import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, ShoppingBag, Bot, User, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ChatMessage } from '../types';

export const AIChatAssistant: React.FC = () => {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    quickViewProduct,
    setQuickViewProduct,
    products,
    applyCouponCode
  } = useStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Hello there! 👋 Welcome to Infinite Mart Tech & Mega Superstore in Juba. Looking for the latest 5G smartphones, MacBooks, authentic Arabian perfumes (Lattafa Khamrah, Asad, Yara), noise-canceling headphones, or active discount codes?',
      timestamp: 'Just now',
      suggestedProductIds: ['prod-s25-ultra', 'prod-lattafa-khamrah', 'prod-macbook-air-m3']
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAIAssistantOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          currentProduct: quickViewProduct
        })
      });

      const data = await response.json();
      const assistantText = data.reply || "I'm here to help you find the best tech and perfume deals in Juba!";

      // Match products in text
      const suggested: string[] = [];
      products.forEach((p) => {
        if (assistantText.toLowerCase().includes(p.title.toLowerCase()) || assistantText.toLowerCase().includes(p.slug)) {
          suggested.push(p.id);
        }
      });

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProductIds: suggested.length > 0 ? suggested : undefined
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI assistant error', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'You can explore our full catalog or use promo codes like **SALE200** ($200 off phones) and **LUXE15** (15% off perfumes)! What category can I help you with?',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInput(promptText);
  };

  return (
    <>
      {/* Floating Bottom Teaser Prompt (Visible when chat is closed) */}
      {!isAIAssistantOpen && showTeaser && (
        <div
          id="max-ai-teaser-card"
          className="fixed bottom-22 right-4 sm:right-6 z-40 max-w-[290px] bg-gray-950/95 text-white rounded-2xl p-3.5 shadow-2xl border border-yellow-500/50 backdrop-blur-md animate-fade-in flex flex-col space-y-2"
        >
          <div className="flex items-center justify-between gap-2 border-b border-gray-800/80 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-white/80">
                Max • Infinite Mart AI Partner
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowTeaser(false)}
              className="text-gray-400 hover:text-white p-0.5 rounded-full cursor-pointer"
              title="Dismiss prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAIAssistantOpen(true)}
            className="text-left text-xs text-gray-200 font-medium leading-relaxed hover:text-white transition-colors cursor-pointer"
          >
            "Hello there... Looking for 5G smartphones, MacBooks, authentic Lattafa perfumes, or today's Juba discount codes?"
          </button>

          <button
            type="button"
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center justify-between text-[10px] font-bold text-yellow-400 hover:text-white pt-1 transition-colors cursor-pointer"
          >
            <span>Tap to chat with Max AI</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Bottom Main Trigger Button */}
      <button
        id="max-ai-fab-btn"
        type="button"
        onClick={() => setIsAIAssistantOpen(true)}
        className="fixed bottom-6 right-4 sm:right-6 z-40 bg-gray-950 hover:bg-black text-white p-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105 group border-2 border-yellow-500/50 cursor-pointer"
        title="Chat with Max AI Assistant"
      >
        <div className="relative inline-flex items-center justify-center shrink-0 w-10 h-10">
          <div className="absolute inset-0 rounded-full animate-pulse opacity-80 blur-[2px] bg-gradient-to-tr from-yellow-500 to-amber-600" />
          <div className="relative w-full h-full rounded-full p-[1.5px] shadow-lg overflow-hidden bg-gradient-to-tr from-amber-600 to-yellow-400">
            <div className="w-full h-full rounded-full flex items-center justify-center text-base bg-gradient-to-tr from-yellow-500 to-amber-600 font-black text-black">
              <span>⚡</span>
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-gray-950 shadow-xs" />
        </div>
        <div className="text-left hidden sm:block pr-1">
          <span className="font-extrabold text-xs block text-white leading-none">Max AI</span>
          <span className="text-[10px] text-yellow-400 font-semibold leading-none">Smart Shopping Partner</span>
        </div>
      </button>

      {/* Slide-in Interactive AI Chat Drawer */}
      <AnimatePresence>
        {isAIAssistantOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAIAssistantOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-neutral-900 text-white h-full shadow-2xl z-10 flex flex-col justify-between"
            >
              {/* Top Header */}
              <div className="p-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black text-lg shadow-sm">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-black text-white text-sm flex items-center gap-1.5 leading-none">
                      <span>Max Tech AI</span>
                      <span className="text-[9px] bg-yellow-400/20 text-yellow-400 px-1.5 py-0.5 rounded font-mono">
                        ONLINE
                      </span>
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Infinite Mart Juba Superstore Expert
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAIAssistantOpen(false)}
                  className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black font-black flex items-center justify-center shrink-0 text-xs shadow-xs">
                        ⚡
                      </div>
                    )}

                    <div
                      className={`rounded-2xl p-3 max-w-[85%] space-y-2 ${
                        msg.sender === 'user'
                          ? 'bg-yellow-400 text-black font-medium'
                          : 'bg-gray-800/90 text-gray-100 border border-gray-700/80 shadow-md'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      
                      {/* Suggested Products Attached */}
                      {msg.suggestedProductIds && msg.suggestedProductIds.length > 0 && (
                        <div className="pt-2 border-t border-gray-700/80 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-yellow-400 tracking-wider">
                            Recommended Products:
                          </span>
                          <div className="space-y-1">
                            {msg.suggestedProductIds.map((pid) => {
                              const p = products.find((item) => item.id === pid);
                              if (!p) return null;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => {
                                    setQuickViewProduct(p);
                                    setIsAIAssistantOpen(false);
                                  }}
                                  className="w-full text-left p-1.5 rounded-lg bg-gray-900/90 hover:bg-gray-950 flex items-center gap-2 transition-colors border border-gray-700 cursor-pointer"
                                >
                                  <img
                                    src={p.images[0]}
                                    alt=""
                                    className="w-8 h-8 rounded object-cover shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[11px] font-bold text-white truncate">
                                      {p.title}
                                    </div>
                                    <div className="text-[10px] text-yellow-400 font-mono">
                                      ${p.priceUSD} USD
                                    </div>
                                  </div>
                                  <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <span
                        className={`text-[9px] block text-right opacity-60 ${
                          msg.sender === 'user' ? 'text-black' : 'text-gray-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 items-center text-xs text-gray-400 bg-gray-800/80 p-3 rounded-2xl w-fit border border-gray-700">
                    <RefreshCw className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
                    <span>Max AI is typing recommendation...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-4 py-2 bg-gray-950 border-t border-gray-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('What are the best Arabian perfumes for long lasting scent?')}
                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap border border-gray-800 cursor-pointer"
                >
                  🌸 Best Arabian Perfumes?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('Which discount codes can I use today?')}
                  className="bg-gray-900 hover:bg-gray-800 text-yellow-400 text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap border border-gray-800 cursor-pointer"
                >
                  🏷️ Active Discount Codes
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('Tell me about Samsung S25 Ultra warranty & price in Juba')}
                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap border border-gray-800 cursor-pointer"
                >
                  📱 Samsung S25 Ultra Price
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 bg-gray-950 border-t border-gray-800 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about phones, perfumes, delivery in Juba..."
                  className="flex-1 bg-gray-900 border border-gray-800 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-black p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
