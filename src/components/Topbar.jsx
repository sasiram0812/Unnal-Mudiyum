// src/components/Topbar.jsx
import React from "react";
import "./Topbar.css";

function Topbar({ title = "" }) {
  return (
    <header className="app-topbar">
      <div className="left">
        <div className="page-title">{title}</div>
      </div>

      <div className="right">
        <input className="search" placeholder="Search..." />
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">✉️</button>
        <div className="profile-short">
          <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="p"/>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
