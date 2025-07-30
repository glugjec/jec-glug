import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

// Clear X-API session on logout
const clearXapiSession = () => {
  sessionStorage.removeItem('xapi_session');
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => {
    clearXapiSession();
    setIsAuthenticated(false);
  }} />;
};

export default AdminPanel;
