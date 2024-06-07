import './TopCategories.css';
import CategoryCard from './CategoryCard';



function TopCategoriesItem({children}){

return(
    
            <div className='cards'>
                {children.map((child) => (
                    <CategoryCard
                    image = {child.image}
                    name = {child.name}
                    desc = {child.desc}
                    reviews = {child.reviews}
                    />
                ))}
                

            </div>
 
)

}

export default TopCategoriesItem;