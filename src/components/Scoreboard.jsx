import Button from "./Button";
import "../styles/Scoreboard.css";

export default function Scoreboard({
  score,
  bestScore,
  onReset,
  won,
  time,
  difficulty,
  bestTime,
}) {
  return (
    <div className="scoreboard">
      <div className="sb-group">
        <div className="sb-label">Difficulty</div>
        <div className="sb-value">{difficulty}</div>
      </div>
      <div className="sb-group">
        <div className="sb-label">Score</div>
        <div className="sb-value">{score}</div>
      </div>
      <div className="sb-group">
        <div className="sb-label">Best</div>
        <div className="sb-value">{bestScore}</div>
      </div>
      <div className="sb-group">
        <div className="sb-label">Time</div>
        <div className="sb-value">{time || "-"}</div>
      </div>
      <div className="sb-group">
        <div className="sb-label">Best Time</div>
        <div className="sb-value">{bestTime || "-"}</div>
      </div>
      {won && <div className="win-text">You Won!</div>}
      <Button onClick={onReset} ariaLabel="Restart game">
        Restart
      </Button>
    </div>
  );
}
