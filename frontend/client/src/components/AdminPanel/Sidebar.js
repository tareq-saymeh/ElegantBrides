import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleItems = () => {
    setIsItemsOpen(!isItemsOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      navigate('/Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="Adminsidebar">
      <nav className="nav-links">
        <ul>
          <li>
            <h4>ElegantBridel</h4>
            <hr/>
          </li>
          <li className='SideBarContant'>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/Reservations">Reservations</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/UnderReservations">Under Reservations</Link>
          </li>
          <li className='SideBarContant' onClick={toggleItems} style={{ cursor: 'pointer' }}>
            Items
          </li>
          {isItemsOpen && (
            <ul className="SideBarContantdropdown">
              <hr></hr>
              <li className='SideBarContant'>
                <Link to="/items/dresses">Dresses</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/accessories">Accessories</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/shoes">Shoes</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/Flowers">Flowers</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/Jewerly">Jewerly</Link>
              </li> 
              <li className='SideBarContant'>
                <Link to="/items/veils">Vailes</Link>
              </li>
              <hr/>
            </ul>
          )}
          <li className='SideBarContant'>
            <Link to="/users">Users</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/History">History</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/settings">Settings</Link>
          </li>
          <li className='SideBarContant' onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
