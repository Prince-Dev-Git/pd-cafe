'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react'; // <-- FIXED: Changed CheckCircle2 to CheckCircle
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart } = useStore();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '' });

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // <-- FIXED: Added <HTMLFormElement> for strict TypeScript compatibility
  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('orders').insert([
        {
          customer_name: customerDetails.name,
          phone: customerDetails.phone,
          items: cart, 
          total: totalAmount,
          status: 'New'
        }
      ]);

      if (error) throw error;

      setIsSuccess(true);
      
      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        setIsCheckingOut(false);
        setCustomerDetails({ name: '', phone: '' });
        toggleCart(); 
      }, 3000);

    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />

      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-900 border-l border-slate-800 z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-serif text-gold-500 flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Order
          </h2>
          <button onClick={toggleCart} className="text-slate-400 hover:text-slate-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
            <div className="w-16 h-16 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={32} /> {/* <-- FIXED: Changed to CheckCircle */}
            </div>
            <h3 className="text-2xl font-serif text-slate-100 mb-2">Order Sent!</h3>
            <p className="text-slate-400">The kitchen has received your ticket. We are preparing it now.</p>
          </div>
        ) : cart.length === 0 ? (
          
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={48} className="text-slate-700 mb-4" />
            <p className="text-slate-400">Your cart is currently empty.</p>
            <button onClick={toggleCart} className="mt-6 text-gold-500 hover:underline tracking-wider uppercase text-sm">
              Explore the Menu
            </button>
          </div>
        ) : (
          
          <div className="flex-1 flex flex-col overflow-hidden">
            
            <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${isCheckingOut ? 'hidden' : 'block'}`}>
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex-1">
                    <h4 className="text-slate-100 font-medium mb-1">{item.name}</h4>
                    <p className="text-gold-500">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-3 bg-slate-900 rounded-lg px-2 py-1 border border-slate-700">
                      <button onClick={() => updateQuantity(item.id, 'decrement')} className="text-slate-400 hover:text-gold-500 px-1">-</button>
                      <span className="text-slate-100 text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 'increment')} className="text-slate-400 hover:text-gold-500 px-1">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isCheckingOut && (
              <div className="flex-1 overflow-y-auto p-6 animate-in slide-in-from-right duration-300">
                <button 
                  onClick={() => setIsCheckingOut(false)}
                  className="text-slate-400 hover:text-slate-100 text-sm mb-6 flex items-center gap-1"
                >
                  ← Back to Order
                </button>
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider text-slate-400 uppercase">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider text-slate-400 uppercase">Phone Number (For Updates)</label>
                    <input 
                      required 
                      type="tel" 
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors" 
                      placeholder="+1 (555) 000-0000" 
                    />
                  </div>
                </form>
              </div>
            )}

            <div className="border-t border-slate-800 p-6 bg-slate-900">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 uppercase tracking-wider text-sm">Subtotal</span>
                <span className="text-2xl font-serif text-slate-100">${totalAmount.toFixed(2)}</span>
              </div>
              
              {!isCheckingOut ? (
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-500 text-slate-100 font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Order...' : 'Confirm & Send to Kitchen'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}