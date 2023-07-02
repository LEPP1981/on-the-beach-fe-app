import React, { useState } from "react";
import "./otb-bundles.css";

const BundleCard = ({
  hotelName,
  hotelLocation,
  rating,
  adults,
  children,
  infants,
  arrivalDate,
  nights,
  departureLocation,
  totalPrice,
  featureImage,
  overview,
}) => {
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  return (
    <div className="bundle-card">
      <div className="bundle-details">
        <div className="hotel-info">
          <h2>{hotelName}</h2>
          <p>Location: {hotelLocation.region}, {hotelLocation.city}</p>
          <div className="rating">
            {Array.from({ length: rating }, (_, index) => (
              <i key={index} className="fa fa-star"></i>
            ))}
          </div>
        </div>
        <div className="bundle-image">
            <img src={featureImage} alt="Feature" />
        </div>
        <div className="booking-info">
          <p><strong>{adults}</strong> adults, <strong>{children}</strong> children & <strong>{infants}</strong> infants</p>
          <p><strong>{arrivalDate}</strong> for <strong>{nights}</strong> days</p>
          <p>Departing from <strong>{departureLocation}</strong></p>
          <button className="book-now-btn">Book Now</button>
          <p>Total Price: £{totalPrice}</p>
        </div>
      </div>
      
      <div className="bundle-tab" onClick={handleToggleOverview}>
        <p className="overview-tab-text"><strong>Read more</strong> about this hotel</p>
      </div>
      {showOverview && (
        <div className="bundle-overview">
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>
      )}
    </div>
  );
};

export default BundleCard;
