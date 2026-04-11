'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      {/* 1. Dark Background Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* 2. Slide-out Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-800 border-l border-slate-700 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h2 className="text-2xl font-serif text-gold-500">Your Order</h2>
              <button onClick={toggleCart} className="text-slate-400 hover:text-gold-500 transition-colors p-2">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <p>Your cart is empty.</p>
                  <button onClick={toggleCart} className="text-gold-500 hover:underline">
                    Continue browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <div className="flex-1">
                      <h3 className="text-slate-100 font-medium">{item.name}</h3>
                      <p className="text-gold-500 text-sm">${item.price}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-slate-800 rounded-full px-3 py-1 border border-slate-600">
                      <button onClick={() => updateQuantity(item.id, 'decrement')} className="text-slate-400 hover:text-gold-500">
                        <Minus size={14} />
                      </button>
                      <span className="text-slate-100 w-4 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 'increment')} className="text-slate-400 hover:text-gold-500">
                        <Plus size={14} />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-slate-900 border-t border-slate-700 space-y-4">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gold-500 text-xl font-serif pt-4 border-t border-slate-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <button className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-semibold py-4 rounded transition-colors uppercase tracking-widest mt-4">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}