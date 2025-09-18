import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Home/HeroSection';
import CategorySection from '../components/Home/CategorySection';
import BusinessCard from '../components/Business/BusinessCard';
import { mockBusinesses, businessCategories, mockCart, mockWishlist } from '../data/mock';
import { Button } from '../components/ui/button';

const HomePage = ({ 
  onBusinessClick, 
  onAddToWishlist, 
  onAddToCart,
  cartItems = [],
  wishlistItems = []
}) => {
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter businesses based on category and search
  useEffect(() => {
    let filtered = businesses;

    if (selectedCategory) {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.services?.some(service => 
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredBusinesses(filtered);
  }, [businesses, selectedCategory, searchQuery]);

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    // In a real app, we'd also use location for filtering
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const isInWishlist = (businessId) => {
    return wishlistItems.some(item => item.id === businessId);
  };

  const featuredBusinesses = businesses.filter(b => b.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Categories */}
      <CategorySection 
        categories={businessCategories}
        onCategorySelect={handleCategorySelect}
      />

      {/* Featured Section */}
      {featuredBusinesses.length > 0 && !selectedCategory && !searchQuery && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Featured Services
                </h2>
                <p className="text-gray-600">
                  Handpicked top-rated businesses just for you
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onBusinessClick={onBusinessClick}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCart={onAddToCart}
                  isInWishlist={isInWishlist(business.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Businesses Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory 
                  ? `${businessCategories.find(c => c.id === selectedCategory)?.name || 'Services'} Near You`
                  : searchQuery 
                    ? `Search Results for "${searchQuery}"`
                    : 'All Services'
                }
              </h2>
              <p className="text-gray-600">
                {filteredBusinesses.length} service{filteredBusinesses.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {(selectedCategory || searchQuery) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onBusinessClick={onBusinessClick}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCart={onAddToCart}
                  isInWishlist={isInWishlist(business.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Browse All Services
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;