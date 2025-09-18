import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Heart, 
  ShoppingCart, 
  ArrowLeft,
  Share2,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { mockBusinesses, mockReviews } from '../data/mock';

const BusinessDetailPage = ({ 
  onAddToWishlist, 
  onAddToCart, 
  wishlistItems = [],
  cartItems = []
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const businessData = mockBusinesses.find(b => b.id === parseInt(id));
    if (businessData) {
      setBusiness(businessData);
      // Filter reviews for this business
      const businessReviews = mockReviews.filter(r => r.businessId === parseInt(id));
      setReviews(businessReviews);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!business) {
    return <div>Loading...</div>;
  }

  const isInWishlist = wishlistItems.some(item => item.id === business.id);

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(business);
    }
  };

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'menu', label: business.category === 'restaurants' ? 'Menu' : 'Services' },
    { id: 'reviews', label: 'Reviews' }
  ];

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
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/80 hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddToWishlist}
            className={`${
              isInWishlist 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-white/80 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Business Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {business.name}
                    </h1>
                    <p className="text-gray-600 mb-4">{business.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold text-lg">{business.rating}</span>
                        <span className="text-gray-500 ml-1">({business.reviewCount} reviews)</span>
                      </div>
                      <Badge variant={business.isOpen ? 'default' : 'secondary'}>
                        {business.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{business.address}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{business.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {business.priceRange}
                    </div>
                  </div>
                </div>

                {/* Services/Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {business.services?.map((service, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {(business.category === 'restaurants' || business.category === 'grocery') ? (
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Order Now
                    </Button>
                  ) : (
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  )}
                  
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {selectedTab === 'overview' && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About {business.name}</h3>
                  <p className="text-gray-600 mb-6">
                    {business.description} We are committed to providing excellent service and quality 
                    products to our customers. Our team of professionals ensures that every experience 
                    with us is memorable and satisfying.
                  </p>
                  
                  <h4 className="font-semibold mb-3">Services Offered:</h4>
                  <ul className="space-y-2">
                    {business.services?.map((service, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {selectedTab === 'menu' && (
              <div className="space-y-4">
                {business.items?.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{item.name}</h4>
                          <p className="text-2xl font-bold text-red-600">${item.price}</p>
                        </div>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    size="lg"
                  >
                    {(business.category === 'restaurants' || business.category === 'grocery') 
                      ? 'Order Now' 
                      : 'Book Appointment'
                    }
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                    {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-medium">Business Hours</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>11:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;