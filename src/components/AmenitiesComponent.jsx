import { useEffect, useState } from "react";
import check from "../assets/icons/check.png";
import "../css/FeaturesComponent.css";

function AmenitiesComponent({ features }) {
  const [amenities, setAmenities] = useState(null);

  const formatString = (entity) => {
    const words = entity.split("_");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  };

  useEffect(() => {
    if (features.amenities) {
      const currentAmenities = [];

      for (let i in features.amenities) {
        let amenity;
        if (i === "parking") {
          if (features.amenities.parking.parking) {
            amenity = i;
          }
        } else if (i === "wifi") {
          if (features.amenities.wifi === "t") {
            amenity = i;
          }
        } else {
          if (features.amenities[i]) {
            amenity = i;
          }
        }

        if (amenity) {
          currentAmenities.push(formatString(amenity));
        }
      }

      setAmenities(currentAmenities);
    }
  }, []);

  return (
    <div className="amenities">
      {amenities ? (
        amenities.map((item, index) => (
          <div className="amenity" key={index}>
            <div>{item}</div>
            <img src={check} alt="checkmark" className="checkmark" />
          </div>
        ))
      ) : (
        <div className="amentity">No Information Availible</div>
      )}
    </div>
  );
}

export default AmenitiesComponent;
