import React, { useState } from 'react';
import { 
  Save, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Instagram, 
  Facebook,
  Twitter,
  Camera,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { useToast } from '../../hooks/use-toast';
import { mockSellerBusinesses, businessCategories } from '../../data/mockSeller';

const BusinessProfile = ({ seller }) => {
  const { toast } = useToast();
  const [business, setBusiness] = useState(mockSellerBusinesses[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setBusiness(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simulate save operation
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your business profile has been updated successfully.",
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate image upload
      const newImageUrl = URL.createObjectURL(file);
      setBusiness(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl]
      }));
      toast({
        title: "Image Uploaded",
        description: "New image has been added to your gallery.",
      });
    }
  };

  const removeImage = (index) => {
    setBusiness(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Profile</h1>
          <p className="text-gray-600">Manage your business information and settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={business.status === 'approved' ? 'default' : 'secondary'} 
                 className={business.status === 'approved' ? 'bg-green-600' : ''}>
            {business.status}
          </Badge>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          {isEditing && (
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={business.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={business.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {businessCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={business.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="Describe your business..."
              />
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={business.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      value={business.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    value={business.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {business.services?.map((service, index) => (
                  <Badge key={index} variant="secondary" className="bg-red-50 text-red-700">
                    {service}
                    {isEditing && (
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => {
                          const newServices = business.services.filter((_, i) => i !== index);
                          handleInputChange('services', newServices);
                        }}
                      />
                    )}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm">Add Service</Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      value={business.socialMedia?.website || ''}
                      onChange={(e) => handleInputChange('socialMedia', 
                        { ...business.socialMedia, website: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="instagram"
                      value={business.socialMedia?.instagram || ''}
                      onChange={(e) => handleInputChange('socialMedia', 
                        { ...business.socialMedia, instagram: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="@yourbusiness"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Business Images */}
          <Card>
            <CardHeader>
              <CardTitle>Business Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {business.images?.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Business ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {isEditing && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 transition-colors"
                  >
                    <div className="text-center">
                      <Camera className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                      <span className="text-sm text-gray-500">Add Image</span>
                    </div>
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="font-semibold">{business.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rating</span>
                <span className="font-semibold">{business.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reviews</span>
                <span className="font-semibold">{business.reviewCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-semibold">${business.totalRevenue?.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Business Status */}
          <Card>
            <CardHeader>
              <CardTitle>Business Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isOpen">Currently Open</Label>
                <Switch
                  id="isOpen"
                  checked={business.isOpen}
                  onCheckedChange={(checked) => handleInputChange('isOpen', checked)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Business</Label>
                <Switch
                  id="featured"
                  checked={business.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  disabled={true}
                />
              </div>
              <div className="text-xs text-gray-500">
                Featured status is managed by platform administrators
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;