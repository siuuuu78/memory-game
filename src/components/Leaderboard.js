import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';

const Leaderboard = ({ moves, difficulty, time }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'leaderboard'), 
        orderBy('score', 'asc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const scores = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeaderboard(scores);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Submit score to leaderboard
  const submitScore = async () => {
    if (!playerName.trim()) {
      alert('Please enter a player name');
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate score (lower is better)
      const score = moves * 10 + (time / 1000);

      await addDoc(collection(db, 'leaderboard'), {
        name: playerName,
        moves,
        difficulty,
        time: time / 1000, // convert to seconds
        score,
        date: new Date()
      });

      await fetchLeaderboard();
      setPlayerName('');
    } catch (error) {
      console.error("Error submitting score:", error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      
      {/* Score Submission */}
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={submitScore}
          disabled={isSubmitting}
          className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded 
                     hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Score'}
        </button>
      </div>

      {/* Leaderboard Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Difficulty</th>
            <th className="p-2 text-left">Moves</th>
            <th className="p-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{entry.name}</td>
              <td className="p-2">{entry.difficulty}</td>
              <td className="p-2">{entry.moves}</td>
              <td className="p-2">{entry.time.toFixed(2)} sec</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;