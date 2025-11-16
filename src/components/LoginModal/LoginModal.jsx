import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSignUpClick }) {
  if (!isOpen) return null;
  // ✅ useForm replaces useState for both fields
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return; // stop submission if form invalid

    onLogin({ email: values.email, password: values.password });
    resetForm(); // clears inputs after submit
  }

  return (
    <ModalWithForm
      title="Login"
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="modal__login_container"
      isValid={isValid}
      secondaryButtonText="or Sign Up" 
      onSecondaryClick={onSignUpClick}
    >
      <input
        type="email"
        name="email"
        className="modal__input"
        placeholder="Email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />
      <span className="modal__error">{errors.email}</span>

      <input
        type="password"
        name="password"
        className="modal__input"
        placeholder="Password"
        value={values.password || ""}
        onChange={handleChange}
        minLength="6"
        required
      />
      <span className="modal__error">{errors.password}</span>

      {/* ✅ Disable submit when invalid */}
      {/* <button
        type="submit"
        className={`modal__submit ${!isValid ? "modal__submit_disabled" : ""}`}
        disabled={!isValid}
      >
        Sign In
      </button> */}
    </ModalWithForm>
  );
}

export default LoginModal;
