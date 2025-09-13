import React, { useState, useEffect } from 'react';
import GigCard from './GigCard';
import { getGigs } from '../api';
import './Dashboard.css';

const ClientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      const allGigs = await getGigs();
      setGigs(allGigs);
      setLoading(false);
    };
    fetchGigs();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Find the perfect freelance services for your business</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'browse' ? 'active' : ''}
          onClick={() => setActiveTab('browse')}
        >
          Browse Gigs
        </button>
        <button 
          className={activeTab === 'my-orders' ? 'active' : ''}
          onClick={() => setActiveTab('my-orders')}
        >
          My Orders
        </button>
        <button 
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'browse' && (
          <div className="browse-section">
            <div className="search-header">
              <div className="search-bar">
                <input type="text" placeholder="Search for services..." />
                <button className="btn btn-primary">Search</button>
              </div>
              
              <div className="categories">
                <span>Categories:</span>
                <button>All</button>
                <button>Web Development</button>
                <button>Design</button>
                <button>Writing</button>
                <button>Marketing</button>
              </div>
            </div>
            
            {loading ? (
                <p>Loading gigs...</p>
            ) : (
                <div className="gigs-grid">
                    {gigs.map(gig => (
                        <GigCard key={gig.id} gig={gig} isOwner={false} />
                    ))}
                </div>
            )}
          </div>
        )}
        
        {activeTab === 'my-orders' && (
          <div className="orders-section">
            <h3>Your Orders</h3>
            <p>You haven't placed any orders yet.</p>
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

export default ClientDashboard;