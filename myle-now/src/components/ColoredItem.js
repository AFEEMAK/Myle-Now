import { Link } from 'react-router-dom';
import './ColoredSection'


function ColoredItem({image,name,id}){
     let imagePath;
  try {
     imagePath = require(`../assets/${image}`);
  } catch (error) {
    console.log(error)
     imagePath = require(`../assets/image.png`);
  }
    return(
        <div className="item">
            <Link to={`/ServiceDetails/${id}`}>
                    <img src={imagePath} alt={name}></img>
                    <p>{name}</p>
                </Link>
                </div>
    )
}
export default ColoredItem;