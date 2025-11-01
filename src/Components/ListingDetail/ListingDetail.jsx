import React from 'react';
import './ListingDetail.css';
import ListingGallery from './ListingGallery/ListingGallery';
import ListingSummary from './ListingSummary/ListingSummary';
import ListingStats from './ListingStats/ListingStats';
import ListingDescription from './ListingDescription/ListingDescription';
import FloorPlans from './FloorPlans/FloorPlans';
import NearbyAmenities from './NearbyAmenities/NearbyAmenities';
import MortgageCalculator from './MortgageCalculator/MortgageCalculator';
import ContactAgentForm from './ContactAgentForm/ContactAgentForm';
import ScheduleTour from './ScheduleTour/ScheduleTour';
import RelatedListings from './RelatedListings/RelatedListings';
import ShareButtons from './ShareButtons/ShareButtons';
import PropertyHistory from './PropertyHistory/PropertyHistory';

const ListingDetail = () => {
  return (
    <div className="listing-detail">
      <ListingGallery />
      <div className="listing-detail-content">
        <div className="listing-detail-main">
          <ListingSummary />
          <ListingStats />
          <ListingDescription />
          <FloorPlans />
          <NearbyAmenities />
          <PropertyHistory />
          <RelatedListings />
        </div>
        <div className="listing-detail-sidebar">
          <MortgageCalculator />
          <ContactAgentForm />
          <ScheduleTour />
          <ShareButtons />
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;