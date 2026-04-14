import { Award, Leaf, UtensilsCrossed } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-900 text-slate-100 px-6 lg:px-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Column */}
        <div>
          <p className="text-gold-500 tracking-[0.2em] text-sm uppercase mb-4 font-semibold">Our Philosophy</p>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-100 mb-8 leading-tight">
            Elevating the standard of modern gastronomy.
          </h2>
          
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg mb-10">
            <p>
              We believe that true culinary excellence begins long before the ingredients reach the kitchen. It starts with a fundamental respect for the origins of our food and the artisans who cultivate it. 
            </p>
            <p>
              Our dedicated team meticulously sources premium, sustainable produce to craft a menu that balances bold innovation with timeless technique. Every plate we serve is a reflection of our collective passion for pushing boundaries while honoring classic flavors. We do not just serve meals; we curate unforgettable dining experiences.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
            <div className="space-y-3">
              <Leaf className="text-gold-500" size={24} />
              <h4 className="text-slate-100 font-medium">Sustainable</h4>
              <p className="text-sm text-slate-500">Ethically sourced, local ingredients.</p>
            </div>
            <div className="space-y-3">
              <Award className="text-gold-500" size={24} />
              <h4 className="text-slate-100 font-medium">Award Winning</h4>
              <p className="text-sm text-slate-500">Recognized culinary excellence.</p>
            </div>
            <div className="space-y-3">
              <UtensilsCrossed className="text-gold-500" size={24} />
              <h4 className="text-slate-100 font-medium">Master Chefs</h4>
              <p className="text-sm text-slate-500">Decades of combined expertise.</p>
            </div>
          </div>
        </div>

        {/* Visual Column / Image Placeholder */}
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            {/* If you add a real image later, replace this div with an <img /> or Next.js <Image /> */}
            <div className="text-center p-8 border border-slate-700/50 rounded-xl bg-slate-900/50 backdrop-blur-sm">
              <UtensilsCrossed size={48} className="text-gold-500/50 mx-auto mb-4" />
              <p className="text-slate-500 uppercase tracking-widest text-sm font-medium">Culinary Excellence</p>
            </div>
          </div>
          {/* Decorative Gold Frame */}
          <div className="absolute inset-4 border border-gold-500/30 rounded-xl z-10 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}