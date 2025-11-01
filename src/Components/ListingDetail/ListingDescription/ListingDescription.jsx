import React from 'react';
import './ListingDescription.css';

const ListingDescription = () => {
  // Placeholder for description + features list
  return (
    <div className="listing-description">
      <h3>About this home</h3>
      <p>
        Welcome to this stunning modern home, featuring an open-concept layout perfect for entertaining. The gourmet kitchen is equipped with state-of-the-art appliances, and the spacious living area opens up to a beautiful backyard oasis.
      </p>
      <h4>Key Features</h4>
      <ul className="features-list">
        <li>Hardwood Floors</li>
        <li>Gourmet Kitchen</li>
        <li>Swimming Pool</li>
        <li>Large Backyard</li>
        <li>Smart Home Automation</li>
        <li>2-Car Garage</li>
      </ul>
    </div>
  );
};

export default ListingDescription;
