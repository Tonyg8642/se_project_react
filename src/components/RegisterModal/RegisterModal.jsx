// 📁 src/components/RegisterModal/RegisterModal.jsx

import { useState } from "react";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
  // ---------- STATE VARIABLES ----------
  // Controlled inputs for each form field
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------- HANDLE FORM SUBMISSION ----------
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page reload
    onRegister({ name, avatar, email, password }); // Sends data up to App.jsx

    // ✅ Optional: Clear the form after successful submission
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
  }

  // ---------- CONDITIONAL RENDER ----------
  // Only render modal when `isOpen` is true
  if (!isOpen) return null;

  // ---------- JSX ----------
  return (
    <div className="modal">
      {/* Background overlay (optional for dimming effect) */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* Modal content container */}
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Register</h2>

          {/* Name Input */}
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Avatar URL Input */}
          <input
            type="url"
            className="modal__input"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            className="modal__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            className="modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="modal__submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
