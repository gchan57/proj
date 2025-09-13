import React, { useState } from 'react';
import GigCard from './GigCard';
import './Dashboard.css';

const FreelancerDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('gigs');
  
  // Sample gig data
  const [gigs, setGigs] = useState([
    { id: 1, title: 'Website Development', price: 500, description: 'I will build a responsive website', category: 'Web Development' },
    { id: 2, title: 'Logo Design', price: 100, description: 'I will design a professional logo', category: 'Design' },
    { id: 3, title: 'Content Writing', price: 50, description: 'I will write SEO-friendly content', category: 'Writing' }
  ]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Manage your freelance services and find new opportunities</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'gigs' ? 'active' : ''}
          onClick={() => setActiveTab('gigs')}
        >
          My Gigs
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'gigs' && (
          <div className="gigs-section">
            <div className="section-header">
              <h3>Your Services</h3>
              <button className="btn btn-primary">Create New Gig</button>
            </div>
            
            <div className="gigs-grid">
              {gigs.map(gig => (
                <GigCard key={gig.id} gig={gig} isOwner={true} />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h3>Your Orders</h3>
            <p>You don't have any orders yet.</p>
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="messages-section">
            <h3>Messages</h3>
            <p>No new messages.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;