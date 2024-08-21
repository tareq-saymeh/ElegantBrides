import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminWeddingDressPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    brand: '',
    color: '',
    BuyAble: true,
    RentAble: false,
    description: '',
    type: 'WeddingDress',
    price: '',
    image: []
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Changed to handle multiple previews
  const [data, setData] = useState([]);

  // Translation object
  const translations = {
    en: {
      weddingDressPage: 'Wedding Dress Page',
      add: 'Add',
      id: 'ID',
      name: 'Name',
      size: 'Size',
      brand: 'Brand',
      color: 'Color',
      price: 'Price',
      description: 'Description',
      buyable: 'Buyable',
      rentable: 'Rentable',
      image: 'Image',
      remove: 'Remove',
      edit: 'Edit',
      noData: 'No data available',
      saveChanges: 'Save Changes',
      close: 'Close',
      addWeddingDress: 'Add Wedding Dress',
      editWeddingDress: 'Edit Wedding Dress'
    },
    ar: {
      weddingDressPage: 'صفحة فستان الزفاف',
      add: 'إضافة',
      id: 'الرقم التعريفي',
      name: 'الاسم',
      size: 'الحجم',
      brand: 'العلامة التجارية',
      color: 'اللون',
      price: 'السعر',
      description: 'الوصف',
      buyable: 'قابل للشراء',
      rentable: 'قابل للإيجار',
      image: 'الصورة',
      remove: 'إزالة',
      edit: 'تعديل',
      noData: 'لا توجد بيانات متاحة',
      saveChanges: 'حفظ التغييرات',
      close: 'إغلاق',
      addWeddingDress: 'إضافة فستان زفاف',
      editWeddingDress: 'تعديل فستان زفاف'
    }
  };

  const language = localStorage.getItem('language') || 'en'; // Default to English

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items');
      console.log('Fetched Data:', response.data);
      const filteredData = response.data.filter(item => item.type === 'WeddingDress');
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShow = (type, data) => {
    setModalType(type);
    if (type === 'Edit') {
      setFormData({
        ...data,
        image: []
      });
      setImagePreviews(`http://localhost:3000/uploads/${data.image}`);
    } else {
      setFormData({
        name: '',
        size: '',
        brand: '',
        color: '',
        BuyAble: true,
        RentAble: false,
        description: '',
        type: 'WeddingDress',
        price: '',
        image:  []
      });
      setImagePreviews([]);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: '',
      size: '',
      brand: '',
      color: '',
      BuyAble: true,
      RentAble: false,
      description: '',
      type: 'WeddingDress',
      price: '',
      image: []
    });
    setImagePreviews([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      image: files,
    }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async () => {
    const dataToSubmit = new FormData();
  
    dataToSubmit.append('name', formData.name);
    dataToSubmit.append('size', formData.size);
    dataToSubmit.append('brand', formData.brand);
    dataToSubmit.append('color', formData.color);
    dataToSubmit.append('BuyAble', formData.BuyAble);
    dataToSubmit.append('RentAble', formData.RentAble);
    dataToSubmit.append('description', formData.description);
    dataToSubmit.append('type', formData.type);
    dataToSubmit.append('price', formData.price);
    Array.from(formData.image).forEach((image, index) => {
      dataToSubmit.append('images', image);
    });
  
    try {
      if (modalType === 'Add') {
        await axios.post('http://localhost:3000/api/items/add', dataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.put(`http://localhost:3000/api/items/edit/${formData._id}`, dataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error.response ? error.response.data : error.message);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h1>{translations[language].weddingDressPage}</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="ItemAddButn btn btn-primary" onClick={() => handleShow('Add')}>
          {translations[language].add}
        </button>
      </div>
      <div>
        <table className="table table-secondary table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">{translations[language].id}</th>
              <th scope="col">{translations[language].name}</th>
              <th scope="col">{translations[language].size}</th>
              <th scope="col">{translations[language].brand}</th>
              <th scope="col">{translations[language].color}</th>
              <th scope="col">{translations[language].price}</th>
              <th scope="col">{translations[language].description}</th>
              <th scope="col">{translations[language].buyable}</th>
              <th scope="col">{translations[language].rentable}</th>
              <th scope="col">{translations[language].image}</th>
              <th scope="col">{translations[language].remove}</th>
              <th scope="col">{translations[language].edit}</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item._id}</th>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.brand}</td>
                  <td>{item.color}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.BuyAble ? translations[language].buyable : 'No'}</td>
                  <td>{item.RentAble ? translations[language].rentable : 'No'}</td>
                  <td>{item.image && <img src={`http://localhost:3000/${item.image[0]}`} alt={item.name} width="50" />}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                      {translations[language].remove}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleShow('Edit', {
                          _id: item._id,
                          name: item.name,
                          size: item.size,
                          brand: item.brand,
                          color: item.color,
                          BuyAble: item.BuyAble,
                          RentAble: item.RentAble,
                          description: item.description,
                          type: item.type,
                          price: item.price,
                          image: item.image,
                        })
                      }
                    >
                      {translations[language].edit}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">{translations[language].noData}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'Add' ? translations[language].addWeddingDress : translations[language].editWeddingDress}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>{translations[language].name}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSize">
              <Form.Label>{translations[language].size}</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label>{translations[language].brand}</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>{translations[language].color}</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>{translations[language].price}</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>{translations[language].description}</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBuyAble">
              <Form.Check 
                type="checkbox"
                name="BuyAble"
                label={translations[language].buyable}
                checked={formData.BuyAble}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRentAble">
              <Form.Check 
                type="checkbox"
                name="RentAble"
                label={translations[language].rentable}
                checked={formData.RentAble}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>{translations[language].image}</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange} name="images"  />
              {imagePreviews && <img src={imagePreviews} alt="Preview" width="100" className="mt-2" />}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {translations[language].close}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {translations[language].saveChanges}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminWeddingDressPage;
