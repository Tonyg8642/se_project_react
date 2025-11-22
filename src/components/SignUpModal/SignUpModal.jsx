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

  // Optional avatar validation on blur
  function handleAvatarBlur() {
    if (values.avatar && !values.avatar.startsWith("http")) {
      // Optional: You can show a custom message
      console.warn("Avatar URL must start with http");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSignUp({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    });

    // ❌ remove resetForm() — reviewer said not to wipe user's input
    // resetForm();
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
      <input
        type="text"
        name="name"
        className="modal__input"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="avatar"
        className="modal__input"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
        onBlur={handleAvatarBlur}
        required
      />

      <input
        type="email"
        name="email"
        className="modal__input"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        className="modal__input"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
}

export default SignUpModal;
