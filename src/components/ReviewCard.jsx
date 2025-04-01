import { useEffect, useState } from "react";
import { getUserById, deleteReview } from "../services/backend_api";
import ReviewStarRating from "./ReviewStarRating";
import "../css/ReviewCard.css";
import { useAuthContext } from "../contexts/AuthContext";

function ReviewCard({ review, setEditingReview, refreshReviews, refreshID }) {
  const [username, setUsername] = useState();
  const [error, setError] = useState(null);
  const { userID, token } = useAuthContext();
  const isOwner = userID == review.user_id;


  const onDelete = async (reviewID) =>{
    if (isOwner){
      try{
        await deleteReview(reviewID, token)
        refreshReviews(refreshID);
      } catch(err){
        setError(err) 
      }
    }
  }


  useEffect(() => {
    const getUsername = async (userID) => {
      try {
        const user = await getUserById(userID);
        setUsername(user.username);
      } catch (err) {
        setError(err.message);
      }
    };
    getUsername(review.user_id);
  }, []);

  


  return (
    <div className="review-card-container">
      <div className="review-card">
        {error ? <div>Username unavailible</div> : <div>{username}</div>}
        <ReviewStarRating rating={review.rating} />
        <div>{review.review}</div>
        {review.recommend ? (
          <div>Would Recommend &#128077;</div>
        ) : (
          <div>Would Not Recommend &#128078;</div>
        )}

        {isOwner && (
          <div className="review-button-container">
            <button className="review-button" onClick={() => setEditingReview(review)}>Edit</button>
            <button className="review-button" onClick={() => onDelete(review.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
