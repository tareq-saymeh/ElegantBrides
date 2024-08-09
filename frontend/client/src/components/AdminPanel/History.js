import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [filter, setFilter] = useState({
    id: '',
    customer: '',
    items: '',
    receivedDate: '',
    returnDate: ''
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
    const sortedData = [...data].sort((a, b) => {
      const valueA = new Date(a[field]);
      const valueB = new Date(b[field]);

      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });

    setSortConfig({ key: field, direction });
    setData(sortedData);
  };

  const filteredData = data.filter((row) => {
    const rowReceivedDate = new Date(row.receivedDate).toLocaleDateString();
    const rowReturnDate = new Date(row.returnDate).toLocaleDateString();

    return (
      (!filter.id || row._id.toString().includes(filter.id)) &&
      (!filter.customer || (row.userId && row.userId.name.toLowerCase().includes(filter.customer.toLowerCase()))) &&
      (!filter.items || (row.items && row.items.some(item => item.name.toLowerCase().includes(filter.items.toLowerCase())))) &&
      (!filter.receivedDate || rowReceivedDate.includes(filter.receivedDate)) &&
      (!filter.returnDate || rowReturnDate.includes(filter.returnDate))
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
              <th scope="col" onClick={() => sortData('receivedDate')}>
                Received Date
                <span>{sortConfig.key === 'receivedDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
                
              </th>
              <th scope="col" onClick={() => sortData('returnDate')}>
                Return Date
                <span>{sortConfig.key === 'returnDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
               
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id}>
                <th scope="row">{row._id}</th>
                <td>{row.userId ? row.userId.name : 'N/A'}</td>
                <td>
                  {row.items ? row.items.map(item => item.name).join(', ') : 'N/A'}
                </td>
                <td>{new Date(row.receivedDate).toLocaleDateString()}</td>
                <td>{new Date(row.returnDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
