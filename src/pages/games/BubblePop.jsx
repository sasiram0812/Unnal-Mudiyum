import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./BubblePop.css";

function BubblePop() {
  const [score, setScore] = useState(0);

  const pop = (e) => {
    e.target.classList.add("burst");
    setScore(score + 1);
    setTimeout(() => e.target.remove(), 200);
  };

  const spawn = () => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 90 + "%";
    bubble.onclick = pop;
    document.getElementById("bubble-area").appendChild(bubble);

    setTimeout(() => bubble.remove(), 3000);
  };

  useEffect(() => {
    const interval = setInterval(spawn, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game-container">
      <Navbar />
      <h1 className="game-title">🎈 Bubble Popper</h1>

      <div id="bubble-area" className="bubble-area"></div>

      <h2 className="bubble-score">Score: {score}</h2>
    </div>
  );
}

export default BubblePop;
