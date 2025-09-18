import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  ShoppingCart, 
  Star, 
  BarChart3, 
  Settings, 
  Tag,
  Users,
  DollarSign,
  Clock,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'business', label: 'Business Profile', icon: Store },
  { id: 'items', label: 'Menu & Services', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'offers', label: 'Offers & Promotions', icon: Tag },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'hours', label: 'Business Hours', icon: Clock },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const SellerSidebar = ({ activeSection, onSectionChange, seller, onLogout }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">Seller Hub</h2>
            <p className="text-sm text-gray-500">{seller?.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn('mr-3 h-5 w-5', isActive ? 'text-red-700' : 'text-gray-400')} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SellerSidebar;