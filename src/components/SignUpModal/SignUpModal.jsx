import { useState } from "react";
import "./SignUpModal.css";

function SignUpModal({ onClose, onSignUp, onLoginClick, isOpen }) {
  if (!isOpen) return null;
  // ---------- STATE ----------
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false); // ✅ new: error state

  // ---------- VALIDATION HANDLER ----------
  function handleAvatarBlur() {
    // Basic URL validation (checks that it starts with http or https)
    if (!avatar.startsWith("http")) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  // ---------- FORM SUBMIT ----------
  function handleSubmit(e) {
    e.preventDefault();

    // Check avatar validity before submitting
    if (!avatar.startsWith("http")) {
      setIsError(true);
      return; // stop submission if invalid
    }

    setIsError(false);
    onSignUp({ name, avatar, email, password });

    // Optional: clear fields after submission
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
  }

  // ---------- JSX ----------
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      
      {/* Background overlay */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* Modal container */}
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        ></button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Sign Up</h2>

          {/* Email */}
          <label className="modal__label-email" htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            type="email"
            className="modal__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label className="modal__label-password" htmlFor="password">
            Password*
          </label>
          <input
            id="password"
            type="password"
            className="modal__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Name */}
          <label className="modal__label-name" htmlFor="name">
            Name*
          </label>
          <input
            id="name"
            type="text"
            className="modal__input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Avatar URL */}
          <label className="modal__label-avatarURL" htmlFor="avatar">
            Avatar URL*
          </label>
          <input
            id="avatar"
            type="url"
            className="modal__input"
            placeholder="Avatar URL"
            required
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            onBlur={handleAvatarBlur}
          />

          {/* Error message (optional) */}
          {isError && (
            <span className="modal__error-text">
              Please enter a valid image URL starting with http.
            </span>
          )}

          {/* Footer buttons */}
          <div className="modal__footer-row">
            <button type="submit" className="modal__button-SignUp">
              Sign Up
            </button>

            <button
              type="button"
              className="modal__button-orLogin"
              onClick={() => onLoginClick?.()} // ✅ Safe optional chaining
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
