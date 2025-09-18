import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  ShoppingCart, 
  Flag, 
  BarChart3, 
  Settings, 
  Shield,
  TrendingUp,
  FileText,
  Bell,
  CreditCard,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'businesses', label: 'Businesses', icon: Store, badge: 23 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'reports', label: 'Reports & Content', icon: Flag, badge: 5 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'revenue', label: 'Revenue', icon: TrendingUp },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'categories', label: 'Categories', icon: FileText },
  { id: 'settings', label: 'Platform Settings', icon: Settings },
  { id: 'security', label: 'Security', icon: Shield }
];

const AdminSidebar = ({ activeSection, onSectionChange, admin, onLogout }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">{admin?.name}</p>
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
                'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-red-50 text-red-700 border-r-2 border-red-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className="flex items-center">
                <Icon className={cn('mr-3 h-5 w-5', isActive ? 'text-red-700' : 'text-gray-400')} />
                {item.label}
              </div>
              {item.badge && (
                <Badge 
                  variant="destructive" 
                  className="bg-red-600 hover:bg-red-700 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
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

export default AdminSidebar;