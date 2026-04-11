'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Welcome to PD Cafe. How may I assist your dining experience today?' }]);
  const [input, setInput] = useState('');

  // Future-proofing: This logic will move to src/services/useChatbot.ts
  const handleSend = () => {
    if (!input.trim()) return;
    
    // 1. Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    // 2. Simulated AI response (Replace with OpenAI API call later)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: 'I can certainly help with that. Our Chef highly recommends the Truffle Risotto today.' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gold-500 text-slate-900 p-4 rounded-full shadow-lg hover:bg-gold-400 transition-transform hover:scale-105 z-40"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col h-96"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center text-gold-500">
              <span className="font-serif font-semibold">The Concierge</span>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gold-500 text-slate-900 rounded-br-none' 
                      : 'bg-slate-700 text-slate-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our menu..."
                className="flex-1 bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-500"
              />
              <button onClick={handleSend} className="bg-gold-500 text-slate-900 p-2 rounded hover:bg-gold-400">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}