import { getPhotosById } from "../services/foursquare_api";
import { useState, useEffect, useRef } from "react";
import "../css/PhotosComponent.css";

function PhotosComponent({ coffeeshop_id }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const photoRef = useRef();
  const firstPhotoRef = useRef();

  const handleScroll = (direction) => {
    if (photoRef.current) {
      photoRef.current.scrollLeft += direction === "L" ? -250 : 250;
    }
  };

  useEffect(() => {
    const loadPhotos = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const shopPhotos = await getPhotosById(coffeeshop_id);
        setPhotos(shopPhotos);
      } catch (err) {
        console.error("An error has occurred getting photos:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [coffeeshop_id]);

  useEffect(() => {
    if (photos.length > 0 && photoRef.current) {
      photoRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [photos]);
  return (
    <div className="coffee-photos">
      {photos.length > 0 ? (
        <>
          <button className="scroll-button" onClick={() => handleScroll("L")}>
            &#129168;
          </button>
          <div className="photos-container" ref={photoRef}>
            {photos.map((photo, index) => (
              <img
                src={`${photo.prefix}250x250${photo.suffix}`}
                alt={`Image ${index + 1}`}
                className="photo"
                key={index}
                ref={index === 0 ? firstPhotoRef : null}
              />
            ))}
          </div>
          <button className="scroll-button" onClick={() => handleScroll("R")}>
            &#129170;
          </button>
        </>
      ): (<div className="photos-container unavailable">No photos available</div>)}
    </div>
  );
}

export default PhotosComponent;
