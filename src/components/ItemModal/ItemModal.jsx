import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onCardDelete }) {
  // const handleDeleteClick = () => {
  // onCardDelete();
  // };
  console.log("==== CARD ====");
  // Return must be inside the function body
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      {/* Only use the modal_content_type_image style*/}
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        ></button>
        {card && (
          <>
            <img
              src={card.imageUrl || card.link}
              alt={card.name}
              className="modal__image"
            />
            <div className="modal__footer">
              <div className="modal__footer-row">
                <h2 className="modal__caption">{card.name}</h2>
                <button className="Modal__delete-button" onClick={onCardDelete}>
                  Delete
                </button>
              </div>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
