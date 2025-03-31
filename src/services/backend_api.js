const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const createUser = async (newUser) => {
  try {
    const url = `${BASE_URL}/user`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    if (response.status === 200) {
      throw new Error("User already exists");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const getUserById = async (userID) => {
  try {
    const url = `${BASE_URL}/user/${userID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const loginUser = async (user) => {
  try {
    const url = `${BASE_URL}/authentication`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const submitReview = async (review, token) => {
  try {
    const url = `${BASE_URL}/shop_reviews`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const updateReview = async (update, id, token) => {
  try {
    const url = `${BASE_URL}/shop_reviews/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(update),
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const deleteReview = async (id, token) => {
  try {
    const url = `${BASE_URL}/shop_reviews/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    return response;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const getCoffeeShopReviewsById = async (shop_id) => {
  try {
    const url = `${BASE_URL}/shop_reviews?shop_id=${shop_id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};

export const getReviewsByUserId = async (userID) => {
  try {
    const url = `${BASE_URL}/shop_reviews?user_id=${userID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `BACKEND API ERROR: ${response.statusText} (code ${response.status})`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error("BACKEND API ERROR: ", err);
    throw err;
  }
};
