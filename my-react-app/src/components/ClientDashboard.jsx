import React, { useState, useEffect } from 'react';
import GigCard from './GigCard';
import { getGigs } from '../api';
import './Dashboard.css';

const ClientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Web Development', 'Design', 'Writing', 'Marketing'];

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      const allGigs = await getGigs();
      // In a real app, you would filter based on activeCategory here
      setGigs(allGigs);
      setLoading(false);
    };
    fetchGigs();
  }, [activeCategory]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Find the perfect freelance services for your business</p>
      </div>
      
      <div className="dashboard-tabs">
        {/* ... tabs remain the same */}
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'browse' && (
          <div className="browse-section">
            <div className="search-header">
              {/* ... search bar remains the same */}
              
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
            
            {/* ... gigs grid remains the same */}
          </div>
        )}
        
        {/* ... other tabs remain the same */}
      </div>
    </div>
  );
};

export default ClientDashboard;