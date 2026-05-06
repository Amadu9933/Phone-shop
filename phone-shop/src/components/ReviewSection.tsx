import { useState, useEffect } from 'react';
import type { Review } from '../data/types';
import { storage } from '../utils/storage';
import { useNotification } from '../context';
import { Pagination } from './Pagination';

interface ReviewSectionProps {
    productId: string;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
    const { addNotification } = useNotification();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', customerName: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    useEffect(() => {
        const productReviews = storage.getReviewsByProduct(productId);
        setReviews(productReviews);
    }, [productId]);

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.comment.trim() || !newReview.customerName.trim()) {
            addNotification('Please fill in all fields', 'error');
            return;
        }

        const review: Review = {
            id: Date.now().toString(),
            productId,
            rating: newReview.rating,
            comment: newReview.comment,
            customerName: newReview.customerName,
            createdAt: new Date().toISOString(),
        };

        storage.saveReview(review);
        setReviews([...reviews, review]);
        setNewReview({ rating: 5, comment: '', customerName: '' });
        addNotification('Review submitted!', 'success');
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const paginatedReviews = reviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <h2 style={{ color: '#0D0C14', marginBottom: '20px' }}>Customer Reviews</h2>

            {/* Average Rating */}
            <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0D0C14' }}>
                        {averageRating.toFixed(1)} ★
                    </div>
                    <span style={{ color: '#7A728F' }}>
                        ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                    </span>
                </div>
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleSubmitReview} style={{
                background: '#F8F9FA',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px',
            }}>
                <h3 style={{ color: '#0D0C14', marginBottom: '16px' }}>Write a Review</h3>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        value={newReview.customerName}
                        onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '4px',
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                        Rating
                    </label>
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        style={{
                            padding: '8px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '4px',
                        }}
                    >
                        {[5, 4, 3, 2, 1].map(r => (
                            <option key={r} value={r}>{r} ★</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                        Comment
                    </label>
                    <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '4px',
                            resize: 'vertical',
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        background: '#3ECF8E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Submit Review
                </button>
            </form>

            {/* Reviews List */}
            <div>
                {paginatedReviews.length === 0 ? (
                    <p style={{ color: '#7A728F', textAlign: 'center' }}>No reviews yet. Be the first to review!</p>
                ) : (
                    <>
                        {paginatedReviews.map((review) => (
                            <div
                                key={review.id}
                                style={{
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    marginBottom: '16px',
                                    background: 'white',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong style={{ color: '#0D0C14' }}>{review.customerName}</strong>
                                    <span style={{ color: '#E8B84B' }}>
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </span>
                                </div>
                                <p style={{ color: '#7A728F', margin: '8px 0' }}>{review.comment}</p>
                                <small style={{ color: '#999' }}>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                        ))}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}