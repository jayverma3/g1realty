import React from 'react';
import './ShareButtons.css';
import facebookIcon from '../../../assets/icons/icons8-facebook.svg';
import twitterIcon from '../../../assets/icons/icons8-twitter.svg';
import linkedinIcon from '../../../assets/icons/icons8-linkedin-circled.svg';
import whatsappIcon from '../../../assets/icons/icons8-whatsapp.svg';

const ShareButtons = () => {
  // Placeholder for social + copy link + email to friend
  return (
    <div className="share-buttons">
      <h3>Share this listing</h3>
      <div className="share-icons">
        <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
        <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
        <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
        <a href="#"><img src={whatsappIcon} alt="Whatsapp" /></a>
      </div>
      <button className="copy-link-btn">Copy Link</button>
    </div>
  );
};

export default ShareButtons;
