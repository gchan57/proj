import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>GigHub</h1>
        <p>Find the perfect freelance services for your business</p>
      </div>
      
      <div className="welcome-content">
        <div className="welcome-hero">
          <h2>Welcome to GigHub</h2>
          <p>Connect with talented freelancers or find exciting projects</p>
          
          <div className="welcome-options">
            <div className="option-card">
              <h3>I'm a Client</h3>
              <p>Looking to hire talented professionals</p>
              <Link to="/login?role=client" className="btn btn-primary">Hire Talent</Link>
            </div>
            
            <div className="option-card">
              <h3>I'm a Freelancer</h3>
              <p>Looking to offer my services</p>
              <Link to="/login?role=freelancer" className="btn btn-secondary">Offer Services</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;