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
  onEditProfileClick, // ✅ to open EditProfileModal
  onSignOut, // ✅ from App.jsx
}) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  // ✅ Filter to show only this user's cards
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  // ✅ Handle sign-out
  function handleSignOut() {
    onSignOut();
    navigate("/"); // redirect to home
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

        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={userClothingItems}
        />
      </div>
    </div>
  );
}
