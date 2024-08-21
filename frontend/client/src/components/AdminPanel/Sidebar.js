import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ar'); // Default language is Arabic

  const navigate = useNavigate();

  // Translation object
  const translations = {
    en: {
      dashboard: 'Dashboard',
      reservations: 'Reservations',
      underReservations: 'Under Reservations',
      items: 'Items',
      dresses: 'Dresses',
      accessories: 'Accessories',
      shoes: 'Shoes',
      flowers: 'Flowers',
      jewelry: 'Jewelry',
      veils: 'Veils',
      users: 'Users',
      history: 'History',
      settings: 'Settings',
      logout: 'Logout',
      switchLanguage: 'Switch Language',
      elegantBridel: 'ElegantBridel'
    },
    ar: {
      dashboard: 'لوحة القيادة',
      reservations: 'الحجوزات',
      underReservations: 'حجوزات حاليه',
      items: 'القطع',
      dresses: 'فساتين',
      accessories: 'إكسسوارات',
      shoes: 'أحذية',
      flowers: 'زهور',
      jewelry: 'مجوهرات',
      veils: 'طرحات',
      users: 'المستخدمين',
      history: 'السجل',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      switchLanguage: 'تبديل اللغة',
      elegantBridel: 'ElegantBridel'
    }
  };

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

  const handleLanguageChange = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar'; // Toggle between Arabic and English
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    window.location.reload(); // Reload page to apply language changes
  };

  return (
    <div className="Adminsidebar">
      <nav className="nav-links">
        <ul>
          <li>
            <h4>{translations[language].elegantBridel}</h4>
            <hr/>
          </li>
          <li className='SideBarContant'>
            <Link to="/dashboard">{translations[language].dashboard}</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/Reservations">{translations[language].reservations}</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/UnderReservations">{translations[language].underReservations}</Link>
          </li>
          <li className='SideBarContant' onClick={toggleItems} style={{ cursor: 'pointer' }}>
            {translations[language].items}
          </li>
          {isItemsOpen && (
            <ul className="SideBarContantdropdown">
              <hr/>
              <li className='SideBarContant'>
                <Link to="/items/dresses">{translations[language].dresses}</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/accessories">{translations[language].accessories}</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/shoes">{translations[language].shoes}</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/Flowers">{translations[language].flowers}</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/Jewerly">{translations[language].jewelry}</Link>
              </li>
              <li className='SideBarContant'>
                <Link to="/items/veils">{translations[language].veils}</Link>
              </li>
              <hr/>
            </ul>
          )}
          <li className='SideBarContant'>
            <Link to="/users">{translations[language].users}</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/History">{translations[language].history}</Link>
          </li>
          <li className='SideBarContant'>
            <Link to="/settings">{translations[language].settings}</Link>
          </li>
          <li className='SideBarContant' onClick={handleLogout} style={{ cursor: 'pointer' }}>
            {translations[language].logout}
          </li>
          <button className="btn btns-secondary text-white cart-butn" onClick={handleLanguageChange}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
            </svg>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
