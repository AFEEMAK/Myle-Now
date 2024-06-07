import './TopCategories.css';
import massage from'../assets/massage.png';
import TopCategoryItems from './TopCategoryItems';

function TopCategories(){

    return(
        <div className='top-categories'>
            <h2>TOP CATEGORIES</h2>
            <TopCategoryItems 
            children = {[
                {image:massage , name:"MEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                {image:massage , name:"MEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                {image:massage , name:"MEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},
                {image:massage , name:"MEN'S HAIRCUT" , desc:"Professional haircut that suits your face.", reviews:"4.8 (50k) "},   
            ]}
            
            />
            </div>
            
    )

}
export default TopCategories;
