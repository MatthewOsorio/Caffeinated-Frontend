import '../css/ReviewStarRating.css'

function ReviewStarRating({rating}) {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={`review-rating ${index <= rating ? "active" : ""}`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default ReviewStarRating;
