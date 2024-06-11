import { Link } from 'react-router-dom';
import './HomeHeader.css';
import SuggestionItem from './SugesstionItem';

const LAYOUTSTYLE = ['suggestionGrid', 'suggestionList'];

function Suggestion({ children, layoutstyle }) {
    const checkLayoutType = LAYOUTSTYLE.includes(layoutstyle) ? layoutstyle : LAYOUTSTYLE[0];
    return (
        <>
        <h3>What are you looking for?</h3>
        <div className={checkLayoutType}>
            {children.map((child, index) => (
                

                <SuggestionItem
                    number={index + 1}
                    itemstyle={child.itemstyle}
                    image={child.image}
                    text={child.text}
                    id={child.id}
                    linkstyle={child.linkstyle}
                    />
            
            ))}
        </div>
        </>
    );
}

export default Suggestion;
