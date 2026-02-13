// 📁 src/utils/api.js

// ---------- Helper to handle server responses ----------
export function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// ---------- Base URL for backend API ----------
const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.wtwr12.mooo.com"
    : "http://localhost:3001";

// ---------- Helper to get the stored JWT token ----------
function getToken() {
  return localStorage.getItem("jwt");
}

// ---------- Fetch all clothing items ----------
function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

// ---------- Delete a clothing item ----------
function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(handleResponse);
}

// ---------- Add a new clothing item ----------
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleResponse);
}

// ---------- Toggle like/unlike for a clothing item ----------
function changeLikeStatus(itemId, isLiked) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    // pass the user so that it can be grabbed in backend:
  }).then(handleResponse);
}

// ---------- Edit user profile ----------
function editProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
}

// ---------- Export all API functions ----------
export { getItems, deleteItem, addItem, changeLikeStatus, editProfile };
