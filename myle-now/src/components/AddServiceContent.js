import './AddService.css';
import { useState, useEffect } from 'react';

const ServiceForm = ({ onSubmit, serviceToEdit, onCancelEdit }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/service/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      const fetchSubcategories = async () => {
        const response = await fetch(`/api/service/subcategories/${category}`);
        const data = await response.json();
        setSubcategories(Array.isArray(data) ? data : []);
      };

      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [category]);

  useEffect(() => {
    if (serviceToEdit) {
      setServiceName(serviceToEdit.name);
      setServiceDescription(serviceToEdit.description);
      setCategory(serviceToEdit.category);
      setSubcategory(serviceToEdit.subcategory);
      setImage(serviceToEdit.image);
      setPrice(serviceToEdit.price);
      setTime(serviceToEdit.time);
    }
  }, [serviceToEdit]);

  const resetForm = () => {
    setServiceName('');
    setServiceDescription('');
    setCategory('');
    setSubcategory('');
    setImage(null);
    setPrice('');
    setTime('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newService = {
      name: serviceName,
      description: serviceDescription,
      category,
      subcategory,
      image: image ? image.name : serviceToEdit?.image,
      price,
      time
    };

    try {
      await onSubmit(newService);
      resetForm();
      setError(null); // Reset error state
      alert('Service saved successfully!'); // Placeholder for feedback
    } catch (error) {
      setError('An error occurred while saving the service.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="service-form">
      <h2>{serviceToEdit ? 'Edit Service' : 'Add Service'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="service_name">Service Name:</label>
        <input
          type="text"
          id="service_name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
        />
        <label htmlFor="service_description">Service Description:</label>
        <textarea
          id="service_description"
          rows="4"
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
          required
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcat) => (
            <option key={subcat._id} value={subcat._id}>
              {subcat.subcategory_name}
            </option>
          ))}
        </select>
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label htmlFor="time">Time (in minutes):</label>
        <input
          type="number"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input type="submit" value={serviceToEdit ? 'Update' : 'Add'} />
        {serviceToEdit && <button type="button" className="cancel-btn" onClick={onCancelEdit}>Cancel</button>}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

const ServiceItem = ({ service, onEdit, onDelete }) => {
  let image;
  try {
    image = require(`../assets/${service.image}`);
  } catch (error) {
    console.error(`Error loading image: ${service.image}`, error);
    image = require('../assets/image.png'); 
  }

  return (
    <div className="service-item">
      <div className="item-contents">
        <img src={image} alt={service.name} className="service-image" />
        <div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <p><span>Category:</span> {service.category}</p>
          <p><span>Subcategory:</span> {service.subcategory}</p>
          <p><span>Price:</span> ${service.price}</p>
          <p><span>Time:</span> {service.time} minutes</p>
        </div>
      </div>
      <div className="item-buttons">
        <button onClick={() => onEdit(service)}>Edit</button>
        <button onClick={() => onDelete(service._id)}>Delete</button>
      </div>
    </div>
  );
};

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className="service-list-container">
      <h2>Service List ({services.length} Products)</h2>
      {services.map(service => (
        <ServiceItem key={service._id} service={service} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

function AddServiceContent() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [serviceToEdit, setServiceToEdit] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/service/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (categoryFilter) {
        const response = await fetch(`/api/service/subcategories/${categoryFilter}`);
        const data = await response.json();
        setSubcategories(Array.isArray(data) ? data : []);
      } else {
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [categoryFilter]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let url = '/api/service';
        if (categoryFilter) {
          url += `?category=${categoryFilter}`;
        }
        if (subcategoryFilter) {
          url += categoryFilter ? `&subcategory=${subcategoryFilter}` : `?subcategory=${subcategoryFilter}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setServices(data);
        handleFilterChange(); // Apply filters after fetching
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [categoryFilter, subcategoryFilter]);

  useEffect(() => {
    handleFilterChange(); // Apply filter whenever services or filters change
  }, [services, categoryFilter, subcategoryFilter]);

  const handleEdit = (service) => {
    setServiceToEdit(service);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/service/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setServices(services.filter(service => service._id !== id));
        setFilteredServices(filteredServices.filter(service => service._id !== id));
      } else {
        const errorData = await response.json();
        console.error('Error deleting service:', errorData.error);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleSubmit = async (service) => {
    try {
      if (serviceToEdit) {
        const response = await fetch(`/api/service/${serviceToEdit._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service)
        });
        if (!response.ok) {
          throw new Error('Failed to update service');
        }
        const updatedService = await response.json();
        setServices(services.map(s => (s._id === serviceToEdit._id ? updatedService : s)));
        setFilteredServices(filteredServices.map(s => (s._id === serviceToEdit._id ? updatedService : s)));
      } else {
        const response = await fetch('/api/service', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service)
        });
        if (!response.ok) {
          throw new Error('Failed to add service');
        }
        const newService = await response.json();
        setServices([...services, newService]);
        setFilteredServices([...filteredServices, newService]);
      }
      setServiceToEdit(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelEdit = () => {
    setServiceToEdit(null);
    // Reset the form fields
    document.querySelector('.service-form form').reset();
  };

  const handleFilterChange = () => {
    const filtered = services.filter(service => {
      return (
        (!categoryFilter || categoryFilter === '' || service.category === categoryFilter) &&
        (!subcategoryFilter || subcategoryFilter === '' || service.subcategory === subcategoryFilter)
      );
    });
    setFilteredServices(filtered);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    // Ensure subcategory filter is reset when category changes
    setSubcategoryFilter('');
    handleFilterChange(); // Apply filter
  };

  const handleSubcategoryChange = (e) => {
    setSubcategoryFilter(e.target.value);
    handleFilterChange(); // Apply filter
  };

  return (
    <div className="service-page-container">
      <ServiceForm
        onSubmit={handleSubmit}
        serviceToEdit={serviceToEdit}
        onCancelEdit={handleCancelEdit}
      />
      <div className="filters">
        <label htmlFor="filter_category">Category:</label>
        <select
          id="filter_category"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category_name}
            </option>
          ))}
        </select>
        <label htmlFor="filter_subcategory">Subcategory:</label>
        <select
          id="filter_subcategory"
          value={subcategoryFilter}
          onChange={handleSubcategoryChange}
        >
          <option value="">All Subcategories</option>
          {subcategories.map((subcat) => (
            <option key={subcat._id} value={subcat._id}>
              {subcat.subcategory_name}
            </option>
          ))}
        </select>
      </div>
      <ServiceList
        services={filteredServices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AddServiceContent;
