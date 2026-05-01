import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Cpu, Sparkles, MessageSquare, RotateCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AcademyChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AcademyChatBot({ isOpen, onClose }: AcademyChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Presence is the first stroke. How can I assist your practice today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are the Zen Assistant for Akash Studio Academy. 
          Your goal is to guide students in both the technical aspect of graphite drawing (precision, anatomy, 600DPI scans) and the spiritual aspect (witnessing, zero state, meditation, Varanasi influence).
          Be concise, poetic, and technically accurate. 
          Use terms like 'Threshold', 'Witnessing', 'Zero State', and 'Presence'.
          If asked about video calls, mention that they are scheduled via the 'Connect' tab.
          If asked about private lessons, guide them to the 'Curriculum' tab.`,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "The lines are blurred. Peace be with you.";
      setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "A moment of static in the flow. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-32 right-8 md:right-12 w-[calc(100vw-64px)] md:w-[450px] h-[600px] z-[60] bg-clay border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(226,125,96,0.2)] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-saffron/20 border border-saffron/30 flex items-center justify-center">
                <Cpu className="text-saffron" size={20} />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-parchment">Zen Assistant</h3>
                <p className="text-[9px] uppercase tracking-widest opacity-30">Powered by Gemini Flash</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-accent text-ink rounded-tr-none font-medium' 
                  : 'bg-white/5 text-parchment/80 border border-white/5 rounded-tl-none font-light'
                }`}>
                  <div className="markdown-body text-inherit">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-5 py-4 rounded-3xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 border-t border-white/10 bg-white/5 flex gap-4">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Seek guidance..."
              className="flex-1 bg-ink border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-saffron/50 transition-all placeholder:text-white/10"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="w-14 h-14 rounded-2xl bg-saffron text-ink flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-saffron/20 disabled:opacity-50 disabled:grayscale"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
