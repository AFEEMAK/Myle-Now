import React, { useState } from 'react';
import '../components/CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    email: '',
    businessPhone: '',
    businessType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!', formData);
  };

  return (
    <div className="create-account-page">
      <div className="form-container">
        <h2>Easy setup in just three simple steps!</h2>
        <p>Partner with us and enjoy 0% commissions for up to 30 days.</p>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form">
            <input
              type="text"
              name="businessAddress"
              placeholder="Business Address"
              value={formData.businessAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form">
            <input
              type="text"
              name="businessPhone"
              placeholder="Business Phone"
              value={formData.businessPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form">
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select your business type</option>
              <option value="restaurant">Salon Services</option>
              <option value="retail">Paint Services</option>
              <option value="service">Massage Services</option>
              <option value="service">Plumber Services</option>

            </select>
          </div>
          <p>
            By clicking "Get started," I agree to receive marketing electronic communications from the company.
          </p>
          <button type="submit" className="btn">Get started</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
