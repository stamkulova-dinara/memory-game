import "./card.scss";
import back from "../../assets/images/backip.png";

export function Cards({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div
        className={`${flipped ? "flipped" : ""} ${
          card.matched ? "inActive" : ""
        }`}
      >
        <img className="front" src={card.image} alt="card" />
        <img
          className="back"
          src={back}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
