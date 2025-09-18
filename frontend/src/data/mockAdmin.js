// Mock data for admin dashboard

export const mockAdmin = {
  id: 'admin123',
  name: 'Admin User',
  email: 'admin@loczu.com',
  role: 'admin',
  permissions: ['all'],
  lastLogin: '2024-01-20T09:00:00Z'
};

export const mockPlatformStats = {
  overview: {
    totalBusinesses: 1245,
    activeBusinesses: 1098,
    pendingApprovals: 23,
    totalCustomers: 8769,
    totalOrders: 15432,
    totalRevenue: 234567.89,
    monthlyRevenue: 45678.90,
    commissionEarned: 11667.95
  },
  growthStats: {
    businessGrowth: 12.5, // percentage
    customerGrowth: 18.2,
    orderGrowth: 24.7,
    revenueGrowth: 16.8
  },
  revenueChart: [
    { month: 'Jan', revenue: 45678.90, commission: 2283.95 },
    { month: 'Feb', revenue: 52341.20, commission: 2617.06 },
    { month: 'Mar', revenue: 48976.45, commission: 2448.82 },
    { month: 'Apr', revenue: 56234.78, commission: 2811.74 },
    { month: 'May', revenue: 61345.23, commission: 3067.26 },
    { month: 'Jun', revenue: 58912.67, commission: 2945.63 }
  ],
  orderChart: [
    { month: 'Jan', orders: 2145 },
    { month: 'Feb', orders: 2456 },
    { month: 'Mar', orders: 2234 },
    { month: 'Apr', orders: 2678 },
    { month: 'May', orders: 2891 },
    { month: 'Jun', orders: 2743 }
  ],
  categoryStats: [
    { category: 'Restaurants', count: 456, percentage: 36.6 },
    { category: 'Beauty & Spa', count: 234, percentage: 18.8 },
    { category: 'Fitness', count: 189, percentage: 15.2 },
    { category: 'Grocery', count: 167, percentage: 13.4 },
    { category: 'Auto Services', count: 123, percentage: 9.9 },
    { category: 'Others', count: 76, percentage: 6.1 }
  ]
};

export const mockPendingBusinesses = [
  {
    id: 'pending1',
    name: 'Golden Dragon Chinese Restaurant',
    ownerName: 'Chen Wei',
    ownerEmail: 'chen@goldendragon.com',
    category: 'restaurants',
    address: '789 Asian Street, Chinatown',
    phone: '+1234567893',
    submittedDate: '2024-01-18T10:30:00Z',
    documents: [
      { type: 'business_license', url: '/documents/business_license_1.pdf', status: 'verified' },
      { type: 'food_permit', url: '/documents/food_permit_1.pdf', status: 'pending' },
      { type: 'insurance', url: '/documents/insurance_1.pdf', status: 'verified' }
    ],
    businessHours: {
      monday: { open: '11:00', close: '22:00', isOpen: true },
      tuesday: { open: '11:00', close: '22:00', isOpen: true },
      wednesday: { open: '11:00', close: '22:00', isOpen: true },
      thursday: { open: '11:00', close: '22:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '10:00', close: '23:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: false }
    },
    services: ['Dine-in', 'Takeout', 'Delivery'],
    cuisine: 'Chinese',
    priceRange: '$12-28',
    description: 'Authentic Chinese cuisine with traditional recipes passed down through generations.',
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 'pending2',
    name: 'TechFix Computer Repair',
    ownerName: 'Robert Johnson',
    ownerEmail: 'robert@techfix.com',
    category: 'electronics',
    address: '456 Tech Avenue, Downtown',
    phone: '+1234567894',
    submittedDate: '2024-01-19T14:20:00Z',
    documents: [
      { type: 'business_license', url: '/documents/business_license_2.pdf', status: 'verified' },
      { type: 'certification', url: '/documents/tech_cert_2.pdf', status: 'pending' },
      { type: 'insurance', url: '/documents/insurance_2.pdf', status: 'verified' }
    ],
    businessHours: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '10:00', close: '16:00', isOpen: true },
      sunday: { open: '10:00', close: '16:00', isOpen: false }
    },
    services: ['Laptop Repair', 'Phone Repair', 'Data Recovery', 'Hardware Upgrade'],
    priceRange: '$25-150',
    description: 'Professional computer and electronics repair services with quick turnaround times.',
    images: [
      'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop'
    ]
  }
];

