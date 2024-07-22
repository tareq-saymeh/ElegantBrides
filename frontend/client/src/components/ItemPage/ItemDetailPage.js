import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import productData from '../Content/Content.js';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import './ItemDetailPage.css'

function ItemDetailPage() {
  const { id } = useParams();
  const item = productData.find((item) => item.id.toString() === id);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([
    new Date('2024-07-25'),
    new Date('2024-07-26'),
    // Add more unavailable dates as needed
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!item) {
    return <div>Item not found</div>;
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

  const handleCompleteRent = () => {
    // Logic to handle the rental process with selected dates
    console.log('Renting from:', startDate, 'to:', endDate);
    setShowDatePicker(false);
  };

  const handleCancelRent = () => {
    setShowDatePicker(false);
  };

  return (
    <div className='allPage'>
      <Navbar />
      <div className="item-detail">
        <div class="container text-center">
          <div class="row">
            <div class="col">
              <img src={item.image} alt={item.name} className="item-detail__image" />
            </div>
            <div class="col">
              <h2>{item.name}</h2>
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <h4 className="text item-detail__Collection">{item.collection}'s collection</h4>
                  </div>
                  <div class="col">
                    <h4 className="item-detail__price">${item.price}/Day</h4>
                  </div>

                </div>
              </div>
              <div className="item-detail__details">
                <div class="container ">
                  <div class="row">
                    <div class="col-6">
                      <dt>Size: {item.size}</dt>
                    </div>
                    <div class="col-6">
                      <dt>Color: {item.Color}</dt>
                    </div>

                  </div>
                </div>
              </div>

              <div className="item-detail__description">
                <p>{item.description}</p>
              </div>

              <div className="item-detail__actions">
                <button
                  className="btn btn-dark py-2 mt-2"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  Rent
                </button>
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
                <Link to='/Cart'>
                  <button className="btn btn-dark py-2 mt-2">Buy</button>
                </Link>
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
