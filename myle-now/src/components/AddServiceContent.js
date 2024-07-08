import './AddService.css'
import React, { useState,useEffect } from 'react';
import massage from '../assets/massage.png'


const ServiceForm = ({ service, onSave, onReset }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (service) {
      setServiceName(service.name);
      setServiceDescription(service.description);
      setCategory(service.category);
      setSubcategory(service.subcategory);
      setImage(service.image);
      setPrice(service.price);
      setTime(service.time);
    } else {
      resetForm();
    }
  }, [service]);

  const resetForm = () => {
    setServiceName('');
    setServiceDescription('');
    setCategory('');
    setSubcategory('');
    setImage(null);
    setPrice('');
    setTime('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newService = {
      id: service ? service.id : null,
      name: serviceName,
      description: serviceDescription,
      category,
      subcategory,
      image,
      price,
      time
    };
    onSave(newService);
    resetForm();
    onReset();
  };

  return (
    <div className="service-form">
      <h2>{service ? 'Edit Service' : 'Add Service'}</h2>
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
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
        <label htmlFor="subcategory">Subcategory:</label>
        <select
          id="subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        >
          <option value="">Select a subcategory</option>
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
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
        <input type="submit" value={service ? 'Update' : 'Add'} />
      </form>
    </div>
  );
};




const ServiceItem = ({ service, onEdit, onDelete }) => {
  return (
    <div className="service-item">

      <div className='item-contents'>

      
        <img src={massage} alt={service.name} className="service-image"/>
      <div>

      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>Category: {service.category}</p>
      <p>Subcategory: {service.subcategory}</p>
      <p>Price: ${service.price}</p>
      <p>Time: {service.time} minutes</p>
      </div>
      </div>
      <div className='item-buttons'>

      <button onClick={() => onEdit(service)}>Edit</button>
      <button onClick={() => onDelete(service.id)}>Delete</button>
      </div>
    </div>
  );
};






const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className="service-list-container">
      <h2>Service List</h2>
      {services.map(service => (
        <ServiceItem key={service.id} service={service} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};







function AddServiceContent(){
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Service 1',
      description: 'Description for service 1',
      category: 'category1',
      subcategory: 'subcategory1',
      image: null,
      price: 100,
      time: 60
    },
    {
      id: 2,
      name: 'Service 2',
      description: 'Description for service 2',
      category: 'category2',
      subcategory: 'subcategory2',
      image: null,
      price: 200,
      time: 120
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const addService = (service) => {
    setServices([...services, { ...service, id: services.length + 1 }]);
  };

  const editService = (updatedService) => {
    setServices(services.map(service => (service.id === updatedService.id ? updatedService : service)));
    setIsEditing(false);
    setCurrentService(null);
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const startEdit = (service) => {
    setIsEditing(true);
    setCurrentService(service);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentService(null);
  };

  return (
    <div className="service-page-container">
      {isEditing ? (
        <ServiceForm service={currentService} onSave={editService} onReset={resetForm} />
      ) : (
        <ServiceForm onSave={addService} onReset={resetForm} />
      )}
      <ServiceList services={services} onEdit={startEdit} onDelete={deleteService} />
    </div>
  );
}


export default AddServiceContent;