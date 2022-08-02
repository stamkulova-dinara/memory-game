import React, { useEffect, useState } from "react";
import "./leaderboard.scss";
import { HiArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  useEffect(() => {
    let gameInfo = JSON.parse(localStorage.getItem("allGamer"));
    gameInfo?.sort((a,b) => b.points - a.points)
    gameInfo?.reverse()
    setData(gameInfo);
  }, []);

  return (
    <section className="leaderboard">
      <div className="leaderboard__container">
        <div className="leaderboard__back">
          <HiArrowLeft className="leaderboard__back-icon" onClick={() => navigate('/game')}/>
        </div>
        <h1>Leaderboard</h1>
        <div>
        <ol className="leaderboard__counter">
          {data ? data.map((el, index) => (
            <li key={index} className='leaderboard__item'>{el.name} <span>{el.points}</span></li>
          )) : <p className="leaderboard__empty">Leaderboard is empty!!!</p>}
        </ol>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
