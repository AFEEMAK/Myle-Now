import './ColoredSection'


function ColoredItem({image,name}){
    return(

        <div className="item">
                    <img src={image} alt=""></img>
                    <p>{name}</p>
                </div>
    )
}
export default ColoredItem;