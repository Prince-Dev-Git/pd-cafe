'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useStore();

  // If the state says it's closed, render absolutely nothing.
  if (!isCartOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      
      {/* Dark Background Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
        onClick={toggleCart}
      />

      {/* The Drawer Panel */}
      <div className="relative w-full sm:w-[450px] h-full bg-slate-800 border-l border-slate-700 shadow-2xl flex flex-col z-[10000]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-900">
          <h2 className="text-2xl font-serif text-gold-500 tracking-wider">Your Order</h2>
          <button onClick={toggleCart} className="text-slate-400 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-slate-800">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <p className="text-lg">Your cart is empty.</p>
              <button onClick={toggleCart} className="text-gold-500 hover:underline">
                Continue browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-sm">
                <div className="flex-1 pr-4">
                  <h3 className="text-slate-100 font-medium truncate">{item.name}</h3>
                  <p className="text-gold-500 font-serif">${item.price}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-slate-800 rounded-full px-3 py-1.5 border border-slate-600">
                  <button onClick={() => updateQuantity(item.id, 'decrement')} className="text-slate-400 hover:text-gold-500 transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="text-slate-100 w-5 text-center text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 'increment')} className="text-slate-400 hover:text-gold-500 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-slate-500 hover:text-red-400 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-slate-900 border-t border-slate-700 space-y-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gold-500 text-xl font-serif pt-4 border-t border-slate-800 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest mt-6 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}