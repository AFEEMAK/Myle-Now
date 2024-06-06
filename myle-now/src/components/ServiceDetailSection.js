import main from '../assets/main.jpg';
import './ServiceDetailSection.css'
function ServiceDetailSection(){
    return(
        <div className='details-topsection'> 
            <div className="details">
                <h2>Haircut For Men</h2>
                <p className='desc'>At MYLEZ, we take pride in offering exceptional professional haircut services tailored to meet your individual style needs. Our team of highly skilled and experienced stylists is dedicated to providing you with a personalized and satisfying haircut experience.</p>
                <div>
                    <p>Cad 50</p>
                    <button>Add</button>
                </div>
            </div>
            <div className="image">
                <img src= {main}></img>
            </div>
        </div>
    )
}

export default ServiceDetailSection