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
                {image:'haircut2.jpg', name:"Haircut", id:'66be04b086c33f9ceefb1767'},
                {image:'keratin.jpg' , name:"Keratin Treatment", id : '66be0a8186c33f9ceefb1809'},
                {image:'bodywax.jpg' , name:"Full Body Waxing", id : '66be0cc586c33f9ceefb182a'},
                {image:'bathroom.jpg' , name:"Bathroom Cleaning", id : '66be0f9586c33f9ceefb1839'},
                {image:'reno.jpg' , name:"Post-Renovation Cleaning", id : '66be110a86c33f9ceefb184b'},
                {image:'pedi women.jpg' , name:"Pedicure", id : '66be0c6086c33f9ceefb1823'}
                
                
                
            ]}
            
            />

        </div>
        </>

    )
}

export default ColoredSection;