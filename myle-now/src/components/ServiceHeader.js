import './HomeHeader.css';
import massage from '../assets/massage.png';
import Suggestion from './Suggestion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import main from '../assets/main.jpg';
import ProductCard from './ProductCard';

function ServiceContent({ subcategories }) {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/service/category/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        setError('Error fetching services');
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [id]);

  return (
    <div className='service-content'>
      <section className='headerTransition'>
        <div className='transitions'>
          <img src={main} alt='' />
        </div>
      </section>
      {error && <p>{error}</p>}
      {subcategories.map(subcategory => (
        <div key={subcategory._id} id={subcategory._id} className="subcategory-section">
          <h2 className='subcategory-heading'>{subcategory.subcategory_name}</h2>
          {services
            .filter(service => service.subcategory === subcategory._id)
            .map(service => (
              <ProductCard key={service._id} service={service} />
          ))}
        </div>
      ))}
    </div>
  );
}




function ServiceHeader() {
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`/api/service/subcategories/${id}`);
        if (!response.ok) {
          console.error('Failed to fetch subcategories:', response.statusText);
          return;
        }
        const json = await response.json();
        setSubcategories(json);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [id]);

  const suggestionItems = subcategories.map((subcategory) => ({
    itemstyle: 'list-item',
    image: massage,
    text: subcategory.subcategory_name,
    key: subcategory._id,
    linkstyle: 'inner-link', // Adjust this as needed
  }));

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <div className='header'>
        <section className="suggestions service-suggestions">
          <div>
            <h1 className='service-heading'>Salon Prime For Men & Kids</h1>
          </div>
          <div className='holder-div'>
            <div className='suggestionsContainer'>
              <Suggestion children={suggestionItems} layoutstyle='suggestionList' />
            </div>
          </div>
        </section>
        <ServiceContent subcategories={subcategories} />
      </div>
    </>
  );
}


export default ServiceHeader;
