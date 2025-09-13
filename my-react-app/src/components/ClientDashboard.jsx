import React, { useState } from 'react';
import GigCard from './GigCard';
import './Dashboard.css';

const ClientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('browse');
  
  // Sample gig data
  const [gigs, setGigs] = useState([
    { id: 1, title: 'Website Development', price: 500, description: 'I will build a responsive website', category: 'Web Development', rating: 4.8 },
    { id: 2, title: 'Logo Design', price: 100, description: 'I will design a professional logo', category: 'Design', rating: 4.5 },
    { id: 3, title: 'Content Writing', price: 50, description: 'I will write SEO-friendly content', category: 'Writing', rating: 4.7 },
    { id: 4, title: 'Social Media Management', price: 300, description: 'I will manage your social media accounts', category: 'Marketing', rating: 4.9 },
    { id: 5, title: 'Mobile App Development', price: 1000, description: 'I will develop a cross-platform mobile app', category: 'Development', rating: 4.6 },
    { id: 6, title: 'Data Analysis', price: 250, description: 'I will analyze your business data', category: 'Analytics', rating: 4.4 }
  ]);

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
            
            <div className="gigs-grid">
              {gigs.map(gig => (
                <GigCard key={gig.id} gig={gig} isOwner={false} />
              ))}
            </div>
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