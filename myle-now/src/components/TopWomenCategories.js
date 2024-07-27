import './TopCategories.css';

import TopCategoryItems from './TopCategoryItems';

function TopWomenCategories(){

    return(
        <div className='top-categories'>
            <h2>SALON FOR WOMEN</h2>
            <TopCategoryItems 
            children = {[
                {image:'massage.png' , text:"WOMEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'5'},
                {image:'massage.png' , text:"WAXING" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'6'},
                {image:'massage.png' , text:"MANICURE AND PEDICURE" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'7'},
                {image:'massage.png' , text:"MANICURE AND PEDICURE" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) ",id:'8'},
                
            ]}
            
            />
            </div>
            
    )

}
export default TopWomenCategories;
