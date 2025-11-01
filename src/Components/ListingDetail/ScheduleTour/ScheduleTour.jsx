import React from 'react';
import './ScheduleTour.css';

const ScheduleTour = () => {
  // Placeholder for calendar integration
  return (
    <div className="schedule-tour">
      <h3>Schedule a Tour</h3>
      <div className="tour-options">
        <button className="tour-option-btn active">In-Person</button>
        <button className="tour-option-btn">Video Chat</button>
      </div>
      <div className="date-time-picker">
        <input type="date" />
        <input type="time" />
      </div>
      <button className="request-tour-btn">Request Tour</button>
    </div>
  );
};

export default ScheduleTour;
