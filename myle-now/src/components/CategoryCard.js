import './TopCategories.css';
import { Link } from 'react-router-dom';


function CategoryCard({image, name, desc, reviews}){
    let imagePath
    try {
        imagePath = require(`../assets/${image}`);
    } catch (error) {
        imagePath = require('../assets/image.png');
    }
    return(
        <div className='cardDetails'>
        <img src={imagePath} alt=''></img>
        <h3 className='categoryHeading'>{name}</h3>
        <p className="cat-desc">{desc}</p>
        <p> &#9733; {reviews} Reviews</p>
    </div>
    )

}

export default CategoryCard;