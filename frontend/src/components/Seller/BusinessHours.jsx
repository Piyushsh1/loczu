import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const BusinessHours = ({ seller }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Business Hours</h1>
        <p className="text-gray-600">Set your operating hours and availability</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours Management</h3>
          <p className="text-gray-600">Configure your business operating hours here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessHours;