// ---------- IMPORTS ----------
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
import { login, checkToken, register } from "../../utils/auth"; // ✅ signup/login API helpers
import { setToken, getToken, removeToken } from "../../utils/token"; // ✅ localStorage token helpers

// ---------- Components ----------
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUp.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

// ---------- Contexts ----------
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // ---------- EFFECTS ----------
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Items fetch error:", err));
  }, []);

  // ---------- HANDLERS ----------

  // 🔹 Signup handler passed into SignUpModal
  function handleSignUp({ name, avatar, email, password }) {
    register({ name, avatar, email, password })
      .then((res) => {
        console.log("✅ Registration success:", res);
        setActiveModal(""); // close modal
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err);
      });
  }

  // 🔹 Login handler
  function handleLogin({ email, password }) {
    login({ email, password })
      .then((data) => {
        setToken(data.token);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => console.error("Login error:", err));
  }

  // 🔹 Modal openers
  function handleAddClick() {
    setActiveModal("add-garment");
  }
  function handleLoginClick() {
    setActiveModal("login");
  }
  function handleRegisterClick() {
    setActiveModal("signup");
  }
  function handleCloseModal() {
    setActiveModal("");
  }

  // 🔹 Temperature toggle
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  // ---------- RENDER ----------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={setSelectedCard}
                />
              }
            />
          </Routes>

          <Footer />

          {/* ---------- MODALS ---------- */}
          {activeModal === "login" && (
            <LoginModal onClose={handleCloseModal} onLogin={handleLogin} />
          )}

          {activeModal === "signup" && (
            <SignUpModal
              onClose={handleCloseModal}
              onSignUp={handleSignUp} // ✅ correctly passed here
            />
          )}

          {activeModal === "add-garment" && (
            <AddItemModal onClose={handleCloseModal} />
          )}

          {selectedCard && (
            <ItemModal
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
            />
          )}

          {isConfirmDeleteOpen && (
            <ConfirmDeleteModal onClose={handleCloseModal} />
          )}
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
