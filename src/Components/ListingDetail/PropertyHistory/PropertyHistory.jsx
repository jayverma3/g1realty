import React from 'react';
import './PropertyHistory.css';

const PropertyHistory = () => {
  // Placeholder for price history, tax, open house history
  return (
    <div className="property-history">
      <h2>Property History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-10-26</td>
            <td>Listed</td>
            <td>$1,250,000</td>
          </tr>
          <tr>
            <td>2023-11-15</td>
            <td>Price Change</td>
            <td>$1,234,567</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropertyHistory;
