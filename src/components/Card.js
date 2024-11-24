import React from "react";
import "./Card.css";

function Card({ card, handleChoice, flipped }) {
  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <div className="back" onClick={handleClick}></div>
      </div>
    </div>
  );
}

export default Card;
