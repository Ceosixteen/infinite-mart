import React, { useState } from 'react';
import { Star, CheckCircle, MapPin, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/showcases';
import { CustomerReview } from '../types';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useStore();
  const [reviews, setReviews] = useState<CustomerReview[]>(REVIEWS);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [productTitle, setProductTitle] = useState('Lattafa Khamrah Eau De Parfum');
  const [commentText, setCommentText] = useState('');
  const [ratingVal, setRatingVal] = useState(5);

  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast('Thank you for your feedback! 👍');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev: CustomerReview = {
      id: Date.now().toString(),
      author: authorName.trim(),
      location: userLocation.trim() || 'Juba, South Sudan',
      rating: ratingVal,
      date: 'August 2026',
      title: 'Verified Customer Review',
      comment: commentText.trim(),
      verifiedPurchase: true,
      helpfulCount: 1,
      productTitle
    };

    setReviews([newRev, ...reviews]);
    setIsAddingReview(false);
    setAuthorName('');
    setCommentText('');
    showToast('Your review was posted successfully! ⭐');
  };

  return (
    <section id="reviews-section" className="bg-white border border-neutral-200/80 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">
              Verified Juba Customer Feedback
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            4.9 / 5.0 Average Rating across 1,200+ deliveries in Juba
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingReview(!isAddingReview)}
          className="bg-neutral-900 hover:bg-black text-yellow-400 font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Add Review Form */}
      {isAddingReview && (
        <form onSubmit={handleAddReview} className="bg-yellow-50/70 border border-yellow-300 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="text-xs font-bold text-neutral-900 uppercase">Share Your Experience</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Samuel Deng"
                className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Juba Neighborhood</label>
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                placeholder="e.g. Hai Cinema / Munuki"
                className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Product Purchased</label>
              <select
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Samsung Galaxy S25 Ultra 5G">Samsung Galaxy S25 Ultra 5G</option>
                <option value="Lattafa Khamrah Eau De Parfum">Lattafa Khamrah Eau De Parfum</option>
                <option value="MacBook Air M3 15-inch">MacBook Air M3 15-inch</option>
                <option value="Petrova Botanical Hair Oil">Petrova Botanical Hair Oil</option>
                <option value="PlayStation 5 Slim">PlayStation 5 Slim</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">Your Rating:</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingVal(star)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= ratingVal ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">Review Comments *</label>
            <textarea
              required
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tell other shoppers about product quality, scent longevity, or delivery speed..."
              className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsAddingReview(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 bg-neutral-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 shadow-xs"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-neutral-400 font-medium">{rev.date}</span>
              </div>

              <div className="text-xs font-bold text-neutral-900 leading-snug">
                "{rev.title}"
              </div>

              <p className="text-[11px] text-neutral-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px]">
              <div>
                <div className="font-bold text-neutral-900 flex items-center gap-1">
                  <span>{rev.author}</span>
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  <span>{rev.location}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleHelpful(rev.id)}
                className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 hover:text-neutral-900 bg-white border border-neutral-200 px-2 py-1 rounded-lg cursor-pointer transition-colors"
                title="Mark as helpful"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{rev.helpfulCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
