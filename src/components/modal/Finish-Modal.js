import React, { useEffect, useState } from "react";
import "./modal.scss";
import { FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";

const FinishModal = ({ clickModal }) => {
  const [data, setData] = useState({});
  const [point, setPoint] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("memoryGame"));
    let gameInfo = JSON.parse(localStorage.getItem("allGamer"));

    setPoint(user.time * user.turns);
    setData(user);
    gameInfo?.forEach((el) => {
      if (el.name === user.name && !el.points) {
        el.points = user.time * user.turns;
        localStorage.setItem("allGamer", JSON.stringify(gameInfo));
      } else if (el.name === user.name && el.points >= user.time * user.turns) {
        console.log(el);
        el.points = user.time * user.turns;
        localStorage.setItem("allGamer", JSON.stringify(gameInfo));
      }
    });
  }, []);
  return (
    <div className="modal" onClick={clickModal}>
      <div className="modal__block" onClick={(e) => e.stopPropagation()}>
        <h1>Great job, {data.name}!</h1>
        <div>
    <h3 className="modal__res-item">Turns:<p> {data.turns}</p></h3>
    <h3 className="modal__res-item">Time:<p> {data.time}</p></h3>
    <h3 className="modal__res-item">Points:<p>  {point}</p></h3>
        </div>
        <button className="modal__btn" onClick={clickModal}>
          Play again
        </button>
          <Link to={"/leaderboard"}>
            <button className="modal__btn">leaderboard</button>
          </Link>
          <Link to={"/"}>
            <button className="modal__btn">Main page</button>
          </Link>
      </div>
    </div>
  );
};

export default FinishModal;
