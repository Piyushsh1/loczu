import React from 'react';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import BusinessCard from '../components/Business/BusinessCard';
import { useNavigate } from 'react-router-dom';

const WishlistPage = ({ 
  wishlistItems = [], 
  onRemoveFromWishlist, 
  onAddToCart, 
  onBusinessClick,
  cartItems = []
}) => {
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite services and businesses to easily find them later
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Discover Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              My Wishlist ({wishlistItems.length} items)
            </h1>
            <div className="flex items-center text-red-600">
              <Heart className="h-6 w-6 mr-2 fill-current" />
              <span className="text-lg font-semibold">Favorites</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onBusinessClick={onBusinessClick}
              onAddToWishlist={onRemoveFromWishlist} // This will remove since it's already in wishlist
              onAddToCart={onAddToCart}
              isInWishlist={true} // Always true for wishlist page
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;