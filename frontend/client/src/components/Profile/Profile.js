import React, { useEffect, useState } from 'react';
import { Button, Card, Table, Form, Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard'; // Ensure you have this component

function Profile() {
  const [isUser, setIsUser] = useState([null]);
  const [reservations, setReservations] = useState([]);
  const [savedItems, setSavedItems] = useState([]); // State for saved items
  const [logs, setLogs] = useState([]); // State for logs data
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const handlePasswordToggle = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handleSaveChanges = async () => {
    const updatedData = {
      name,
      email,
      phone,
    };

    if (showPasswordFields && password === confirmPassword) {
      updatedData.password = password;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setRedirect(true);
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/api/users/update', 
        updatedData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Show success message
      setAlertMessage('Profile updated successfully!');
      setAlertVariant('success');

    } catch (error) {
      if (error.response) {
        // Show error message
        setAlertMessage('Update failed: ' + error.response.data.message);
        setAlertVariant('danger');
      } else {
        // Show error message
        setAlertMessage('Update failed: ' + error.message);
        setAlertVariant('danger');
      }
    }
  };

  
  // Other useEffect hooks for fetching reservations, saved items, and logs...

  useEffect(() => {
    const userReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setRedirect(true);
          return;
        }

        const response = await fetch('http://localhost:3000/api/reservations/userData', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }

        const data = await response.json();
        setReservations(data);
        
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    userReservations();
  }, []);

  const fetchSavedItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setRedirect(true);
        return;
      }

      const res = await fetch('http://localhost:3000/api/users/saved', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch saved items');
      }

      const data = await res.json();
      setSavedItems(data);
    } catch (error) {
      console.error('Failed to fetch saved items:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setRedirect(true);
        return;
      }

      const response = await fetch('http://localhost:3000/api/logs/userData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, reservationItem) => {
      // Check if itemId is populated and has a price
      if (reservationItem.itemId && reservationItem.itemId.price) {
        return total + (reservationItem.itemId.price * reservationItem.quantity);
      }
      return total; // If itemId is not populated or price is missing, just return the current total
    }, 0);
  };

  useEffect(() => {
    fetchSavedItems();
    fetchLogs();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/getSession', { withCredentials: true });

        if (response.data.role === "User") {
          setIsUser(true);
        } else if (response.data.role === "Admin") {
          setIsUser(false);
        }
      } catch (error) {
        console.error('Session fetch failed:', error);
        setIsUser(null);
      }
    };

    fetchSession();
  }, []);

  if (isUser === null) {
    return <Navigate to="/login" />;
  }

  if (!isUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Order History */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Received Date</th>
                <th>Return Date</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                reservation.items.map((reservationItem, itemIndex) => (
                  <tr key={index + '-' + itemIndex}>
                    <td>{reservationItem.itemId ? reservationItem.itemId.name : 'Item not found'}</td>
                    <td>{new Date(reservationItem.receivedDate).toLocaleDateString()}</td>
                    <td>{new Date(reservationItem.returnDate).toLocaleDateString()}</td>
                    <td>${calculateTotalPrice(reservation.items)}</td>
                    <td
                      style={{
                        color: reservation.isReceived ? 'red' : 'blue',
                        fontWeight: 'bold',
                      }}
                    >
                      {reservation.isReceived ? 'Current' : 'Pending'}
                    </td>
                  </tr>
                ))
              ))}
              {/* Logs Data */}
              {logs.map((log, index) => (
                log.items.map((logItem, itemIndex) => (
                  <tr key={index + '-' + itemIndex}>
                    <td>{logItem.itemId ? logItem.itemId.name : 'Item not found'}</td>
                    <td>{new Date(logItem.receivedDate).toLocaleDateString()}</td>
                    <td>{new Date(logItem.returnDate).toLocaleDateString()}</td>
                    <td>${calculateTotalPrice(log.items)}</td>
                    <td style={{ color: 'green', fontWeight: 'bold' }}>Returned</td>

                  </tr>
                ))
              ))}
            </tbody>
          </Table>

          {/* Account Settings */}
          
          
        
          {/* Show alert if there is a message */}
          {alertMessage && (
            <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
              {alertMessage}
            </Alert>
          )}

          
          <div className="col-12">
            <Card>
              <Card.Header>
                <h2 className="h5">Account Settings</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="secondary" onClick={handlePasswordToggle}>
                    {showPasswordFields ? 'Hide Password Fields' : 'Change Password'}
                  </Button>

                  {showPasswordFields && (
                    <>
                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>
                    </>
                  )}

                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>


        {/* Saved Items */}
        <div className="col-12 mb-4">
          <Card>
            <Card.Header>
              <h2 className="h5">Saved Items</h2>
            </Card.Header>
            <Card.Body>
              <div className="row">
                {savedItems.length === 0 ? (
                  <p>No saved items found.</p>
                ) : (
                  savedItems.map((item) => (
                    <div key={item._id} className="col-md-4 col-sm-6 mb-4"> {/* Adjust column class */}
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
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
