import "../styles/Card.css";
import fallbackImg from "../assets/fallback.png";

export default function Card({ card, onClick, mask = false }) {
  const { name, image } = card;
  return (
    <button
      className="card"
      onClick={() => onClick(card.id)}
      aria-label={name}
      type="button"
    >
      <img
        src={mask ? fallbackImg : image}
        alt={name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImg;
        }}
      />
      <div className="card-name">{name}</div>
    </button>
  );
}
