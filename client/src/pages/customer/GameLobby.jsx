import { useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  FaBrain,
  FaCircleInfo,
  FaPlay,
  FaTableCellsLarge,
  FaCode,
  FaChessKnight,
} from "react-icons/fa6";

const GAMES = [
  {
    id: "memory-match",
    title: "Memory Match",
    icon: FaBrain,
    description:
      "Flip cards, remember positions, and match all pairs before time runs out.",
    difficulty: "Easy",
    duration: "2-3 min",
    status: "Live",
    howToPlay: [
      "Tap a card to reveal it.",
      "Flip a second card and try to match the symbol.",
      "Matched pairs stay open; unmatched cards flip back.",
      "Match all pairs to win and unlock your reward.",
    ],
  },
  {
    id: "sudoku",
    title: "Sudoku",
    icon: FaTableCellsLarge,
    description:
      "Solve number puzzles with logic only. Complete the grid as quickly as possible.",
    difficulty: "Medium",
    duration: "4-6 min",
    status: "Coming Soon",
    howToPlay: [
      "Fill each row with unique numbers.",
      "Fill each column with unique numbers.",
      "No repeated number is allowed in a sub-grid.",
      "Complete the puzzle before the timer ends.",
    ],
  },
  {
    id: "quiz-js-python",
    title: "Quiz (JS or Python)",
    icon: FaCode,
    description:
      "Choose JavaScript or Python and answer rapid-fire coding questions for points.",
    difficulty: "Medium",
    duration: "3-5 min",
    status: "Coming Soon",
    howToPlay: [
      "Pick a quiz track: JavaScript or Python.",
      "Answer each question before time runs out.",
      "Earn points for each correct answer.",
      "Finish with the highest possible score.",
    ],
  },
  {
    id: "chess-mate-in-5",
    title: "Chess (Check-mate in 5 Steps)",
    icon: FaChessKnight,
    description:
      "Find the forced checkmate sequence in five moves against a defensive setup.",
    difficulty: "Hard",
    duration: "5-8 min",
    status: "Coming Soon",
    howToPlay: [
      "Review the starting chess position.",
      "Select your next move from legal options.",
      "Force the opponent with accurate checks and threats.",
      "Deliver checkmate in exactly five moves.",
    ],
  },
];

const GameLobby = () => {
  const [activeHowTo, setActiveHowTo] = useState(null);

  const toggleHowTo = (gameId) => {
    setActiveHowTo((current) => (current === gameId ? null : gameId));
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-x-hidden px-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GAMES.map((game) => {
          const isLive = game.status === "Live";
          const GameIcon = game.icon;

          return (
            <article
              key={game.id}
              className="card bg-base-100 border border-base-300 shadow-sm"
            >
              <div className="card-body gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
                      <GameIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="card-title text-lg leading-tight break-words">{game.title}</h3>
                      <p className="text-xs text-base-content/60">
                        {game.difficulty} | {game.duration}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge badge-outline self-start shrink-0 ${
                      isLive ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {game.status}
                  </span>
                </div>

                <p className="text-sm text-base-content/70 leading-relaxed">{game.description}</p>

                <div className="card-actions flex-col sm:flex-row items-stretch sm:items-center justify-stretch sm:justify-end gap-2 mt-1">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm gap-2 w-full sm:w-auto"
                    onClick={() => toggleHowTo(game.id)}
                  >
                    <FaCircleInfo className="h-3.5 w-3.5" />
                    How to Play?
                  </button>

                  {isLive ? (
                    <RouterLink
                      to={`../play/${game.id}`}
                      className="btn btn-primary btn-sm gap-2 w-full sm:w-auto"
                    >
                      <FaPlay className="h-3.5 w-3.5" />
                      Play Game
                    </RouterLink>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm gap-2 btn-disabled w-full sm:w-auto"
                    >
                      <FaPlay className="h-3.5 w-3.5" />
                      Coming Soon
                    </button>
                  )}
                </div>

                {activeHowTo === game.id && (
                  <div className="rounded-xl border border-base-300 bg-base-200 p-4">
                    <p className="text-sm font-semibold mb-2">How to Play</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-base-content/75">
                      {game.howToPlay.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default GameLobby;
