import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Eleanor Vance",
    role: "Food Critic",
    content: "An absolute masterclass in flavor and presentation. The Tomahawk steak was cooked to absolute perfection. This establishment has set a new benchmark for luxury dining in the city.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Sterling",
    role: "Local Guide",
    content: "From the moment we walked in, the service was impeccable. The Truffle Arancini is a revelation. We will undoubtedly be returning for our next anniversary.",
    rating: 5
  },
  {
    id: 3,
    name: "Sophia Rossi",
    role: "Culinary Enthusiast",
    content: "The attention to detail here is staggering. Even the artisan sparkling water feels like a curated part of the journey. Highly recommend letting the chef guide your choices.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-slate-900 text-slate-100 px-6 lg:px-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-gold-500 tracking-[0.2em] text-sm uppercase mb-4 font-semibold">Guest Experiences</p>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-100">
            A Legacy of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div 
              key={review.id} 
              className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 hover:border-gold-500/50 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 italic">
                  "{review.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-gold-500 font-serif text-xl border border-slate-600">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-slate-100 font-medium">{review.name}</h4>
                  <p className="text-slate-500 text-sm">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}