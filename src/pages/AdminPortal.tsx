
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, BarChart, ShoppingBag, Settings, Database, Shield, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check authentication and role
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole') || '';
    
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, []);

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/auth?mode=login&role=admin" />;
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart className="w-5 h-5 mr-2" /> },
    { id: 'users', name: 'User Management', icon: <Users className="w-5 h-5 mr-2" /> },
    { id: 'doctors', name: 'Doctors', icon: <Users className="w-5 h-5 mr-2" /> },
    { id: 'products', name: 'Products', icon: <ShoppingBag className="w-5 h-5 mr-2" /> },
    { id: 'reports', name: 'Reports', icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: 'database', name: 'Database', icon: <Database className="w-5 h-5 mr-2" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5 mr-2" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5 mr-2" /> }
  ];

  // Mock stats data
  const stats = [
    { title: 'Total Users', value: '1,254', change: '+12%', changeType: 'positive' },
    { title: 'Active Doctors', value: '78', change: '+5%', changeType: 'positive' },
    { title: 'Appointments', value: '2,376', change: '+18%', changeType: 'positive' },
    { title: 'Revenue', value: '$24,500', change: '+8%', changeType: 'positive' }
  ];

  // Mock recent user data
  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joinDate: '2023-04-15' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah@example.com', role: 'Doctor', joinDate: '2023-04-14' },
    { id: 3, name: 'Mike Smith', email: 'mike@example.com', role: 'User', joinDate: '2023-04-14' },
    { id: 4, name: 'Dr. Lisa Wong', email: 'lisa@example.com', role: 'Doctor', joinDate: '2023-04-13' },
    { id: 5, name: 'Robert Davis', email: 'robert@example.com', role: 'User', joinDate: '2023-04-12' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-gray-50">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-600">Manage your platform, users, and business analytics</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={cn(
                      "w-full flex items-center px-4 py-3 rounded-lg transition-colors",
                      activeTab === tab.id 
                        ? "bg-sociodent-100 text-sociodent-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {activeTab === 'dashboard' && (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <div className="flex items-end justify-between mt-2">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <span className={cn(
                            "text-sm",
                            stat.changeType === 'positive' ? "text-green-600" : "text-red-600"
                          )}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Recent Users */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Recent Users</h2>
                      <button className="text-sociodent-600 hover:text-sociodent-700 text-sm font-medium">View All</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Role</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Join Date</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((user) => (
                            <tr key={user.id} className="border-b">
                              <td className="px-4 py-4">{user.name}</td>
                              <td className="px-4 py-4">{user.email}</td>
                              <td className="px-4 py-4">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs",
                                  user.role === 'Doctor' ? "bg-sociodent-100 text-sociodent-800" : "bg-gray-100 text-gray-800"
                                )}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-4 py-4">{user.joinDate}</td>
                              <td className="px-4 py-4">
                                <div className="flex space-x-2">
                                  <button className="text-sociodent-600 hover:text-sociodent-700">View</button>
                                  <button className="text-gray-600 hover:text-gray-700">Edit</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'users' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">User Management</h2>
                  <p className="text-gray-600">View and manage users of the platform.</p>
                </div>
              )}
              
              {activeTab === 'doctors' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Doctor Management</h2>
                  <p className="text-gray-600">Manage doctors, approvals, and verifications.</p>
                </div>
              )}
              
              {activeTab === 'products' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Product Management</h2>
                  <p className="text-gray-600">Manage marketplace products, inventory, and pricing.</p>
                </div>
              )}
              
              {activeTab === 'reports' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Reports</h2>
                  <p className="text-gray-600">View and export platform analytics and reports.</p>
                </div>
              )}
              
              {activeTab === 'database' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Database Management</h2>
                  <p className="text-gray-600">Manage database operations and maintenance.</p>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  <p className="text-gray-600">Manage platform security and access controls.</p>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Platform Settings</h2>
                  <p className="text-gray-600">Configure global platform settings and preferences.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPortal;
