import { useState } from "react";
import "./SignUp.css";

function SignUpModal({ onClose, onSignUp }) {
  // ---------- STATE VARIABLES ----------
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------- HANDLE SUBMIT ----------
  function handleSubmit(e) {
    e.preventDefault();
    if (onSignUp) {
      onSignUp({ name, avatar, email, password });
    }
  }

  // ---------- JSX ----------
  return (
    <div className="modal modal_opened">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <h2 className="modal__title">Sign Up</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name*
            <input
              type="text"
              className="modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Avatar URL*
            <input
              type="url"
              className="modal__input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Email*
            <input
              type="email"
              className="modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Password*
            <input
              type="password"
              className="modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="modal__submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
