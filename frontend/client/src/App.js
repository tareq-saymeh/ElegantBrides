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
    </Routes>
    </div>
    </Router>
  );
}

export default App;
