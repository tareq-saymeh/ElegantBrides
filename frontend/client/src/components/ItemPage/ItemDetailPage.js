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
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        console.log(response.data); // Debugging: Log the fetched data
        setItem(response.data.item);
        if (response.data.unavailableDates) {
          setUnavailableDates(response.data.unavailableDates.map(date => new Date(date)
        ));
        }
      } catch (error) {
        console.error('Error fetching item', error);
      }
    };
  
    fetchItemData();
  }, [id]);
  
  // In the JSX part
  if (!item) {
    return <div>No Item Found</div>; // Or loading spinner, etc.
  }
  

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isDateUnavailable = (date) => {
    return (
      date < new Date() ||
      !unavailableDates.some((unavailableDate) =>
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

      await axios.post(
        'http://localhost:3000/api/cart/add',
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

      await axios.post(
        'http://localhost:3000/api/cart/add',
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
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <dt>Size: {item.size}</dt>
                    </div>
                    <div className="col-6">
                      <dt>Color: {item.color}</dt>
                    </div>
                    {item.RentAble ? (
                      <div className="col-6">
                        <dt></dt>
                      </div>
                    ) : (
                      <div className="col-6">
                        <dt>Quantity: {item.quantity}</dt>
                      </div>
                    )}
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
                      filterDate={isDateUnavailable}
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
