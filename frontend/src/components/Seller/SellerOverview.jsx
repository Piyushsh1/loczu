import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Star,
  Clock,
  Package,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { mockSellerAnalytics, mockSellerOrders, mockSellerBusinesses } from '../../data/mockSeller';

const SellerOverview = ({ seller }) => {
  const analytics = mockSellerAnalytics;
  const recentOrders = mockSellerOrders.slice(0, 5);
  const business = mockSellerBusinesses[0]; // Assuming first business

  const stats = [
    {
      title: 'Today\'s Revenue',
      value: `$${analytics.todayStats.revenue.toFixed(2)}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Today\'s Orders',
      value: analytics.todayStats.orders,
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Average Order Value',
      value: `$${analytics.todayStats.averageOrderValue.toFixed(2)}`,
      change: '+5.1%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'New Customers',
      value: analytics.todayStats.newCustomers,
      change: '+15.3%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {seller.name}! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={business?.isOpen ? 'default' : 'secondary'} className={business?.isOpen ? 'bg-green-600' : ''}>
            {business?.isOpen ? 'Open' : 'Closed'}
          </Badge>
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Business Hours
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-').replace('600', '50')}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Orders</span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-semibold text-gray-900">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {order.items.length} items • {order.orderType} • {order.estimatedTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.orderTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Business Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Package className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
              <Button variant="outline" className="w-full">
                <Star className="h-4 w-4 mr-2" />
                Create Offer
              </Button>
              <Button variant="outline" className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Update Hours
              </Button>
            </CardContent>
          </Card>

          {/* Business Performance */}
          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="font-semibold">{analytics.monthStats.orders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-semibold">${analytics.monthStats.revenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold ml-1">{business?.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Customers</span>
                <span className="font-semibold">{analytics.monthStats.newCustomers}</span>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  Low inventory alert for Margherita Pizza (5 left)
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  2 new reviews waiting for your response
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;