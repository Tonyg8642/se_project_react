// 📁 src/components/ConfirmDeleteModal/ConfirmDeleteModal.jsx
import React from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onClose, onConfirm }) {
  return (
    <div className="modal modal_opened">
      {/* Overlay background */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* Modal content */}
      <div className="modal__content modal__content_type_confirm">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        ></button>

        <h2 className="modal__title">Are you sure you want to delete this?</h2>

        <div className="modal__buttons">
          <button
            type="button"
            className="modal__confirm-button"
            onClick={onConfirm}
          >
            Yes, delete
          </button>

          <button
            type="button"
            className="modal__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
