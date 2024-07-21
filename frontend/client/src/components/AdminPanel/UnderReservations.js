import React, { useState } from 'react';

const UnderReservations = () => {
  const [filter, setFilter] = useState({
    id: '',
    customer: '',
    items: '',
    receivedDate: '',
    returnDate: '',
    phoneNumber: '',
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const reservations = [
    { id: 1, customer: 'Mark', items: 'Dress', receivedDate: '2024-07-01', returnDate: '2024-07-10', phoneNumber: '123-456-7890', lateTax: '$10' },
    { id: 2, customer: 'Jacob', items: 'Veil', receivedDate: '2024-07-05', returnDate: '2024-07-15', phoneNumber: '098-765-4321', lateTax: '$5' },
    { id: 3, customer: 'Emily', items: 'Shoes', receivedDate: '2024-07-08', returnDate: '2024-07-18', phoneNumber: '555-123-4567', lateTax: '$8' },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (sortConfig.key) {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'lateTax') {
        aValue = parseFloat(aValue.replace('$', ''));
        bValue = parseFloat(bValue.replace('$', ''));
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredReservations = sortedReservations.filter(reservation => {
    return (
      (!filter.id || reservation.id.toString().includes(filter.id)) &&
      (!filter.customer || reservation.customer.toLowerCase().includes(filter.customer.toLowerCase())) &&
      (!filter.items || reservation.items.toLowerCase().includes(filter.items.toLowerCase())) &&
      (!filter.receivedDate || reservation.receivedDate === filter.receivedDate) &&
      (!filter.returnDate || reservation.returnDate === filter.returnDate) &&
      (!filter.phoneNumber || reservation.phoneNumber.includes(filter.phoneNumber))
    );
  });

  return (
    <div>
      <table className="table table-secondary table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">
              ID
              <input
                type="text"
                name="id"
                value={filter.id}
                onChange={handleFilterChange}
                placeholder="Filter by ID"
                className="form-control"
              />
            </th>
            <th scope="col">
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
            <th scope="col">
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
            <th scope="col">
              Received Date
              <input
                type="date"
                name="receivedDate"
                value={filter.receivedDate}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col">
              Return Date
              <input
                type="date"
                name="returnDate"
                value={filter.returnDate}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col">
              Phone Number
              <input
                type="text"
                name="phoneNumber"
                value={filter.phoneNumber}
                onChange={handleFilterChange}
                placeholder="Filter by Phone Number"
                className="form-control"
              />
            </th>
            <th scope="col">
              <button
                className="btn btn-link"
                onClick={() => handleSort('lateTax')}
              >
                Late Tax {sortConfig.key === 'lateTax' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
              </button>
            </th>
            <th scope="col">Received</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.id}>
              <th scope="row">{reservation.id}</th>
              <td>{reservation.customer}</td>
              <td>{reservation.items}</td>
              <td>{reservation.receivedDate}</td>
              <td>{reservation.returnDate}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.lateTax}</td>
              <td><button className="btn btn-success">Received</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnderReservations;
  