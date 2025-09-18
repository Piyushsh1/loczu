import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const AnalyticsSection = ({ seller }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your business performance and insights</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600">Detailed analytics and charts will be available here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;