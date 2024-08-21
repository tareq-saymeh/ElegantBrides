import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [filter, setFilter] = useState({ name: '', _id: '', email: '', Phone: '' });
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const navigate = useNavigate();

  // Translation object
  const translations = {
    en: {
      users: 'Users',
      filterId: 'Filter by _ID',
      filterName: 'Filter by Name',
      filterEmail: 'Filter by Email',
      filterPhone: 'Filter by Phone',
      viewHistory: 'View History',
      history: 'History',
      alertFetchError: 'Failed to fetch users',
      _ID: "_ID",
      Name: "Name",
      Email: "Email",
      Phone: "Phone"
    },
    ar: {
      users: 'المستخدمين',
      filterId: 'بحث بواسطة _ID',
      filterName: 'بحث بواسطة الاسم',
      filterEmail: 'بحث بواسطة البريد الإلكتروني',
      filterPhone: 'بحث بواسطة الهاتف',
      viewHistory: 'عرض التاريخ',
      history: 'التاريخ',
      alertFetchError: 'فشل في جلب المستخدمين',
      _ID: 'الرقم التعريفي',
      Name: "الاسم",
      Email: " البريد الإلكتروني",
      Phone: "الهاتف"
    }
  };

  const language = localStorage.getItem('language') || 'ar'; // Default to Arabic

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/all');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(translations[language].alertFetchError, error);
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

  const handleHistoryClick = (id) => {
    navigate('/history', { state: { id, filter } }); // Pass the filter state
  };

  return (
    <div>
      <h1>{translations[language].users}</h1>
      <table className="table table-secondary table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" onClick={() => sortUsers('_id')}>
              {translations[language]._ID}
              <input
                type="text"
                name="_id"
                placeholder={translations[language].filterId}
                value={filter._id}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col" onClick={() => sortUsers('name')}>
              {translations[language].Name}
              <input
                type="text"
                name="name"
                placeholder={translations[language].filterName}
                value={filter.name}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col" onClick={() => sortUsers('email')}>
              {translations[language].Email}
              <input
                type="text"
                name="email"
                placeholder={translations[language].filterEmail}
                value={filter.email}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
            <th scope="col" onClick={() => sortUsers('Phone')}>
              {translations[language].Phone}
              <input
                type="text"
                name="Phone"
                placeholder={translations[language].filterPhone}
                value={filter.Phone}
                onChange={handleFilterChange}
                className="form-control"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user._id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.Phone}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
