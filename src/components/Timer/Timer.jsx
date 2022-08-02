import React, { useEffect, useState } from "react";
import '../Header/header.scss'

const Timer = ({ newTime, saveTime }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [st, setSt] = useState("");
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    setInterval(() => {
      if (minutes === 59 || seconds === 59) {
        setHours(hours + 1);
      }
    }, 60 * 60 * 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (saveTime) {
      clearInterval(timer);
      setSt(`${hours}:${minutes}:${seconds}`);
    }
  }, [saveTime]);

  const a = (sec) => {
    let data = JSON.parse(localStorage.getItem('memoryGame'))
    data.time = sec
    localStorage.setItem('memoryGame', JSON.stringify(data))
  }

  useEffect(() => {
    const timeString = st;
    const arr = timeString.split(":");
    const second = arr[0] * 3600 + arr[1] * 60 + +arr[2];
    a(second)
  }, [st]);

  useEffect(() => {
    if (newTime) {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    }
  }, [newTime]);
  return (
    <div>
      <h1 className="timer">
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </h1>
    </div>
  );
};

export default Timer;
