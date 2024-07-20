import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import './App.css';
import './style.css'
import React, { useEffect, useState } from 'react';
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

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch('http://localhost:3001/backend/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <Router>
    <div className="App">
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/WeddingDressPage" element={<WeddingDressPage />} />
    <Route path="/VeilsPage" element={<VeilsPage />} />
    <Route path="/ShoesPage" element={<ShoesPage />} />
    <Route path="/JewerlyPage" element={<JewerlyPage />} />
    <Route path="/FlowerPage" element={<FlowerPage />} />
    <Route path="/AccessoriesPage" element={<AccessoriesPage />} />
    <Route path="/Cart" element={<CartPage />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Admin" element={<AdminPanel><Dashboard /></AdminPanel>} />
    <Route path="/dashboard" element={<AdminPanel><Dashboard /></AdminPanel>} />
    <Route path="/users" element={<AdminPanel><Users /></AdminPanel>} />
    <Route path="/settings" element={<AdminPanel><Settings /></AdminPanel>} />
    <Route path="/item/:id" element={<ItemDetailPage data={data} />} /> 

    </Routes>
    </div>
    </Router>
  );
}

export default App;
