import React, { useState } from 'react';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, location);
    }
  };

  const trendingSearches = [
    'Italian restaurants', 
    'Hair salon', 
    'Grocery delivery', 
    'Auto repair', 
    'Gym membership'
  ];

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing
            <span className="text-red-600 block">Services Near You</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            From delicious food to beauty services, find and book the best local businesses 
            in your area. Everything you need, all in one place.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-xl shadow-lg border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for restaurants, services, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-0"
                />
              </div>
              
              <div className="md:w-64 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-0"
                />
              </div>
              
              <Button 
                type="submit"
                className="px-8 py-4 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Trending Searches */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="text-gray-600 flex items-center mr-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending:
            </span>
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSearch && onSearch(search)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                {search}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">10,000+</div>
              <div className="text-gray-600">Service Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Service Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">1M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;