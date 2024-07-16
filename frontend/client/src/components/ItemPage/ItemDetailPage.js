// ItemDetailPage.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import productData from '../Content/Content.js'  
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';

function ItemDetailPage() {
  const { id } = useParams();
  const item = productData.find((item) => item.id.toString() === id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
  <div className='allPage'>
  <Navbar/>
    <div className="item-detail">
      <img src={item.image} alt={item.name} className="item-detail__image" />
      <h2>{item.name}</h2>
      <h4 className="text">{item.collection}'s collection</h4>
      <h4 className="item-detail__price">${item.price}/Day</h4>

      <div className="item-detail__actions">
        <button className="btn btn-outline-dark py-2">Add to cart</button>
       <Link to='/Cart'> <button className="btn btn-dark py-2 mt-2">Buy now</button></Link>
      </div>

      <div className="item-detail__details">
        <h4>Details</h4>
        <dl>
          <dt>Size</dt>
          <dd>{item.size}</dd>

          <dt>Rating</dt>
          <dd>
            {[...Array(item.rating)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </dd>
        </dl>
      </div>

      <div className="item-detail__description">
        <h4>Description</h4>
        <p>{item.description}</p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default ItemDetailPage;
