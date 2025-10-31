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
import { register, login, checkToken } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

// ---------- Components ----------
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUp";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import Profile from "../Profile/Profile";

// ---------- Contexts ----------
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// ---------- COMPONENT ----------
function App() {
  // ---------- STATE ----------
  const [weatherData, setWeatherData] = useState({
    temp: { F: 0, C: 0 },
    type: "",
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // ---------- NORMALIZE API RESPONSE ----------
  const unwrap = (res) => (res && res.data ? res.data : res);

  // ---------- WEATHER ----------
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  // ---------- FETCH ITEMS ----------
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Items fetch error:", err));
  }, []);

  // ---------- TOKEN CHECK ----------
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token invalid:", err);
        removeToken();
      });
  }, []);

  // ---------- AUTH ----------
  function handleSignUp({ name, avatar, email, password }) {
    register({ name, avatar, email, password })
      .then(() => login({ email, password }))
      .then((res) => {
        setToken(res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => console.error("Sign-up error:", err));
  }

  function handleLogin({ email, password }) {
    login({ email, password })
      .then((res) => {
        setToken(res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => console.error("Login error:", err));
  }

  function handleSignOut() {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
  }

  // ---------- ADD ITEM ----------
  function handleAddItem({ name, imageUrl, weather }) {
    addItem({ name, imageUrl, weather })
      .then((res) => {
        const newItem = unwrap(res);
        setClothingItems((prev) => [newItem, ...prev]);
        setActiveModal("");
      })
      .catch((err) => console.error("Add item error:", err));
  }

  // ---------- DELETE ITEM ----------
  function handleCardDelete() {
    if (!itemToDelete) return;
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((card) => card._id !== itemToDelete._id)
        );
        setItemToDelete(null);
        setIsConfirmDeleteOpen(false);
        setSelectedCard(null);
      })
      .catch((err) => console.error("Delete error:", err));
  }

  // ---------- LIKE / UNLIKE ----------
  function handleCardLike(item, isLiked) {
    changeLikeStatus(item._id, isLiked)
      .then((res) => {
        const updated = unwrap(res);
        setClothingItems((prev) =>
          prev.map((c) => (c._id === item._id ? updated : c))
        );
      })
      .catch((err) => console.error("Like error:", err));
  }

  // ---------- EDIT PROFILE ----------
  function handleEditProfile({ name, avatar }) {
    editProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal("");
      })
      .catch((err) => console.error("Profile update error:", err));
  }

  // ---------- MODAL HELPERS ----------
  const handleAddClick = () => setActiveModal("add-garment");
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("signup");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const handleCloseModal = () => {
    setActiveModal("");
    setIsConfirmDeleteOpen(false);
  };

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  // ---------- RENDER ----------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          {/* ---------- HEADER ---------- */}
          <Header
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            onSignOut={handleSignOut}
          />

          {/* ---------- ROUTES ---------- */}
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems.filter((i) => {
                      const ownerId =
                        typeof i.owner === "string" ? i.owner : i.owner?._id;
                      return ownerId === currentUser._id;
                    })}
                    currentUser={currentUser}
                    onEditProfileClick={handleEditProfileClick}
                    onAddClick={handleAddClick}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* ---------- FOOTER ---------- */}
          <Footer />

          {/* ---------- MODALS ---------- */}
          {activeModal === "login" && (
            <LoginModal onClose={handleCloseModal} onLogin={handleLogin} />
          )}

          {activeModal === "signup" && (
            <SignUpModal onClose={handleCloseModal} onSignUp={handleSignUp} />
          )}

          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={handleCloseModal}
              onAddItem={handleAddItem}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              onClose={handleCloseModal}
              onEditProfile={handleEditProfile}
              currentUser={currentUser}
            />
          )}

          {selectedCard && (
            <ItemModal
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
              onCardDelete={() => {
                setItemToDelete(selectedCard);
                setIsConfirmDeleteOpen(true);
              }}
            />
          )}

          {isConfirmDeleteOpen && (
            <ConfirmDeleteModal
              onClose={handleCloseModal}
              onConfirm={handleCardDelete}
            />
          )}
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
