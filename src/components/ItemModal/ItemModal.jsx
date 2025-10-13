import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./ItemModal.css";
// Import the card’s CSS file for styling.

function ItemModal({ activeModal, card, onClose, onCardDelete, isOpen }) {
  const currentUser = useContext(CurrentUserContext);

 // const isLiked = card.likes.some((id) => id === currentUser?._id);

  // const itemLikeButtonClassName = `card__like-button ${
  //   isLiked ? "card__like-button_active" : ""
  // }`;

  // function handleLike() {
  //   onCardLike({ _id: item._id, isLiked });
  // }

  // function handleCardClick() {
  //   onCardClick(item);
  // }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
// Export the component so it can be used in Main.jsx.
