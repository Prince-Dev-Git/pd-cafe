'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useChatbot } from '@/services/useChatbot';

export default function Chatbot() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Notice we completely removed useStore here! The Brain handles it now.
  const { messages, sendMessage, isTyping } = useChatbot();

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
    <>
      {/* The Floating Bubble */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
            backgroundColor: '#d4af37', color: '#0f172a', padding: '16px',
            borderRadius: '50%', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(212, 175, 55, 0.4)'
          }}
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* The Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '24px', zIndex: 10000,
          width: '350px', height: '500px', backgroundColor: '#1e293b',
          border: '1px solid #334155', borderRadius: '16px',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          
          {/* Luxury Header */}
          <div style={{ backgroundColor: '#0f172a', padding: '16px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37' }}>
              <Sparkles size={18} />
              <span style={{ fontFamily: 'serif', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>The Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '12px', fontSize: '14px', lineHeight: '1.5',
                  backgroundColor: msg.sender === 'user' ? '#d4af37' : '#334155',
                  color: msg.sender === 'user' ? '#0f172a' : '#f1f5f9',
                  borderRadius: '16px',
                  borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                  borderTopLeftRadius: msg.sender === 'user' ? '16px' : '4px',
                  fontWeight: msg.sender === 'user' ? 500 : 400
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ backgroundColor: '#334155', color: '#f1f5f9', padding: '16px', borderRadius: '16px', borderTopLeftRadius: '4px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#d4af37' }}>Processing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px', backgroundColor: '#0f172a', borderTop: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', borderRadius: '9999px', padding: '8px 16px', border: '1px solid #334155' }}>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask the Concierge..."
                style={{ flex: 1, backgroundColor: 'transparent', color: '#f1f5f9', fontSize: '14px', border: 'none', outline: 'none' }}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                style={{ color: input.trim() ? '#d4af37' : '#475569', background: 'transparent', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex' }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}