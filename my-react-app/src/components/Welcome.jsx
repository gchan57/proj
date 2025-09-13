import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const [subtitle, setSubtitle] = useState('');
  const fullSubtitle = 'Find the perfect freelance services for your business';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullSubtitle.length) {
        setSubtitle(prev => prev + fullSubtitle.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust speed of typing here
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to GigHub</h1>
        <p className="subtitle">{subtitle}<span className="cursor">|</span></p>
      </header>
      
      <main className="welcome-content">
        <div className="welcome-hero">
          <h2>Connect with talented freelancers or find exciting projects</h2>
          
          <div className="welcome-options">
            <div className="option-card">
              <div className="card-icon">👥</div>
              <h3>I'm a Client</h3>
              <p>Looking to hire talented professionals for your next big project.</p>
              <Link to="/login?role=client" className="btn btn-primary">Hire Talent</Link>
            </div>
            
            <div className="option-card">
              <div className="card-icon">💼</div>
              <h3>I'm a Freelancer</h3>
              <p>Looking to offer your expert services and find exciting new work.</p>
              <Link to="/login?role=freelancer" className="btn btn-secondary">Offer Services</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;