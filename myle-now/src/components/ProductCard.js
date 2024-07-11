import React from 'react';
import { Link } from 'react-router-dom';
import rightArrow from '../assets/right-arrow.png';
import './ProductCard.css';

function ProductCard({ service }) {
  const { _id, name, description, image, price, time } = service;
  const imagePath = require(`../assets/${image}`);

  return (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/ServiceDetails/${_id}`}>
      <div className='product-card'>
        <div className='product-image'>
          <img src={imagePath} alt={name} />
          <button>ADD</button>
        </div>
        <div className='product-details'>
          <p className='product-name'>{name}</p>
          <p className='product-desc'>{description}</p>
          <p className='review-details'>4.8 (50k Reviews)</p>
          <hr></hr>
          <div className='time-info'>
            <p>CAD {price} - <span style={{ color: '#8d8d8d' }}>{time} mins</span></p>
            <img src={rightArrow} alt='right arrow icon' />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
