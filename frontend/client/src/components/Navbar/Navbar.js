import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [sitename, setSitename] = useState(false);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ar'); // Default language is Arabic
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/custom/get-customization');
        
        const headerColor = response.data.headerColor;
        const ename = response.data.name;
        setSitename(ename)
     
  
        
  
        // Dynamically set the background color of the navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          navbar.style.backgroundColor = headerColor; // Apply the header color to the navbar
        }
        const foote = document.querySelector('.mainFooter');
        if (foote) {
          foote.style.backgroundColor = headerColor; // Apply the header color to the navbar
        }
        
      } catch (error) {
        console.error('Error fetching the logo and customization:', error);
      }
    };
  
    fetchLogo();
  }, []);
  
  // Translation object
  const translations = {
    en: {
      home: 'Home',
      categories: 'Categories',
      profile: 'Profile',
      logout: 'Logout',
      login: 'Login',
      weddingDress: 'Wedding Dress',
      accessories: 'Accessories',
      shoes: 'Shoes',
      jewelry: 'Jewelry',
      flowers: 'Flowers',
      veils: 'Veils',
      sessionWarning: 'Your session is about to expire. Please save your work and log in again.',
    },
    ar: {
      home: 'الرئيسية',
      categories: 'الفئات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      login: 'تسجيل الدخول',
      weddingDress: 'فساتين الزفاف',
      accessories: 'الإكسسوارات',
      shoes: 'الأحذية',
      jewelry: 'المجوهرات',
      flowers: 'الزهور',
      veils: 'الطرحات',
      sessionWarning: 'ستنتهي جلستك قريبًا. يرجى حفظ عملك وتسجيل الدخول مرة أخرى.',
    },
  };

  // Function to display the warning message
  const showWarning = () => {
    alert(translations[language].sessionWarning);
    setWarningShown(true);
  };

  // Clear the session expiration timer when logging out
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('sessionExpiry');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sessionExpiry = localStorage.getItem('sessionExpiry');

    if (token) {
      setIsAuthenticated(true);

      if (sessionExpiry) {
        const expiryTime = new Date(sessionExpiry).getTime();
        const currentTime = new Date().getTime();

        if (expiryTime > currentTime) {
          const timeRemaining = expiryTime - currentTime;
          const warningTime = timeRemaining - 15 * 60 * 1000; // 15 minutes before expiry

          if (warningTime > 0) {
            const warningTimer = setTimeout(showWarning, warningTime);

            return () => clearTimeout(warningTimer);
          }
        } else {
          handleLogout(); // Automatically log out if session has expired
        }
      }
    }
  }, [language]);

  // Function to handle language change
  const handleLanguageChange = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar'; // Toggle between Arabic and English
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    window.location.reload(); // Reload page to apply language changes
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">{sitename}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label={translations[language].toggleNavigation}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-white" aria-current="page" href="/">{translations[language].home}</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {translations[language].categories}
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/WeddingDressPage">{translations[language].weddingDress}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/AccessoriesPage">{translations[language].accessories}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/ShoesPage">{translations[language].shoes}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/JewerlyPage">{translations[language].jewelry}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/FlowerPage">{translations[language].flowers}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/VeilsPage">{translations[language].veils}</a></li>
              </ul>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/Profile">{translations[language].profile}</a>
              </li>
            )}
          </ul>
          <button className="btn btns-secondary text-white cart-butn" onClick={handleLanguageChange}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
            </svg>
          </button>
          <Link to="/Cart">
            <button className="btn btns-secondary text-white cart-butn" type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </Link>
          {isAuthenticated ? (
            <button className="btn btn-outline-secondary text-white" onClick={handleLogout}>{translations[language].logout}</button>
          ) : (
            <Link to="/Login">
              <button className="btn btn-outline-secondary text-white" type="submit">{translations[language].login}</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
