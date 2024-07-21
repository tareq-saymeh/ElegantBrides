import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  const toggleItems = () => {
    setIsItemsOpen(!isItemsOpen);
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
