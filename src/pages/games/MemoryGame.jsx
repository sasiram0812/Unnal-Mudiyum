import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./MemoryGame.css";

function MemoryGame() {
  const emojis = ["🍎","🍎","⭐","⭐","🎈","🎈","🌙","🌙"];
  const shuffled = [...emojis].sort(() => Math.random() - 0.5);

  const [cards] = useState(shuffled);
  const [open, setOpen] = useState([]);
  const [match, setMatch] = useState([]);

  const flip = (i) => {
    if (open.length === 2 || open.includes(i) || match.includes(i)) return;

    setOpen([...open, i]);

    if (open.length === 1) {
      if (cards[open[0]] === cards[i]) {
        setMatch([...match, open[0], i]);
      }
      setTimeout(() => setOpen([]), 600);
    }
  };

  return (
    <div className="game-container">
      <Navbar />
      <h1 className="game-title">🧠 Memory Flip Game</h1>

      <div className="memory-grid">
        {cards.map((emoji, i) => (
          <div
            key={i}
            className={`card ${open.includes(i) || match.includes(i) ? "flip" : ""}`}
            onClick={() => flip(i)}
          >
            <div className="front">❓</div>
            <div className="back">{emoji}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
