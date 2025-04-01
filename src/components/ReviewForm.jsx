import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { submitReview, updateReview } from "../services/backend_api";
import StarRating from "./ReviewFormRatingComponent";
import "../css/ReviewFormComponent.css";

function ReviewForm({
  user_id,
  shop_name,
  shop_id,
  setWritingReview,
  setEditingReview,
  currentReview,
  method,
}) {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuthContext();

  useEffect(() => {
    if (currentReview) {
      setRating(currentReview.rating);
      setReview(currentReview.review);
      setWouldRecommend(currentReview.recommend);
    }
  }, [currentReview]);

  const handleSubmit = async (e) => {
    setError(null);
    if (!rating || !review || wouldRecommend === null) {
      e.preventDefault();
      setError("Please fill out all fields");
      return;
    }

    if (method === "sumbit") {
      try {
        await submitReview(
          {
            rating: rating,
            review: review,
            recommend: wouldRecommend,
            user_id: user_id,
            shop_id: shop_id,
            shop_name: shop_name,
          },
          token
        );
        setWritingReview(false);
      } catch (error) {
        setError(error.message);
      }
    } else if (method === "update") {
      try {
        const resp = await updateReview(
          {
            rating: rating,
            review: review,
            recommend: wouldRecommend,
            user_id: user_id,
            shop_id: shop_id,
            shop_name: shop_name,
          },
          currentReview.id,
          token
        );
        setEditingReview(false);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <div>
          <div className="review-field">What do you think of {shop_name}</div>
          <StarRating rating={rating} setRating={setRating} name={shop_name} />
        </div>
        <div className="review-field">Write a review</div>
        <textarea
          className="review-input"
          placeholder="What should others know"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="recommend-field">
          <div className="review-field">Would you recommend this place?</div>
          <div className="recommend-options">
            <span
              role="button"
              onClick={() => setWouldRecommend(true)}
              className={`emoji-option ${
                wouldRecommend === true ? "selected" : ""
              }`}
            >
              &#128077;
            </span>
            <span
              role="button"
              onClick={() => setWouldRecommend(false)}
              className={`emoji-option ${
                wouldRecommend === false ? "selected" : ""
              }`}
            >
              &#128078;
            </span>
          </div>
        </div>

        <div className="review-button-container">
          <button type="submit" className="review-button">
            {currentReview ? "Update Review" : "Submit Review"}
          </button>
          {currentReview && (
            <button
              type="button"
              className="review-button cancel-button"
              onClick={() => {
                setEditingReview(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="error-container">
          <div className="error">{error}</div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
