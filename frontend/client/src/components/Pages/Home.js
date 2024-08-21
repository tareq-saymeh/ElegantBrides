import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import '../../style.css';
import Footer from '../Footer/Footer.js';
import ItemCard from '../ItemCard/ItemCard.js';

import dressimg from '../images/Dress.png';
import Veilsimg from '../images/Veils.png';
import Shoesimg from '../images/Shoes.png';
import Jewelryimg from '../images/jewelry-icon.png';
import Accessoriesimg from '../images/bag.png';
import Flowersimg from '../images/Flowers.png';

// Translation data
const translations = {
  en: {
    headerText: 'Discover the perfect dress for your special day',
    weddingDress: 'Wedding Dress',
    accessories: 'Accessories',
    shoes: 'Shoes',
    jewelry: 'Jewelry',
    flower: 'Flower',
    veils: 'Veils',
  },
  ar: {
    headerText: 'اكتشف الفستان المثالي ليومك الخاص',
    weddingDress: 'فساتين الزفاف',
    accessories: 'اكسسوارات',
    shoes: 'أحذية',
    jewelry: 'مجوهرات',
    flower: 'زهور',
    veils: 'طرحات',
  },
};

const Home = () => {
  const [weddingDresses, setWeddingDresses] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ar'); // Default to Arabic

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const resWeddingDresses = await fetch('http://localhost:3000/api/items?type=WeddingDress');
        const weddingDressesData = await resWeddingDresses.json();
        setWeddingDresses(weddingDressesData.slice(0, 12));

        const resShoes = await fetch('http://localhost:3000/api/items?type=Shoes');
        const shoesData = await resShoes.json();
        setShoes(shoesData.slice(0, 12));

        const resJewelry = await fetch('http://localhost:3000/api/items?type=Jewelry');
        const jewelryData = await resJewelry.json();
        setJewelry(jewelryData.slice(0, 12));
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  const t = translations[language]; // Get the current language's translations

  return (
    <div className='Home-Background'>
      <Navbar />

      <div className="home-header">
        <div className="home-header-content">
          <div className="home-header-text">
            <h1>{t.headerText}</h1>
          </div>
        </div>
      </div>

      <div className="button-container">
        <Link to="/WeddingDressPage" className="custom-button">
          <img src={dressimg} alt="Wedding Dress" />
          <span>{t.weddingDress}</span>
        </Link>
        <Link to="/AccessoriesPage" className="custom-button">
          <img src={Accessoriesimg} alt="Accessories" />
          <span>{t.accessories}</span>
        </Link>
        <Link to="/ShoesPage" className="custom-button">
          <img src={Shoesimg} alt="Shoes" />
          <span>{t.shoes}</span>
        </Link>
        <Link to="/JewerlyPage" className="custom-button">
          <img src={Jewelryimg} alt="Jewelry" />
          <span>{t.jewelry}</span>
        </Link>
        <Link to="/FlowerPage" className="custom-button">
          <img src={Flowersimg} alt="Flower" />
          <span>{t.flower}</span>
        </Link>
        <Link to="/VeilsPage" className="custom-button">
          <img src={Veilsimg} alt="Veils" />
          <span>{t.veils}</span>
        </Link>
      </div>

      <hr />

      <div className="container-fluid">
        <h2 className='HomeItemFilter-text'>{t.weddingDress}</h2>
        <hr />
        <div className="row">
          {weddingDresses.map(item => (
            <div key={item._id} className="col-md-3 col-sm-6 mb-4">
              <ItemCard
                id={item._id}
                image={`http://localhost:3000/${item.image}`}
                name={item.name}
                price={item.price}
                size={item.size}
                brand={item.brand}
                RentAble={item.RentAble}
              />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <h2 className='HomeItemFilter-text'>{t.shoes}</h2>
        <hr />
        <div className="row">
          {shoes.map(item => (
            <div key={item._id} className="col-md-3 col-sm-6 mb-4">
              <ItemCard
                id={item._id}
                image={`http://localhost:3000/${item.image}`}
                name={item.name}
                price={item.price}
                size={item.size}
                brand={item.brand}
                quantity={item.quantity}
              />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <h2 className='HomeItemFilter-text'>{t.jewelry}</h2>
        <hr />
        <div className="row">
          {jewelry.map(item => (
            <div key={item._id} className="col-md-3 col-sm-6 mb-4">
              <ItemCard
                id={item._id}
                image={`http://localhost:3000/${item.image}`}
                name={item.name}
                price={item.price}
                size={item.size}
                brand={item.brand}
                quantity={item.quantity}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
