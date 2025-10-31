// 📁 src/components/ItemCard/ItemCard.jsx
import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  // 🧠 Check if current user is the owner of this card
  const isOwn =
    (typeof item.owner === "string" ? item.owner : item.owner?._id) ===
    currentUser?._id;

  // 🧠 Check if current user already liked this item
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // 🧠 Build dynamic class for heart icon (outline vs solid)
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  // ❤️ Like/Unlike handler
  function handleLikeClick() {
    if (!isLoggedIn) return; // do nothing if not logged in
    onCardLike(item, isLiked); // pass item + liked state to App.jsx
  }

  return (
    <li className="card">
      {/* Card image */}
      <img
        src={item.link || item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)} // open modal on click
      />

      {/* Buttons container (top-right) */}
      <div className="card__container">
        {/* ❤️ Like Button */}
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label="Like item"
        ></button>

        {/* 🗑️ Optional delete button if user owns the card */}
        {isOwn && (
          <button
            type="button"
            className="card__delete-button"
            aria-label="Delete item"
            onClick={() => onCardClick(item)} // opens modal (then confirm delete)
          ></button>
        )}
      </div>

      {/* Item name overlay */}
      <h2 className="card__name">{item.name}</h2>
    </li>
  );
}

export default ItemCard;
