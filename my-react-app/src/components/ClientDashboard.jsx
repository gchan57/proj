import React, { useState, useEffect, useCallback } from 'react';
import GigCard from './GigCard';
import { getGigs } from '../api';
import './Dashboard.css';

const ClientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for filtering
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Web Development', 'Design', 'Writing', 'Marketing', 'Development', 'Analytics'];

  const fetchGigs = useCallback(async () => {
    setLoading(true);
    const filteredGigs = await getGigs(activeCategory, searchTerm);
    setGigs(filteredGigs);
    setLoading(false);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGigs();
  };

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
              <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search for services..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
              </form>
              
              <div className="categories">
                <span>Categories:</span>
                {categories.map(category => (
                  <button 
                    key={category}
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {loading ? (
                <div className="loading-container"><p>Loading gigs...</p></div>
            ) : (
                <div className="gigs-grid">
                    {gigs.length > 0 ? (
                        gigs.map(gig => (
                            <GigCard key={gig.id} gig={gig} isOwner={false} />
                        ))
                    ) : (
                        <p>No gigs found matching your criteria.</p>
                    )}
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