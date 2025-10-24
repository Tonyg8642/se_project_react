// 📁 src/utils/auth.js

// ---------- BASE URL ----------
// 🟡 Change this to your own backend (localhost or deployed link)
export const BASE_URL = "http://localhost:3001";

// ---------- HELPER FUNCTION ----------
function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// ---------- REGISTER ----------
export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
};

// ---------- LOGIN ----------
export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// ---------- TOKEN VALIDATION ----------
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ attaches token
    },
  }).then(handleResponse);
};
