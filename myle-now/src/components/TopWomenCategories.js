import './TopCategories.css';


import { Link } from 'react-router-dom';


function CategoryCard({image, name}){
    let imagePath
    try {
        imagePath = require(`../assets/${image}`);
    } catch (error) {
        imagePath = require('../assets/image.png');
    }
    return(
        <div className='cardDetails'>
        <img src={imagePath} alt={name}></img>
        <h3 className='categoryHeading'>{name}</h3>
        
    </div>
    )

}

function TopCategoriesItem({children}){

    return(
        
                <div className='cards'>
                    {children.map((child) => (
                       
                        <Link to={`/Services/${child.id}`}>
    
                        <CategoryCard
                        image = {child.image}
                        name = {child.text}
                        desc = {child.desc}
                        reviews = {child.reviews}
                        />
                        </Link>
                    ))}
                    
    
                </div>
     
    )
    
    }

function TopWomenCategories(){

    return(
        <div className='top-categories'>
            <h2>SALON FOR WOMEN</h2>
            <TopCategoriesItem
            children = {[
                {image:'haircare.jpg' , text:"Haircare" ,id:'668dd4adb6f0762dd59347bc'},
                {image:'women_skincare.jpg' , text:"Skincare",id:'668dd4adb6f0762dd59347bc'},
                {image:'makeup.jpg' , text:"Makeup",id:'668dd4adb6f0762dd59347bc'},
                {image:'nails.jpg' , text:"Nail Care",id:'668dd4adb6f0762dd59347bc'},
                
            ]}
            
            />
            </div>
            
    )

}
export default TopWomenCategories;
