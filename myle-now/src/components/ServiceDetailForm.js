import React, { useState, useEffect } from 'react';

const ServiceDetailsForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [processSteps, setProcessSteps] = useState([{ stepHeader: '', stepDetail: '' }]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/service/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    setSelectedService('');

    if (categoryId) {
      try {
        const response = await fetch(`/api/service/subcategories/${categoryId}`);
        const data = await response.json();
        setSubcategories(data);
        setServices([]);
      } catch (error) {
        setError('Failed to fetch subcategories.');
      }
    } else {
      setSubcategories([]);
      setServices([]);
    }
  };

  const handleSubcategoryChange = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setSelectedService('');

    if (selectedCategory && subcategoryId) {
      try {
        const response = await fetch(`/api/service/services/${selectedCategory}/${subcategoryId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
          setError('Failed to fetch services.');
        }
      } catch (error) {
        setError('Failed to fetch services.');
      }
    } else {
      setServices([]);
    }
  };

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFileName(file.name);
    }
  };

  const handleAddStep = () => {
    setProcessSteps([...processSteps, { stepHeader: '', stepDetail: '' }]);
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...processSteps];
    newSteps[index][field] = value;
    setProcessSteps(newSteps);
  };

  const handleSubmitDetails = async (event) => {
    event.preventDefault();

    const serviceDetails = {
      service_id: selectedService,
      image: imageFileName,
      long_description: longDescription,
      process_steps: processSteps,
    };

    try {
      const response = await fetch('/api/service/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceDetails),
      });

      if (response.ok) {
        setError(null);
        alert('Service details added successfully!');
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred.');
      }
    } catch (error) {
      setError('An error occurred while adding the service details.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="service-details-form">
      <h2>Add Service Details</h2>
      <form onSubmit={handleSubmitDetails}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        <label htmlFor="subcategory">Subcategory:</label>
        <select
          id="subcategory"
          value={selectedSubcategory}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcat) => (
            <option key={subcat._id} value={subcat._id}>
              {subcat.subcategory_name}
            </option>
          ))}
        </select>

        <label htmlFor="service">Service:</label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => handleServiceChange(e.target.value)}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          required
        />

        <label htmlFor="long_description">Long Description:</label>
        <textarea
          id="long_description"
          rows="4"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
        />

        <label htmlFor="process_steps">Process Steps:</label>
        {processSteps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Step Header"
              value={step.stepHeader}
              onChange={(e) => handleStepChange(index, 'stepHeader', e.target.value)}
              required
            />
            <textarea
              placeholder="Step Detail"
              rows="2"
              value={step.stepDetail}
              onChange={(e) => handleStepChange(index, 'stepDetail', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddStep}>Add Step</button>

        <input type="submit" value="Add Service Details" />
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default ServiceDetailsForm;
