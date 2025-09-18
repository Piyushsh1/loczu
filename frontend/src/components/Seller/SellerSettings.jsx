import React from 'react';
import { Settings } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const SellerSettings = ({ seller, setSeller }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and business settings</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
          <p className="text-gray-600">Account and notification settings will be available here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerSettings;