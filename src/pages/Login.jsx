import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ⭐ ADD THIS

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/dashboard");  // ⭐ Redirect after login
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-page fade-in">
      <Navbar />

      <div className="auth-container">
        <div className="auth-left slide-left">
          <h1 className="big-text">Welcome Back</h1>
          <p className="small-text">
            Login to access your Dashboard, Study Tracker, Fitness tools, and more.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-studying-illustration-svg-download-png-9967430.png"
            alt="login"
            className="auth-img"
          />
        </div>

        <div className="auth-box pop">
          <h2 className="auth-title">Login</h2>
          <p className="auth-sub">Welcome back to Onal Mudiyum</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className="auth-input"
              onChange={(e) => setEmail(e.target.value)}
            />

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

            {error && <p className="auth-error">{error}</p>}

            <button className="primary-btn auth-btn">Login</button>
          </form>

          <p className="switch-text">
            Don’t have an account? <a href="/signup">Signup</a>
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

export default Login;
