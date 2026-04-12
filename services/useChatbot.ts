import { useState, useRef } from 'react';
import { useStore, CartItem } from '@/store/useStore';
import { menuData } from '@/data/menuData';

export type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export function useChatbot() {
  // We pull both the cart data AND the addToCart function directly from Zustand
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: 'Welcome to PD Cafe. I am your personal Concierge. How may I assist your dining experience today?' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // We use a ref to remember if the AI is currently waiting for a "yes/no" answer
  const pendingActionRef = useRef<{ type: 'suggest_item', itemId: string } | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate AI Processing
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let aiResponse = "";

      // --- SCENARIO 1: The AI was waiting for a "Yes" ---
      if (pendingActionRef.current && pendingActionRef.current.type === 'suggest_item') {
        if (lowerText.includes('yes') || lowerText.includes('sure') || lowerText.includes('please') || lowerText.includes('ok')) {
          
          // Find the item in our menu database
          const itemToAdd = menuData.find(item => item.id === pendingActionRef.current?.itemId);
          
          if (itemToAdd) {
            // ACTUALLY ADD IT TO THE CART!
            addToCart({ id: itemToAdd.id, name: itemToAdd.name, price: itemToAdd.price });
            aiResponse = `Excellent choice. I have added the ${itemToAdd.name} to your order. The cart has been updated.`;
          } else {
            aiResponse = "I apologize, there was an error locating that item.";
          }
        } else {
          aiResponse = "No problem at all. What else can I help you find?";
        }
        // Clear the pending action regardless of the answer
        pendingActionRef.current = null;
      } 
      
      // --- SCENARIO 2: Asking for recommendations ---
      else if (lowerText.includes('recommend') || lowerText.includes('suggest')) {
        // We will suggest the Truffle Arancini (ID: 's1')
        aiResponse = "Our Chef highly recommends the Truffle Arancini to start. May I add that to your order?";
        pendingActionRef.current = { type: 'suggest_item', itemId: 's1' }; // Set the trap!
      }

      // --- SCENARIO 3: Contextual Cart Awareness ---
      else if (lowerText.includes('order') || lowerText.includes('cart')) {
        if (cart.length > 0) {
          const items = cart.map(c => c.name).join(' and ');
          aiResponse = `I see you have selected the ${items}. Excellent choice. Would you like a wine pairing recommendation for that?`;
        } else {
          aiResponse = "Your order is currently empty. Would you like to hear today's specials?";
        }
      } 
      
      // --- SCENARIO 4: Default Fallback ---
      else {
        aiResponse = "I can certainly assist with that. Our Chef highly recommends the Truffle Arancini to start. May I add that to your order?";
        pendingActionRef.current = { type: 'suggest_item', itemId: 's1' };
      }

      // Send the AI response
      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500); 
  };

  return { messages, sendMessage, isTyping };
}