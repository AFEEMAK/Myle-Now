import './ColoredSection.css'
import './ColoredItemList'
import ColoredItemList from './ColoredItemList';
import Professional from '../assets/professional.png';
import tracking from '../assets/tracking.png';
import booking from '../assets/booking.png';
function ServiceColoredSection(){

    return(
        <>
        <div className="coloredContainer">
            <div className="lineHeading">
                <hr></hr>
                <p className="line-text">THE MYLENOW DIFFERENCE</p>
                <hr></hr>
            </div>
            <ColoredItemList 
            children = {[
                {image:Professional },
                {image:booking },
                {image:tracking},
            ]}
            
            />

        </div>
        </>

    )
}

export default ServiceColoredSection;