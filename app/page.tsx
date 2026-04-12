import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Contact from '@/components/Contact';
import Chatbot from '@/components/Chatbot';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'PD Cafe | Luxury Dining',
  description: 'Experience modern culinary excellence.',
};

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-gold-500/30">
      <Navbar />
      <Hero />
      <Menu />
      <Contact />
      <Chatbot />
      <CartDrawer />
    </main>
  );
}