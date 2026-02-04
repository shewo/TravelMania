import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Reviews.css';
import bgVideo from '../assets/bg-video2.mp4';

const Reviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all'); // all, highest, lowest
    const [showAddReview, setShowAddReview] = useState(false);
    
    // Form state for adding new review
    const [newReview, setNewReview] = useState({
        productName: '',
        rating: 5,
        title: '',
        comment: '',
        reviewerName: '',
        verified: false
    });

    // Sample reviews data (replace with API call)
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const sampleReviews = [
                {
                    id: 1,
                    productName: "Apex Mountain Tent",
                    rating: 5,
                    title: "Excellent tent for mountain climbing!",
                    comment: "Used this tent during my Himalayan expedition. It withstood harsh weather conditions and kept me warm and dry throughout. Highly recommended!",
                    reviewerName: "John D.",
                    date: "2026-01-15",
                    verified: true
                },
                {
                    id: 2,
                    productName: "Coral Explorer Kit",
                    rating: 4,
                    title: "Great for snorkeling",
                    comment: "Good quality snorkeling kit. The mask fits well and provides clear vision underwater. Only issue is the snorkel tube could be slightly longer.",
                    reviewerName: "Sarah M.",
                    date: "2026-01-20",
                    verified: true
                },
                {
                    id: 3,
                    productName: "Night Stalker Lens",
                    rating: 5,
                    title: "Perfect for wildlife photography",
                    comment: "Amazing binoculars! Crystal clear vision even in low light. Spotted so many animals during my safari trip. Worth every penny!",
                    reviewerName: "Mike R.",
                    date: "2026-01-25",
                    verified: false
                },
                {
                    id: 4,
                    productName: "Rugged Trek Pack",
                    rating: 3,
                    title: "Decent backpack, but heavy",
                    comment: "The backpack is well-made and has plenty of storage. However, it's quite heavy even when empty. Good for short trips but not ideal for long treks.",
                    reviewerName: "Emma L.",
                    date: "2026-01-28",
                    verified: true
                },
                {
                    id: 5,
                    productName: "Storm-Ready GPS",
                    rating: 5,
                    title: "Lifesaver in the wilderness",
                    comment: "This GPS device saved my group during a storm. Battery life is excellent, and the signal stays strong even in remote areas. Must-have for any adventurer!",
                    reviewerName: "David K.",
                    date: "2026-02-01",
                    verified: true
                }
            ];
            setReviews(sampleReviews);
            setLoading(false);
        }, 500);
    }, []);

    // Filter reviews
    const filteredReviews = [...reviews].sort((a, b) => {
        if (selectedFilter === 'highest') return b.rating - a.rating;
        if (selectedFilter === 'lowest') return a.rating - b.rating;
        return 0; // 'all' - no sorting by rating
    });

    // Handle form submission
    const handleSubmitReview = (e) => {
        e.preventDefault();
        const review = {
            id: reviews.length + 1,
            ...newReview,
            date: new Date().toISOString().split('T')[0],
        };
        setReviews([review, ...reviews]);
        setShowAddReview(false);
        setNewReview({
            productName: '',
            rating: 5,
            title: '',
            comment: '',
            reviewerName: '',
            verified: false
        });
    };

    // Render star rating
    const renderStars = (rating) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= rating ? 'star filled' : 'star'}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
    }));

    if (loading) {
        return (
            <div className="reviews-loading">
                <div className="loader"></div>
                <p>Loading Reviews...</p>
            </div>
        );
    }

    return (
        <div className="reviews-page">
            {/* Background Video */}
            <video autoPlay loop muted playsInline className="reviews-bg-video">
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Header */}
            <header className="reviews-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <h1 className="reviews-title">Customer Reviews</h1>
                <p className="reviews-subtitle">Real experiences from our adventure community</p>
            </header>

            {/* Summary Section */}
            <div className="reviews-summary">
                <div className="summary-card">
                    <div className="average-rating">
                        <span className="rating-number">{averageRating}</span>
                        {renderStars(Math.round(averageRating))}
                        <p className="rating-text">Based on {reviews.length} reviews</p>
                    </div>
                </div>

                <div className="summary-card rating-breakdown">
                    <h3>Rating Distribution</h3>
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="rating-bar-container">
                            <span className="rating-label">{rating} ★</span>
                            <div className="rating-bar">
                                <div 
                                    className="rating-bar-fill" 
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="rating-count">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions Bar */}
            <div className="reviews-actions">
                <button 
                    className="add-review-btn"
                    onClick={() => setShowAddReview(!showAddReview)}
                >
                    {showAddReview ? '✕ Cancel' : '+ Write a Review'}
                </button>
                
                <div className="filter-buttons">
                    <button 
                        className={selectedFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setSelectedFilter('all')}
                    >
                        All Reviews
                    </button>
                    <button 
                        className={selectedFilter === 'highest' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setSelectedFilter('highest')}
                    >
                        Highest Rated
                    </button>
                    <button 
                        className={selectedFilter === 'lowest' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setSelectedFilter('lowest')}
                    >
                        Lowest Rated
                    </button>
                </div>
            </div>

            {/* Add Review Form */}
            {showAddReview && (
                <div className="add-review-form">
                    <h2>Share Your Experience</h2>
                    <form onSubmit={handleSubmitReview}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={newReview.reviewerName}
                                onChange={(e) => setNewReview({...newReview, reviewerName: e.target.value})}
                                required
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                value={newReview.productName}
                                onChange={(e) => setNewReview({...newReview, productName: e.target.value})}
                                required
                                placeholder="Which product are you reviewing?"
                            />
                        </div>

                        <div className="form-group">
                            <label>Rating</label>
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={star <= newReview.rating ? 'star-input filled' : 'star-input'}
                                        onClick={() => setNewReview({...newReview, rating: star})}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Review Title</label>
                            <input
                                type="text"
                                value={newReview.title}
                                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                                required
                                placeholder="Sum up your experience"
                            />
                        </div>

                        <div className="form-group">
                            <label>Your Review</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                required
                                placeholder="Tell us about your experience with this product..."
                                rows="5"
                            />
                        </div>

                        <button type="submit" className="submit-review-btn">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* Reviews List */}
            <div className="reviews-list">
                {filteredReviews.length === 0 ? (
                    <div className="no-reviews">
                        <p>No reviews yet. Be the first to share your experience!</p>
                    </div>
                ) : (
                    filteredReviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">
                                        {review.reviewerName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="reviewer-name">
                                            {review.reviewerName}
                                            {review.verified && (
                                                <span className="verified-badge">✓ Verified Purchase</span>
                                            )}
                                        </h3>
                                        <p className="review-date">{new Date(review.date).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}</p>
                                    </div>
                                </div>
                                {renderStars(review.rating)}
                            </div>
                            
                            <div className="review-product">
                                <span>Product: {review.productName}</span>
                            </div>
                            
                            <h4 className="review-title">{review.title}</h4>
                            <p className="review-comment">{review.comment}</p>
                            
                            <div className="review-actions">
                                <button className="helpful-btn">👍 Helpful</button>
                                <button className="report-btn">⚠ Report</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;
