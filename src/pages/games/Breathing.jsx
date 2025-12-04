import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./Breathing.css";

function Breathing() {
  const [size, setSize] = useState(120);
  const [text, setText] = useState("Inhale…");

  useEffect(() => {
    const cycle = setInterval(() => {
      setText("Inhale…");
      setSize(180);

      setTimeout(() => {
        setText("Hold…");
        setSize(210);
      }, 3000);

      setTimeout(() => {
        setText("Exhale…");
        setSize(120);
      }, 5000);
    }, 8000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="game-container">
      <Navbar />
      <h1 className="game-title">🌬️ Breathing Exercise</h1>

      <div className="breath-circle" style={{ width: size, height: size }}></div>

      <h2 className="breath-text">{text}</h2>
    </div>
  );
}

export default Breathing;
