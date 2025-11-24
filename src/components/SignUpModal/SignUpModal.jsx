import "./SignUpModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function SignUpModal({ onClose, onSignUp, onLoginClick, isOpen }) {
  const { values, handleChange, errors, isValid } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="or Log In"
      onSecondaryClick={onLoginClick}
      className="modal__signup-container"
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error">{errors.name}</span>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error">{errors.avatar}</span>

      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error">{errors.email}</span>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error">{errors.password}</span>
    </ModalWithForm>
  );
}

export default SignUpModal;
