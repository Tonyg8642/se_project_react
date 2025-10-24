import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <ModalWithForm
      title="Login"
      buttonText="Sign In"
      isOpen={true} // ✅ makes the modal visible
      onClose={onClose} // ✅ passes down close function
      onSubmit={handleSubmit} // ✅ passes down submit handler
      className="modal__login_container"
    >
      <input
        type="email"
        className="modal__input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="modal__input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
