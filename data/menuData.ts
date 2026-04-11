export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Beverages';
  veg: boolean;
}

export const menuData: MenuItem[] = [
  // --- STARTERS ---
  {
    id: 's1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto spheres with wild mushroom and black truffle aioli.',
    price: 18,
    category: 'Starters',
    veg: true
  },
  {
    id: 's2',
    name: 'Wagyu Beef Tartare',
    description: 'Hand-cut wagyu, quail egg, capers, and house-made crostini.',
    price: 28,
    category: 'Starters',
    veg: false
  },
  {
    id: 's3',
    name: 'Burrata & Heirloom Tomato',
    description: 'Fresh burrata, balsamic glaze, basil oil, and pine nuts.',
    price: 22,
    category: 'Starters',
    veg: true
  },

  // --- MAINS ---
  {
    id: 'm1',
    name: 'Pan-Seared Scallops',
    description: 'Hokkaido scallops, cauliflower purée, and pancetta crisp.',
    price: 42,
    category: 'Mains',
    veg: false
  },
  {
    id: 'm2',
    name: 'Wild Mushroom Risotto',
    description: 'Aborio rice, porcini broth, parmesan reggiano, and truffle oil.',
    price: 36,
    category: 'Mains',
    veg: true
  },
  {
    id: 'm3',
    name: 'Tomahawk Steak (For Two)',
    description: '32oz bone-in ribeye, roasted garlic, and herb butter.',
    price: 145,
    category: 'Mains',
    veg: false
  },

  // --- DESSERTS ---
  {
    id: 'd1',
    name: '24k Gold Chocolate Dome',
    description: 'Valrhona dark chocolate mousse, raspberry center, edible gold leaf.',
    price: 24,
    category: 'Desserts',
    veg: true
  },
  {
    id: 'd2',
    name: 'Classic Tiramisu',
    description: 'Espresso-soaked ladyfingers, mascarpone cream, and cocoa dust.',
    price: 16,
    category: 'Desserts',
    veg: true
  },

  // --- BEVERAGES ---
  {
    id: 'b1',
    name: 'Smoked Old Fashioned',
    description: 'Premium bourbon, angostura bitters, orange peel, hickory smoke.',
    price: 22,
    category: 'Beverages',
    veg: true
  },
  {
    id: 'b2',
    name: 'Artisan Sparkling Water',
    description: '750ml imported sparkling mineral water.',
    price: 9,
    category: 'Beverages',
    veg: true
  }

  // ... You can continue pasting the rest of your 60+ items here following this exact format!
];