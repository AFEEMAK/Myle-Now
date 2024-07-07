import massage from '../assets/massage.png';
import rightArrow from '../assets/right-arrow.png';
import './ProductCard.css'
import { Link } from 'react-router-dom';

function ProductCard({id}){
    console.log(id)
    return(
        <Link  style={{textDecoration:'none',color:'inherit'}} to={`/ServiceDetails/${id}`}>
        <div className='product-card'>
            <div className='product-image'>
                <img src={massage} alt={massage} />
                <button>ADD</button>
            </div>
            <div className='product-details'>
                <p id={'haircut'} className='product-name'>HAIRCUT FOR MEN</p>
                <p className='product-desc'>Professional haircut that suits your face</p>
                <p className='review-details'>4.8 (50k Reviews)</p>
                <hr></hr>
                <div className='time-info'>
                    <p>CAD 50 - <span style={{color: '#8d8d8d'}}>30 mins</span></p>
                    <img src={rightArrow} alt='right arrow icon'></img>
                </div>
            </div>
        </div>
        </Link>
    )    
}

export default ProductCard