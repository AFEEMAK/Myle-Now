import { Link, useNavigate } from "react-router-dom";
import LinkButton from "./LinkButton";

import "./Nav.css";
import React, { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import search from "../assets/search.png";
import hamburger from "../assets/hamburger.png";
import cart from "../assets/shopping-cart.png";

const AnimatedInput = ({ placeholders = [""], ...passedProps }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState(""); // *code added*
  const navigate = useNavigate(); // *code added*

  useEffect(() => {
    let timeout;
    let charIndex = 0;

    const typeWriterEffect = () => {
      if (charIndex < placeholders[placeholderIndex].length) {
        setCurrentPlaceholder(
          (prev) => prev + placeholders[placeholderIndex].charAt(charIndex)
        );
        charIndex++;
        timeout = setTimeout(typeWriterEffect, 100);
      } else {
        setTimeout(() => {
          setCurrentPlaceholder("");
          charIndex = 0;
          setPlaceholderIndex(
            (prevIndex) => (prevIndex + 1) % placeholders.length
          );
        }, 2000);
      }
    };

    if (!isFocused && !isTyping) {
      typeWriterEffect();
    }

    return () => clearTimeout(timeout);
  }, [placeholderIndex, placeholders, isFocused, isTyping]);

  const handleFocus = () => {
    setIsFocused(true);
    setCurrentPlaceholder("");
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTyping(false);
  };

  const handleInput = (event) => {
    setIsTyping(event.target.value.length > 0);
    setQuery(event.target.value); // *code added*
    
  };
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.target.value = "";
      navigate(`/searchResults?query=${query}`); // *code added*
      
    }
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
        onKeyDown={handleSearch} 
        aria-label="search box" 
        id="animate"
      />
      {!isFocused && !isTyping && (
        <div className="placeholder-wrapper">
          <span className="static-text">
            <img src={search} alt="search box icon"></img>Search for{" "}
          </span>
          <span className="placeholder-text">{currentPlaceholder}</span>
        </div>
      )}
    </div>
  );
};
const placeholders = [" 'Cleaning'", " 'Women's Haircut'", " 'Pedicure'"];

function Nav() {
  const { user } = useAuthContext();
  let role = null;
  const [sideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };
  if (user) {
    role = user.role; // Assuming user.role is a string like 'admin'
    console.log("Role:", role);
  }
  console.log("User", user);
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
  
      
    <nav>
      <Link aria-label="Open home page" to="/">
        <div className="logo">
          <h2>MYLE NOW</h2>
        </div>
      </Link>

      <div className="search-boxes">
        

        <AnimatedInput placeholders={placeholders} />
        
      </div>
      
      <div>
        {role === "admin" && (
          <Link aria-label="Open admin menu" className="admin-links" to="/admin/add/service">
            Admin
          </Link>
        )}
        {role === "service_provider" && (
               <Link aria-label="Open service provider menu" className="admin-links" to="/service_provider">
               Service Provider
             </Link>
        )}
      </div>
      <div className="right">
        <Link aria-label="Open cart page" className="cartIcon" to="/cart">
            <img src={cart} alt=""/>
        </Link>
      {!user?._id && <LinkButton buttontext="Login"></LinkButton>}
      {user?._id && <LinkButton buttontext="Orders" btnlink="orders">Orders</LinkButton>}&nbsp;&nbsp;
      {user?._id && <LinkButton buttontext="Logout" btnfuntion={handleClick} />}
      </div>
      <img
        src={hamburger}
        alt="menu"
        className="hamburger-icon"
        onClick={toggleSideNav}
      />
      <div className={`side-nav ${sideNavVisible ? "visible" : ""}`}>
        <div className="search-boxes">
          <input type="text" className="location" />
          <AnimatedInput placeholders={placeholders} />
          
        </div>
        <LinkButton btnlink={'/cart'} buttontext="Cart" ></LinkButton>

        {!user && <LinkButton aria-label="Open navigation menu" buttontext="Login"></LinkButton>}
        {user && <LinkButton aria-label="Open navigation menu" buttontext="Logout" btnfuntion={handleClick} />}

        {role === "admin" && (
          <Link aria-label="Open admin menu" className="admin-links" to="/admin/add/service">
            Admin
          </Link>
        )}
      </div>
    </nav>
   
  
  );
}

export default Nav;
