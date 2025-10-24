import React, { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ selectedCard, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard?.owner === currentUser?._id;

  if (!selectedCard) return null;

  return (
    <div className="modal modal_type_preview modal_opened">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        ></button>

        <img
          src={selectedCard.imageUrl || selectedCard.link}
          alt={selectedCard.name}
          className="modal__image"
        />

        <h2 className="modal__caption">{selectedCard.name}</h2>
        <p className="modal__weather">Weather: {selectedCard.weather}</p>

        {isOwn && (
          <div className="modal__footer">
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => onDelete(selectedCard)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
