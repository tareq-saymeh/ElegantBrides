import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import './ItemDetailPage.css';

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState([
    new Date('2024-07-25'),
    new Date('2024-07-26'),
    // Add more unavailable dates as needed
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item', error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>No Item Found</div>;
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isDateUnavailable = (date) => {
    return (
      date < new Date() ||
      unavailableDates.some((unavailableDate) =>
        date.getFullYear() === unavailableDate.getFullYear() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getDate() === unavailableDate.getDate()
      )
    );
  };

  const handleCompleteRent = async () => {
    if (!startDate || !endDate) {
      console.error('Please select the rental dates');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const rentDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate days

      await axios.post('http://localhost:3000/api/cart/add', 
        {
          items: { itemId: id, receivedDate: startDate, returnDate: endDate, quantity: rentDuration }
        }, 
        { 
          withCredentials: true, 
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        }
      );

      console.log('Item added to cart successfully!');
      navigate('/Cart');
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
    setShowDatePicker(false);
  };

  const handleCancelRent = () => {
    setShowDatePicker(false);
  };

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("on handel");
      
      await axios.post('http://localhost:3000/api/cart/add', 
        {
          items: { itemId: id, quantity: quantity }
        }, 
        { 
          withCredentials: true, 
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        }
      );

      console.log('Item added to cart successfully!');
      navigate('/Cart');
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
  };

  return (
    <div className='allPage'>
      <Navbar />
      <div className="item-detail">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <img src={`http://localhost:3000/${item.image}`} alt={item.name} className="item-detail__image" />
            </div>
            <div className="col">
              <h2>{item.name}</h2>
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <h4 className="text item-detail__brand">{item.brand}'s brand</h4>
                  </div>
                  <div className="col">
                    <h4 className="item-detail__price">${item.price}/Day</h4>
                  </div>
                </div>
              </div>
              <div className="item-detail__details">
                <div className="container ">
                  <div className="row">
                    <div className="col-6">
                      <dt>Size: {item.size}</dt>
                    </div>
                    <div className="col-6">
                      <dt>Color: {item.color}</dt>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-detail__description">
                <p>{item.description}</p>
              </div>
              <div className="item-detail__actions">
                {item.RentAble && (
                  <button
                    className="btn btn-dark py-2 mt-2"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    Rent
                  </button>
                )}
                {showDatePicker && (
                  <div className="collapsible">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      filterDate={(date) => !isDateUnavailable(date)}
                      inline
                    />
                    <p>** Gray days unavailable</p>
                    <div className="calendar-buttons">
                      <button className="btn btn-dark py-2 mt-2" onClick={handleCompleteRent}>
                        Complete Rent
                      </button>
                      <button className="btn btn-dark py-2 mt-2" onClick={handleCancelRent}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {item.BuyAble && (
                  <div className="buy-section">
                    <label htmlFor="quantity">Quantity:</label>
                    <input 
                      type="number" 
                      id="quantity" 
                      value={quantity} 
                      min="1" 
                      max={item.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className="btn btn-dark py-2 mt-2" onClick={handleBuy}>
                      Buy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemDetailPage;
