import { useState } from "react";
import "./SignUpModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({ onClose, onSignUp, onLoginClick, isOpen }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  function handleAvatarBlur() {
    if (!avatar.startsWith("http")) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!avatar.startsWith("http")) {
      setIsError(true);
      return;
    }
    setIsError(false);
    onSignUp({ name, avatar, email, password });
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        onBlur={handleAvatarBlur}
        required
      />

      {/* Error message */}
      {isError && (
        <span className="modal__error-text">Please enter a valid URL.</span>
      )}

      {/* Footer row */}
      <div className="modal__footer-row">
        <button type="submit" className="modal__button-SignUp">
          Sign Up
        </button>
        <button
          type="button"
          className="modal__button-orLogin"
          onClick={onLoginClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default SignUpModal
