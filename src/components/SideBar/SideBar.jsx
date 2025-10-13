import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setIsLoggedIn }) {
  const currentUser = useContext(CurrentUserContext); // Get user info
  const navigate = useNavigate();

  function handleSignOut() {
    removeToken(); // Remove JWT from storage
    setIsLoggedIn(false); // Update app state
    navigate("/"); // Redirect to homepage
  }

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
      ) : (
        <div className="sidebar__avatar-placeholder">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
      )}

      <p className="sidebar__username">{currentUser?.name}</p>
      <button onClick={handleSignOut} className="sidebar__signout">
        Sign out
      </button>
    </div>
  );
}

