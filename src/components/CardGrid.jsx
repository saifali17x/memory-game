import Card from "./Card";
import "../styles/Card.css";

export default function CardGrid({
  cards,
  onCardClick,
  mask = false,
  difficulty = "hard",
}) {
  return (
    <div className={`card-grid ${difficulty}`}>
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick} mask={mask} />
      ))}
    </div>
  );
}
