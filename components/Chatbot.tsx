'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useChatbot } from '@/services/useChatbot';

export default function Chatbot() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Bring in the global cart and feed it to our AI hook
  const { cart } = useStore();
  const { messages, sendMessage, isTyping } = useChatbot(cart);

  // Hydration Fix
  useEffect(() => { setIsMounted(true); }, []);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  if (!isMounted) return null;

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[50]">
      
      {/* The Floating Bubble */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gold-500 text-slate-900 p-4 rounded-full shadow-lg shadow-gold-500/20 hover:bg-gold-400 hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* The Chat Window */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Luxury Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2 text-gold-500">
              <Sparkles size={18} />
              <span className="font-serif font-bold tracking-widest uppercase">The Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-gold-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-800/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-gold-500 text-slate-900 rounded-2xl rounded-tr-sm font-medium' 
                    : 'bg-slate-700 text-slate-100 rounded-2xl rounded-tl-sm border border-slate-600'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 p-4 rounded-2xl rounded-tl-sm border border-slate-600 flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-slate-700">
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2 border border-slate-700 focus-within:border-gold-500 transition-colors">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask the Concierge..."
                className="flex-1 bg-transparent text-slate-100 text-sm focus:outline-none placeholder:text-slate-500"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="text-gold-500 hover:text-gold-400 disabled:opacity-50 disabled:hover:text-gold-500 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}