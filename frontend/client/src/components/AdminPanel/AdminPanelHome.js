import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminPanel = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token || userRole !== 'Admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
