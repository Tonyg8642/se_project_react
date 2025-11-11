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
  isLoggedIn,
  onCardLike
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
        handleSignOut={handleSignOut}
      />

      {/* ---------- RIGHT SECTION ---------- */}
      <div className="profile__content">
       

        {}
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onOpen={onAddClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}
