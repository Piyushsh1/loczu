import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const EarningsSection = ({ seller }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-600">Track your revenue and payouts</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Earnings Dashboard</h3>
          <p className="text-gray-600">Revenue tracking and payout information will be available here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsSection;