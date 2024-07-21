// AdminPanel.js
import React from 'react';
import Sidebar from './Sidebar';

const AdminPanel = ({ children }) => {
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
