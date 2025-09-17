import "../styles/Card.css";
// Use URL constructor with import.meta.url for better path resolution in production
const fallbackImgUrl = new URL("../assets/fallback.png", import.meta.url).href;
// Also import the traditional way as backup
import fallbackImg from "../assets/fallback.png";

export default function Card({ card, onClick, mask = false }) {
  const { name, image } = card;
  // Define a public URL fallback in case the imported image fails in production
  const publicFallbackUrl = "/fallback.png";

  return (
    <button
      className="card"
      onClick={() => onClick(card.id)}
      aria-label={name}
      type="button"
    >
      <img
        src={mask ? fallbackImg || fallbackImgUrl || publicFallbackUrl : image}
        alt={name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          // Try each fallback option in sequence
          if (fallbackImgUrl) {
            e.currentTarget.src = fallbackImgUrl;
          } else if (fallbackImg) {
            e.currentTarget.src = fallbackImg;
          } else {
            e.currentTarget.src = publicFallbackUrl;
          }
        }}
      />
      <div className="card-name">{name}</div>
    </button>
  );
}
