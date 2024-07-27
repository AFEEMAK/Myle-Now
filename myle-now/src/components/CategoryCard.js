import './TopCategories.css';
import { Link } from 'react-router-dom';


function CategoryCard({image, name, desc, reviews}){
    const imagePath = require(`../assets/${image}`);
    return(
        <div className='cardDetails'>
        <img src={imagePath} alt=''></img>
        <h3 className='categoryHeading'>{name}</h3>
        <p>{desc}</p>
        <p> &#9733; {reviews} Reviews</p>
    </div>
    )

}

export default CategoryCard;