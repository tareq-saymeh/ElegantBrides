import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import './ItemDetailPage.css';
import { Container } from 'react-bootstrap';

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const language = localStorage.getItem('language') || 'ar'; // Get the current language or default to Arabic

  // Translation object
  const translations = {
    en: {
      brand: "'s brand",
      pricePerDay: 'Day',
      size: 'Size',
      availableColor: 'Available Color',
      quantity: 'Quantity',
      rent: 'Rent',
      completeRent: 'Complete Rent',
      cancel: 'Cancel',
      buy: 'Buy',
      noItem: 'No Item Found',
      rentLabel: 'Gray days unavailable',
    },
    ar: {
      brand: 'علامة تجارية',
      pricePerDay: 'اليوم',
      size: 'الحجم',
      availableColor: 'اللون المتاح',
      quantity: 'الكمية',
      rent: 'استئجار',
      completeRent: 'إتمام الاستئجار',
      cancel: 'إلغاء',
      buy: 'شراء',
      noItem: 'لم يتم العثور على العنصر',
      rentLabel: 'الأيام الرمادية غير متاحة',
    },
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        console.log(response.data); // Debugging: Log the fetched data
        setItem(response.data.item);
        if (response.data.unavailableDates) {
          setUnavailableDates(response.data.unavailableDates.map(date => new Date(date)));
        }
      } catch (error) {
        console.error('Error fetching item', error);
      }
    };
  
    fetchItemData();
  }, [id]);

  if (!item) {
    return <div>{translations[language].noItem}</div>; // Show translated "No Item Found" message
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isDateUnavailable = (date) => {
    return (
      date < new Date() ||
      unavailableDates.some(
        (unavailableDate) =>
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
      <Container 
        fluid 
        style={{ 
          backgroundColor: '#C0C0C0', 
          padding: '20px', 
          borderRadius: '10px', 
          maxWidth: '1500px', 
          margin: 'auto', 
          marginTop: '50px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <div className="item-detail">
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <img src={`http://localhost:3000/${item.image}`} alt={item.name} className="item-detail__image " />
              </div>
              <div className="col">
                <h2>{item.name}</h2>
                <div className="container text-center">
                  <div className="row">
                    <div className="col">
                      <h4 className="text item-detail__brand">{item.brand}{translations[language].brand}</h4>
                    </div>
                    <div className="col">
                    {item.RentAble ? (
                      <h4 className="item-detail__price">₪ {item.price}/{translations[language].pricePerDay}</h4>

                    ):(
                      <h4 className="item-detail__price">₪ {item.price}</h4>

                    )}

                    </div>
                  </div>
                </div>
                <div className="item-detail__details">
                  <div className="container">
                    <div className="row">
                      <div className="col-6">
                        <dt>{translations[language].size}: {item.size}</dt>
                      </div>
                      <div className="col-6">
                        <dt>{translations[language].availableColor}: {item.color} </dt>
                        <span 
                          style={{
                            backgroundColor: item.color.toLowerCase(), 
                            border: '1px solid #161616', 
                            borderRadius: '50%', 
                            width: '30px', 
                            height: '30px', 
                            display: 'inline-block'
                          }}
                          title={item.color}
                        />
                      </div>
                      {item.RentAble ? (
                        <div className="col-6">
                          <dt></dt>
                        </div>
                      ) : (
                        <div className="col-6">
                          <dt>{translations[language].quantity}: {item.quantity}</dt>
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
                      {translations[language].rent}
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
                      <p>** {translations[language].rentLabel}</p>
                      <div className="calendar-buttons">
                        <button className="btn btn-dark py-2 mt-2" onClick={handleCompleteRent}>
                          {translations[language].completeRent}
                        </button>
                        <button className="btn btn-dark py-2 mt-2" onClick={handleCancelRent}>
                          {translations[language].cancel}
                        </button>
                      </div>
                    </div>
                  )}
                  {item.BuyAble && (
                    <div className="buy-section">
                      <label htmlFor="quantity">{translations[language].quantity}:</label>
                      <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        max={item.quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button className="btn btn-dark py-2 mt-2" onClick={handleBuy}>
                        {translations[language].buy}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ItemDetailPage;
