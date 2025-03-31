import "../css/Rating.css";

function CoffeeShopRatingComponent({ rating }) {
  return (
      <div className="star-grid">
        {[...Array(Math.round(rating))].map((_, i) => (
          <div className="star" key={i}>
            &#9733;
          </div>
        ))}
        <div className="sub-rating">({rating})</div>
      </div>
  );
}

export default CoffeeShopRatingComponent;
