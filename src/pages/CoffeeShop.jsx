import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoffeeShopById } from "../services/foursquare_api";
import MapComponent from "../components/MapComponent";
import CoffeeShopRatingComponent from "../components/CoffeeShopRatingComponent";
import PhotosComponent from "../components/PhotosComponent";
import InfoCardComponent from "../components/InfoCardComponent";
import HoursComponent from "../components/HoursComponent";
import AmenitiesComponent from "../components/AmenitiesComponent";
import CoffeeShopReviewsComponent from "../components/CoffeeShopReviewsComponent";
import "../css/CoffeeShop.css";

function CoffeeShop() {
  const { coffeeshopID } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coffeeShop, setCoffeeShop] = useState(
    location.state?.coffeeShop ?? null
  );

  useEffect(() => {
    const loadCoffeeShop = async () => {
      setError(null);

      if (loading) return;

      setLoading(true);

      try {
        const shop = await getCoffeeShopById(coffeeshopID);
        setCoffeeShop(shop);
      } catch (err) {
        setError("Could not find coffee shop :(");
      } finally {
        setLoading(false);
      }
    };

    if (!coffeeShop) {
      loadCoffeeShop();
    }
  }, [coffeeshopID]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!coffeeShop) return <h1>No coffee shop found.</h1>;

  return (
    <div className="coffee-page">
      <div className="coffee-page-header">
        <h1>{coffeeShop.name}</h1>
        <div>
          {coffeeShop.rating && <CoffeeShopRatingComponent rating={coffeeShop.rating / 2.0} />}
        </div>
        {coffeeShop.description && (
          <div className="description">{coffeeShop.description}</div>
        )}
      </div>
      <div></div>

      <div className="coffee-page-content">
        <h2>Photos</h2>
        <div className="page-content-top">
          <div>
            <PhotosComponent coffeeshop_id={coffeeShop.fsq_id} />
          </div>

          <InfoCardComponent coffeeShop={coffeeShop} />
        </div>

        <h2>Location and Hours</h2>
        <div className="page-content-middle">
          <MapComponent
            lat={coffeeShop.geocodes.main.latitude}
            lng={coffeeShop.geocodes.main.longitude}
          />

          {coffeeShop.hours.regular && (
            <HoursComponent hours={coffeeShop.hours.regular} />
          )}
        </div>

        
        {coffeeShop.features && coffeeShop.features.amenities && (
          <div>
            <h2>Amenities</h2>
            <AmenitiesComponent features={coffeeShop.features} />
          </div>
        )}

        <CoffeeShopReviewsComponent
          coffeeshop_name={coffeeShop.name}
          coffeeshop_id={coffeeShop.fsq_id}
        />
      </div>
    </div>
  );
}

export default CoffeeShop;
