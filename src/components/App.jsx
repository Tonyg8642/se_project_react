// 📁 src/components/App/App.jsx

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import authentication and API utilities
import { login, checkToken } from "../utils/auth";
import { getItems, changeLikeStatus, editProfile } from "../utils/api"; 
// ✅ Added `editProfile` — needed for Task 13 (update profile)

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import LoginModal from "./LoginModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal"; 
// ✅ Added the EditProfileModal import

import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./Profile/Profile";

import CurrentUserContext from "../contexts/CurrentUserContext";
import "./App.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  // ---------- STATE VARIABLES ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);   // tracks login state
  const [activeModal, setActiveModal] = useState("");    // tracks which modal is open
  const [clothingItems, setClothingItems] = useState([]); // stores clothing cards
  const [currentUser, setCurrentUser] = useState({});     // stores logged-in user info

  // ---------- MODAL HANDLERS ----------
  function openLoginModal() {
    setActiveModal("login"); // opens login modal
  }

  function openEditProfileModal() {
    setActiveModal("edit-profile"); // ✅ opens the Edit Profile modal
  }

  function closeActiveModal() {
    setActiveModal(""); // closes all modals
  }

  // ---------- AUTHENTICATION ----------
  function handleLogin({ email, password }) {
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token); // save token
        setIsLoggedIn(true); // update login state
        closeActiveModal(); // close modal

        // Fetch user data from token and set it in context
        checkToken(data.token).then((userData) => setCurrentUser(userData));
      })
      .catch((err) => console.error("Login failed:", err));
  }

  // ---------- LIKE / UNLIKE ITEMS ----------
  function handleCardLike(item, isLiked) {
    changeLikeStatus(item._id, isLiked)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((card) =>
            card._id === updatedItem._id ? updatedItem : card
          )
        );
      })
      .catch((err) => console.error("Error toggling like:", err));
  }

  // ---------- UPDATE PROFILE (Task 13) ----------
  function handleUpdateUser({ name, avatar }) {
    editProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // ✅ updates user context with new info
        closeActiveModal(); // closes modal after save
      })
      .catch((err) => console.error("Error updating profile:", err));
  }

  // ---------- CHECK TOKEN ON PAGE LOAD ----------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  // ---------- LOAD ITEMS ----------
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error loading items:", err));
  }, []);

  function handleToggleSwitchChange() {
    console.log('Toggle ')
  }

  const [CurrentTemperatureUnit, setCurrentTemperatureUnit] = useState("")

  // ---------- JSX STRUCTURE ----------
  return (
    // Makes currentUser available to all components
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={handleToggleSwitchChange, CurrentTemperatureUnit}>

      
      <BrowserRouter>
        <div className="app">
          <Header
            isLoggedIn={isLoggedIn}
            onLoginClick={openLoginModal}
            onEditProfileClick={openEditProfileModal} // ✅ hook to open edit modal
          />

          <Routes>
            {/* Public Main Page */}
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  isLoggedIn={isLoggedIn}
                  onCardLike={handleCardLike}
                />
              }
            />

            {/* Protected Profile Page */}
            <Route
              path="/profile"
              element={
                <ProtectedRoutes isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    onEditProfileClick={openEditProfileModal} // ✅ allow opening from profile
                  />
                </ProtectedRoutes>
              }
            />
          </Routes>

          <Footer />

          {/* ---------- MODALS ---------- */}
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />

          <AddItemModal
            isOpen={activeModal === "add-item"}
            onClose={closeActiveModal}
          />

          <ItemModal
            isOpen={activeModal === "preview-item"}
            onClose={closeActiveModal}
          />

          {/* ✅ Edit Profile Modal */}
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
