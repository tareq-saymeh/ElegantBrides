import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';

const History = () => {
  const [filter, setFilter] = useState({
    customer: '',
    items: '',
    receivedDate: '',
    returnDate: '',
    Phone: '',
    email: ''
  });

  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'receivedDate', direction: 'asc' });

  const location = useLocation();
  const language = localStorage.getItem('language') || 'ar'; // Default language is Arabic

  // Translation object
  const translations = {
    en: {
      history: 'History',
      downloadExcel: 'Download as Excel',
      customer: 'Customer',
      items: 'Items',
      receivedDate: 'Received Date',
      returnDate: 'Return Date',
      phone: 'Phone',
      email: 'Email',
      finalAmount: 'Final Amount',
      filterByCustomer: 'Filter by Customer',
      filterByItems: 'Filter by Items',
      filterByPhone: 'Filter by Phone',
      filterByEmail: 'Filter by Email',
      noData: 'No Data Available'
    },
    ar: {
      history: 'التاريخ',
      downloadExcel: 'تنزيل كملف Excel',
      customer: 'العميل',
      items: 'الأصناف',
      receivedDate: 'تاريخ الاستلام',
      returnDate: 'تاريخ الإرجاع',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      finalAmount: 'المبلغ النهائي',
      filterByCustomer: 'البحث حسب العميل',
      filterByItems: 'البحث حسب الأصناف',
      filterByPhone: 'البحث حسب الهاتف',
      filterByEmail: 'البحث حسب البريد الإلكتروني',
      noData: 'لا توجد بيانات متاحة'
    }
  };

  useEffect(() => {
    console.log('Location state:', location.state); // Debugging statement
    if (location.state && location.state.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/logs');
        console.log('Fetched data:', response.data); // Debugging statement
        setData(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    console.log('Filter applied:', filter); // Debugging statement
    const filtered = data.filter((row) => {
      const rowReceivedDates = row.items.map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : '').join(', ');
      const rowReturnDates = row.items.map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '').join(', ');

      return (
        (!filter.customer || (row.userId && row.userId.name.toLowerCase().includes(filter.customer.toLowerCase()))) &&
        (!filter.items || (row.items && row.items.some(item => item.itemId.name.toLowerCase().includes(filter.items.toLowerCase())))) &&
        (!filter.receivedDate || rowReceivedDates.includes(filter.receivedDate)) &&
        (!filter.returnDate || rowReturnDates.includes(filter.returnDate)) &&
        (!filter.Phone || (row.userId && row.userId.Phone.toLowerCase().includes(filter.Phone.toLowerCase()))) &&
        (!filter.email || (row.userId && row.userId.email.toLowerCase().includes(filter.email.toLowerCase())))
      );
    });
    console.log('Filtered data:', filtered); // Debugging statement
  }, [filter, data]);

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
      (!filter.Phone || (row.userId && row.userId.Phone.toLowerCase().includes(filter.Phone.toLowerCase()))) &&
      (!filter.email || (row.userId && row.userId.email.toLowerCase().includes(filter.email.toLowerCase())))
    );
  });

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(row => ({
      Customer: row.userId ? row.userId.name : 'N/A',
      Items: row.items ? row.items.map(item => item.itemId.name).join(', ') : 'N/A',
      ReceivedDates: row.items ? row.items.map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : 'N/A').join(', ') : 'N/A',
      ReturnDates: row.items ? row.items.map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A').join(', ') : 'N/A',
      Phone: row.userId ? row.userId.Phone : 'N/A',
      Email: row.userId ? row.userId.email : 'N/A',
      FinalAmount: calculateFinalAmount(row.items).toFixed(2)
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'History');
    XLSX.writeFile(workbook, 'History.xlsx');
  };

  return (
    <div>
      <h1>{translations[language].history}</h1>
      <div className="d-flex justify-content-end mb-3">
        <button onClick={downloadExcel} className="btn btn-primary">
          {translations[language].downloadExcel}
        </button>
      </div>
      <div>
        <table className="table table-secondary table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">
                {translations[language].customer}
                <input
                  type="text"
                  name="customer"
                  value={filter.customer}
                  onChange={handleFilterChange}
                  placeholder={translations[language].filterByCustomer}
                  className="form-control"
                />
              </th>
              <th scope="col">
                {translations[language].items}
                <input
                  type="text"
                  name="items"
                  value={filter.items}
                  onChange={handleFilterChange}
                  placeholder={translations[language].filterByItems}
                  className="form-control"
                />
              </th>
              <th scope="col" onClick={() => sortData('receivedDate')}>
                {translations[language].receivedDate}
                <span>{sortConfig.key === 'receivedDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col" onClick={() => sortData('returnDate')}>
                {translations[language].returnDate}
                <span>{sortConfig.key === 'returnDate' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
              <th scope="col">
                {translations[language].phone}
                <input
                  type="text"
                  name="phone"
                  value={filter.Phone}
                  onChange={handleFilterChange}
                  placeholder={translations[language].filterByPhone}
                  className="form-control"
                />
              </th>
              <th scope="col">
                {translations[language].email}
                <input
                  type="text"
                  name="email"
                  value={filter.email}
                  onChange={handleFilterChange}
                  placeholder={translations[language].filterByEmail}
                  className="form-control"
                />
              </th>
              <th scope="col" onClick={() => sortData('finalAmount')}>
                {translations[language].finalAmount}
                <span>{sortConfig.key === 'finalAmount' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}</span>
              </th>
            </tr>
          </thead>
          <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((row) => (
      <tr key={row._id}>
        <td>{row.userId ? row.userId.name : 'N/A'}</td>
        <td>{row.items.map(item => item.itemId.name).join(', ')}</td>
        <td>{row.items.map(item => item.receivedDate ? new Date(item.receivedDate).toLocaleDateString() : 'N/A').join(', ')}</td>
        <td>{row.items.map(item => item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A').join(', ')}</td>
        <td>{row.userId ? row.userId.Phone : 'N/A'}</td>
        <td>{row.userId ? row.userId.email : 'N/A'}</td>
        <td>{calculateFinalAmount(row.items).toFixed(2)}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">{translations[language].noData}</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default History;
