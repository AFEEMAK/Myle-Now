import './AddService.css';
import { useState, useEffect } from 'react';

const ServiceForm = () => {
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
      image: image.name,
      price,
      time
    };

    try {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      const json = await response.json();

      if (response.ok) {
        
        resetForm();
        setError(null); // Reset error state
        alert('Service added successfully!'); // Placeholder for feedback
      } else {
        setError(json.error);
      }
    } catch (error) {
      setError('An error occurred while saving the service.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="service-form">
      <h2>Add Service</h2>
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
        <input type="submit" value="Add" />
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

const ServiceItem = ({ service }) => {
  
  const image = require(`../assets/${service.image}`)
  return (
    <div className="service-item">
      <div className='item-contents'>
      <img src={image} alt={service.name} className="service-image"/>
        <div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <p><span>Category:</span> {service.category}</p>
          <p><span>Subcategory:</span> {service.subcategory}</p>
          <p><span>Price:</span> ${service.price}</p>
          <p><span>Time:</span> {service.time} minutes</p>
        </div>
      </div>
      <div className='item-buttons'>

        <button >Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

const ServiceList = ({ services }) => {
  return (
    <div className="service-list-container">
      <h2>Service List</h2>
      {services.map(service => (
        <ServiceItem key={service._id} service={service} /> 
      ))}
    </div>
  );
};

function AddServiceContent() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/service');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="service-page-container">
      <ServiceForm />
      <ServiceList services={services} />
    </div>
  );
}

export default AddServiceContent;