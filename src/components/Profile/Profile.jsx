// 📁 src/components/Profile/Profile.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({
  onCardClick,
  clothingItems,
  onEditProfileClick,
  onSignOut,
  onAddClick, // ✅ new prop to open AddItemModal
  isLoggedIn
}) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  function handleSignOut() {
    onSignOut();
    navigate("/"); // redirect to homepage
  }

  return (
    <div className="profile">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <Sidebar
        name={currentUser.name}
        avatar={currentUser.avatar}
        onEditProfileClick={onEditProfileClick}
      />

      {/* ---------- RIGHT SECTION ---------- */}
      <div className="profile__content">
        <button className="profile__signout-button" onClick={handleSignOut}>
          Sign out
        </button>

        {/* ✅ Pass onOpen handler to ClothesSection */}
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onOpen={onAddClick}
          onCardLike={onCardClick}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}
