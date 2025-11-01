import React from 'react';
import './ContactAgentForm.css';

const ContactAgentForm = () => {
  // Placeholder for quick lead form
  return (
    <div className="contact-agent-form">
      <h3>Contact Agent</h3>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Name" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="tel" placeholder="Phone" />
        </div>
        <div className="form-group">
          <textarea placeholder="Message"></textarea>
        </div>
        <button className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default ContactAgentForm;
