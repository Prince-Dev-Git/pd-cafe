import { useState } from 'react';
import { CartItem } from '@/store/useStore';
import { menuData } from '@/data/menuData';

export type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export function useChatbot(cart: CartItem[]) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: 'Welcome to PD Cafe. I am your personal Concierge. How may I assist your dining experience today?' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Instantly display the user's message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate AI Processing (Replace this block with OpenAI fetch later)
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let aiResponse = "Our Chef highly recommends the Truffle Arancini to start. May I add that to your order?";

      // Context Awareness: The AI looks at the Cart
      if (lowerText.includes('order') || lowerText.includes('cart')) {
        if (cart.length > 0) {
          const items = cart.map(c => c.name).join(' and ');
          aiResponse = `I see you have selected the ${items}. Excellent choice. Would you like a wine pairing recommendation for that?`;
        } else {
          aiResponse = "Your order is currently empty. Would you like to hear today's specials?";
        }
      } 
      // Context Awareness: The AI knows the Menu size
      else if (lowerText.includes('menu') || lowerText.includes('food')) {
        aiResponse = `We have a curated selection of ${menuData.length} premium dishes. Our Tomahawk Steak is a guest favorite.`;
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500); // 1.5 second simulated delay
  };

  return { messages, sendMessage, isTyping };
}