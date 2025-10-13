// 📁 src/utils/api.js

// ---------- Helper to handle server responses ----------
export function handleResponse(res) {
  // If the server response is OK (status 200–299), return the parsed JSON
  // Otherwise, reject the Promise with an error message
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// ---------- Base URL for backend API ----------
const baseUrl = "http://localhost:3001";
// ^ Change this to your deployed backend URL when in production (e.g., https://wtwr.onrender.com)

// ---------- Helper to get the stored JWT token ----------
function getToken() {
  return localStorage.getItem("jwt");
}

// ---------- Fetch all clothing items ----------
function getItems() {
  // GET /items — does not require login
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

// ---------- Delete a clothing item ----------
function deleteItem(itemId) {
  // DELETE /items/:itemId — requires token
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`, // include token for auth
    },
  }).then(handleResponse);
}

// ---------- Add a new clothing item ----------
function addItem({ name, imageUrl, weather }) {
  // POST /items — requires token
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // secure route
    },
    body: JSON.stringify({ name, imageUrl, weather }), // send item data
  }).then(handleResponse);
}

// ---------- Toggle like/unlike for a clothing item ----------
function changeLikeStatus(itemId, isLiked) {
  // PUT or DELETE /items/:itemId/likes — requires token
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: isLiked ? "DELETE" : "PUT", // if already liked → remove; otherwise → add
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(handleResponse);
}

// ✅ ---------- NEW FUNCTION: Edit user profile (Task 13) ----------
function editProfile({ name, avatar }) {
  // PATCH /users/me — update user info
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // logged-in user only
    },
    body: JSON.stringify({ name, avatar }), // send updated data
  }).then(handleResponse);
  // Returns updated user data (new name + avatar)
}

// ---------- Export all API functions ----------
export { getItems, deleteItem, addItem, changeLikeStatus, editProfile };

