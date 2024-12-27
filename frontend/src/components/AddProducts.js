import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/AddProducts.css';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    image: '',
    backImage: ''
  });

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products!', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productExists = products.some(product => product.id === formData.id);
    if (productExists) {
      alert('A product with this ID already exists!');
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchProducts();

      alert('Product added successfully!');

      navigate('/home');
    } catch (error) {
      console.error('There was an error adding the product!', error);
      alert('There was an error adding the product. Please try again.');
    }
  };

  return (
    <div className="add-product-form-container">
      <h2 className="form-title">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="input-group">
          <label htmlFor="id">Product ID</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="Enter product ID" required />
        </div>

        <div className="input-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" required />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description"></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="price">Price (€)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" required />
        </div>

        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Enter category" required />
        </div>

        <div className="input-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter quantity" required />
        </div>

        <div className="input-group">
          <label htmlFor="image">Front Product Image</label>
          <input type="file" name="image" onChange={handleFileChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="backImage">Back Product Image (Optional)</label>
          <input type="file" name="backImage" onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;