'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Dark Overlay (You can add a background image here later) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900 z-0"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-500 tracking-[0.3em] text-sm md:text-base uppercase mb-6"
        >
          A Modern Culinary Experience
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-100 mb-8"
        >
          Taste the <span className="text-gold-500 text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Luxury</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#menu" 
            className="inline-block border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-slate-900 px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300"
          >
            Explore Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}