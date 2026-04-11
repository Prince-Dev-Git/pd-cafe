'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Plus } from 'lucide-react';

// Mock data: In production, import this from @/data/menuData.ts
const menuData = [
  { id: '1', name: 'Truffle Risotto', price: 45, category: 'Mains', veg: true },
  { id: '2', name: 'Wagyu Ribeye', price: 120, category: 'Mains', veg: false },
  // ... optimized to handle 60+ items smoothly
];

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('All');
  const addToCart = useStore((state) => state.addToCart);

  const filteredMenu = activeFilter === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === activeFilter);

  return (
    <section id="menu" className="py-20 bg-slate-900 text-slate-100 min-h-screen px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-gold-500 mb-8 text-center">Curated Selection</h2>
        
        {/* Category Filters */}
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center mb-12 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${
                activeFilter === cat 
                  ? 'border-gold-500 bg-gold-500/10 text-gold-500' 
                  : 'border-slate-700 hover:border-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id} 
              className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-gold-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">{item.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${item.veg ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>
                <span className="text-gold-500 font-serif text-xl">${item.price}</span>
              </div>
              <button 
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-700 hover:bg-gold-500 hover:text-slate-900 text-gold-500 py-3 rounded transition-colors"
              >
                <Plus size={18} /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}