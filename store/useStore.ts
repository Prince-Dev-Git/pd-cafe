import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, action: 'increment' | 'decrement') => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  isCartOpen: false,
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((c) => c.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((c) => 
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
        // isCartOpen removed from here
      };
    }
    return { 
      cart: [...state.cart, { ...item, quantity: 1 }]
      // isCartOpen removed from here
    };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((c) => c.id !== id)
  })),

  updateQuantity: (id, action) => set((state) => ({
    cart: state.cart.map((c) => {
      if (c.id === id) {
        const newQuantity = action === 'increment' ? c.quantity + 1 : Math.max(1, c.quantity - 1);
        return { ...c, quantity: newQuantity };
      }
      return c;
    })
  })),
}));