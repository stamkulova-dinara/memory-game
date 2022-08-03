import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import { HiArrowLeft } from 'react-icons/hi'
import "./header.scss";
import { Link } from "react-router-dom";

const Header = ({ turns, newTime, saveTime }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getLocalStorageUser = JSON.parse(localStorage.getItem("memoryGame"));
    setUser(getLocalStorageUser);
  }, []);

  console.log(saveTime,"saveTime1111111");

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('memoryGame'))
    data.turns = turns
    localStorage.setItem('memoryGame', JSON.stringify(data))
  },[saveTime])
  return (
    <header>
      <div className="header">
        <Link to={'/'}>
        <HiArrowLeft className="header__back"/>
        </Link>
        <h1 className="header__title">{user.name}</h1>
        <h1 className="header__title">Turns: {turns}</h1>
        <Timer newTime={newTime} saveTime={saveTime}/>
      </div>
    </header>
  );
};

export default Header;
