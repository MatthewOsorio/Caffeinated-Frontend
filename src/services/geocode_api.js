  const API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
  const BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

  export const getLongitudeAndLatitude = async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        throw new Error("Could not find location...");
      }
      return data.results[0].geometry;
    } catch (error) {
      console.log("Geocode API Error", error);
      throw error;
    }
  };
