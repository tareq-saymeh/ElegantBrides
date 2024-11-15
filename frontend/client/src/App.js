import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import './App.css';
import './style.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import WeddingDressPage from './components/Pages/WeddingDressPage';
import VeilsPage from './components/Pages/VeilsPage';
import ShoesPage from './components/Pages/ShoesPage';
import JewerlyPage from './components/Pages/JewerlyPage';
import FlowerPage from './components/Pages/FlowerPage';
import AccessoriesPage from './components/Pages/AccessoriesPage';
import CartPage from './components/Cart/CartPage';
import Login from './components/auth/Login';
import ItemDetailPage from './components/ItemPage/ItemDetailPage';
import AdminPanel from './components/AdminPanel/AdminPanelHome';
import Dashboard from './components/AdminPanel/Dashboard';
import Users from './components/AdminPanel/Users';
import Settings from './components/AdminPanel/Settings';
import History from './components/AdminPanel/History';
import Reservations from './components/AdminPanel/Reservations';
import AdminAccessoriesPage from './components/AdminPanel/Items/AdminAccessoriesPage';
import AdminVeilsPage from './components/AdminPanel/Items/AdminVeilsPage';
import AdminJewerlyPage from './components/AdminPanel/Items/AdminJewerlyPage';
import AdminFlowerPage from './components/AdminPanel/Items/AdminFlowerPage';
import AdminShoesPage from './components/AdminPanel/Items/AdminShoesPage';
import AdminWeddingDressPage from './components/AdminPanel/Items/AdminWeddingDressPage';
import UnderReservations from './components/AdminPanel/UnderReservations';
import Preloader from './components/Preloader/Preloader'
import Profile from './components/Profile/Profile';

function App() {
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/custom/get-customization');
        const logo = `http://localhost:3000/${response.data.faviconUrl}`;
        const sitename = response.data.name;
        const bodycolor= response.data.backgroundColor;
        
  
        // Dynamically set the favicon
        const favicon = document.getElementById('favicon');
        if (favicon) {
          favicon.href = logo;
        }
  
        // Update the site name
        const webName = document.getElementById('siteName');
        if (webName) {
          webName.textContent = sitename; // Update the site name dynamically
        }
  
        const header = document.querySelector('.Home-Background'); 
      if (header) {
        header.style.backgroundColor = bodycolor; 
      }
      const body = document.querySelector('.home-header'); 
      if (body) {
        body.style.backgroundColor = bodycolor; 
      }
      const pages = document.querySelector('.struct-page'); 
      if (pages) {
        pages.style.backgroundColor = bodycolor; 
      }

      const profileColor = document.querySelector('.profileBackground'); 
      if (profileColor) {
        profileColor.style.backgroundColor = bodycolor; 
      }
        
        
        
      } catch (error) {
        console.error('Error fetching the logo and customization:', error);
      }
    };
  
    fetchLogo();
  }, []);
  
 
  
  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('visited', 'true');
      }, 5300);
    }
  }, []);


  return (
    <Router>
    <div className="App">
    {loading ? (
  <div className="loader-container">
  <Preloader />
  </div>
  ):(
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Profile" element={<Profile />} />
    <Route path="/WeddingDressPage" element={<WeddingDressPage />} />
    <Route path="/VeilsPage" element={<VeilsPage />} />
    <Route path="/ShoesPage" element={<ShoesPage />} />
    <Route path="/JewerlyPage" element={<JewerlyPage />} />
    <Route path="/FlowerPage" element={<FlowerPage />} />
    <Route path="/AccessoriesPage" element={<AccessoriesPage />} />
    <Route path="/Cart" element={<CartPage />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/dashboard" element={<AdminPanel><Dashboard /></AdminPanel>} />
    <Route path="/users" element={<AdminPanel><Users /></AdminPanel>} />
    <Route path="/settings" element={<AdminPanel><Settings /></AdminPanel>} />
    <Route path="/History" element={<AdminPanel><History /></AdminPanel>} />
    <Route path="/Reservations" element={<AdminPanel><Reservations /></AdminPanel>} />
    <Route path="/UnderReservations" element={<AdminPanel><UnderReservations /></AdminPanel>} />
    <Route path="/item/:id" element={<ItemDetailPage  />} /> 
    <Route path="/items/dresses" element={<AdminPanel><AdminWeddingDressPage /></AdminPanel>} />
    <Route path="/items/accessories" element={<AdminPanel><AdminAccessoriesPage /></AdminPanel>} />
    <Route path="/items/shoes" element={<AdminPanel><AdminShoesPage /></AdminPanel>} />
    <Route path="/items/flowers" element={<AdminPanel><AdminFlowerPage /></AdminPanel>} />
    <Route path="/items/jewerly" element={<AdminPanel><AdminJewerlyPage /></AdminPanel>} />
    <Route path="/items/veils" element={<AdminPanel><AdminVeilsPage /></AdminPanel>} />
    </Routes>)}
    </div>
    </Router>
  );
}

export default App;
