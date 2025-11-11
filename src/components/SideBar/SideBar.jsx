// 📁 src/components/SideBar/SideBar.jsx
import React from "react";
import "./SideBar.css";

export default function Sidebar({
  name,
  avatar,
  onEditProfileClick,
  handleSignOut,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__user-data">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="sidebar__user-avatar"
        />
        <p className="sidebar__name">{name}</p>
      </div>

      <div className="sidebar__buttons">
        <button
          type="button"
          className="sidebar__edit-button"
          onClick={onEditProfileClick}
        >
          Change Profile Data
        </button>
        <button className="sidebar__signout-button" onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}
