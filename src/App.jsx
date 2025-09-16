import { useState, useEffect, useRef } from "react";
import {
  usePersistentState,
  useClickGuard,
  useTimer,
  createInitialStats,
  recordGame,
  formatMs,
} from "./utils/gameExtras";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import Footer from "./components/Footer";
import "./styles/App.css";
import shuffle from "./utils/shuffle";
import shuffleSoundUrl from "./assets/card-sounds-35956.mp3";
import narutoFluteUrl from "./assets/naruto_flute.mp3";

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [difficulty, setDifficulty] = usePersistentState("difficulty", "hard"); // easy | medium | hard
  const [pool, setPool] = useState([]); // full ordered list of up to 12 characters
  const [won, setWon] = useState(false);
  const [maskCards, setMaskCards] = useState(false);
  const [error, setError] = useState(null);
  const clickGuard = useClickGuard(200);
  const {
    elapsedMs,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useTimer();
  const [stats, setStats] = usePersistentState("stats", createInitialStats());
  const [bestTimes, setBestTimes] = usePersistentState("bestTimes", {
    easy: null,
    medium: null,
    hard: null,
  });
  const [musicEnabled, setMusicEnabled] = usePersistentState(
    "musicEnabled",
    true
  );
  const musicRef = useRef(null);

  // Setup looping background music
  useEffect(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio(narutoFluteUrl);
      musicRef.current.loop = true;
      musicRef.current.volume = 0.4;
    }

    const audio = musicRef.current;
    if (musicEnabled) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [musicEnabled]);

  // Whitelist of MAL character IDs to display (exactly these 12)
  const allowedIds = [
    145, // Haruno, Sakura
    85, // Hatake, Kakashi
    13, // Uchiha, Sasuke
    17, // Uzumaki, Naruto
    1662, // Gaara
    1694, // Hyuuga, Neji
    2455, // Orochimaru
    12465, // Senju, Tobirama
    12464, // Senju, Hashirama
    2535, // Namikaze, Minato
    14, // Uchiha, Itachi
    307, // Might, Guy
  ];

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/anime/20/characters");
        const data = await res.json();
        setError(null);

        // Debug: inspect the full API payload and a concise list of IDs & names
        console.log("Jikan raw response:", data);
        if (Array.isArray(data?.data)) {
          const idAndNames = data.data.map((entry) => ({
            id: entry?.character?.mal_id,
            name: entry?.character?.name,
          }));
          console.table(idAndNames);
        }

        // Map to our card structure
        const characters = data.data.map((entry) => ({
          id: entry.character.mal_id,
          name: entry.character.name,
          image: entry.character.images.jpg.image_url,
        }));

        // Filter to the chosen 12 and preserve the order specified above
        const orderMap = new Map(allowedIds.map((id, idx) => [id, idx]));
        const filtered = characters
          .filter((c) => orderMap.has(c.id))
          .sort((a, b) => orderMap.get(a.id) - orderMap.get(b.id));

        // Fallback: if some are missing, fill up with the first from the list
        const selected =
          filtered.length === 12 ? filtered : characters.slice(0, 12);

        setPool(selected);
        const count =
          difficulty === "easy" ? 4 : difficulty === "medium" ? 8 : 12;
        setCards(shuffle(selected.slice(0, count)));
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load characters. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [difficulty]);

  // Load best score from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bestScore");
    if (saved) setBestScore(Number(saved));
  }, []);

  // Persist best score whenever it changes
  useEffect(() => {
    localStorage.setItem("bestScore", String(bestScore));
  }, [bestScore]);

  function handleCardClick(id) {
    // Briefly mask cards after every click
    setMaskCards(true);
    setTimeout(() => setMaskCards(false), 300);

    if (clickGuard()) return; // prevent rapid double clicks
    setClickedIds((prev) => {
      const alreadyClicked = prev.has(id);
      if (alreadyClicked) {
        setBestScore((b) => Math.max(b, score));
        setScore(0);
        setCards((prevCards) => shuffle([...prevCards]));
        setWon(false);
        resetTimer();
        return new Set();
      }

      const next = new Set(prev);
      next.add(id);
      setScore((s) => s + 1);
      if (next.size === 1) startTimer();

      // Win condition: all cards for current difficulty clicked
      const target = cards.length; // 4 | 8 | 12
      if (next.size === target) {
        setBestScore((b) => Math.max(b, score + 1));
        setWon(true);
        stopTimer();
        setStats((prevStats) =>
          recordGame(prevStats, difficulty, { won: true, timeMs: elapsedMs })
        );
        setBestTimes((prev) => {
          const currentBest = prev[difficulty];
          return {
            ...prev,
            [difficulty]:
              currentBest == null || elapsedMs < currentBest
                ? elapsedMs
                : currentBest,
          };
        });
        return next;
      }

      // Reshuffle after a successful unique click
      setCards((prevCards) => shuffle([...prevCards]));
      return next;
    });
  }

  function newGame() {
    setScore(0);
    setClickedIds(new Set());
    // Play shuffle sound and mask cards with fallback during sound
    const audio = new Audio(shuffleSoundUrl);
    const durationMs = 1200; // fallback duration default
    let maskDuration = durationMs;
    audio.addEventListener("loadedmetadata", () => {
      if (audio.duration && isFinite(audio.duration)) {
        maskDuration = Math.max(300, Math.floor(audio.duration * 1000));
      }
    });
    audio.play().catch(() => {});
    setMaskCards(true);
    setTimeout(() => {
      setMaskCards(false);
    }, maskDuration);
    setCards((prev) => shuffle([...prev]));
    setWon(false);
    resetTimer();
  }

  // Handle difficulty changes: reset game and derive cards from pool
  useEffect(() => {
    if (!pool.length) return;
    const count = difficulty === "easy" ? 4 : difficulty === "medium" ? 8 : 12;
    setScore(0);
    setClickedIds(new Set());
    setCards(shuffle(pool.slice(0, count)));
    setWon(false);
    resetTimer();
  }, [difficulty, pool]);

  return (
    <div className="app">
      <Header
        onNewGame={newGame}
        difficulty={difficulty}
        onChangeDifficulty={setDifficulty}
        musicEnabled={musicEnabled}
        onToggleMusic={() => setMusicEnabled((v) => !v)}
      />
      <Scoreboard
        score={score}
        bestScore={bestScore}
        onReset={newGame}
        won={won}
        time={formatMs(elapsedMs)}
        difficulty={difficulty}
        bestTime={formatMs(bestTimes[difficulty])}
      />
      {loading ? (
        <p>Loading cards…</p>
      ) : (
        <>
          {error && (
            <div className="error">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          {won && (
            <div className="win-banner">
              <p>You Won!</p>
              <button onClick={newGame}>Play Again</button>
            </div>
          )}
          <CardGrid
            cards={cards}
            onCardClick={handleCardClick}
            mask={maskCards}
            difficulty={difficulty}
          />
        </>
      )}
      <Footer difficulty={difficulty} />
    </div>
  );
}
