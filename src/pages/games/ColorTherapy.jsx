import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./ColorTherapy.css";

function ColorTherapy() {
  const [selected, setSelected] = useState("");

  const colors = ["#93c5fd","#a5f3fc","#fecaca","#fde68a","#c7d2fe","#6ee7b7"];

  return (
    <div className="game-container">
      <Navbar />
      <h1 className="game-title">🎨 Color Therapy</h1>

      <div className="color-grid">
        {colors.map((c) => (
          <div
            key={c}
            className="color-box"
            style={{ background: c }}
            onClick={() => setSelected(c)}
          ></div>
        ))}
      </div>

      {selected && <h3 className="selected-text">Selected: {selected}</h3>}
    </div>
  );
}

export default ColorTherapy;
