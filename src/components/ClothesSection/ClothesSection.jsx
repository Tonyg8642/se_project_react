import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick }) {
  const currentUser = useContext(CurrentUserContext); // ✅ Access current user info

  // ✅ Filter only the cards that belong to the logged-in user
  const userCards = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <section className="clothes-section">
      {/* Section title */}
      <h2 className="clothes-section__title">My Clothes</h2>

      {/* ✅ Display only the filtered cards */}
      <div className="clothes-section__cards">
        {userCards.map((card) => (
          <ItemCard key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </div>
    </section>
  );
}

export default ClothesSection;
