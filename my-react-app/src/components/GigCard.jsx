import React from 'react';
import { Link } from 'react-router-dom';
import './GigCard.css';

const GigCard = ({ gig, isOwner, onEdit, onDelete }) => {
  return (
    <div className="gig-card">
      <Link to={`/gig/${gig.id}`} className="gig-card-link">
        <div className="gig-image">
          <img src={`https://picsum.photos/300/200?random=${gig.id}`} alt={gig.title} />
        </div>
        
        <div className="gig-content">
          <div className="gig-header">
            <h3>{gig.title}</h3>
            <div className="gig-price">${gig.price}</div>
          </div>
          
          <p className="gig-description">{gig.description.substring(0, 100)}...</p>
          
          <div className="gig-footer">
            <span className="gig-category">{gig.category}</span>
            {!isOwner && gig.rating && (
              <div className="gig-rating">
                <span className="stars" role="img" aria-label="star">⭐</span>
                <span className="rating-number">{gig.rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {isOwner && (
        <div className="gig-actions">
          <button className="btn btn-small" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Edit</button>
          <button className="btn btn-small btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default GigCard;