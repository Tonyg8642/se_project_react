import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import "./nav.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData = {}, isLoggedIn, onLoginClick }) {
  const currentUser = useContext(CurrentUserContext); // Access user info from context

  // If no avatar, show first letter of name
  const placeholder = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

  // Show today’s date and city
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" alt="What to Wear" src={logo} />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <nav className="nav">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-button"
            >
              + Add clothes
            </button>

            {/* Shows logged-in user's info */}
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {placeholder}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button onClick={onLoginClick} className="header__login">
              Login
            </button>
            <button className="header__register">Register</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
