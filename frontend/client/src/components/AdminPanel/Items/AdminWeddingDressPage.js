import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminWeddingDressPage = () => {
  const initialData = [
    {
      id: 1,
      name: 'Necklace',
      size: 'N/A',
      brand: 'Tiffany',
      color: 'Silver',
      price: '$200',
      description: 'Elegant silver necklace with diamonds',
      image: 'path/to/image1.jpg',
    },
    {
      id: 2,
      name: 'Bracelet',
      size: 'M',
      brand: 'Pandora',
      color: 'Gold',
      price: '$150',
      description: 'Gold bracelet with charms',
      image: 'path/to/image2.jpg',
    },
    {
      id: 3,
      name: 'Earrings',
      size: 'S',
      brand: 'Swarovski',
      color: 'Blue',
      price: '$75',
      description: 'Blue crystal earrings',
      image: 'path/to/image3.jpg',
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    size: '',
    brand: '',
    color: '',
    price: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [filter, setFilter] = useState({
    id: '',
    name: '',
    size: '',
    brand: '',
    color: '',
    price: '',
    description: '',
  });
  const [data, setData] = useState(initialData);

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
        price: '',
        description: '',
        image: null,
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
      price: '',
      description: '',
      image: null,
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

  const handleSubmit = () => {
    // Add logic to handle form submission (add or edit the data)
    console.log(formData);
    handleClose();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredData = data.filter((item) =>
    Object.keys(filter).every((key) =>
      item[key].toString().toLowerCase().includes(filter[key].toLowerCase())
    )
  );

  return (
    <div>
      <h1>Dress Page</h1>
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
              <th scope="col">image</th>
              <th scope="col">Remove</th>
              <th scope="col">Edit</th>
            </tr>
            
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.brand}</td>
                <td>{item.color}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.image && <img src={item.image} alt={item.name} width="50" />}</td>
                <td>
                  <button className="btn btn-danger">Remove</button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleShow('Edit', {
                        id: item.id,
                        name: item.name,
                        size: item.size,
                        brand: item.brand,
                        color: item.color,
                        price: item.price,
                        description: item.description,
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
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                readOnly={modalType === 'Edit'}
              />
            </Form.Group>
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

export default AdminWeddingDressPage;
