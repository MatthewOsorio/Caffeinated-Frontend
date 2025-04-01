import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCoffeeShopReviewsById } from "../services/backend_api";
import ReviewCard from "./ReviewCard";
import ReviewFormComponent from "./ReviewForm";
import "../css/ReviewComponent.css";

function CoffeeShopReviewsComponent({ coffeeshop_name, coffeeshop_id }) {
  const { userID } = useAuthContext();
  const [writingReview, setWritingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (writingReview) {
      if (!userID) {
        setWritingReview(false);
        navigate("/login");
      }
    }
  }, [writingReview]);

  const getReviewsForCoffeeshop = async (coffeeshop_id) => {
    setError(null);
    try {
      const shopReviews = await getCoffeeShopReviewsById(coffeeshop_id);
      setReviews(shopReviews);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {

    getReviewsForCoffeeshop(coffeeshop_id);
  }, []);

  return (
    <div className="review-container">
      {error && <div>Could not get reviews</div>}
      <div className="review-header">
        <h2>Reviews</h2>
        {writingReview ? (
          <button
            className="review-button"
            onClick={() => setWritingReview(false)}
          >
            Go Back
          </button>
        ) : (
          <button
            className="review-button"
            onClick={() => setWritingReview(true)}
          >
            Write a Review
          </button>
        )}
      </div>

      <div className="review-content">
        {writingReview ? (
          <ReviewFormComponent
            user_id={userID}
            shop_name={coffeeshop_name}
            shop_id={coffeeshop_id}
            setWritingReview={setWritingReview}
            method={"sumbit"}
          />
        ) : editingReview ? (
          <ReviewFormComponent
            key={editingReview.id}
            user_id={userID}
            shop_name={editingReview.shop_name}
            currentReview={editingReview}
            setEditingReview={setEditingReview}
            method={"update"}
          />
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              setEditingReview={setEditingReview}
              refreshReviews={getReviewsForCoffeeshop}
              refreshID={coffeeshop_id}
            />
          ))
        ) : (
          <div>Be the first to write a review</div>
        )}
      </div>


    </div>
  );
}

export default CoffeeShopReviewsComponent;
