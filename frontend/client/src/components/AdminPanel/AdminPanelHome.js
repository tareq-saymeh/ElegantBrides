import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

const AdminPanel = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, false = not admin, true = admin

  useEffect(() => {
    const fetchSession = async () => {
      console.log("start");

      try {
        const response = await axios.get('http://localhost:3000/api/auth/getSession', { withCredentials: true });
        console.log("mid");

        if (response.data.role === "Admin") {
          setIsAdmin(true);
          console.log(response.data.role);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Session fetch failed:', error);
        setIsAdmin(false);
      }
    };

    fetchSession();
  }, []);

  if (isAdmin === null) {
    return null; // Or some loading indicator
  }

  if (!isAdmin) {
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
