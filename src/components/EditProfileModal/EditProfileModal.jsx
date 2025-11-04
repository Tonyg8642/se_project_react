
import { useState, useEffect, useContext } from "react"; 
import CurrentUserContext from "../../contexts/CurrentUserContext"; 
// import "./EditProfileModal.css"; 

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
 
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");


  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || ""); 
      setAvatar(currentUser.avatar || ""); 
    }
  }, [currentUser, isOpen]);

 
  function handleSubmit(e) {
    e.preventDefault(); 
    
    onUpdateUser({ name, avatar });
  }

  
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      {}
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__title">Edit Profile</h2>

        {}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required
          minLength="2"
          maxLength="30"
        />

        {}
        <input
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)} 
          required
        />

        {}
        <button type="submit" className="modal__save-button">
          Save changes
        </button>

        {}
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        >
          ✕
        </button>
      </form>
    </div>
  );
}

export default EditProfileModal;


