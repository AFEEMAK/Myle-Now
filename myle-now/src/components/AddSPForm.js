import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddService.css';

function AddSPForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    category: "" // Single category should be selected
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/service/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('/api/serviceproviders/add', formData);
        console.log("Service provider added:", response.data);
        setSuccessMessage(response.data.message);
        setFormData({
            name: "",
            phone: "",
            email: "",
            password: "",
            category: ""
        });
    } catch (err) {
        console.error("Error adding service provider:", err.response?.data || err.message);
        setError(err.response?.data.error || "Failed to add service provider");
    }
  };

  return (
    <div className="service-page-container">
      <div className="service-form">
        <h2>Add Service Provider</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Service Provider Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Category:</label>
          <select id="category" value={formData.category} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>

          <input type="submit" value="Add Service Provider" />
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default AddSPForm;
