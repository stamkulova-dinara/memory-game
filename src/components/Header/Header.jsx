import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import "./header.scss";

const Header = ({ turns, newTime, saveTime }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getLocalStorageUser = JSON.parse(localStorage.getItem("memoryGame"));
    setUser(getLocalStorageUser);
  }, []);

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('memoryGame'))
    data.turns = turns
    localStorage.setItem('memoryGame', JSON.stringify(data))
  },[saveTime])
  return (
    <header>
      <div className="header">
        <h1 className="header__title">{user.name}</h1>
        <h1 className="header__title">Turns: {turns}</h1>
        <Timer newTime={newTime} saveTime={saveTime}/>
      </div>
    </header>
  );
};

export default Header;
