import './TopCategories.css';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';



function TopCategoriesItem({children}){

return(
    
            <div className='cards'>
                {children.map((child) => (
                    <Link to='/services'>

                    <CategoryCard
                    image = {child.image}
                    name = {child.name}
                    desc = {child.desc}
                    reviews = {child.reviews}
                    />
                    </Link>
                ))}
                

            </div>
 
)

}

export default TopCategoriesItem;