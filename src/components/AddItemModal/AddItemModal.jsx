import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItem, onClose, isLoading }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // ✅ Reset fields when modal opens (not on submit)
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    // ❌ Don’t clear here; wait for success in App.jsx
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Select the weather type
        <div className="modal__temp-selections">
          <label>
            <input
              type="radio"
              name="weather"
              value="hot"
              checked={weather === "hot"}
              onChange={(e) => setWeather(e.target.value)}
              required
            />
            Hot
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={weather === "warm"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Warm
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={weather === "cold"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Cold
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
