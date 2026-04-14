'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Clock, ChefHat, Lock } from 'lucide-react';

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  items: any[]; 
  total: number;
  status: string;
}

export default function KitchenDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Order State
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Check if the chef is already logged in on this device
    const isLogged = localStorage.getItem('pd_kitchen_auth');
    if (isLogged === 'true') {
      setIsAuthenticated(true);
    }

    // 2. Fetch existing orders
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setOrders(data);
      setIsLoading(false);
    };

    fetchOrders();

    // 3. Real-Time Listener
    const subscription = supabase
      .channel('kitchen-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders((currentOrders) => [payload.new as Order, ...currentOrders]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // THE SECRET KITCHEN PIN CODE
    if (passcode === '1234') { 
      setIsAuthenticated(true);
      setAuthError(false);
      localStorage.setItem('pd_kitchen_auth', 'true'); // Keeps them logged in
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  const completeOrder = async (id: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'Completed' })
      .eq('id', id);

    if (!error) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  // --- THE LOCK SCREEN UI ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
            <Lock className="text-gold-500" size={32} />
          </div>
          <h1 className="text-2xl font-serif text-slate-100 mb-2">Kitchen Access</h1>
          <p className="text-slate-400 mb-8">Please enter the staff PIN code to view live orders.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter PIN"
              className={`w-full bg-slate-900 border ${authError ? 'border-red-500 text-red-500' : 'border-slate-700 text-slate-100'} rounded-lg py-4 px-4 text-center text-2xl tracking-widest focus:outline-none focus:border-gold-500 transition-colors`}
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm">Incorrect PIN. Try again.</p>}
            <button 
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- THE KITCHEN DASHBOARD UI ---
  if (isLoading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-gold-500">Loading Kitchen...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-serif text-gold-500 flex items-center gap-3">
              <ChefHat size={32} />
              Kitchen Display System
            </h1>
            <p className="text-slate-400 mt-2">Live order feed. Tickets appear automatically.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm font-medium border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </div>
            {/* Logout Button */}
            <button 
              onClick={() => { localStorage.removeItem('pd_kitchen_auth'); setIsAuthenticated(false); }}
              className="text-slate-400 hover:text-red-400 text-sm underline"
            >
              Lock System
            </button>
          </div>
        </div>

        {orders.filter(o => o.status !== 'Completed').length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-700 rounded-2xl bg-slate-800/50">
            <Clock size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No active orders. Kitchen is clear!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.filter(o => o.status !== 'Completed').map((order) => (
              <div key={order.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-xl animate-in slide-in-from-bottom-4">
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