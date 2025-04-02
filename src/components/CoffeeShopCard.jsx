import "../css/CoffeeShopCard.css";
import OpenStatusComponent from "./OpenStatusComponent";

function CoffeeShopCard({ coffeeShop }) {
  return (
    <div className="coffee-shop-card">
      <h2 className="coffee-shop-name left">{coffeeShop.name}</h2>
      {coffeeShop.rating ? (
        <div className="coffee-shop-info right">
          Rating: {coffeeShop.rating / 2} / 5
        </div>
      ) : (
        <div className="coffee-shop-info right">Rating: n/a</div>
      )}
      <div className="coffee-shop-info left">
        {coffeeShop.location.formatted_address}
      </div>

      <OpenStatusComponent hours={coffeeShop.hours} c_id={coffeeShop.fsq_id} />
    </div>
  );
}

export default CoffeeShopCard;
