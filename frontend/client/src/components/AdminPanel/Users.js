import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [filter, setFilter] = useState({ name: '', id: '' });
  const navigate = useNavigate();

  const users = [
    { id: 1, name: 'Mark', email: 'Otto', phone: '@mdo', history: '@mdo' },
    { id: 2, name: 'Jacob', email: 'Thornton', phone: '@fat', history: '@fat' },
    { id: 3, name: 'Jacob', email: 'Thornton', phone: '@fat', history: '@fat' },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      (filter.id === '' || user.id.toString() === filter.id)
    );
  });

  const handleHistoryClick = (user) => {
    navigate('/history', { state: { user } });
  };

  return (
    <div>
      <div></div>
      <table className="table table-secondary table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="text"
                name="id"
                placeholder="Search by ID"
                value={filter.id}
                onChange={handleFilterChange}
              />
            </th>
            <th scope="col">
              <input
                type="text"
                name="name"
                placeholder="Search by Name"
                value={filter.name}
                onChange={handleFilterChange}
              />
            </th>
            <th scope="col">Email</th>
            <th scope="col">Phone number</th>
            <th scope="col">History List</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className='btn btn-secondary' onClick={() => handleHistoryClick(user)}>
                  View History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
