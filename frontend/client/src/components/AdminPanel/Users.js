import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [filter, setFilter] = useState({ name: '', _id: '', email: '', Phone: '' });
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/all');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const sortUsers = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (!filter.name || user.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter._id || user._id.toString().includes(filter._id)) &&
      (!filter.email || user.email.toLowerCase().includes(filter.email.toLowerCase())) &&
      (!filter.Phone || user.Phone.includes(filter.Phone))
    );
  });

  const handleHistoryClick = (user) => {
    navigate('/history', { state: { user } });
  };

  return (
    <div>
      <h1>Users</h1>
      <div className="d-flex justify-content-end mb-3"></div>
      <table className="table table-secondary table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" onClick={() => sortUsers('_id')}>
              _ID
              <input
                type="text"
                name="_id"
                placeholder="Filter by _ID"
                value={filter._id}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col" onClick={() => sortUsers('name')}>
              Name
              <input
                type="text"
                name="name"
                placeholder="Filter by Name"
                value={filter.name}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col" onClick={() => sortUsers('email')}>
              Email
              <input
                type="text"
                name="email"
                placeholder="Filter by Email"
                value={filter.email}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col" onClick={() => sortUsers('Phone')}>
              Phone
              <input
                type="text"
                name="Phone"
                placeholder="Filter by Phone"
                value={filter.Phone}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col">History</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user._id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.Phone}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleHistoryClick(user)}>
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
