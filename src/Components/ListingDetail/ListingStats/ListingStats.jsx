import React from 'react';
import './ListingStats.css';
import bedIcon from '../../../assets/icons/bed.svg';
import bathIcon from '../../../assets/icons/bath.svg';
import areaIcon from '../../../assets/icons/area.svg';

const ListingStats = () => {
  // Placeholder for beds, baths, sqft, lot size, year built
  return (
    <div className="listing-stats">
      <div className="stat-item">
        <img src={bedIcon} alt="Beds" />
        <p>4 Beds</p>
      </div>
      <div className="stat-item">
        <img src={bathIcon} alt="Baths" />
        <p>3 Baths</p>
      </div>
      <div className="stat-item">
        <img src={areaIcon} alt="Area" />
        <p>2,500 sqft</p>
      </div>
      <div className="stat-item">
        <p className="stat-value">0.5</p>
        <p className="stat-label">acres</p>
      </div>
      <div className="stat-item">
        <p className="stat-value">2022</p>
        <p className="stat-label">built</p>
      </div>
    </div>
  );
};

export default ListingStats;
