import { businessCategories } from '../data/mock';

export const mockSeller = {
  id: 'seller123',
  name: 'John Smith',
  email: 'john@mariositaliankitchen.com',
  phone: '+1234567890',
  role: 'seller',
  isApproved: true,
  joinedDate: '2024-01-15',
  businesses: ['1'] // Array of business IDs owned by this seller
};

export const mockSellerBusinesses = [
  {
    id: 1,
    name: "Mario's Italian Kitchen",
    category: 'restaurants',
    description: 'Authentic Italian cuisine with fresh ingredients',
    rating: 4.5,
    reviewCount: 324,
    priceRange: '$15-30',
    deliveryTime: '30-45 min',
    address: '123 Main St, Downtown',
    phone: '+1234567890',
    email: 'info@mariositaliankitchen.com',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
    ],
    isOpen: true,
    status: 'approved',
    services: ['Dine-in', 'Takeout', 'Delivery'],
    cuisine: 'Italian',
    featured: true,
    businessHours: {
      monday: { open: '09:00', close: '22:00', isOpen: true },
      tuesday: { open: '09:00', close: '22:00', isOpen: true },
      wednesday: { open: '09:00', close: '22:00', isOpen: true },
      thursday: { open: '09:00', close: '22:00', isOpen: true },
      friday: { open: '09:00', close: '23:00', isOpen: true },
      saturday: { open: '10:00', close: '23:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: true }
    },
    socialMedia: {
      website: 'https://mariositaliankitchen.com',
      instagram: '@mariositaliankitchen',
      facebook: 'mariositaliankitchen',
      twitter: '@mariositaly'
    },
    bankDetails: {
      accountName: 'Mario Italian Kitchen LLC',
      accountNumber: '****1234',
      bankName: 'Chase Bank',
      routingNumber: '****5678'
    },
    totalOrders: 1250,
    totalRevenue: 45670.50,
    monthlyRevenue: 8934.20,
    averageOrderValue: 36.54
  }
];

export const mockSellerItems = [
  {
    id: 101,
    businessId: 1,
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil',
    price: 18.99,
    originalPrice: 22.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    category: 'Pizza',
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Tomato sauce', 'Fresh mozzarella', 'Basil', 'Olive oil'],
    allergens: ['Gluten', 'Dairy'],
    nutrition: {
      calories: 280,
      protein: 12,
      carbs: 35,
      fat: 10
    },
    tags: ['Vegetarian', 'Popular'],
    inventory: 50,
    soldToday: 12
  },
  {
    id: 102,
    businessId: 1,
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with pancetta, eggs, and parmesan cheese',
    price: 16.50,
    originalPrice: 19.50,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d30e?w=300&h=200&fit=crop',
    category: 'Pasta',
    isAvailable: true,
    preparationTime: 20,
    ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmesan', 'Black pepper'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 45,
      fat: 18
    },
    tags: ['Chef Special'],
    inventory: 30,
    soldToday: 8
  },
  {
    id: 103,
    businessId: 1,
    name: 'Tiramisu',
    description: 'Traditional Italian dessert with coffee-soaked ladyfingers',
    price: 8.99,
    originalPrice: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop',
    category: 'Desserts',
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Mascarpone', 'Ladyfingers', 'Espresso', 'Cocoa powder'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    nutrition: {
      calories: 320,
      protein: 6,
      carbs: 28,
      fat: 20
    },
    tags: ['Dessert', 'Coffee'],
    inventory: 20,
    soldToday: 15
  }
];

export const mockOffers = [
  {
    id: 'offer1',
    businessId: 1,
    title: '20% Off Weekend Special',
    description: 'Get 20% off on all pasta dishes during weekends',
    type: 'percentage',
    value: 20,
    minOrderValue: 25,
    maxDiscount: 15,
    validFrom: '2024-01-20',
    validTo: '2024-02-20',
    isActive: true,
    usageLimit: 100,
    usedCount: 34,
    applicableItems: [102], // Specific items
    applicableCategories: ['Pasta'],
    terms: 'Valid only on weekends. Cannot be combined with other offers.'
  },
  {
    id: 'offer2',
    businessId: 1,
    title: 'Free Delivery',
    description: 'Free delivery on orders above $30',
    type: 'free_delivery',
    value: 0,
    minOrderValue: 30,
    maxDiscount: 5.99,
    validFrom: '2024-01-15',
    validTo: '2024-12-31',
    isActive: true,
    usageLimit: null,
    usedCount: 156,
    applicableItems: [],
    applicableCategories: [],
    terms: 'Valid for delivery orders only.'
  }
];

