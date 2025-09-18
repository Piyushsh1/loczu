import React from 'react';
import { Star, Clock, Heart, ShoppingCart, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const BusinessCard = ({ 
  business, 
  onBusinessClick, 
  onAddToWishlist, 
  onAddToCart,
  isInWishlist = false 
}) => {
  const handleCardClick = () => {
    if (onBusinessClick) {
      onBusinessClick(business.id);
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(business);
    }
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(business);
    }
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border-0 shadow-md hover:shadow-2xl"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {business.featured && (
          <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-700">
            Featured
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isInWishlist 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-red-600'
          } transition-all duration-200`}
        >
          <Heart 
            className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} 
          />
        </Button>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge 
            variant={business.isOpen ? 'default' : 'secondary'}
            className={business.isOpen ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500'}
          >
            {business.isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
            {business.name}
          </h3>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-semibold">{business.rating}</span>
            <span className="text-gray-500 ml-1">({business.reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{business.address}</span>
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{business.deliveryTime}</span>
          </div>
          <span className="font-semibold text-gray-900">
            {business.priceRange}
          </span>
        </div>

        {/* Services/Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {business.services?.slice(0, 3).map((service, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {service}
            </Badge>
          ))}
          {business.services?.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
              +{business.services.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            onClick={handleCardClick}
          >
            View Details
          </Button>
          
          {business.category === 'restaurants' || business.category === 'grocery' ? (
            <Button 
              size="sm" 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              size="sm" 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCardClick}
            >
              Book Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;