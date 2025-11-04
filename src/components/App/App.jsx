// 📁 src/components/App/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ---------- Utilities ----------
import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  changeLikeStatus,
  editProfile,
} from "../../utils/api";
import { login, checkToken, register } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

// ---------- Components ----------
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import Profile from "../Profile/Profile";

// ---------- Contexts ----------
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  // ---------- STATE ----------
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temp: { F: 0, C: 0 },
    type: "",
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ---------- WEATHER ----------
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch(console.error);
  }, []);

  // ---------- FETCH CLOTHING ITEMS ----------
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);

  // ---------- TOKEN CHECK ----------
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  // ---------- MODAL CONTROLS ----------
  function handleAddItemClick() {
    setActiveModal("add-garment");
  }

  function handleEditProfileModal() {
    setActiveModal("edit-profile");
  }

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleSignUpClick() {
    setActiveModal("signup");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  // ---------- AUTH ----------
  function handleLogin({ email, password }) {
    login({ email, password })
      .then((data) => {
        setToken(data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleSignUp({ name, avatar, email, password }) {
    register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password })) // auto-login after sign up
      .catch(console.error);
  }

  function handleSignOut() {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
  }

  // ---------- ADD ITEM ----------
  function handleAddItem(itemData) {
    setIsLoading(true);
    addItem(itemData)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal(); // ✅ close only after success
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  // ---------- UPDATE PROFILE ----------
  function handleUpdateUser(updatedUserData) {
    editProfile(updatedUserData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal(); // ✅ close after success
      })
      .catch(console.error);
  }

  // ---------- DELETE ITEM ----------
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  }

  function handleCardDelete() {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  // ---------- LIKE ITEM ----------
  function handleCardLike(item, isLiked) {
    changeLikeStatus(item._id, isLiked)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === item._id ? updatedCard : c))
        );
      })
      .catch(console.error);
  }

  // ---------- CARD CLICK ----------
  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }
 console.log(activeModal)
  // ---------- RENDER ----------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <div className="App">
          <Header
            weatherData={weatherData}
            onAddItem={handleAddItemClick}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleSignUpClick}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            {/* ---------- MAIN PAGE ---------- */}
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            {/* ---------- PROFILE PAGE (PROTECTED) ---------- */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems.filter((item) => {
                      const ownerId =
                        typeof item.owner === "string"
                          ? item.owner
                          : item.owner?._id;
                      return ownerId === currentUser._id;
                    })}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onAddClick={handleAddItemClick}  // ✅ opens AddItemModal
                    onEditProfileClick={handleEditProfileModal}
                    onCardDelete={handleDeleteClick}
                    onSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn} // ✅ enables like buttons
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {/* ---------- MODALS ---------- */}
          {activeModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              onLogin={handleLogin}
              onSignUpClick={handleSignUpClick}
            />
          )}

          {activeModal === "signup" && (
            <SignUpModal
              onClose={handleCloseModal}
              onSignUp={handleSignUp}
              onLoginClick={handleLoginClick}
            />
          )}

          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={handleCloseModal}
              onAddItem={handleAddItem}
              isLoading={isLoading}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={handleCloseModal}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {activeModal === "confirm-delete" && (
            <ConfirmDeleteModal
              onClose={handleCloseModal}
              onConfirm={handleCardDelete}
            />
          )}

          {activeModal === "preview" && selectedCard && (
            <ItemModal
              card={selectedCard}
              onClose={handleCloseModal}
              onCardDelete={handleDeleteClick}
              isLoggedIn={isLoggedIn}
            />
          )}
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
