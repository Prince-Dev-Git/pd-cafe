import type { Metadata } from 'next';
import Menu from '@/components/Menu';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'PD Cafe | Luxury Dining',
  description: 'Experience modern culinary excellence.',
};

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-gold-500/30">
      {/* NOTE: In a full build, you would import <Navbar />, <Hero />, <Reviews />, <Contact />, and <CartDrawer /> here.
      */}
      
      {/* Spacer for Hero simulation */}
      <section className="h-screen flex items-center justify-center border-b border-slate-800">
        <h1 className="text-6xl font-serif text-gold-500 tracking-wider">PD CAFE</h1>
      </section>

      <Menu />
      <Chatbot />
    </main>
  );
}