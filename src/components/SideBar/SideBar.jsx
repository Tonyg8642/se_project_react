// 📁 src/components/SideBar/SideBar.jsx
import React from "react";
import "./SideBar.css";

export default function Sidebar({ name, avatar, onEditProfileClick }) {
  return (
    <div className="sidebar">
      <img src={avatar} alt={`${name}'s avatar`} className="sidebar__avatar" />
      <p className="sidebar__name">{name}</p>
      <button
        type="button"
        className="sidebar__edit-button"
        onClick={onEditProfileClick}
      >
        Edit profile
      </button>
    </div>
  );
}
