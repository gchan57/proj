import React, { useState } from 'react';
import { createGig, updateGig } from '../api';
import './GigForm.css';

const GigForm = ({ gig, user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: gig?.title || '',
    description: gig?.description || '',
    price: gig?.price || '',
    category: gig?.category || 'Web Development',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For price, ensure it's a number
    const processedValue = name === 'price' ? parseFloat(value) || '' : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (gig) {
        // Update existing gig
        await updateGig(gig.id, formData);
      } else {
        // Create new gig
        await createGig(formData, user.id);
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save gig:", error);
      alert("There was an error saving the gig.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{gig ? 'Edit Gig' : 'Create New Gig'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., I will design a modern minimalist logo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your service..."
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="5"
              placeholder="e.g., 100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Web Development</option>
              <option>Design</option>
              <option>Writing</option>
              <option>Marketing</option>
              <option>Development</option>
              <option>Analytics</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Gig'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GigForm;