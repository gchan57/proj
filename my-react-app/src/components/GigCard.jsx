import React from 'react';
import './GigCard.css';

const GigCard = ({ gig, isOwner }) => {
  return (
    <div className="gig-card">
      <div className="gig-image">
        <img src={`https://picsum.photos/300/200?random=${gig.id}`} alt={gig.title} />
      </div>
      
      <div className="gig-content">
        <div className="gig-header">
          <h3>{gig.title}</h3>
          <div className="gig-price">${gig.price}</div>
        </div>
        
        <p className="gig-description">{gig.description}</p>
        
        <div className="gig-footer">
          <span className="gig-category">{gig.category}</span>
          
          {!isOwner && gig.rating && (
            <div className="gig-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-number">{gig.rating}</span>
            </div>
          )}
          
          {isOwner ? (
            <div className="gig-actions">
              <button className="btn btn-small">Edit</button>
              <button className="btn btn-small btn-danger">Delete</button>
            </div>
          ) : (
            <button className="btn btn-primary">Order Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigCard;