import { useState } from "react";
import "../css/StarRating.css";

function ReviewFormRatingComponent({ rating, setRating }) {
  const [hover, setHover] = useState(null);

  const handleClick = (currentIndex) => {
    setRating(currentIndex);
  };

  const handleMouseEnter = (currentIndex) => {
    setHover(currentIndex);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <span
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className={`review-star ${
              index <= (hover || rating) ? "active" : ""
            }`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default ReviewFormRatingComponent;
