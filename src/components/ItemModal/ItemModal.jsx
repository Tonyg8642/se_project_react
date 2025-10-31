// 📁 src/components/ItemModal/ItemModal.jsx
import React, { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (!card) return null;

  // Handle both string and object owner IDs
  const ownerId =
    typeof card.owner === "string" ? card.owner : card.owner?._id;
  const isOwn = ownerId === currentUser?._id;

  return (
    <div className="modal modal_type_preview modal_opened">
      {/* Overlay click closes modal */}
      <div className="modal__overlay" onClick={onClose}></div>

      {/* Content */}
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        ></button>

        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />

        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>

        {/* Only show Delete if user owns the item */}
        {isOwn && (
          <div className="modal__footer">
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => onCardDelete(card)}
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
