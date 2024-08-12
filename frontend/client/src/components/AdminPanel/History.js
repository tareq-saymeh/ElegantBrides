import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [filter, setFilter] = useState({
    customer: '',
    items: '',
    receivedDate: '',
    returnDate: '',
    phone: '',
    email: ''
  });
  
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'receivedDate', direction: 'asc' });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/logs'); // Adjust the URL as necessary
        setData(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const sortData = (field) => {
    const direction = sortConfig.key === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    let sortedData;

    if (field === 'finalAmount') {
      sortedData = [...data].sort((a, b) => {
        const amountA = calculateFinalAmount(a.items);
        const amountB = calculateFinalAmount(b.items);

        return direction === 'asc' ? amountA - amountB : amountB - amountA;
      });
    } else {
      sortedData = [...data].sort((a, b) => {
        const valueA = new Date(a[field]);
        const valueB = new Date(b[field]);

        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }

    setSortConfig({ key: field, direction });
    setData(sortedData);
  };

  const calculateFinalAmount = (items) => {
    return items.reduce((total, item) => {
      const price = item.itemId.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const filteredData = data.filter((row) => {
    const rowReceivedDates = row.items.map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : '').join(', ');
    const rowReturnDates = row.items.map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '').join(', ');

    return (
      (!filter.customer || (row.userId && row.userId.name.toLowerCase().includes(filter.customer.toLowerCase()))) &&
      (!filter.items || (row.items && row.items.some(item => item.itemId.name.toLowerCase().includes(filter.items.toLowerCase())))) &&
      (!filter.receivedDate || rowReceivedDates.includes(filter.receivedDate)) &&
      (!filter.returnDate || rowReturnDates.includes(filter.returnDate)) &&
      (!filter.phone || (row.userId && row.userId.phone.toLowerCase().includes(filter.phone.toLowerCase()))) &&
      (!filter.email || (row.userId && row.userId.email.toLowerCase().includes(filter.email.toLowerCase())))
    );
  });

  return (
    <div>
      <h1>History</h1>
      <div className="d-flex justify-content-end mb-3">
        {/* Add additional buttons or filters if needed */}
      </div>
      <div>
        <table className="table table-secondary table-hover table-bordered">
          <thead>
            <tr>
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
              <th scope="col" onClick={() => sortData('receivedDate')}>
                Received Date
                <span>{sortConfig.key === 'receivedDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col" onClick={() => sortData('returnDate')}>
                Return Date
                <span>{sortConfig.key === 'returnDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col">
                Phone
                <input
                  type="text"
                  name="phone"
                  value={filter.phone}
                  onChange={handleFilterChange}
                  placeholder="Filter by Phone"
                  className="form-control"
                />
              </th>
              <th scope="col">
                Email
                <input
                  type="text"
                  name="email"
                  value={filter.email}
                  onChange={handleFilterChange}
                  placeholder="Filter by Email"
                  className="form-control"
                />
              </th>
              <th scope="col" onClick={() => sortData('finalAmount')}>
                Final Amount
                <span>{sortConfig.key === 'finalAmount' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id}>
                <td>{row.userId ? row.userId.name : 'N/A'}</td>
                <td>
                  {row.items ? row.items.map(item => item.itemId.name).join(', ') : 'N/A'}
                </td>
                <td>
                  {row.items && row.items.length > 0 ? 
                    row.items.map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : 'Buy').join(', ') :
                    'N/A'
                  }
                </td>
                <td>
                  {row.items && row.items.length > 0 ? 
                    row.items.map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'Buy').join(', ') :
                    'N/A'
                  }
                </td>
                <td>{row.userId ? row.userId.Phone : 'N/A'}</td>
                <td>{row.userId ? row.userId.email : 'N/A'}</td>
                <td>{calculateFinalAmount(row.items).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
