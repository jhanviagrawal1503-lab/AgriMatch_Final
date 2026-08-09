const API_BASE_URL = "http://127.0.0.1:8000";

export async function loginUser(user_id, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      password,
    }),
  });

  return await response.json();
}

export async function registerUser(user_id, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      password,
    }),
  });

  return await response.json();
}

export async function getListings() {
  const response = await fetch(`${API_BASE_URL}/listings`);

  return await response.json();
}

export async function submitRating(user_id, listing_id, rating) {
  const response = await fetch(`${API_BASE_URL}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      listing_id,
      rating,
    }),
  });

  return await response.json();
}

export async function getRecommendations(user_id) {
  const response = await fetch(
    `${API_BASE_URL}/recommend/${user_id}`
  );

  return await response.json();
}