import React from 'react'
import MemoryGame from '../../features/game/MemoryGame'
import { FaXmark } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router'

const GameSession = () => {
  const navigate = useNavigate();
  const { gameName } = useParams();

  const renderGame = () => {
    switch (gameName) {
      case 'memory-match':
        return <MemoryGame />;
      default:
        return (
          <div className="text-center text-base-content p-8 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
            <p className="mb-6 text-base-content/70">Sorry, this game is not available yet.</p>
            <button onClick={() => navigate(-1)} className="btn btn-primary rounded-xl px-8">Go Back</button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-base-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-circle btn-ghost text-base-content/50"
          title="Exit Game"
        >
          <FaXmark className="text-lg" />
        </button>
        <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Game Room</span>
        <div className="w-8" />
      </div>

      {/* Game Area — fills remaining space */}
      <div className="flex-1 flex items-center justify-center px-3 pb-3 overflow-hidden">
        {renderGame()}
      </div>
    </div>
  )
}

export default GameSession
