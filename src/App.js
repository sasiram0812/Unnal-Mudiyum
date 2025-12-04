import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Study from "./pages/Study";
import Fitness from "./pages/Fitness";
import Profile from "./pages/Profile";
import StressRelief from "./pages/StressRelief";
import AISuggestions from "./pages/AISuggestions";

import BubblePop from "./pages/games/BubblePop";
import MemoryGame from "./pages/games/MemoryGame";
import Breathing from "./pages/games/Breathing";
import ColorTherapy from "./pages/games/ColorTherapy";

import ProtectedRoute from "./components/ProtectedRoute";

import "./theme.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // KEEP USER LOGGED IN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <Router>
      <Routes>

        {/* HOME PAGE — If logged in → Dashboard */}
        <Route
          path="/"
          element={user ? <Home /> : <Home />}
        />

        {/* LOGIN PAGE — If logged in → Dashboard */}
        <Route
          path="/login"
          element={user ? <Home /> : <Login />}
        />

        {/* SIGNUP PAGE — If logged in → Dashboard */}
        <Route
          path="/signup"
          element={user ? <Home /> : <Signup />}
        />

        {/* PROTECTED PAGES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/study"
          element={
            <ProtectedRoute>
              <Study />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fitness"
          element={
            <ProtectedRoute>
              <Fitness />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stress-relief"
          element={
            <ProtectedRoute>
              <StressRelief />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AISuggestions />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC GAME PAGES */}
        <Route path="/bubble" element={<BubblePop />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/color" element={<ColorTherapy />} />

      </Routes>
    </Router>
  );
}

export default App;
