import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import "./Signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch {
      setError("Email already used or invalid");
    }
  };

  return (
    <div className="auth-page fade-in">
      <Navbar />

      <div className="auth-container">

        {/* Left Illustration */}
        <div className="auth-left slide-left">
          <h1 className="big-text">Create Account</h1>
          <p className="small-text">
            Join Onal Mudiyum and start tracking your productivity and wellness.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-studying-illustration-svg-download-png-9967430.png"
            alt="signup"
            className="auth-img"
          />
        </div>

        {/* Signup Box */}
        <div className="auth-box pop">

          <h2 className="auth-title">Signup</h2>
          <p className="auth-sub">Create your new student account</p>

          <form onSubmit={handleSignup}>

            <input
              type="email"
              placeholder="Email Address"
              className="auth-input"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="password-box">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="auth-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPass(!showPass)} className="pass-icon">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="password-box">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="auth-input"
                onChange={(e) => setConfirm(e.target.value)}
              />
              <span onClick={() => setShowConfirm(!showConfirm)} className="pass-icon">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="primary-btn auth-btn">Signup</button>
          </form>

          <p className="switch-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
            <footer className="footer">
        © 2025 Unnal Mudiyum — consistency
                <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default Signup;
