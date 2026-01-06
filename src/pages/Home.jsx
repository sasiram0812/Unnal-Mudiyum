import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Loader from "../components/Loader";


function Home() {
  const [user, setUser] = useState(null);

  // Detect login state (fix refresh logout issue)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    // TODO page does not load DB now, so just wait 300ms
    await new Promise(r => setTimeout(r, 300));
    setLoading(false);
  };

  fetchData();
}, []);

if (loading) return <Loader />;



  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero fade-in">
        <div className="hero-left slide-left">
          <h1>Organize Your Student Life Smartly</h1>
          <p>
            Track your studies, fitness, tasks, and daily activities — all in one
            simple and clean dashboard.
          </p>

          <div className="hero-buttons">

            {/* If NOT logged in → show signup & login */}
            {!user && (
              <>
                <a href="/signup" className="primary-btn">Get Started</a>
                <a href="/login" className="secondary-btn">Login</a>
              </>
            )}

            {/* If logged in → show Go to Dashboard */}
            {user && (
              <a href="/dashboard" className="primary-btn">Go to Dashboard</a>
            )}
          </div>
        </div>

        <div className="hero-right pop">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-studying-illustration-svg-download-png-9967462.png"
            alt="Student Theme"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="section-title slide-up">Everything You Need</h2>

        <div className="features-grid">

          <div className="card feature-card pop">
            <h3>📚 Study Tracker</h3>
            <p>Track hours, subjects, progress and more.</p>
          </div>

          <div className="card feature-card pop">
            <h3>🏃 Fitness Tracker</h3>
            <p>Monitor steps, workouts, sleep & health.</p>
          </div>

          <div className="card feature-card pop">
            <h3>📝 To-Do Tasks</h3>
            <p>Create, complete, edit and plan your day.</p>
          </div>

          <div className="card feature-card pop">
            <h3>📊 Dashboard Insights</h3>
            <p>Beautiful analytics about your daily life.</p>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section fade-in">
        <h2>Why Choose Unnal Mudiyum?</h2>
        <p>
          Built specially for students who want to improve productivity and balance
          life. One platform for everything.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 Unnal Mudiyum — All Rights Reserved.
                <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default Home;
