import React, { useState, useEffect } from 'react';

// Difficulty levels with different emoji sets
const DIFFICULTY_LEVELS = {
  easy: {
    pairs: 6,
    emojis: ['🌟', '🎈', '🎮', '🎨', '🎭', '🎪']
  },
  medium: {
    pairs: 8,
    emojis: ['🌟', '🎈', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲']
  },
  hard: {
    pairs: 10,
    emojis: ['🌟', '🎈', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🚀', '🍕']
  }
};

const MemoryGame = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const currentLevel = DIFFICULTY_LEVELS[difficulty];
    
    // Create pairs of cards and shuffle them
    const shuffledCards = [...currentLevel.emojis, ...currentLevel.emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ 
        id: emoji, 
        emoji, 
        uniqueId: index 
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2 || matchedPairs.includes(clickedCard.id)) return;
    
    if (flippedCards.length === 1 && flippedCards[0].uniqueId === clickedCard.uniqueId) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      if (newFlippedCards[0].id === newFlippedCards[1].id) {
        setMatchedPairs([...matchedPairs, clickedCard.id]);
        setFlippedCards([]);
        
        const currentLevel = DIFFICULTY_LEVELS[difficulty];
        if (matchedPairs.length + 1 === currentLevel.pairs) {
          setIsWon(true);
        }
      } else {
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

  const gridColumns = {
    easy: 'grid-cols-3',
    medium: 'grid-cols-4',
    hard: 'grid-cols-5'
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Memory Game</h1>
        
        <div className="flex justify-center gap-4 mb-4">
          {/* Difficulty Selector */}
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            {Object.keys(DIFFICULTY_LEVELS).map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>

          <p className="text-lg">Moves: {moves}</p>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>

      <div className={`grid ${gridColumns[difficulty]} gap-4`}>
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
      
      <div className='text-center pt-10'>
        <p>made by rayhan</p>
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