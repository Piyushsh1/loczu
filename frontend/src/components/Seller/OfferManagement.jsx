import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Percent, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { mockOffers } from '../../data/mockSeller';

const OfferManagement = ({ seller }) => {
  const { toast } = useToast();
  const [offers, setOffers] = useState(mockOffers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    type: 'percentage',
    value: '',
    minOrderValue: '',
    maxDiscount: '',
    validFrom: '',
    validTo: '',
    usageLimit: '',
    terms: '',
    isActive: true
  });

  const handleToggleOffer = (offerId) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer
    ));
    toast({
      title: "Offer Updated",
      description: "Offer status has been updated.",
    });
  };

  const handleAddOffer = () => {
    const offer = {
      id: `offer${Date.now()}`,
      businessId: 1,
      ...newOffer,
      value: parseFloat(newOffer.value),
      minOrderValue: parseFloat(newOffer.minOrderValue),
      maxDiscount: parseFloat(newOffer.maxDiscount),
      usageLimit: newOffer.usageLimit ? parseInt(newOffer.usageLimit) : null,
      usedCount: 0,
      applicableItems: [],
      applicableCategories: []
    };

    setOffers(prev => [...prev, offer]);
    setNewOffer({
      title: '', description: '', type: 'percentage', value: '',
      minOrderValue: '', maxDiscount: '', validFrom: '', validTo: '',
      usageLimit: '', terms: '', isActive: true
    });
    setIsAddModalOpen(false);
    
    toast({
      title: "Offer Created",
      description: `${offer.title} has been created successfully.`,
    });
  };

  const handleDeleteOffer = (offerId) => {
    setOffers(prev => prev.filter(offer => offer.id !== offerId));
    toast({
      title: "Offer Deleted",
      description: "Offer has been removed.",
    });
  };

  const getOfferTypeIcon = (type) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-5 w-5" />;
      case 'free_delivery':
        return <Truck className="h-5 w-5" />;
      default:
        return <Percent className="h-5 w-5" />;
    }
  };

  const formatOfferValue = (offer) => {
    switch (offer.type) {
      case 'percentage':
        return `${offer.value}% off`;
      case 'free_delivery':
        return 'Free Delivery';
      case 'fixed_amount':
        return `$${offer.value} off`;
      default:
        return `${offer.value}% off`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offers & Promotions</h1>
          <p className="text-gray-600">Create and manage promotional offers for your business</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Offer Title</Label>
                <Input
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  placeholder="e.g., Weekend Special 20% Off"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                  placeholder="Describe your offer..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Offer Type</Label>
                  <select
                    value={newOffer.type}
                    onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="percentage">Percentage Discount</option>
                    <option value="fixed_amount">Fixed Amount Off</option>
                    <option value="free_delivery">Free Delivery</option>
                  </select>
                </div>
                <div>
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    value={newOffer.value}
                    onChange={(e) => setNewOffer({...newOffer, value: e.target.value})}
                    placeholder={newOffer.type === 'percentage' ? '20' : '5.00'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Order Value ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newOffer.minOrderValue}
                    onChange={(e) => setNewOffer({...newOffer, minOrderValue: e.target.value})}
                    placeholder="25.00"
                  />
                </div>
                <div>
                  <Label>Maximum Discount ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newOffer.maxDiscount}
                    onChange={(e) => setNewOffer({...newOffer, maxDiscount: e.target.value})}
                    placeholder="15.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Valid From</Label>
                  <Input
                    type="date"
                    value={newOffer.validFrom}
                    onChange={(e) => setNewOffer({...newOffer, validFrom: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Valid To</Label>
                  <Input
                    type="date"
                    value={newOffer.validTo}
                    onChange={(e) => setNewOffer({...newOffer, validTo: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label>Usage Limit (optional)</Label>
                <Input
                  type="number"
                  value={newOffer.usageLimit}
                  onChange={(e) => setNewOffer({...newOffer, usageLimit: e.target.value})}
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div>
                <Label>Terms & Conditions</Label>
                <Textarea
                  value={newOffer.terms}
                  onChange={(e) => setNewOffer({...newOffer, terms: e.target.value})}
                  placeholder="Enter terms and conditions..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newOffer.isActive}
                  onCheckedChange={(checked) => setNewOffer({...newOffer, isActive: checked})}
                />
                <Label>Activate offer immediately</Label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddOffer} className="bg-red-600 hover:bg-red-700">
                  Create Offer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-red-50 rounded-lg">
                    {getOfferTypeIcon(offer.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                  </div>
                </div>
                <Badge variant={offer.isActive ? 'default' : 'secondary'}
                       className={offer.isActive ? 'bg-green-600' : ''}>
                  {offer.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Offer Value */}
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{formatOfferValue(offer)}</p>
                {offer.minOrderValue > 0 && (
                  <p className="text-sm text-gray-600">on orders above ${offer.minOrderValue}</p>
                )}
              </div>

              {/* Offer Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="font-medium">
                    {new Date(offer.validTo).toLocaleDateString()}
                  </span>
                </div>
                
                {offer.usageLimit && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usage:</span>
                    <span className="font-medium">
                      {offer.usedCount}/{offer.usageLimit}
                    </span>
                  </div>
                )}

                {offer.maxDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Discount:</span>
                    <span className="font-medium">${offer.maxDiscount}</span>
                  </div>
                )}
              </div>

              {/* Usage Progress */}
              {offer.usageLimit && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Usage Progress</span>
                    <span>{Math.round((offer.usedCount / offer.usageLimit) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(offer.usedCount / offer.usageLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Terms */}
              {offer.terms && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">{offer.terms}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteOffer(offer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Switch
                  checked={offer.isActive}
                  onCheckedChange={() => handleToggleOffer(offer.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {offers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Percent className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers created</h3>
            <p className="text-gray-600 mb-4">
              Create your first promotional offer to attract more customers
            </p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Offer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OfferManagement;