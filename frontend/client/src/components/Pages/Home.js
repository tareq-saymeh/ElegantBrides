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

const Home = () => {
  const [weddingDresses, setWeddingDresses] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const resWeddingDresses = await fetch('http://localhost:3000/api/items?type=WeddingDress');
        const weddingDressesData = await resWeddingDresses.json();
        setWeddingDresses(weddingDressesData.slice(0, 12));

        const resShoes = await fetch('http://localhost:3000/api/items?type=Shoes');
        const shoesData = await resShoes.json();
        setShoes(shoesData.slice(0, 12));

        const resAccessories = await fetch('http://localhost:3000/api/items?type=Accessories');
        const accessoriesData = await resAccessories.json();
        setAccessories(accessoriesData.slice(0, 12));
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className='Home-Background'>
      <Navbar />

      <div className="home-header">
        <div className="home-header-content">
          <div className="home-header-text">
            <h1>Discover the perfect <br /> dress for your special</h1>
          </div>
        </div>
      </div>

      <div className="button-container">
        <Link to="/WeddingDressPage" className="custom-button">
          <img src={dressimg} alt="Wedding Dress" />
          <span>Wedding Dress</span>
        </Link>
        <Link to="/AccessoriesPage" className="custom-button">
          <img src={Accessoriesimg} alt="Accessories" />
          <span>Accessories</span>
        </Link>
        <Link to="/ShoesPage" className="custom-button">
          <img src={Shoesimg} alt="Shoes" />
          <span>Shoes</span>
        </Link>
        <Link to="/JewerlyPage" className="custom-button">
          <img src={Jewelryimg} alt="Jewelry" />
          <span>Jewelry</span>
        </Link>
        <Link to="/FlowerPage" className="custom-button">
          <img src={Flowersimg} alt="Flower" />
          <span>Flower</span>
        </Link>
        <Link to="/VeilsPage" className="custom-button">
          <img src={Veilsimg} alt="Veils" />
          <span>Veils</span>
        </Link>
      </div>

      <hr />

      <div className="container-fluid">
        <h2 className='HomeItemFilter-text'>Wedding Dress</h2>
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
                collection={item.collection}
              />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <h2 className='HomeItemFilter-text'>Shoes</h2>
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
                collection={item.collection}
              />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <h2 className='HomeItemFilter-text'>Accessories</h2>
        <hr />
        <div className="row">
          {accessories.map(item => (
            <div key={item._id} className="col-md-3 col-sm-6 mb-4">
              <ItemCard
                id={item._id}
                image={`http://localhost:3000/${item.image}`}
                name={item.name}
                price={item.price}
                size={item.size}
                collection={item.collection}
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
