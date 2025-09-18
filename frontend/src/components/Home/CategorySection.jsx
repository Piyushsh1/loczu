import React from 'react';
import { 
  Utensils, 
  ShoppingCart, 
  Scissors, 
  Dumbbell, 
  Pill, 
  Car, 
  Smartphone, 
  Home 
} from 'lucide-react';
import { Card } from '../ui/card';

const iconMap = {
  Utensils,
  ShoppingCart,
  Scissors,
  Dumbbell,
  Pill,
  Car,
  Smartphone,
  Home
};

const CategorySection = ({ categories, onCategorySelect }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Services Near You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From restaurants to beauty services, find everything you need in one place
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            
            return (
              <Card
                key={category.id}
                className="p-6 text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group bg-white border-0 shadow-md"
                onClick={() => onCategorySelect && onCategorySelect(category.id)}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                    <IconComponent className="h-8 w-8 text-red-600 group-hover:text-red-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;