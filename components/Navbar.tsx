'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Globe } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, toggleCart } = useStore();

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect for luxury transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-24 flex justify-between items-center">
        
        {/* Brand Logo */}
        <div className="text-2xl font-serif font-bold text-gold-500 tracking-widest cursor-pointer">
          PD CAFE
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-gold-500 transition-colors">About</a>
          <a href="#menu" className="hover:text-gold-500 transition-colors">Menu</a>
          <a href="#reviews" className="hover:text-gold-500 transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-gold-500 transition-colors">Contact</a>
        </div>

        {/* Right Actions (Language & Cart) */}
        <div className="flex items-center gap-6">
          {/* Future Localization Toggle */}
          <button className="flex items-center gap-2 text-slate-300 hover:text-gold-500 transition-colors text-sm">
            <Globe size={18} />
            <span className="hidden sm:inline">EN | HI</span>
          </button>

          {/* Cart Trigger */}
          <button 
            onClick={toggleCart}
            className="relative text-gold-500 hover:text-gold-400 transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-slate-100 text-slate-900 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}