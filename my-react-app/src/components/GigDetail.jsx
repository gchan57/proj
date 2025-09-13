import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGigById } from '../api';
import './GigDetail.css';

const GigDetail = () => {
    const { id } = useParams();
    const [gig, setGig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGig = async () => {
            const gigData = await getGigById(id);
            setGig(gigData);
            setLoading(false);
        };
        fetchGig();
    }, [id]);

    if (loading) {
        return <div className="loading-container"><p>Loading gig details...</p></div>;
    }

    if (!gig) {
        return <div className="not-found-container"><p>Gig not found!</p></div>;
    }

    return (
        <div className="gig-detail-container">
            <div className="gig-detail-card">
                <div className="gig-detail-image">
                    <img src={`https://picsum.photos/800/400?random=${gig.id}`} alt={gig.title} />
                </div>
                <div className="gig-detail-content">
                    <h1 className="gig-detail-title">{gig.title}</h1>
                    <p className="gig-detail-category">{gig.category}</p>
                    <p className="gig-detail-description">{gig.description}</p>
                    <div className="gig-detail-footer">
                        <div className="gig-detail-price">${gig.price}</div>
                        <button className="btn btn-primary">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigDetail;