import './Nav.css'
import React, { useState, useEffect } from 'react';


const AnimatedInput = ({ placeholders = [""], ...passedProps }) => {
    const [currentPlaceholder, setCurrentPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let timeout;
        let charIndex = 0;

        const typeWriterEffect = () => {
            if (charIndex < placeholders[placeholderIndex].length) {
                setCurrentPlaceholder(prev => prev + placeholders[placeholderIndex].charAt(charIndex));
                charIndex++;
                timeout = setTimeout(typeWriterEffect, 100);
            } else {
                setTimeout(() => {
                    setCurrentPlaceholder('');
                    charIndex = 0;
                    setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
                }, 2000); // Wait time before starting the next placeholder
            }
        };

        if (!isFocused && !isTyping) {
            typeWriterEffect();
        }

        return () => clearTimeout(timeout);
    }, [placeholderIndex, placeholders, isFocused, isTyping]);

    const handleFocus = () => {
        setIsFocused(true);
        setCurrentPlaceholder('');
    };

    const handleBlur = () => {
        setIsFocused(false);
        setIsTyping(false);
    };

    const handleInput = (event) => {
        setIsTyping(event.target.value.length > 0);
    };

    return (
        <div className="animated-placeholder-container">
            <input
                {...passedProps}
                className="input-with-animated-placeholder"
                placeholder=""
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
            />
            {!isFocused && !isTyping && (
                <div className="placeholder-wrapper">
                    <span className="static-text"><img src='./search.png'></img>Search for </span>
                    <span className="placeholder-text">{currentPlaceholder}</span>
                </div>
            )}
        </div>
    );
};
const placeholders = [" 'House Cleaning'", " 'Men's Haircut'", " 'Pedicure'"];


function Nav() {

   
    return (
      
      <nav>
        <div className='logo'><h1>Logo Goes Here</h1></div>
        <div className='search-boxes'>
            <input type='text' className='location'></input>
           

            <AnimatedInput placeholders={placeholders} />
           
            
        </div>
        <div className='account-buttons'>
        <button>Login</button>
        <button>Sign up</button>
        </div>
      </nav>
      
    );
  }
  
  export default Nav;
  