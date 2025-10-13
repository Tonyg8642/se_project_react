// 📁 src/components/App/App.jsx

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ---------- Utilities ----------
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  changeLikeStatus,
  editProfile,
} from "../../utils/api";
import { login, checkToken } from "../../utils/auth";

// ---------- Components ----------
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Profile from "../Profile/Profile";

// ---------- Contexts ----------
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  // ---------- STATE ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // ---------- TOGGLE TEMPERATURE UNIT ----------
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  // ---------- MODAL HANDLERS ----------
  function openLoginModal() {
    setActiveModal("login");
  }

  function openEditProfileModal() {
    setActiveModal("edit-profile");
  }

  function handleAddClick() {
    setActiveModal("add-item");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview-item");
  }

  function onCardDelete() {
    setActiveModal("confirm-delete");
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  // ---------- AUTH ----------
  function handleLogin({ email, password }) {
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeActiveModal();

        checkToken(data.token).then((userData) => setCurrentUser(userData));
      })
      .catch((err) => console.error("Login failed:", err));
  }

  // ---------- PROFILE UPDATE ----------
  function handleUpdateUser({ name, avatar }) {
    editProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Error updating profile:", err));
  }

  // ---------- LIKE / UNLIKE ----------
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

  // ---------- ADD ITEM ----------
  function handleAddItemSubmit({ name, imageUrl, weather }) {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Error adding item:", err));
  }

  // ---------- DELETE ITEM ----------
  function handleCardDelete() {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  }

  // ---------- FETCH WEATHER ----------
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  // ---------- FETCH ITEMS ----------
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.error("Item fetch error:", err));
  }, []);

  // ---------- TOKEN VALIDATION ----------
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

  // ---------- JSX ----------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <div className="page">
            <div className="page__content">
              <Header
                isLoggedIn={isLoggedIn}
                weatherData={weatherData}
                onLoginClick={openLoginModal}
                handleAddClick={handleAddClick}
                onEditProfileClick={openEditProfileModal}
              />

              <Routes>
                {/* Public Home */}
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

                {/* Protected Profile */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoutes isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        open={handleAddClick}
                        onEditProfileClick={openEditProfileModal}
                      />
                    </ProtectedRoutes>
                  }
                />
              </Routes>

              <Footer />
            </div>

            {/* ---------- MODALS ---------- */}
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
            />

            <AddItemModal
              isOpen={activeModal === "add-item"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemSubmit}
            />

            <ItemModal
              isOpen={activeModal === "preview-item"}
              card={selectedCard}
              onClose={closeActiveModal}
              onCardDelete={onCardDelete}
            />

            <ConfirmDeleteModal
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              handleDelete={handleCardDelete}
            />

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
