import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  // 🧠 Check if this card is owned by the logged-in user
  const isOwn =
    (typeof item.owner === "string" ? item.owner : item.owner?._id) ===
    currentUser?._id;

  // 🧠 Check if the logged-in user already liked this card
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // 🎨 Build dynamic heart icon class (filled or outline)
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  // ❤️ Handle like button click
  function handleLikeClick() {
    if (!isLoggedIn) return; // stop if user not logged in
    onCardLike(item, isLiked); // pass data back up to App.jsx
  }

  return (
    <li className="card">
      {/* 🖼️ Card image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)} // open modal when image clicked
      />

      {/* 🔘 Card text + like button */}
      <div className="card__container">
        <p className="card__name">{item.name}</p>

        {/* ❤️ Show heart button only if logged in */}
        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
