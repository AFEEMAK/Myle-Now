import './HomeHeader.css';
import massage from '../assets/massage.png';
import Suggestion from './Suggestion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import main from '../assets/main.jpg';
import ProductCard from './ProductCard';

function ServiceContent() {
  return (
    <div className='service-content'>
      <section className='headerTransition'>
        <div className='transitions'>
          <img src={main} alt='' />
        </div>
      </section>
      <ProductCard id='1' />
      <ProductCard />
      <ProductCard />
      <ProductCard />
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
    id: subcategory._id,
    linkstyle: 'inner-link', // Adjust this as needed
  }));

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
        <ServiceContent />
      </div>
    </>
  );
}

export default ServiceHeader;
