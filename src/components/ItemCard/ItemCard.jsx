// 📁 src/components/ItemCard/ItemCard.jsx
import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, onCardDelete, isLoggedIn }) {
  // ---------- CONTEXT ----------
  const currentUser = useContext(CurrentUserContext);

  // ---------- CHECK IF ITEM IS LIKED ----------
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // ---------- CHECK IF ITEM BELONGS TO USER ----------
  const isOwn = item.owner === currentUser?._id;

  // ---------- CLASSNAMES ----------
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  // ---------- HANDLERS ----------
  function handleLikeClick() {
    if (!isLoggedIn) return; // do nothing if not logged in
    onCardLike(item, isLiked);
  }

  function handleCardClick() {
    onCardClick(item); // open preview modal
  }

  function handleDeleteClick() {
    onCardDelete(item); // 🟢 open confirm delete modal (Task 3)
  }

  // ---------- JSX ----------
  return (
    <li className="card">
      {/* Item name */}
      <h2 className="card__name">{item.name}</h2>

      {/* Item image */}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={`Clothing item: ${item.name}`}
      />

      {/* ---------- DELETE BUTTON (Task 3) ---------- */}
      {isOwn && (
        <button
          type="button"
          className="card__delete-button"
          onClick={handleDeleteClick}
          aria-label="Delete item"
        ></button>
      )}

      {/* ---------- LIKE BUTTON ---------- */}
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          type="button"
          aria-label="Like item"
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
