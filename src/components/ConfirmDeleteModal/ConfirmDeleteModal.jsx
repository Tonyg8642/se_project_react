import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onClose, isOpen, handleDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete red-modal">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <p className="confirm__message">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button className="confirm__delete" onClick={handleDelete}>
          Yes, delete item
        </button>
        <button className="confirm__cancel">Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
