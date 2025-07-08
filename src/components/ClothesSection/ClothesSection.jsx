import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, onOpen }) {
  return (
    <div className="clothes-section">
      <div className="clothesSection__title">
        <p className="Clothes__items">Your items</p>
        <button className="ClothesSection__add-new" onClick={onOpen}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
