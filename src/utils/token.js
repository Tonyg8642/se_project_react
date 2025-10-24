// 📁 src/utils/token.js

// ==========================
// JWT TOKEN MANAGEMENT UTILS
// ==========================

// Define a constant key name used for storing the JWT in localStorage.
// Having a single constant avoids typos and makes future changes easy.
const TOKEN_KEY = "jwt";

/**
 * Save the JWT token to localStorage.
 * @param {string} token - The JSON Web Token received after user login.
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Retrieve the stored JWT token from localStorage.
 * @returns {string|null} The stored token, or null if not found.
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove the JWT token from localStorage.
 * This is typically called when the user logs out.
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

