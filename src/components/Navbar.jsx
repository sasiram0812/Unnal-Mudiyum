import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleLogout = () => {
    signOut(auth);
    window.location.href = "/login";
  };

  const linkClass = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="navbar slide-down">
      <div className="navbar-inner">

        {/* Logo */}
        <div className="logo">
          <Link to="/">Unnal Mudiyum</Link>
        </div>

        {/* Mobile Menu */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <div className={open ? "bar open" : "bar"}></div>
          <div className={open ? "bar open" : "bar"}></div>
          <div className={open ? "bar open" : "bar"}></div>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${open ? "show" : ""}`}>
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
          <Link className={linkClass("/todo")} to="/todo">To-Do</Link>
          <Link className={linkClass("/study")} to="/study">Study</Link>
          <Link className={linkClass("/fitness")} to="/fitness">Fitness</Link>
          <Link className={linkClass("/stress-relief")} to="/stress-relief">Stress Relief</Link>
          <Link className={linkClass("/profile")} to="/profile">Profile</Link>

          {/* If logged in → show email + logout */}
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link className="login-btn" to="/login">Login</Link>
          )}
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
