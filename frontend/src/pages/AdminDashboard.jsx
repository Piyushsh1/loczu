import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import { mockAdmin } from '../data/mockAdmin';

// Dashboard sections (we'll create these next)
// import AdminOverview from '../components/Admin/AdminOverview';
// import BusinessManagement from '../components/Admin/BusinessManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [admin, setAdmin] = useState(mockAdmin);

  const handleLogout = () => {
    // Clear admin data and redirect
    localStorage.removeItem('admin_data');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin panel. Select a section from the sidebar to get started.</p>
          </div>
        );
      case 'businesses':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Management</h1>
            <p className="text-gray-600">Manage business approvals and listings.</p>
          </div>
        );
      case 'customers':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Management</h1>
            <p className="text-gray-600">View and manage customer accounts.</p>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Management</h1>
            <p className="text-gray-600">Monitor all platform orders.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Content Moderation</h1>
            <p className="text-gray-600">Review reported content and moderate the platform.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
            <p className="text-gray-600">View platform analytics and insights.</p>
          </div>
        );
      case 'revenue':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Revenue Management</h1>
            <p className="text-gray-600">Track platform revenue and commissions.</p>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Management</h1>
            <p className="text-gray-600">Manage payouts and payment settings.</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Notifications</h1>
            <p className="text-gray-600">Send notifications to users and businesses.</p>
          </div>
        );
      case 'categories':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Management</h1>
            <p className="text-gray-600">Manage business categories and services.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Platform Settings</h1>
            <p className="text-gray-600">Configure platform-wide settings.</p>
          </div>
        );
      case 'security':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Security Settings</h1>
            <p className="text-gray-600">Manage security and access controls.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin panel.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        admin={admin}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;