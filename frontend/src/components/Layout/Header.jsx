import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const Header = ({ 
  user, 
  cartCount = 0, 
  wishlistCount = 0, 
  onSearch, 
  onAuthClick,
  onCartClick,
  onWishlistClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('New York, NY');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-red-600 mr-8">
              ServiceHub
            </div>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 mr-4">
            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{location}</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for restaurants, grocery, beauty services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-gray-200 focus:border-red-500 focus:ring-red-500"
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onWishlistClick}
              className="relative hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-red-600"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-red-600"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAuthClick}
              className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:inline text-sm">
                {user?.isLoggedIn ? user.name : 'Login'}
              </span>
            </Button>

            {/* Seller/Admin Access */}
            {user?.isLoggedIn && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/seller-dashboard'}
                  className="border-red-200 text-red-600 hover:bg-red-50 text-xs"
                >
                  Seller Hub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/admin-dashboard'}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 text-xs"
                >
                  Admin
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;