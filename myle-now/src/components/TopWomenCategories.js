import './TopCategories.css';
import massage from'../assets/massage.png';
import TopCategoryItems from './TopCategoryItems';

function TopWomenCategories(){

    return(
        <div className='top-categories'>
            <h2>SALON FOR WOMEN</h2>
            <TopCategoryItems 
            children = {[
                {image:massage , name:"WOMEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                {image:massage , name:"WAXING" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                {image:massage , name:"MANICURE AND PEDICURE" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                {image:massage , name:"MANICURE AND PEDICURE" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                
            ]}
            
            />
            </div>
            
    )

}
export default TopWomenCategories;
