import React from 'react';
import './MortgageCalculator.css';

const MortgageCalculator = () => {
  // Placeholder for interactive calculator
  return (
    <div className="mortgage-calculator">
      <h3>Mortgage Calculator</h3>
      <form>
        <div className="form-group">
          <label>Loan Amount</label>
          <input type="text" placeholder="$1,000,000" />
        </div>
        <div className="form-group">
          <label>Interest Rate</label>
          <input type="text" placeholder="3.5%" />
        </div>
        <div className="form-group">
          <label>Loan Term (years)</label>
          <input type="text" placeholder="30" />
        </div>
        <button className="calculate-btn">Calculate</button>
      </form>
    </div>
  );
};

export default MortgageCalculator;
