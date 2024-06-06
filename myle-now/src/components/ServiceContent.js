import main from '../assets/main.jpg';
import ProductCard from './ProductCard';
function ServiceContent(){
    return(
 
            <div className='service-content'>

             <section className='headerTransition'>
            
            
            <div className='transitions'>
                <img src= {main} alt=''></img>  
            </div>
        </section>
             <ProductCard id='1'/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            </div>
    
        
        
        
    )
}


export default ServiceContent