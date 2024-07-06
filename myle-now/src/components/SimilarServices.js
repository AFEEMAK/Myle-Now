import './TopCategories.css';
import massage from'../assets/massage.png';
import TopCategoryItems from './TopCategoryItems';

function SimilarServices(){

    return(
        <div className='top-categories'>
            <h2>SIMILAR SERVICES</h2>
            <TopCategoryItems 
            children = {[
                {image:massage , name:"WOMEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'5'},
                {image:massage , name:"WAXING" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'6'},
                {image:massage , name:"MANICURE AND PEDICURE" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'7'},
                {image:massage , name:"MANICURE AND PEDICURE" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'8'},
                
            ]}
            
            />
            </div>
            
    )

}
export default SimilarServices;
