// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";

function Sidebar({ active = "Home" }) {
  const links = [
    { name: "Home", to: "/" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "To-Dos", to: "/todo" },
    { name: "Study", to: "/study" },
    { name: "Fitness", to: "/fitness" },
    { name: "Stress", to: "/stress" },
    { name: "AI", to: "/ai" },
    { name: "Profile", to: "/profile" },
    { name: "Settings", to: "/settings" },
  ];

  return (
    <aside className="app-sidebar">
      <div className="brand">
        <div className="brand-logo">🔷</div>
        <div className="brand-text">
          <div className="brand-title">Onal Mudiyum</div>
          <div className="brand-sub">Student Life</div>
        </div>
      </div>

      <nav className="side-nav">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.to}
            className={`side-link ${active === l.name ? "active" : ""}`}
          >
            <span className="link-icon">●</span>
            <span className="link-text">{l.name}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-mini">
          <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="me" />
          <div>
            <div className="pm-name">Sasiram</div>
            <div className="pm-email">sasiram@example.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
