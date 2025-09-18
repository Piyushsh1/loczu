// Mock data for the multi-service platform

export const businessCategories = [
  { id: 'restaurants', name: 'Restaurants', icon: 'Utensils' },
  { id: 'grocery', name: 'Grocery', icon: 'ShoppingCart' },
  { id: 'beauty', name: 'Beauty & Spa', icon: 'Scissors' },
  { id: 'fitness', name: 'Fitness', icon: 'Dumbbell' },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'Pill' },
  { id: 'automotive', name: 'Auto Services', icon: 'Car' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'home-services', name: 'Home Services', icon: 'Home' }
];

export const mockBusinesses = [
  // Restaurants
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
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    isOpen: true,
    services: ['Dine-in', 'Takeout', 'Delivery'],
    cuisine: 'Italian',
    featured: true,
    items: [
      { id: 101, name: 'Margherita Pizza', price: 18.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop' },
      { id: 102, name: 'Spaghetti Carbonara', price: 16.50, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d30e?w=300&h=200&fit=crop' },
      { id: 103, name: 'Tiramisu', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop' }
    ]
  },
  {
    id: 2,
    name: "Spice Garden Indian",
    category: 'restaurants',
    description: 'Traditional Indian spices and flavors',
    rating: 4.3,
    reviewCount: 267,
    priceRange: '$12-25',
    deliveryTime: '25-40 min',
    address: '456 Oak Avenue, Midtown',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    isOpen: true,
    services: ['Dine-in', 'Takeout', 'Delivery'],
    cuisine: 'Indian',
    featured: false,
    items: [
      { id: 201, name: 'Chicken Tikka Masala', price: 19.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop' },
      { id: 202, name: 'Biryani', price: 17.50, image: 'https://images.unsplash.com/photo-1563379091339-03246963d19d?w=300&h=200&fit=crop' }
    ]
  },
  
  // Beauty & Spa Services
  {
    id: 3,
    name: "Elite Hair Studio",
    category: 'beauty',
    description: 'Professional hair styling and beauty treatments',
    rating: 4.7,
    reviewCount: 189,
    priceRange: '$25-80',
    deliveryTime: 'Book appointment',
    address: '789 Beauty Boulevard, Uptown',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    isOpen: true,
    services: ['Hair Cut', 'Coloring', 'Styling', 'Treatments'],
    cuisine: 'Beauty Services',
    featured: true,
    items: [
      { id: 301, name: 'Haircut & Style', price: 45.00, image: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=300&h=200&fit=crop' },
      { id: 302, name: 'Hair Coloring', price: 75.00, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=200&fit=crop' },
      { id: 303, name: 'Deep Conditioning', price: 35.00, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=200&fit=crop' }
    ]
  },
  
  // Grocery
  {
    id: 4,
    name: "Fresh Market Express",
    category: 'grocery',
    description: 'Fresh groceries delivered to your door',
    rating: 4.2,
    reviewCount: 456,
    priceRange: '$5-50',
    deliveryTime: '15-30 min',
    address: '321 Market Street, Downtown',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    isOpen: true,
    services: ['Fresh Produce', 'Dairy', 'Meat', 'Bakery'],
    cuisine: 'Grocery',
    featured: false,
    items: [
      { id: 401, name: 'Fresh Vegetables Box', price: 25.99, image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=300&h=200&fit=crop' },
      { id: 402, name: 'Organic Fruits Bundle', price: 19.50, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop' }
    ]
  },
  
  // Auto Services
  {
    id: 5,
    name: "QuickFix Auto Care",
    category: 'automotive',
    description: 'Complete automotive care and maintenance',
    rating: 4.4,
    reviewCount: 234,
    priceRange: '$30-150',
    deliveryTime: 'Schedule service',
    address: '555 Auto Lane, Industrial District',
    image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop',
    isOpen: true,
    services: ['Oil Change', 'Tire Service', 'Brake Repair', 'Diagnostics'],
    cuisine: 'Auto Services',
    featured: false,
    items: [
      { id: 501, name: 'Oil Change Service', price: 49.99, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&fit=crop' },
      { id: 502, name: 'Tire Rotation', price: 35.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' }
    ]
  },
  
  // Fitness
  {
    id: 6,
    name: "PowerFit Gym & Training",
    category: 'fitness',
    description: 'Professional fitness training and wellness',
    rating: 4.6,
    reviewCount: 167,
    priceRange: '$20-100',
    deliveryTime: 'Book session',
    address: '888 Fitness Plaza, Sports District',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    isOpen: true,
    services: ['Personal Training', 'Group Classes', 'Nutrition', 'Equipment Access'],
    cuisine: 'Fitness',
    featured: true,
    items: [
      { id: 601, name: 'Personal Training Session', price: 65.00, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop' },
      { id: 602, name: 'Group Fitness Class', price: 25.00, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop' }
    ]
  }
];

export const mockUser = {
  id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 User Street, City',
  isLoggedIn: false
};

export const mockCart = [];

export const mockWishlist = [];

export const mockReviews = [
  {
    id: 'review1',
    businessId: 1,
    userId: 'user123',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing Italian food! The pizza was perfect and service was excellent.',
    date: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: 'review2',
    businessId: 1,
    userId: 'user456',
    userName: 'Sarah Johnson',
    rating: 4,
    comment: 'Great atmosphere and delicious food. Will definitely come back!',
    date: '2024-01-10',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
  }
];

export const searchFilters = {
  sortBy: [
    { value: 'rating', label: 'Rating' },
    { value: 'deliveryTime', label: 'Delivery Time' },
    { value: 'priceRange', label: 'Price Range' },
    { value: 'distance', label: 'Distance' }
  ],
  priceRange: [
    { value: '$', label: 'Budget-friendly ($5-15)' },
    { value: '$$', label: 'Mid-range ($15-30)' },
    { value: '$$$', label: 'Premium ($30+)' }
  ],
  rating: [
    { value: '4+', label: '4.0 & above' },
    { value: '3.5+', label: '3.5 & above' },
    { value: '3+', label: '3.0 & above' }
  ]
};