
import './HomeHeader.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';


import ProductCard from './ProductCard';



// function SearchedProductsCard({ subcategories }){
//     const { id } = useParams();
//   const [services, setServices] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch(`/api/service/category/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch services');
//         }
//         const data = await response.json();
//         setServices(Array.isArray(data) ? data : []);
//       } catch (error) {
//         setError('Error fetching services');
//         console.error('Error fetching services:', error);
//       }
//     };

//     fetchServices();
//   }, [id]);

//   return (
//     <div className='service-content'>
      
//       {error && <p>{error}</p>}
//       {subcategories.map(subcategory => (
//         <div key={subcategory._id} id={subcategory._id} className="subcategory-section">
//           <h2 className='subcategory-heading'>{subcategory.subcategory_name}</h2>
//           {services
//             .filter(service => service.subcategory === subcategory._id)
//             .map(service => (
//               <ProductCard key={service._id} service={service} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }



function SearchedProducts() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await fetch(`/api/service/search?query=${query}`);
          if (!response.ok) {
            throw new Error('Failed to fetch services');
          }
          const data = await response.json();
          setServices(data);
        } catch (error) {
          setError('Error fetching services');
          console.error('Error fetching services:', error);
        }
      };
  
      if (query) {
        fetchServices();
      }
    }, [query]);
  
    return (
      <div className='service-content'>
        {error && <p>{error}</p>}
        {services.map(service => (
          <ProductCard key={service._id} service={service} />
        ))}
      </div>
    );
  }
  
  export default SearchedProducts;