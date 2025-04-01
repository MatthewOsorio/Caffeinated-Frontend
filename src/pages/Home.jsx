import { useState, useEffect } from "react";
import { getLongitudeAndLatitude } from "../services/geocode_api";
import { getCoffeeShops } from "../services/foursquare_api";
import CoffeeShopCard from "../components/CoffeeShopCard";
import { Link } from "react-router-dom";

import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [foundCoordinates, setFoundCoordinates] = useState(false);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    if (!searchQuery.trim()) return;

    setFoundCoordinates(false);
    setCoordinates([]);
    setCoffeeShops([]);

    try {
      const { lat, lng } = await getLongitudeAndLatitude(searchQuery);
      setCoordinates([lat, lng]);
      setFoundCoordinates(true);
    } catch (err) {
      setFoundCoordinates(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadCoffeeShops = async () => {
      setError(null);

      if (!foundCoordinates) return;
      if (loading) return;

      setLoading(true);

      try {
        const newCoffeShops = await getCoffeeShops(coordinates);
        setCoffeeShops(newCoffeShops);
      } catch (err) {
        setError("Failed to find coffee shops :(");
      } finally {
        setLoading(false);
      }
    };

    loadCoffeeShops();
  }, [foundCoordinates, coordinates]);

  return (
    <div className="home">
      <p>Find Coffee Shops in Your City</p>
      <form onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="City, State"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
      </form>

      {error ? (
        <div className="error">{error}</div>
      ) : loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="coffee-shop-grid">
          {coffeeShops.map((coffeeShop) => (
            <Link
              key={coffeeShop.fsq_id}
              to={`/coffeeshop/${coffeeShop.fsq_id}`}
              state={{ coffeeShop }}
            >
              <CoffeeShopCard coffeeShop={coffeeShop} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
