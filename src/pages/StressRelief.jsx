import React from "react";
import Navbar from "../components/Navbar";
import "./StressRelief.css";
import { Link } from "react-router-dom";



function StressRelief() {
  const games = [
    { title: "🎈 Bubble Popper", path: "/bubble" },
    { title: "🧠 Memory Flip Game", path: "/memory" },
    { title: "🌬️ Breathing Exercise", path: "/breathing" },
    { title: "🎨 Color Therapy", path: "/color" },
    { title: "🎵 Sound Relaxer", path: "/sound" },
    { title: "📉 Stress Slider", path: "/stress-slider" },
    { title: "📔 Mood Journal", path: "/journal" },
  ];

  return (
    <div className="stress-container">
      <Navbar />
      <div className="stress-wrapper fade-in">
        <h1 className="stress-title">💆 Stress Relief Zone</h1>
        <p className="stress-subtitle">Select a calming activity</p>

        <div className="games-grid">
          {games.map((game, index) => (
            <Link to={game.path} key={index} className="game-card">
              {game.title}
            </Link>
          ))}
        </div>
      </div>

      <footer className="footer">
        © 2025 Onal Mudiyum — Stress Relief
                <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default StressRelief;
