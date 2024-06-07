import massage from '../assets/massage.png'
import './ColoredSection.css'
import './ColoredItemList'
import ColoredItemList from './ColoredItemList';
function ColoredSection(){

    return(
        <>
        <div className="coloredContainer">
            <div className="lineHeading">
                <hr></hr>
                <p className="line-text">MOST BOOKED SERVICE</p>
                <hr></hr>
            </div>
            <ColoredItemList 
            children = {[
                {image:massage , name:"Men's Haircut"},
                {image:massage , name:"Men's Haircut"},
                {image:massage , name:"Men's Haircut"},
                {image:massage , name:"Men's Haircut"},
                {image:massage , name:"Men's Haircut"},
                {image:massage , name:"Men's Haircut"},
                
            ]}
            
            />

        </div>
        </>

    )
}

export default ColoredSection;