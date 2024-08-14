import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const UnderReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState({
    customer: '',
    items: '',
    receivedDate: '',
    returnDate: '',
    Phone: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'receivedDate', direction: 'asc' });

  useEffect(() => {
    // Fetch under reservations from the server
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/reservations/under');
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

  const handleReturn = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reservations/return/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the state to remove the returned reservation from the list
        setReservations(reservations.filter(reservation => reservation._id !== id));
      } else {
        console.error('Failed to return the reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sortReservations = (field) => {
    const direction = sortConfig.key === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedReservations = [...reservations].sort((a, b) => {
      const valueA = field === 'finalAmount' ? getFinalAmount(a) : new Date(a.items[0][field] || 0);
      const valueB = field === 'finalAmount' ? getFinalAmount(b) : new Date(b.items[0][field] || 0);

      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });

    setSortConfig({ key: field, direction });
    setReservations(sortedReservations);
  };

  const getFinalAmount = (reservation) => {
    return reservation.items.reduce((total, item) => {
      const quantity = item.quantity || 1;
      const price = item.itemId.price || 0;
      return total + (quantity * price);
    }, 0);
  };

  const filteredReservations = reservations.filter(reservation => {
    return (
      (!filter.customer || reservation.userId.name.toLowerCase().includes(filter.customer.toLowerCase())) &&
      (!filter.items || reservation.items.some(item => item.itemId.name.toLowerCase().includes(filter.items.toLowerCase()))) &&
      (!filter.receivedDate || reservation.items.some(item => item.receivedDate && new Date(item.receivedDate).toLocaleDateString().includes(filter.receivedDate))) &&
      (!filter.returnDate || reservation.items.some(item => item.returnDate && new Date(item.returnDate).toLocaleDateString().includes(filter.returnDate))) &&
      (!filter.Phone || reservation.userId.Phone.includes(filter.Phone))
    );
  });

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredReservations.map(reservation => ({
      Customer: reservation.userId.name,
      Items: reservation.items.map(item => item.itemId.name).join(', '),
      ReceivedDates: reservation.items.map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : 'N/A').join(', '),
      ReturnDates: reservation.items.map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A').join(', '),
      FinalAmount: getFinalAmount(reservation).toFixed(2),
      PhoneNumber: reservation.userId.Phone
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Under Reservations');
    XLSX.writeFile(workbook, 'Under_Reservations.xlsx');
  };

  return (
    <div>
      <h1>Under Reservations</h1>
      <div className="d-flex justify-content-end mb-3">
        <button onClick={downloadExcel} className="btn btn-primary">
          Download as Excel
        </button>
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
                Received Dates
                <span>{sortConfig.key === 'receivedDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col" onClick={() => sortReservations('returnDate')}>
                Return Dates
                <span>{sortConfig.key === 'returnDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col" onClick={() => sortReservations('finalAmount')}>
                Final Amount
                <span>{sortConfig.key === 'finalAmount' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
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
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.userId.name}</td>
                <td>
                  {reservation.items.map(item => (
                    <span key={item._id}>{item.itemId.name}</span>
                  )).reduce((prev, curr) => [prev, ', ', curr])}
                </td>
                <td>
                  {reservation.items.length > 0 ? (
                    reservation.items
                      .map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : 'N/A')
                      .join(', ')
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  {reservation.items.length > 0 ? (
                    reservation.items
                      .map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A')
                      .join(', ')
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{getFinalAmount(reservation).toFixed(2)}</td>
                <td>{reservation.userId.Phone}</td>

                <td>
                  <button 
                    onClick={() => handleReturn(reservation._id)} 
                    className="btn btn-success"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnderReservations;
