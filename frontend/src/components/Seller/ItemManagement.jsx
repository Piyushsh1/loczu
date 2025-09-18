import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Package,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { mockSellerItems } from '../../data/mockSeller';

const ItemManagement = ({ seller }) => {
  const { toast } = useToast();
  const [items, setItems] = useState(mockSellerItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    preparationTime: '',
    ingredients: '',
    allergens: '',
    tags: '',
    inventory: '',
    isAvailable: true
  });

  const categories = [...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleAvailability = (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    ));
    toast({
      title: "Item Updated",
      description: "Item availability has been updated.",
    });
  };

  const handleAddItem = () => {
    const item = {
      id: Date.now(),
      businessId: 1,
      ...newItem,
      price: parseFloat(newItem.price),
      originalPrice: parseFloat(newItem.originalPrice) || parseFloat(newItem.price),
      preparationTime: parseInt(newItem.preparationTime),
      inventory: parseInt(newItem.inventory),
      ingredients: newItem.ingredients.split(',').map(i => i.trim()),
      allergens: newItem.allergens.split(',').map(a => a.trim()),
      tags: newItem.tags.split(',').map(t => t.trim()),
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      soldToday: 0
    };

    setItems(prev => [...prev, item]);
    setNewItem({
      name: '', description: '', price: '', originalPrice: '', category: '',
      preparationTime: '', ingredients: '', allergens: '', tags: '', inventory: '', isAvailable: true
    });
    setIsAddModalOpen(false);
    
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your menu.`,
    });
  };

  const handleDeleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Deleted",
      description: "Item has been removed from your menu.",
    });
  };

  const ItemForm = ({ item, onSave, onCancel, isEditing = false }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Item Name</Label>
          <Input
            value={item.name}
            onChange={(e) => setNewItem({...item, name: e.target.value})}
            placeholder="Enter item name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <select
            value={item.category}
            onChange={(e) => setNewItem({...item, category: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select category</option>
            <option value="Pizza">Pizza</option>
            <option value="Pasta">Pasta</option>
            <option value="Desserts">Desserts</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={item.description}
          onChange={(e) => setNewItem({...item, description: e.target.value})}
          placeholder="Describe your item..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Price ($)</Label>
          <Input
            type="number"
            step="0.01"
            value={item.price}
            onChange={(e) => setNewItem({...item, price: e.target.value})}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label>Original Price ($)</Label>
          <Input
            type="number"
            step="0.01"
            value={item.originalPrice}
            onChange={(e) => setNewItem({...item, originalPrice: e.target.value})}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label>Preparation Time (min)</Label>
          <Input
            type="number"
            value={item.preparationTime}
            onChange={(e) => setNewItem({...item, preparationTime: e.target.value})}
            placeholder="15"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Ingredients (comma-separated)</Label>
          <Input
            value={item.ingredients}
            onChange={(e) => setNewItem({...item, ingredients: e.target.value})}
            placeholder="Tomato, Cheese, Basil"
          />
        </div>
        <div>
          <Label>Allergens (comma-separated)</Label>
          <Input
            value={item.allergens}
            onChange={(e) => setNewItem({...item, allergens: e.target.value})}
            placeholder="Gluten, Dairy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Tags (comma-separated)</Label>
          <Input
            value={item.tags}
            onChange={(e) => setNewItem({...item, tags: e.target.value})}
            placeholder="Popular, Vegetarian"
          />
        </div>
        <div>
          <Label>Inventory Count</Label>
          <Input
            type="number"
            value={item.inventory}
            onChange={(e) => setNewItem({...item, inventory: e.target.value})}
            placeholder="50"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={item.isAvailable}
          onCheckedChange={(checked) => setNewItem({...item, isAvailable: checked})}
        />
        <Label>Item is available</Label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave} className="bg-red-600 hover:bg-red-700">
          {isEditing ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu & Services</h1>
          <p className="text-gray-600">Manage your menu items and service offerings</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <ItemForm
              item={newItem}
              onSave={handleAddItem}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                <Badge variant={item.isAvailable ? 'default' : 'secondary'}
                       className={item.isAvailable ? 'bg-green-600' : ''}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              {item.originalPrice > item.price && (
                <div className="absolute top-3 left-3">
                  <Badge variant="destructive" className="bg-red-600">
                    ${(item.originalPrice - item.price).toFixed(2)} OFF
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                <div className="text-right">
                  <p className="font-bold text-lg text-red-600">${item.price}</p>
                  {item.originalPrice > item.price && (
                    <p className="text-sm text-gray-500 line-through">${item.originalPrice}</p>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{item.preparationTime} min</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Package className="h-4 w-4 mr-1" />
                  <span>{item.inventory} left</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags?.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <span>Sold today: {item.soldToday}</span>
                <span className="text-green-600 font-semibold">
                  ${(item.soldToday * item.price).toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleToggleAvailability(item.id)}
                  >
                    {item.isAvailable ? 
                      <EyeOff className="h-4 w-4" /> : 
                      <Eye className="h-4 w-4" />
                    }
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Switch
                  checked={item.isAvailable}
                  onCheckedChange={() => handleToggleAvailability(item.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first menu item'}
            </p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItemManagement;