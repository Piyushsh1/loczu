import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../components/Seller/SellerSidebar';
import { mockSeller } from '../data/mockSeller';

// Dashboard sections
import SellerOverview from '../components/Seller/SellerOverview';
import BusinessProfile from '../components/Seller/BusinessProfile';
import ItemManagement from '../components/Seller/ItemManagement';
import OrderManagement from '../components/Seller/OrderManagement';
import OfferManagement from '../components/Seller/OfferManagement';
import ReviewManagement from '../components/Seller/ReviewManagement';
import CustomerManagement from '../components/Seller/CustomerManagement';
import AnalyticsSection from '../components/Seller/AnalyticsSection';
import EarningsSection from '../components/Seller/EarningsSection';
import BusinessHours from '../components/Seller/BusinessHours';
import SellerSettings from '../components/Seller/SellerSettings';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [seller, setSeller] = useState(mockSeller);

  const handleLogout = () => {
    // Clear seller data and redirect
    localStorage.removeItem('seller_data');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <SellerOverview seller={seller} />;
      case 'business':
        return <BusinessProfile seller={seller} />;
      case 'items':
        return <ItemManagement seller={seller} />;
      case 'orders':
        return <OrderManagement seller={seller} />;
      case 'offers':
        return <OfferManagement seller={seller} />;
      case 'reviews':
        return <ReviewManagement seller={seller} />;
      case 'customers':
        return <CustomerManagement seller={seller} />;
      case 'analytics':
        return <AnalyticsSection seller={seller} />;
      case 'earnings':
        return <EarningsSection seller={seller} />;
      case 'hours':
        return <BusinessHours seller={seller} />;
      case 'settings':
        return <SellerSettings seller={seller} setSeller={setSeller} />;
      default:
        return <SellerOverview seller={seller} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        seller={seller}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;