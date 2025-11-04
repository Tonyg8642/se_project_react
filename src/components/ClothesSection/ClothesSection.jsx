// 📁 src/components/ClothesSection/ClothesSection.jsx
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, onOpen, onCardLike, isLoggedIn }) {
  return (
    <div className="clothes-section">
      <div className="clothesSection__title">
        <p className="Clothes__items">Your items</p>
        <button className="ClothesSection__add-new" onClick={onOpen}>
          + Add New
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}   // ✅ now included
            isLoggedIn={isLoggedIn}   // ✅ now included
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
