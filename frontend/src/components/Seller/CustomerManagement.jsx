import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const CustomerManagement = ({ seller }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <p className="text-gray-600">View and manage your customer relationships</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Management</h3>
          <p className="text-gray-600">Customer data and insights will be available here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;