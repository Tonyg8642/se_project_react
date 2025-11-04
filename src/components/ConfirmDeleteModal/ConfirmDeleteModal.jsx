import React from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onClose, onConfirm }) {
  return (
    <div className="confirm">
      {/* Confirm box container */}
      <div className="confirm__container">
        {/* Close (X) button */}
        <button
          type="button"
          className="confirm__close"
          onClick={onClose}
          aria-label="Close"
        ></button>

        {/* Title */}
        <h2 className="confirm__message">
          Are you sure you want to delete this?
        </h2>

        {/* Action buttons */}
        <div className="confirm__buttons">
          <button type="button" className="confirm__delete" onClick={onConfirm}>
            Yes, delete
          </button>

          <button type="button" className="confirm__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
