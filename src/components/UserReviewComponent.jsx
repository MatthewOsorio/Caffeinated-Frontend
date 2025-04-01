import { useState, useEffect } from "react";
import { getReviewsByUserId } from "../services/backend_api";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

function UserReviewComponent({ userID }) {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorGettingReviews, setErrorGettingReviews] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  const getUserReviews = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const userReviews = await getReviewsByUserId(id);
      setReviews(userReviews);
    } catch (err) {
      setErrorGettingReviews(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserReviews(userID);
  }, []);

  return (
    <div className="user-review-container">
      <div className="user-reviews">
        {editingReview ? (
          <ReviewForm
            key={editingReview.id}
            user_id={userID}
            shop_name={editingReview.shop_name}
            shop_id={editingReview.shop_id}
            currentReview={editingReview}
            setEditingReview={setEditingReview}
            method={"update"}
          />
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id}>
              <div>{review.shop_name} Review: </div>
              <ReviewCard
                review={review}
                setEditingReview={setEditingReview}
                refreshReviews={getUserReviews}
                refreshID={userID}
              />
            </div>
          ))
        ) : (
          <div>Your reviews will be here</div>
        )}
      </div>
    </div>
  );
}

export default UserReviewComponent;
