import ColoredItem from "./ColoredItem";
function ColoredItemList({children}){
    return(
        <div className="coloredItems">
                {children.map((child) => (
                    
                    <ColoredItem
                    image = {child.image}
                    name = {child.name}
                    id = {child.id}
                    />

    ))}
     </div>
    )
}

export default ColoredItemList;