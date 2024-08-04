import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminAccessoriesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    size: '',
    brand: '',
    color: '',
    BuyAble: false,
    RentAbleAble: false,
    description: '',
    type: 'Accessories',
    price: '',
    rating: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [filter, setFilter] = useState({
    id: '',
    name: '',
    size: '',
    brand: '',
    color: '',
    price: '',
    description: ''
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShow = (type, data) => {
    setModalType(type);
    if (type === 'Edit') {
      setFormData(data);
      setImagePreview(data.image);
    } else {
      setFormData({
        id: '',
        name: '',
        size: '',
        brand: '',
        color: '',
        BuyAble: false,
        RentAbleAble: false,
        description: '',
        type: 'Accessories',
        price: '',
        rating: ''
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      id: '',
      name: '',
      size: '',
      brand: '',
      color: '',
      BuyAble: false,
      RentAbleAble: false,
      description: '',
      type: 'Accessories',
      price: '',
      rating: ''
    });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (modalType === 'Add') {
        await axios.post('http://localhost:3000/api/items', formData);
      } else {
        await axios.put(`http://localhost:3000/api/items/${formData.id}`, formData);
      }
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredData = data.filter((item) =>
    item.type === 'Accessories' && Object.keys(filter).every((key) =>
      item[key]?.toString().toLowerCase().includes(filter[key].toLowerCase())
    )
  );

  return (
    <div>
      <h1>Accessories Page</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="ItemAddButn btn btn-primary" onClick={() => handleShow('Add')}>
          Add
        </button>
      </div>
      <div>
        <table className="table table-secondary table-hover table-bordered">
          <thead>
            <tr>
              {Object.keys(filter).map((key) => (
                <th key={key}>{key}
                  <input
                    type="text"
                    name={key}
                    placeholder={`Filter by ${key}`}
                    value={filter[key]}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </th>
              ))}
              <th scope="col">Image</th>
              <th scope="col">Remove</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.brand}</td>
                <td>{item.color}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.image && <img src={item.image} alt={item.name} width="50" />}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Remove</button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleShow('Edit', {
                        id: item._id,
                        name: item.name,
                        size: item.size,
                        brand: item.brand,
                        color: item.color,
                        BuyAble: item.BuyAble,
                        RentAbleAble: item.RentAbleAble,
                        description: item.description,
                        type: item.type,
                        price: item.price,
                        rating: item.rating,
                        image: item.image,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType} Accessory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" width="100" className="mt-2" />}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAccessoriesPage;
