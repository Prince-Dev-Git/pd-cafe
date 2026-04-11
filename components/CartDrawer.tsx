'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useStore();

  if (!isMounted || !isCartOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', justifyContent: 'flex-end' }}>
      
      {/* Dark Overlay - Hardcoded RGBA so it CANNOT be invisible */}
      <div 
        onClick={toggleCart}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', cursor: 'pointer' }}
      />

      {/* Drawer Panel - Hardcoded layout and colors */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '100%', backgroundColor: '#1e293b', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column', zIndex: 100000, boxShadow: '-10px 0 25px rgba(0,0,0,0.5)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #334155', backgroundColor: '#0f172a' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#d4af37', letterSpacing: '0.05em', margin: 0 }}>Your Order</h2>
          <button onClick={toggleCart} style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', gap: '1rem' }}>
              <p style={{ fontSize: '1.125rem', margin: 0 }}>Your cart is empty.</p>
              <button onClick={toggleCart} style={{ color: '#d4af37', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                Continue browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
                <div style={{ flex: 1, paddingRight: '1rem' }}>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 500, margin: '0 0 0.25rem 0', fontSize: '1.125rem' }}>{item.name}</h3>
                  <p style={{ color: '#d4af37', fontFamily: 'serif', margin: 0, fontSize: '1rem' }}>${item.price}</p>
                </div>
                
                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#1e293b', borderRadius: '9999px', padding: '0.375rem 0.75rem', border: '1px solid #475569' }}>
                  <button onClick={() => updateQuantity(item.id, 'decrement')} style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}><Minus size={14} /></button>
                  <span style={{ color: '#f1f5f9', width: '1.25rem', textAlign: 'center', fontSize: '0.875rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 'increment')} style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}><Plus size={14} /></button>
                </div>

                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '1rem', color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderTop: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
              <span>Estimated Tax (8%)</span><span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4af37', fontSize: '1.25rem', fontFamily: 'serif', paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            
            <button style={{ width: '100%', backgroundColor: '#d4af37', color: '#0f172a', fontWeight: 'bold', padding: '1rem', borderRadius: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1.5rem', border: 'none', cursor: 'pointer' }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}