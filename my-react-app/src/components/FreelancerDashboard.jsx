import React, { useState, useEffect, useCallback } from 'react';
import GigCard from './GigCard';
import GigForm from './GigForm';
import { getGigsByFreelancer, deleteGig } from '../api';
import './Dashboard.css';

const FreelancerDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('gigs');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGig, setEditingGig] = useState(null);

  const fetchGigs = useCallback(async () => {
    setLoading(true);
    const freelancerGigs = await getGigsByFreelancer(user.id);
    setGigs(freelancerGigs);
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  const handleCreateNew = () => {
    setEditingGig(null);
    setIsModalOpen(true);
  };

  const handleEdit = (gig) => {
    setEditingGig(gig);
    setIsModalOpen(true);
  };

  const handleDelete = async (gigId) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      await deleteGig(gigId);
      fetchGigs(); // Refresh the list
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingGig(null);
  };

  const handleFormSuccess = () => {
    handleModalClose();
    fetchGigs(); // Refresh the gig list after success
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome back, {user.name}</h2>
          <p>Manage your services and find new opportunities</p>
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
                <button className="btn btn-primary" onClick={handleCreateNew}>Create New Gig</button>
              </div>
              
              {loading ? (
                  <div className="loading-container"><p>Loading your gigs...</p></div>
              ) : (
                  <div className="gigs-grid">
                  {gigs.length > 0 ? (
                    gigs.map(gig => (
                        <GigCard 
                          key={gig.id} 
                          gig={gig} 
                          isOwner={true} 
                          onEdit={() => handleEdit(gig)}
                          onDelete={() => handleDelete(gig.id)}
                        />
                    ))
                  ) : (
                    <p>You haven't created any gigs yet. Click "Create New Gig" to get started!</p>
                  )}
                  </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-section">
              <h3>Your Orders</h3>
              <p>You don't have any active orders.</p>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="messages-section">
              <h3>Messages</h3>
              <p>You have no new messages.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <GigForm 
          gig={editingGig} 
          user={user}
          onClose={handleModalClose} 
          onSuccess={handleFormSuccess} 
        />
      )}
    </>
  );
};

export default FreelancerDashboard;