export const mockAllBusinesses = [
  ...mockPendingBusinesses.map(b => ({ ...b, status: 'pending' })),
  {
    id: 1,
    name: "Mario's Italian Kitchen",
    ownerName: 'John Smith',
    ownerEmail: 'john@mariositaliankitchen.com',
    category: 'restaurants',
    address: '123 Main St, Downtown',
    phone: '+1234567890',
    status: 'approved',
    joinedDate: '2024-01-15T00:00:00Z',
    totalOrders: 1250,
    totalRevenue: 45670.50,
    rating: 4.5,
    reviewCount: 324,
    isActive: true,
    lastOrderDate: '2024-01-20T15:30:00Z'
  },
  {
    id: 3,
    name: 'Elite Hair Studio',
    ownerName: 'Jessica Brown',
    ownerEmail: 'jessica@elitehair.com',
    category: 'beauty',
    address: '789 Beauty Boulevard, Uptown',
    phone: '+1234567895',
    status: 'approved',
    joinedDate: '2023-11-20T00:00:00Z',
    totalOrders: 876,
    totalRevenue: 32145.75,
    rating: 4.7,
    reviewCount: 189,
    isActive: true,
    lastOrderDate: '2024-01-20T12:00:00Z'
  }
];

export const mockAllCustomers = [
  {
    id: 'customer1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    joinedDate: '2023-12-15T00:00:00Z',
    totalOrders: 23,
    totalSpent: 567.89,
    lastOrderDate: '2024-01-20T14:30:00Z',
    status: 'active',
    favoriteCategories: ['restaurants', 'beauty'],
    averageOrderValue: 24.69,
    isVerified: true
  },
  {
    id: 'customer2',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    phone: '+1234567892',
    joinedDate: '2023-10-08T00:00:00Z',
    totalOrders: 45,
    totalSpent: 1234.56,
    lastOrderDate: '2024-01-19T19:15:00Z',
    status: 'active',
    favoriteCategories: ['restaurants', 'fitness'],
    averageOrderValue: 27.43,
    isVerified: true
  },
  {
    id: 'customer3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1234567893',
    joinedDate: '2024-01-01T00:00:00Z',
    totalOrders: 8,
    totalSpent: 189.45,
    lastOrderDate: '2024-01-18T11:20:00Z',
    status: 'active',
    favoriteCategories: ['grocery', 'pharmacy'],
    averageOrderValue: 23.68,
    isVerified: false
  }
];

export const mockReportedContent = [
  {
    id: 'report1',
    type: 'review',
    contentId: 'review123',
    businessId: 1,
    businessName: "Mario's Italian Kitchen",
    reportedBy: 'customer456',
    reportedByName: 'John Doe',
    reason: 'inappropriate_content',
    description: 'Review contains offensive language',
    reportedDate: '2024-01-19T16:30:00Z',
    status: 'pending',
    content: 'This place is terrible and the service was awful...',
    priority: 'medium'
  },
  {
    id: 'report2',
    type: 'business',
    contentId: 'business789',
    businessId: 789,
    businessName: 'Fake Restaurant',
    reportedBy: 'customer123',
    reportedByName: 'Jane Smith',
    reason: 'fake_business',
    description: 'This business does not exist at the listed address',
    reportedDate: '2024-01-18T10:15:00Z',
    status: 'investigating',
    content: 'Business listing appears to be fraudulent',
    priority: 'high'
  }
];

export const mockSystemSettings = {
  platform: {
    platformName: 'Loczu',
    platformDescription: 'Multi-service marketplace platform',
    supportEmail: 'support@loczu.com',
    platformFee: 5.0, // percentage
    deliveryRadius: 25, // kilometers
    minimumOrderValue: 10.00,
    maxDeliveryFee: 9.99
  },
  payments: {
    enabledMethods: ['credit_card', 'debit_card', 'paypal', 'cash'],
    payoutSchedule: 'weekly',
    minimumPayout: 50.00,
    processingFee: 2.9 // percentage
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotionalEmails: false
  },
  features: {
    enableReviews: true,
    enableChat: true,
    enableOffers: true,
    enableLoyalty: false,
    enableMultiLanguage: false,
    enableDarkMode: true
  }
};

export const reportReasons = [
  { value: 'inappropriate_content', label: 'Inappropriate Content' },
  { value: 'fake_business', label: 'Fake Business' },
  { value: 'spam', label: 'Spam' },
  { value: 'fraud', label: 'Fraudulent Activity' },
  { value: 'violation', label: 'Terms Violation' },
  { value: 'other', label: 'Other' }
];

export const businessStatuses = [
  { value: 'pending', label: 'Pending Approval', color: 'bg-yellow-500' },
  { value: 'approved', label: 'Approved', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-500' },
  { value: 'suspended', label: 'Suspended', color: 'bg-orange-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-gray-500' }
];