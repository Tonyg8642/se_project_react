import { useContext } from "react"; // To access current user info
import { useNavigate } from "react-router-dom";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({
  onCardClick,
  clothingItems,
  open,
  onSignOut, // ✅ Get sign-out handler from App
}) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext); // ✅ Access current user data

  // Filter to show only this user's items
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  // ✅ When the user clicks "Sign out"
  function handleSignOut() {
    onSignOut(); // Call the handler passed from App.jsx
    navigate("/"); // Redirect back to home page
  }

  return (
    <div className="profile">
      {}
      <Sidebar />

      {}
      <button className="profile__signout-button" onClick={handleSignOut}>
        Sign out
      </button>

      {}
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={userClothingItems}
        onOpen={open}
      />
    </div>
  );
}
