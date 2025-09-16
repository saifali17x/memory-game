import Button from "./Button";
import "../styles/Header.css";

export default function Header({
  onNewGame,
  difficulty,
  onChangeDifficulty,
  musicEnabled,
  onToggleMusic,
}) {
  return (
    <header className="header">
      <h1>Memory Card Game 🎴</h1>
      <p>Don’t click the same card twice!</p>
      <div className="header-controls">
        <div className="difficulty">
          <label htmlFor="difficulty-select">Difficulty:</label>{" "}
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => onChangeDifficulty(e.target.value)}
            aria-label="Select difficulty"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <Button
          onClick={onToggleMusic}
          ariaLabel={musicEnabled ? "Mute music" : "Unmute music"}
          className="icon-btn"
        >
          {musicEnabled ? "🔊" : "🔇"}
        </Button>
        <Button onClick={onNewGame} ariaLabel="Start a new game">
          New Game
        </Button>
      </div>
    </header>
  );
}
