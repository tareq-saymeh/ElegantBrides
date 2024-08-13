import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [warningShown, setWarningShown] = useState(false); // State to control warning visibility
  const navigate = useNavigate();
  
  // Function to display the warning message
  const showWarning = () => {
    alert('Your session is about to expire. Please save your work and log in again.');
    setWarningShown(true);
  };

  // Clear the session expiration timer when logging out
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('sessionExpiry'); // Clear session expiry time from localStorage
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
  }, []);

  // Set session expiry time when user logs in (set in login component)
  const setSessionExpiry = () => {
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 3); // Session lasts for 3 hours
    localStorage.setItem('sessionExpiry', expiryTime.toISOString());
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">Elegant Bride</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/WeddingDressPage">Wedding Dress</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/AccessoriesPage">Accessories</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/ShoesPage">Shoes</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/JewerlyPage">Jewerly</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/FlowerPage">Flower</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/VeilsPage">Veils</a></li>
              </ul>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/Profile">Profile</a>
              </li>
            )}
          </ul>
          <Link to="/Cart">
            <button className="btn btns-secondary text-white cart-butn" type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </Link>
          {isAuthenticated ? (
            <button className="btn btn-outline-secondary text-white" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/Login">
              <button className="btn btn-outline-secondary text-white" type="submit">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
