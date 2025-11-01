import React from 'react';
import './ListingGallery.css';

const ListingGallery = () => {
  // Placeholder for image carousel and lightbox
  return (
    <div className="listing-gallery">
      <div className="main-image">
        <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Main listing" />
      </div>
      <div className="thumbnail-images">
        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Thumbnail 1" />
        <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Thumbnail 2" />
        <img src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Thumbnail 3" />
        <div className="show-all-button">
          <span>Show all photos</span>
        </div>
      </div>
    </div>
  );
};

export default ListingGallery;