export const mockSellerOrders = [
  {
    id: 'ORD001',
    businessId: 1,
    customerName: 'Sarah Johnson',
    customerPhone: '+1234567891',
    customerEmail: 'sarah@example.com',
    items: [
      { id: 101, name: 'Margherita Pizza', quantity: 2, price: 18.99 },
      { id: 103, name: 'Tiramisu', quantity: 1, price: 8.99 }
    ],
    subtotal: 46.97,
    deliveryFee: 5.99,
    tax: 3.76,
    discount: 9.39,
    total: 47.33,
    status: 'pending',
    paymentStatus: 'paid',
    orderType: 'delivery',
    orderTime: '2024-01-20T14:30:00Z',
    estimatedTime: '30-45 min',
    deliveryAddress: '456 Oak St, Apt 2B, Downtown',
    specialInstructions: 'Extra cheese on pizza, no nuts in tiramisu',
    paymentMethod: 'credit_card'
  },
  {
    id: 'ORD002',
    businessId: 1,
    customerName: 'Mike Wilson',
    customerPhone: '+1234567892',
    customerEmail: 'mike@example.com',
    items: [
      { id: 102, name: 'Spaghetti Carbonara', quantity: 1, price: 16.50 }
    ],
    subtotal: 16.50,
    deliveryFee: 0,
    tax: 1.32,
    discount: 0,
    total: 17.82,
    status: 'preparing',
    paymentStatus: 'paid',
    orderType: 'pickup',
    orderTime: '2024-01-20T15:15:00Z',
    estimatedTime: '15-20 min',
    deliveryAddress: null,
    specialInstructions: 'Ready for pickup',
    paymentMethod: 'cash'
  }
];

export const mockSellerAnalytics = {
  todayStats: {
    orders: 23,
    revenue: 847.50,
    averageOrderValue: 36.85,
    newCustomers: 5
  },
  weekStats: {
    orders: 145,
    revenue: 5234.75,
    averageOrderValue: 36.10,
    newCustomers: 28
  },
  monthStats: {
    orders: 620,
    revenue: 22478.90,
    averageOrderValue: 36.25,
    newCustomers: 124
  },
  revenueChart: [
    { date: '2024-01-14', revenue: 423.50 },
    { date: '2024-01-15', revenue: 567.25 },
    { date: '2024-01-16', revenue: 634.80 },
    { date: '2024-01-17', revenue: 445.20 },
    { date: '2024-01-18', revenue: 723.45 },
    { date: '2024-01-19', revenue: 856.30 },
    { date: '2024-01-20', revenue: 847.50 }
  ],
  orderChart: [
    { date: '2024-01-14', orders: 12 },
    { date: '2024-01-15', orders: 18 },
    { date: '2024-01-16', orders: 21 },
    { date: '2024-01-17', orders: 14 },
    { date: '2024-01-18', orders: 26 },
    { date: '2024-01-19', orders: 31 },
    { date: '2024-01-20', orders: 23 }
  ],
  topItems: [
    { id: 103, name: 'Tiramisu', orders: 45, revenue: 404.55 },
    { id: 101, name: 'Margherita Pizza', orders: 38, revenue: 721.62 },
    { id: 102, name: 'Spaghetti Carbonara', orders: 32, revenue: 528.00 }
  ],
  customerInsights: {
    totalCustomers: 245,
    repeatCustomers: 89,
    averageLifetimeValue: 156.78,
    topSpenders: [
      { name: 'John Doe', orders: 12, totalSpent: 445.67 },
      { name: 'Sarah Johnson', orders: 8, totalSpent: 298.45 }
    ]
  }
};

export const mockSellerReviews = [
  {
    id: 'review1',
    businessId: 1,
    orderId: 'ORD001',
    customerName: 'Sarah Johnson',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    comment: 'Amazing Italian food! The pizza was perfect and service was excellent. Will definitely order again.',
    date: '2024-01-15T18:30:00Z',
    response: {
      text: 'Thank you so much for your kind words! We are delighted you enjoyed your meal.',
      date: '2024-01-15T20:15:00Z'
    },
    helpful: 12,
    reported: false
  },
  {
    id: 'review2',
    businessId: 1,
    orderId: 'ORD003',
    customerName: 'Mike Wilson',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    rating: 4,
    comment: 'Great atmosphere and delicious food. The carbonara was creamy and well-prepared. Only minor issue was delivery time.',
    date: '2024-01-10T16:20:00Z',
    response: null,
    helpful: 8,
    reported: false
  }
];

export const orderStatuses = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-500' },
  { value: 'preparing', label: 'Preparing', color: 'bg-orange-500' },
  { value: 'ready', label: 'Ready', color: 'bg-purple-500' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-indigo-500' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-500' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' }
];