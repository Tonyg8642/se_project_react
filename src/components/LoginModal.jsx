// Import the useState Hook from React
import { useState } from "react";
// Import the reusable modal wrapper component
import ModalWithForm from "./ModalWithForm/ModalWithForm";

// Define the LoginModal component
function LoginModal({ isOpen, onClose, onLogin }) {
  // Create state variables for the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function that runs when the user submits the form
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    onLogin({ email, password }); // Pass user input to parent App for authentication
    setEmail(""); // Clear the email field after submission
    setPassword(""); // Clear the password field after submission
  }

  // If the modal isn’t open, render nothing
  if (!isOpen) return null;

  // Return the modal markup
  return (
    <ModalWithForm isOpen={isOpen}>
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__title">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </ModalWithForm>
  );
}

// Export this component so it can be imported into App.jsx
export default LoginModal;
