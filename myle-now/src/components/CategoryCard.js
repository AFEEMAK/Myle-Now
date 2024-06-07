import './TopCategories.css';
import { Link } from 'react-router-dom';


function CategoryCard({image, name, desc, reviews}){

    return(
        <div className='cardDetails'>
        <Link to='/Services'>
        <img src={image} alt=''></img>
        <h3 className='categoryHeading'>{name}</h3>
        <p>{desc}</p>
        <p> &#9733; {reviews} Reviews</p>
        </Link>
    </div>
    )

}

export default CategoryCard;