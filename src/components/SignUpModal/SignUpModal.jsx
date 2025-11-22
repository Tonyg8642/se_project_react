
import "./SignUpModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function SignUpModal({ onClose, onSignUp, onLoginClick, isOpen }) {
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: "",
    password: "",
    name:"",
    avatar:"",
  });

  // Validate avatar URL on blur
  function handleAvatarBlur() {
    if (!avatar.startsWith("http")) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    // Validate avatar URL before submitting
    // if (!avatar.startsWith("http")) {
    //   setIsError(true);
    //   return;
    // }

    // Clear error state
    // setIsError(false);

    // Pass data up to App.jsx
    onSignUp({email:values.email, password:values.password, name:values.name, avatar:values.avatar})
    resetForm();

    // ❌ Removed reset lines:
    // setName("");
    // setAvatar("");
    // setEmail("");
    // setPassword("");
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
      {/* NAME INPUT */}
      <input
        type="text"
        name="name"
        className="modal__input"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />

      {/* AVATAR INPUT */}
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

      {/* EMAIL INPUT */}
      <input
        type="email"
        name="email"
        className="modal__input"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />

      {/* PASSWORD INPUT */}
      <input
        type="password"
        name="password"
        className="modal__input"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />

      

      {/* ❌ Removed duplicate submit and secondary button block here */}
    </ModalWithForm>
  );
}

export default SignUpModal;
