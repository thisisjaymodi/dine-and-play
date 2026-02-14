import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  FaBurger,
  FaPizzaSlice,
  FaIceCream,
  FaMugHot,
  FaCookie,
  FaAppleWhole,
  FaCarrot,
  FaDrumstickBite,
  FaArrowRotateLeft,
  FaPlay,
  FaStar,
} from "react-icons/fa6";

const ICONS = [
  { id: "burger", icon: FaBurger, color: "text-orange-500" },
  { id: "pizza", icon: FaPizzaSlice, color: "text-red-500" },
  { id: "icecream", icon: FaIceCream, color: "text-pink-400" },
  { id: "coffee", icon: FaMugHot, color: "text-amber-800" },
  { id: "cookie", icon: FaCookie, color: "text-yellow-700" },
  { id: "apple", icon: FaAppleWhole, color: "text-red-600" },
  { id: "carrot", icon: FaCarrot, color: "text-orange-600" },
  { id: "drumstick", icon: FaDrumstickBite, color: "text-amber-600" },
];

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [hasActiveCoupon, setHasActiveCoupon] = useState(false);

  useEffect(() => {
    const checkCoupon = () => {
      const saved = localStorage.getItem("dine_play_active_coupon");
      if (saved) {
        const coupon = JSON.parse(saved);
        if (Date.now() < coupon.expiry) {
          setHasActiveCoupon(true);
        } else {
          localStorage.removeItem("dine_play_active_coupon");
          setHasActiveCoupon(false);
        }
      }
    };
    checkCoupon();
  }, [gameComplete]);

  const initializeGame = useCallback(() => {
    const shuffledCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setDisabled(false);
    setGameComplete(false);
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (solved.length === ICONS.length && gameStarted) {
      setGameComplete(true);
    }
  }, [solved, gameStarted]);

  const handleClick = (uniqueId) => {
    if (
      disabled ||
      flipped.includes(uniqueId) ||
      solved.includes(cards.find((c) => c.uniqueId === uniqueId).id)
    )
      return;

    if (flipped.length === 0) {
      setFlipped([uniqueId]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      setFlipped((prev) => [...prev, uniqueId]);
      setMoves((prev) => prev + 1);

      const firstCard = cards.find((c) => c.uniqueId === flipped[0]);
      const secondCard = cards.find((c) => c.uniqueId === uniqueId);

      if (firstCard.id === secondCard.id) {
        setSolved((prev) => [...prev, firstCard.id]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  /* ─── Splash / Start Screen ─── */
  if (!gameStarted) {
    return (
      <div className="card bg-base-100 border border-base-300 shadow-md w-full max-w-sm mx-auto">
        <div className="card-body items-center text-center gap-5 py-10">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/10 grid place-items-center">
            <FaBurger className="text-primary text-4xl" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-extrabold text-base-content">
              Memory Match
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Find all matching food pairs to win a reward!
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-base-content">4×4</p>
              <p className="text-[11px] text-base-content/50 uppercase tracking-wider">
                Grid
              </p>
            </div>
            <div className="divider divider-horizontal m-0"></div>
            <div className="text-center">
              <p className="text-lg font-bold text-base-content">8</p>
              <p className="text-[11px] text-base-content/50 uppercase tracking-wider">
                Pairs
              </p>
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={initializeGame}
            className="btn btn-primary btn-wide gap-2 mt-2"
          >
            <FaPlay className="text-sm" />
            Start Game
          </button>
        </div>
      </div>
    );
  }

  /* ─── Active Game ─── */
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3 h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-base-100 rounded-xl border border-base-300 px-4 py-2.5 shadow-sm">
        {/* Moves */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-base-content/50 font-semibold leading-none">
            Moves
          </span>
          <span className="text-xl font-extrabold text-primary leading-tight">
            {moves}
          </span>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-wider text-base-content/50 font-semibold leading-none">
            {solved.length}/{ICONS.length}
          </span>
          <div className="flex gap-1">
            {ICONS.map((_, i) => (
              <div
                key={i}
                className={`w-5 h-1.5 rounded-full transition-colors duration-300 ${
                  i < solved.length ? "bg-success" : "bg-base-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Restart */}
        <button
          onClick={initializeGame}
          className="btn btn-sm btn-ghost btn-circle text-base-content/40 hover:text-base-content"
          title="Restart"
        >
          <FaArrowRotateLeft className="text-base" />
        </button>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {cards.map((card) => {
          const isFlipped =
            flipped.includes(card.uniqueId) || solved.includes(card.id);
          const isSolved = solved.includes(card.id);
          const Icon = card.icon;

          return (
            <div
              key={card.uniqueId}
              onClick={() => handleClick(card.uniqueId)}
              className="perspective-1000 cursor-pointer aspect-square"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front — face down */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-xl bg-primary shadow-sm flex items-center justify-center transition-shadow duration-200 ${
                    !isFlipped ? "hover:shadow-md hover:brightness-110" : ""
                  }`}
                >
                  <div className="w-7 h-7 rounded-full border-2 border-primary-content/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-content/25"></div>
                  </div>
                </div>

                {/* Back — face up */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-base-100 border-2 flex items-center justify-center transition-all duration-200 ${
                    isSolved
                      ? "border-success/50 bg-success/5"
                      : "border-base-300"
                  }`}
                >
                  <Icon
                    className={`${card.color} text-3xl md:text-4xl transition-transform duration-300 ${
                      isSolved ? "scale-110" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Win Overlay ─── */}
      {gameComplete && (
        <div className="fixed inset-0 z-50 bg-neutral/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="card bg-base-100 shadow-xl w-full max-w-sm animate-in zoom-in-95 duration-300">
            <div className="card-body items-center text-center gap-4">
              {/* Trophy */}
              <div className="w-16 h-16 rounded-full bg-success/15 grid place-items-center">
                <FaStar className="text-success text-3xl" />
              </div>

              <h2 className="text-2xl font-extrabold text-base-content">
                Amazing!
              </h2>
              <p className="text-sm text-base-content/60">
                You cleared the board in
              </p>

              {/* Moves display */}
              <div className="bg-base-200 rounded-xl px-6 py-3">
                <span className="text-4xl font-black text-primary">
                  {moves}
                </span>
                <span className="text-xs text-base-content/40 uppercase tracking-wider ml-2">
                  moves
                </span>
              </div>

              {/* Actions */}
              <div className="w-full flex flex-col gap-2 mt-2">
                {hasActiveCoupon ? (
                  <button
                    onClick={() => {
                      const saved = localStorage.getItem(
                        "dine_play_active_coupon",
                      );
                      const coupon = JSON.parse(saved);
                      navigate(`../coupon/${coupon.id}`);
                    }}
                    className="btn btn-success w-full font-bold text-white"
                  >
                    🎫 View Active Coupon
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`../claim`)}
                    className="btn btn-success w-full font-bold text-white"
                  >
                    🎁 Claim My Coupon
                  </button>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={initializeGame}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => navigate(`../all-games`)}
                    className="btn btn-ghost btn-sm flex-1 border border-base-300"
                  >
                    Game Lobby
                  </button>
                </div>
              </div>

              {/* Fine print */}
              <p className="text-[10px] text-base-content/40 italic leading-tight mt-1">
                {hasActiveCoupon
                  ? "* You already have an active coupon. You cannot claim a new one until it expires."
                  : "* Claim your reward now. Starting a new game or leaving requires you to win again."}
              </p>
              {!hasActiveCoupon && (
                <p className="text-[10px] text-base-content/40 italic leading-tight">
                  * <strong>Email required</strong> to receive coupon details.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS for 3D flip */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
          `,
        }}
      />
    </div>
  );
};

export default MemoryGame;
