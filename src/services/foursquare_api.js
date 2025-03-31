const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;
const BASE_URL = "https://api.foursquare.com/v3/places";

export const getCoffeeShops = async (coordinates) => {
  try {
    const ll = coordinates.join(",");
    const url = `${BASE_URL}/search?query=coffee&ll=${encodeURIComponent(
      ll
    )}&fields=name%2Cdescription%2Cfsq_id%2Clocation%2Chours%2Cmenu%2Csocial_media%2Cwebsite%2Cgeocodes%2Ctel%2Cfeatures%2Crating&sort=RELEVANCE&limit=20`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("Response not OK: ", response.status, response.statusText);
      throw new Error(
        `API error: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Foursquare API Error: ", error);
    throw error;
  }
};

export const getCoffeeShopById = async (id) => {
  try {
    const url = `${BASE_URL}/${id}?fields=name%2Cdescription%2Cfsq_id%2Clocation%2Chours%2Ctel%2Cmenu%2Crating%2Csocial_media%2Cfeatures%2Cwebsite%2Cgeocodes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("Response not OK: ", response.status, response.statusText);
      throw new Error(
        `API error: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Foursquare API Error: ", error);
    throw error;
  }
};

export const getPhotosById = async (id) => {
  try {
    const url = `${BASE_URL}/${id}/photos`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      console.log("Response not OK: ", response.status, response.statusText);
      throw new Error(
        `API error: ${response.statusText} (code ${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Foursquare API Error: ", error);
    throw error;
  }
};
