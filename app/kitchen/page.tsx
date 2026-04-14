'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Clock, ChefHat } from 'lucide-react';

// Define what an order looks like based on our database
interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  items: any[]; // The JSON array from our cart
  total: number;
  status: string;
}

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch existing orders when the page loads
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false }); // Newest first

      if (data) setOrders(data);
      setIsLoading(false);
    };

    fetchOrders();

    // 2. The Real-Time Magic: Listen for new orders instantly!
    const subscription = supabase
      .channel('kitchen-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        // When a new order hits the database, add it to the top of our screen
        setOrders((currentOrders) => [payload.new as Order, ...currentOrders]);
        
        // Optional: Play a "ding" sound here!
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 3. Mark an order as Complete
  const completeOrder = async (id: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'Completed' })
      .eq('id', id);

    if (!error) {
      // Remove it from the screen
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-gold-500">Loading Kitchen...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-serif text-gold-500 flex items-center gap-3">
              <ChefHat size={32} />
              Kitchen Display System
            </h1>
            <p className="text-slate-400 mt-2">Live order feed. Tickets appear automatically.</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </div>
        </div>

        {/* Order Grid */}
        {orders.filter(o => o.status !== 'Completed').length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-700 rounded-2xl">
            <Clock size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No active orders. Kitchen is clear!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.filter(o => o.status !== 'Completed').map((order) => (
              
              <div key={order.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-xl animate-in slide-in-from-bottom-4">
                {/* Ticket Header */}
                <div className="bg-slate-700/50 p-4 border-b border-slate-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-slate-100">{order.customer_name}</h3>
                    <p className="text-xs text-slate-400">{order.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-500 font-serif font-bold">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">{new Date(order.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* Ticket Items */}
                <div className="p-4 flex-1 space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="flex items-center gap-2 text-slate-200">
                        <span className="bg-slate-900 text-gold-500 px-2 py-0.5 rounded text-xs font-bold border border-slate-700">
                          {item.quantity}x
                        </span>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ticket Action */}
                <button 
                  onClick={() => completeOrder(order.id)}
                  className="w-full bg-slate-900 hover:bg-green-600 text-slate-400 hover:text-white p-4 font-bold transition-colors flex justify-center items-center gap-2 uppercase tracking-wider text-sm border-t border-slate-700"
                >
                  <CheckCircle size={18} />
                  Mark Ready
                </button>
              </div>

            ))}
          </div>
        )}

      </div>
    </div>
  );
}