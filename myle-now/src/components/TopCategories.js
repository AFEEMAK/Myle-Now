import './TopCategories.css';
import massage from'../assets/massage.png';
import TopCategoryItems from './TopCategoryItems';
import { useEffect, useState } from 'react';
function TopCategories(){

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
          const response = await fetch('/api/home/four-categories');
          const json = await response.json();
    
          if (response.ok) {
            setCategories(json);
            console.log('json',json)
          }
        };
    
        fetchCategories();
      }, []);
    
      const topCategoryItems = categories.map((category) => (
        console.log(category),
        {
        image: massage,
        text: category.category_name,
        key: category._id,
        desc: category.category_desc,
        reviews: '4.8 (50k)', 
        
      }));
    return(
        <div className='top-categories'>
            <h2>TOP CATEGORIES</h2>
            <TopCategoryItems 
            children={topCategoryItems}
            
            />
            </div>
            
    )

}
export default TopCategories;
