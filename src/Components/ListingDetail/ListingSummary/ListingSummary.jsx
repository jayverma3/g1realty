import React from 'react';
import './ListingSummary.css';

const ListingSummary = () => {
  // Placeholder for price, address, MLS#, status, agent
  return (
    <div className="listing-summary">
      <div className="price-and-status">
        <h1 className="price">$1,234,567</h1>
        <span className="status">Active</span>
      </div>
      <h2 className="address">123 Main St, Anytown, USA</h2>
      <div className="meta-data">
        <span>MLS#: 123456</span>
        <span>Agent: John Doe</span>
      </div>
    </div>
  );
};

export default ListingSummary;
