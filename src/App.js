import React, { useState, useEffect } from 'react';

const CARD_PAIRS = [
  { id: 1, emoji: '🌟' },
  { id: 2, emoji: '🎈' },
  { id: 3, emoji: '🎮' },
  { id: 4, emoji: '🎨' },
  { id: 5, emoji: '🎭' },
  { id: 6, emoji: '🎪' },
  { id: 7, emoji: '🎯' },
  { id: 8, emoji: '🎲' },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards and shuffle them
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (clickedCard) => {
    // Prevent clicking if already two cards are flipped or card is matched
    if (flippedCards.length === 2 || matchedPairs.includes(clickedCard.id)) return;
    
    // Prevent clicking the same card twice
    if (flippedCards.length === 1 && flippedCards[0].uniqueId === clickedCard.uniqueId) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      if (newFlippedCards[0].id === newFlippedCards[1].id) {
        // Match found
        setMatchedPairs([...matchedPairs, clickedCard.id]);
        setFlippedCards([]);
        
        // Check if all pairs are matched
        if (matchedPairs.length + 1 === CARD_PAIRS.length) {
          setIsWon(true);
        }
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (card) => {
    return flippedCards.some(flippedCard => flippedCard.uniqueId === card.uniqueId) ||
           matchedPairs.includes(card.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Memory Game</h1>
        <div className="flex justify-center gap-4 mb-4">
          <p className="text-lg">Moves: {moves}</p>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            onClick={() => handleCardClick(card)}
            className={`
              relative h-24 cursor-pointer
              transform transition-transform duration-300
              ${isCardFlipped(card) ? 'rotate-y-180' : ''}
              hover:scale-105
            `}
          >
            <div
              className={`
                absolute w-full h-full
                transition-all duration-300 transform-style-preserve-3d
                ${isCardFlipped(card) ? 'rotate-y-180' : ''}
              `}
            >
              {/* Card Front */}
              <div
                className={`
                  absolute w-full h-full bg-blue-500 rounded-lg
                  flex items-center justify-center text-4xl
                  backface-hidden
                  ${isCardFlipped(card) ? 'invisible' : ''}
                `}
              >
                ?
              </div>
              
              {/* Card Back */}
              <div
                className={`
                  absolute w-full h-full bg-white rounded-lg
                  flex items-center justify-center text-4xl
                  backface-hidden rotate-y-180 border-2 border-blue-500
                  ${isCardFlipped(card) ? 'visible' : 'invisible'}
                `}
              >
                {card.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className='text-center mt-10'>made by rayhan</p>
      </div>

      {/* Win Message */}
      {isWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
            <p className="mb-4">You won in {moves} moves!</p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;