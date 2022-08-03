import React, { useEffect, useState } from "react";
import "../Header/header.scss";

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

    if (saveTime) {
      clearInterval(timer);
    }

    // setInterval(() => {
    //   if (minutes === 59 || seconds === 59) {
    //     setHours(hours + 1);
    //   }
    // }, 60 * 60 * 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (saveTime) {
      setSt(`${minutes}:${seconds}`);
      let data = JSON.parse(localStorage.getItem("memoryGame"));
      data.time =  `${Time(minutes)}:${Time(seconds)}`;
      localStorage.setItem("memoryGame", JSON.stringify(data));
    }
  }, [saveTime]);

  const a = (sec) => {
    let data = JSON.parse(localStorage.getItem("memoryGame"));
    data.seconds = sec;
    localStorage.setItem("memoryGame", JSON.stringify(data));
  };

  useEffect(() => {
    const timeString = st;
    const arr = timeString.split(":");
    const second = arr[0] * 60 + +arr[1];
    a(second);
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
        {/* {Time(hours)}: */}
        {Time(minutes)}:
        {Time(seconds)}
      </h1>
    </div>
  );
};

export default Timer;

export function Time(arg) {
    return arg < 10 ? "0" + arg : arg
}
