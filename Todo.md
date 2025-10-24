1. Login form. The log in form is supposed to make a post post request. Make sure that to pass
the email, and password to log the user in

✅ FILE: src/utils/auth.js

This file handles user authentication API requests to your backend.

// 📁 src/utils/auth.js
// Handles all authentication requests (register, login, token check)

export const BASE_URL = "http://localhost:3001"; // your backend server

// ---------- LOGIN ----------
export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // ✅ Pass the email and password in the request body
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)));
};

💡 Definition:

BASE_URL → points to your backend (Express app at port 3001).

fetch() → sends a POST request to /signin.

headers → tells the server we’re sending JSON.

body → stringified object containing { email, password }.

/signin for user authorization
method: "POST",
headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify({ email, password })

once successfully logged in, we should get a token.


2. The register form. The register form is supposed to make a post request to the sign up route.
The register form is responsible for creating a new user in the data base. Make sure to pass in values
'name, avatar, email, password "

/signup for user registration
method: "POST",
headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify({ name, avatar, email, password })


3. When successfully registering a user, we should get 201 created and we're also supposed to get an object
containing the user information.


Basically, all of these steps would send data from front end to back end.


1. updating the state varible when user logs in so it has name, avatar, email, and _id in the current user state varible.



----------------------------------------------------------------------------------------------------------------------------

1. Fix the handleAdditem submit for adding a new clothing item. In this case, most of it looks correct. Look at the data that the server sends back to me. Make sure that I'm updating the clothingitem state varible to include the new item.

2. ItemModal has to be implemented. It should show the item name, item weather, item image, and it should show a delete button if the item belongs to the current user whos logged in right now.

3. Implement the delete function. When the delete button is clicked, it should show a confirmation "do you want to delete this?". In this case, if user says yes, it needs to call the correct API function to delete the item. If the user clicks cancel, it should close the modal

4. Look into isLogged state for the item card. Is the logged state to the item card?

5. Once I do get the like button to display, see if it's working correctly. Working correctly means if it makes the right 
API call and updates the apperance correct.

6. It has to do both, if it's liked then it should appear as a soild heart, otherwise, it should appear as the outline.
