import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

const cardImages = [
  { src: "/img/apple.png", matched: false },
  { src: "/img/banana.png", matched: false },
  { src: "/img/cherry.png", matched: false },
  { src: "/img/grape.png", matched: false },
  { src: "/img/lemon.png", matched: false },
  { src: "/img/orange.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a card choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
      }, 1000);
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
