import "../css/CoffeeShopCard.css";
import OpenStatusComponent from "./OpenStatusComponent";

function CoffeeShopCard({ coffeeShop }) {
  return (
    <div className="coffee-shop-card">
      <div className="coffee-shop-card-left">
        <div className="coffee-shop-name">{coffeeShop.name}</div>
        <div className="coffee-shop-info">
          {coffeeShop.location.formatted_address}
        </div>
      </div>
      <div className="coffee-shop-card-right">
        {coffeeShop.rating ? (
          <div className="coffee-shop-info">
            Rating: {coffeeShop.rating / 2} / 5
          </div>
        ) : (
          <div className="coffee-shop-info">Rating: n/a</div>
        )}
        <OpenStatusComponent hours={coffeeShop.hours} c_id={coffeeShop.fsq_id}/>
      </div>
    </div>
  );
}

export default CoffeeShopCard;
