// 📁 src/components/ModalWithForm/ModalWithForm.jsx
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  className = "",
  isValid = true,
  secondaryButtonText,
  onSecondaryClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      
      {/* 🔹 Overlay background for closing modal */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* 🔹 Modal content */}
      <div className={`modal__content ${className}`}>
        {/* Close (X) button */}
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        ></button>

        {/* Title */}
        <h2 className="modal__title">{title}</h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="modal__form">

          {/* Dynamic form fields passed as children */}
          {children}

          {/* Buttons */}
          <div className="modal__button-wrapper">
            {/* PRIMARY SUBMIT BUTTON */}
            <button
              type="submit"
              className={`modal__submit ${
                !isValid ? "modal__submit_disabled" : ""
              }`}
              disabled={!isValid}
            >
              {buttonText}
            </button>

            {/* SECONDARY BUTTON (optional) */}
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
