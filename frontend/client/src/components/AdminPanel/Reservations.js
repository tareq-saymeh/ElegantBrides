import React, { useState, useEffect } from 'react';

const Reservations = () => {
  const [filter, setFilter] = useState({
    customer: '',
    items: '',
    receivedDate: '',
    returnDate: '',
    Phone: '',
  });
  
  const [reservations, setReservations] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'receivedDate', direction: 'asc' });

  useEffect(() => {
    // Fetch future reservations from the server
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/reservations/future');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const sortReservations = (field) => {
    const direction = sortConfig.key === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedReservations = [...reservations].sort((a, b) => {
      const valueA = new Date(a[field]);
      const valueB = new Date(b[field]);

      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });

    setSortConfig({ key: field, direction });
    setReservations(sortedReservations);
  };

  const filteredReservations = reservations.filter(reservation => {
    return (
      (!filter.customer || reservation.userId.name.toLowerCase().includes(filter.customer.toLowerCase())) &&
      (!filter.items || reservation.items.some(item => item.name.toLowerCase().includes(filter.items.toLowerCase()))) &&
      (!filter.receivedDate || reservation.receivedDate.includes(filter.receivedDate)) &&
      (!filter.returnDate || reservation.returnDate.includes(filter.returnDate)) &&
      (!filter.Phone || reservation.userId.Phone.includes(filter.Phone))
    );
  });
  const handleMarkReceived = (id) => {
    fetch(`http://localhost:3000/api/reservations/${id}/status`, {
      method: 'PATCH',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((updatedReservation) => {
        setReservations(reservations.map(res => res._id === id ? updatedReservation : res));
      })
      .catch((error) => console.error('Error updating reservation status:', error));
  };
  return (
    <div>
      <h1>Future Reservations</h1>
      <div className="d-flex justify-content-end mb-3">
        {/* Add additional buttons or filters if needed */}
      </div>
      <div>
        <table className="table table-secondary table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" onClick={() => sortReservations('userId.name')}>
                Customer
                <input
                  type="text"
                  name="customer"
                  value={filter.customer}
                  onChange={handleFilterChange}
                  placeholder="Filter by Customer"
                  className="form-control"
                />
              </th>
              <th scope="col" onClick={() => sortReservations('items')}>
                Items
                <input
                  type="text"
                  name="items"
                  value={filter.items}
                  onChange={handleFilterChange}
                  placeholder="Filter by Items"
                  className="form-control"
                />
              </th>
              <th scope="col" onClick={() => sortReservations('receivedDate')}>
                Received Date
                <span>{sortConfig.key === 'receivedDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col" onClick={() => sortReservations('returnDate')}>
                Return Date
                <span>{sortConfig.key === 'returnDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col">
                Phone Number
                <input
                  type="text"
                  name="Phone"
                  value={filter.Phone}
                  onChange={handleFilterChange}
                  placeholder="Filter by Phone Number"
                  className="form-control"
                />
              </th>
              <th scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.userId.name}</td>
                <td>
                  {reservation.items.map(item => (
                    <span key={item._id}>{item.name}</span>
                  )).reduce((prev, curr) => [prev, ', ', curr])}
                </td>
                <td>{new Date(reservation.receivedDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.returnDate).toLocaleDateString()}</td>
                <td>{reservation.userId.Phone}</td>
                <td>
                  {reservation.isReceived ? (
                    'Received'
                  ) : (
                    <button onClick={() => handleMarkReceived(reservation._id)} className="btn btn-success">
                      Mark as Received
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
