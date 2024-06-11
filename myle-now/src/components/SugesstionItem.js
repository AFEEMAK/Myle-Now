import { Link } from 'react-router-dom';
import './HomeHeader.css';

const ITEMSTYLE = ['grid-item', 'list-item'];
const LINKSTYLE = ['inner-link', 'outer-link'];

function SuggestionItem({ number, itemstyle, linkstyle, image, text, id }) {
    const checkItemStyle = ITEMSTYLE.includes(itemstyle) ? itemstyle : ITEMSTYLE[0];
    const checkLinkStyle = LINKSTYLE.includes(linkstyle) ? linkstyle : LINKSTYLE[1]
    
    if(checkLinkStyle == 'outer-link'){
        return(
        <div className={`${checkItemStyle}${number}`}>
        <Link to={`/services/${id}`}>
        <img src={image} alt={text} />
        <p>{text}</p>
    </Link>
    </div>
        )
}else{
    return (
            
        <div className={`${checkItemStyle}${number}`}>
        <Link to={`#${id}`}>
        <img src={image} alt={text} />
        <p>{text}</p>
    </Link>
    </div>
 
);
}
}

export default SuggestionItem;
