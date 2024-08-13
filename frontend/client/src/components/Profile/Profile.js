import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Table, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

function Profile() {
    const [isUser, setIsUser] = useState(null); // null = loading, false = not User, true = User

    useEffect(() => {
      const fetchSession = async () => {
  
        try {
          const response = await axios.get('http://localhost:3000/api/auth/getSession', { withCredentials: true });
  
          if (response.data.role === "User") {
            setIsUser(true);
            console.log(response.data.role);
          } else {
            setIsUser(false);
          }
        } catch (error) {
          console.error('Session fetch failed:', error);
          setIsUser(false);
        }
      };
  
      fetchSession();
    }, []);
  
    if (isUser === null) {
        return <Navigate to="/" />; 
    }
  
    if (!isUser) {
      return <Navigate to="/dashboard" />;
    }
  return (
    <>
    <Navbar/>
    <div className="container mt-4">
      

        <div className="row">
          {/* Order History */}
          <div className="col-12 mb-4">
            <Card>
              <Card.Header>
                <h2 className="h5">Order History</h2>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><Link to="#" className="text-decoration-none">#12345</Link></td>
                      <td>May 15, 2023</td>
                      <td>$99.99</td>
                      <td><span className="badge bg-success">Delivered</span></td>
                    </tr>
                    <tr>
                      <td><Link to="#" className="text-decoration-none">#12344</Link></td>
                      <td>April 20, 2023</td>
                      <td>$49.99</td>
                      <td><span className="badge bg-warning text-dark">Pending</span></td>
                    </tr>
                    <tr>
                      <td><Link to="#" className="text-decoration-none">#12343</Link></td>
                      <td>March 10, 2023</td>
                      <td>$79.99</td>
                      <td><span className="badge bg-danger">Cancelled</span></td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>

          {/* Saved */}
          <div className="col-12 mb-4">
            <Card>
              <Card.Header>
                <h2 className="h5">Saved</h2>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  {[1, 2, 3].map((item, index) => (
                    <div key={index} className="col-sm-4 mb-3">
                      <Card>
                        <Card.Img variant="top" src="/placeholder.svg" />
                        <Card.Body className="text-center">
                          <Card.Title>Product Name</Card.Title>
                          <Card.Text>$49.99</Card.Text>
                          <Button variant="outline-secondary" className="me-2">Remove</Button>
                          <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Account Settings */}
          <div className="col-12">
            <Card>
              <Card.Header>
                <h2 className="h5">Account Settings</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue="Sara Ahmad" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue="Sara@acme.com" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" defaultValue="+970 xxx xxx xxx" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Button variant="primary">Save Changes</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>

      
    </div>
    <Footer/>

    </>
  );
}

export default Profile;
