import './HomeHeader.css';
import massage from '../assets/massage.png';
import main from '../assets/main.jpg';

import Suggestion from './Suggestion';
import { useEffect, useState } from 'react';

function HomeHeader() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/home');
      const json = await response.json();

      if (response.ok) {
        setCategories(json);
      }
    };

    fetchCategories();
  }, []);

  const suggestionItems = categories.map((category) => ({
    itemstyle: 'grid-item',
    image: massage,
    text: category.category_name,
    key: category._id,
    linkstyle: 'outer-link', 
  }));

  return (
    <>
      <div className="header">
        <section className="suggestions">
          <div>
            <h1>QUALITY SERVICES AT YOUR DOORSTEP!</h1>
          </div>
          <div className="suggestionsContainer">
            <Suggestion children={suggestionItems} layoutstyle="suggestionGrid" />
          </div>
        </section>
        <section className="headerTransition">
          <div className="transitions">
            <img src={main} alt="" />
          </div>
        </section>
      </div>
    </>
  );
}

export default HomeHeader;
