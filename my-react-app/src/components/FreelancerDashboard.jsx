import React, { useState, useEffect } from 'react';
import GigCard from './GigCard';
import { getGigsByFreelancer } from '../api';
import './Dashboard.css';

const FreelancerDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('gigs');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      const freelancerGigs = await getGigsByFreelancer(user.id);
      setGigs(freelancerGigs);
      setLoading(false);
    };
    fetchGigs();
  }, [user.id]);

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
            
            {loading ? (
                <p>Loading your gigs...</p>
            ) : (
                <div className="gigs-grid">
                {gigs.map(gig => (
                    <GigCard key={gig.id} gig={gig} isOwner={true} />
                ))}
                </div>
            )}
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