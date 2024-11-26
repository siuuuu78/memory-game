import React, { useState, useEffect, useCallback } from 'react';
import Leaderboard from './components/Leaderboard';

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
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isGameStarted && !isWon) {
      intervalId = setInterval(() => {
        setTimeElapsed((prev) => prev + 1000);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isGameStarted, isWon]);

  const initializeGame = useCallback(() => {
    const currentLevel = DIFFICULTY_LEVELS[difficulty];
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
    setTimeElapsed(0);
    setIsGameStarted(false);
  }, [difficulty]);

  const handleCardClick = (clickedCard) => {
    if (!isGameStarted) setIsGameStarted(true);
    if (
      flippedCards.length === 2 ||
      matchedPairs.includes(clickedCard.id) ||
      (flippedCards.length === 1 &&
        flippedCards[0].uniqueId === clickedCard.uniqueId)
    )
      return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      if (newFlippedCards[0].id === newFlippedCards[1].id) {
        setMatchedPairs((prevPairs) => [...prevPairs, clickedCard.id]);
        setFlippedCards([]);

        if (matchedPairs.length + 1 === DIFFICULTY_LEVELS[difficulty].pairs) {
          setIsWon(true);
          setIsGameStarted(false);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const isCardFlipped = (card) =>
    flippedCards.some((flippedCard) => flippedCard.uniqueId === card.uniqueId) ||
    matchedPairs.includes(card.id);

  const gridColumns = {
    easy: 'grid-cols-3',
    medium: 'grid-cols-4',
    hard: 'grid-cols-5'
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex">
      <div className="w-2/3 pr-4">
        {/* Header dan Select */}
        {/* Grid Cards */}
        {/* Win Message */}
      </div>
      <div className="w-1/3">
        {isWon && (
          <Leaderboard
            moves={moves}
            difficulty={difficulty}
            time={timeElapsed}
          />
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
