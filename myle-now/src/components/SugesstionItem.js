import { Link } from 'react-router-dom';
import './HomeHeader.css';

const ITEMSTYLE = ['grid-item', 'list-item'];

function SuggestionItem({ number, itemstyle, image, text }) {
    const checkItemStyle = ITEMSTYLE.includes(itemstyle) ? itemstyle : ITEMSTYLE[0];

    return (
        
        <div className={`${checkItemStyle}${number}`}>
            
            <img src={image} alt={text} />
            <p>{text}</p>
        
        </div>
     
    );
}

export default SuggestionItem;
