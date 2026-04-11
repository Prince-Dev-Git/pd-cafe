'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Plus } from 'lucide-react';
import { menuData } from '@/data/menuData'; // <-- Importing your new massive data file

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('All');
  const addToCart = useStore((state) => state.addToCart);

  // Filter the massive array based on the selected category
  const filteredMenu = activeFilter === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === activeFilter);

  return (
    <section id="menu" className="py-24 bg-slate-900 text-slate-100 min-h-screen px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-gold-500 mb-12 text-center tracking-wide">
          Curated Selection
        </h2>
        
        {/* Category Filters */}
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center mb-16 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-2 rounded-full border transition-all whitespace-nowrap tracking-wider text-sm ${
                activeFilter === cat 
                  ? 'border-gold-500 bg-gold-500/10 text-gold-500' 
                  : 'border-slate-700 text-slate-400 hover:border-gold-400 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMenu.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id} 
                className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl hover:border-gold-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-slate-100 pr-4">{item.name}</h3>
                    <span className="text-gold-500 font-serif text-2xl">${item.price}</span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed h-12">
                    {item.description}
                  </p>

                  <span className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full inline-block ${
                    item.veg ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-red-900/30 text-red-400 border border-red-900/50'
                  }`}>
                    {item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>

                <button 
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                  className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-800 hover:bg-gold-500 hover:text-slate-900 text-gold-500 py-3 rounded-lg border border-slate-700 hover:border-gold-500 transition-all duration-300"
                >
                  <Plus size={18} /> Add to Order
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}