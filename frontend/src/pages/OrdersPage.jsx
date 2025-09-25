import React from 'react';
import { Package, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// Mock orders data
const mockOrders = [
  {
    id: '12345',
    date: '2024-09-20',
    status: 'delivered',
    total: 42.50,
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
      { name: 'Caesar Salad', quantity: 1, price: 12.99 },
      { name: 'Delivery Fee', quantity: 1, price: 2.99 }
    ],
    restaurant: 'Tony\'s Pizza Palace'
  },
  {
    id: '12344',
    date: '2024-09-18',
    status: 'delivered',
    total: 28.75,
    items: [
      { name: 'Chicken Biryani', quantity: 1, price: 15.99 },
      { name: 'Naan Bread', quantity: 2, price: 4.99 },
      { name: 'Delivery Fee', quantity: 1, price: 2.99 }
    ],
    restaurant: 'Spice Garden'
  },
  {
    id: '12343',
    date: '2024-09-15',
    status: 'cancelled',
    total: 35.20,
    items: [
      { name: 'Sushi Combo', quantity: 1, price: 32.99 },
      { name: 'Delivery Fee', quantity: 1, price: 2.99 }
    ],
    restaurant: 'Sakura Sushi'
  }
];

const OrdersPage = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">Track and manage your order history</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {mockOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Order #{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </span>
                        <span>{order.restaurant}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{item.quantity}x</span>
                          <span className="text-sm text-gray-900">{item.name}</span>
                        </div>
                        <span className="text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('View order details:', order.id)}
                      >
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log('Reorder:', order.id)}
                        >
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;