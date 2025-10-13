// 📁 src/components/ItemCard/ItemCard.jsx
import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  // Access logged-in user's data from context
  const currentUser = useContext(CurrentUserContext);

  // Check if this card is liked by the logged-in user
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Apply a CSS class if the item is liked
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  // Handle clicking the like button
  function handleLikeClick() {
    if (!isLoggedIn) return; // do nothing if the user isn't logged in
    onCardLike(item, isLiked); // tell parent (App) to toggle like
  }

  // Handle clicking the image — opens item preview modal
  function handleCardClick() {
    onCardClick(item);
  }

  return (
    <li className="card">
      {/* Item name */}
      <h2 className="card__name">{item.name}</h2>

      {/* Item image */}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link || item.imageUrl} // uses link or imageUrl
        alt={`Clothing item: ${item.name}`}
      />

      {/* Like button (only visible when logged in) */}
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          type="button"
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
