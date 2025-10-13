
import { useState } from "react"; 
import "./RegisterModal.css"; 

function RegisterModal({ isOpen, onClose, onRegister }) {
  // ---------- STATE VARIABLES ----------
  // These store user input from each form field
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------- HANDLE FORM SUBMISSION ----------
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page reload on form submission
    onRegister({ name, avatar, email, password }); // Sends user data to parent (App)
    // Reset input fields after submission
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
  }

  // ---------- CONDITIONAL RENDERING ----------
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // ---------- JSX STRUCTURE ----------
  return (
    <div className="modal">
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__title">Register</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Avatar Input */}
        <input
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Buttons */}
        <button type="submit" className="modal__submit-button">
          Sign Up
        </button>
        <button type="button" className="modal__close-button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}

export default RegisterModal;
