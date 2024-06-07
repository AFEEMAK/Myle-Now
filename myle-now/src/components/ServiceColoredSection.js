import './ColoredSection.css'
import './ColoredItemList'
import ColoredItemList from './ColoredItemList';
import dif1 from '../assets/dif1.png'
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
                {image:dif1 },
                {image:dif1 },
                {image:dif1},
            ]}
            
            />

        </div>
        </>

    )
}

export default ServiceColoredSection;