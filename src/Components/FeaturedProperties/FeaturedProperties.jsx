import React from "react";
import "./FeaturedProperties.css";
import image1 from "../../assets/images/pexels-binyaminmellish-1396132.jpg";
import image2 from "../../assets/images/pexels-frans-van-heerden-201846-1438832.jpg";
import image3 from "../../assets/images/pexels-pixabay-164558.jpg";
import image4 from "../../assets/images/pexels-pixabay-259588.jpg";

const FeaturedProperties = () => {
  const properties = [
    { id: 1, image: image1, name: "Modern Villa" },
    { id: 2, image: image2, name: "Downtown Apartment" },
    { id: 3, image: image3, name: "Suburban Home" },
    { id: 4, image: image4, name: "Beachfront House" },
  ];

  return (
    <section className="featured-properties">
      <div className="featured-header">
        <h2 className="featured-title">Begin Your Home Journey</h2>
        <p className="featured-subtitle">
          From your first showing to the moment you get the keys, we're here to
          guide you through every step of the home-buying process.
        </p>
      </div>
      <div className="property-gallery">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <img
              src={property.image}
              alt={property.name}
              className="property-image"
            />
            <div className="property-name">{property.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
