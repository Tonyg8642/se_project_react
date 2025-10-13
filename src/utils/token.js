const TOKEN_KEY = "jwt";
// Defines a constant key name to store the token in localStorage.

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
// Saves the token to localStorage using the key "jwt".


export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
// Retrieves the stored token value from localStorage.


export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
// Deletes the token from localStorage when the user signs out.
