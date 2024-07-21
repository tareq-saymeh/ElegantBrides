import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const History = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  const [filter, setFilter] = useState({
    id: '',
    customer: user.name || '',
    items: '',
    receivedDate: '',
    returnDate: ''
  });

  const data = [
    { id: 1, customer: 'Mark', items: 'Otto', receivedDate: '@mdo', returnDate: '@mdo' },
    { id: 2, customer: 'Jacob', items: 'Thornton', receivedDate: '@fat', returnDate: '@fat' },
    { id: 3, customer: 'Jacob', items: 'Thornton', receivedDate: '@fat', returnDate: '@fat' }
  ];

  useEffect(() => {
    if (user.name) {
      setFilter((prevFilter) => ({ ...prevFilter, customer: user.name }));
    }
  }, [user]);

  const filteredData = data.filter((row) => {
    return (
      (filter.id === '' || row.id.toString().includes(filter.id)) &&
      (filter.customer === '' || row.customer.toLowerCase().includes(filter.customer.toLowerCase())) &&
      (filter.items === '' || row.items.toLowerCase().includes(filter.items.toLowerCase())) &&
      (filter.receivedDate === '' || row.receivedDate.toLowerCase().includes(filter.receivedDate.toLowerCase())) &&
      (filter.returnDate === '' || row.returnDate.toLowerCase().includes(filter.returnDate.toLowerCase()))
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

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
                placeholder="Filter ID"
              />
            </th>
            <th scope="col">
              Customer
              <input
                type="text"
                name="customer"
                value={filter.customer}
                onChange={handleFilterChange}
                placeholder="Filter Customer"
              />
            </th>
            <th scope="col">
              Items
              <input
                type="text"
                name="items"
                value={filter.items}
                onChange={handleFilterChange}
                placeholder="Filter Items"
              />
            </th>
            <th scope="col">
              Received Date
              <input
                type="text"
                name="receivedDate"
                value={filter.receivedDate}
                onChange={handleFilterChange}
                placeholder="Filter Received Date"
              />
            </th>
            <th scope="col">
              Return Date
              <input
                type="text"
                name="returnDate"
                value={filter.returnDate}
                onChange={handleFilterChange}
                placeholder="Filter Return Date"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <th scope="row">{row.id}</th>
              <td>{row.customer}</td>
              <td>{row.items}</td>
              <td>{row.receivedDate}</td>
              <td>{row.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
  