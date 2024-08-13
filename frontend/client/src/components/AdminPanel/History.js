import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Profile() {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const futureRes = await fetch('http://localhost:3000/api/reservations/future', {
          credentials: 'include',
        });
        const underRes = await fetch('http://localhost:3000/api/reservations/under', {
          credentials: 'include',
        });
        const logsRes = await fetch('http://localhost:3000/api/logs', {
          credentials: 'include',
        });

        const futureData = await futureRes.json();
        const underData = await underRes.json();
        const logsData = await logsRes.json();

        // Combine all data into one array
        const combinedData = [...futureData, ...underData, ...logsData];
        setOrderHistory(combinedData);
      } catch (error) {
        console.error('Failed to fetch order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
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
                    <th>Items</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.length > 0 ? (
                    orderHistory.map((order, index) => (
                      <tr key={index}>
                        <td>
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, i) => (
                              <div key={i}>
                                {item.name} (x{item.quantity})
                              </div>
                            ))
                          ) : (
                            <span>No items</span>
                          )}
                        </td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No orders found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper function to get status badge class
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-success';
    case 'Pending':
      return 'bg-warning text-dark';
    case 'Cancelled':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

export default Profile;
