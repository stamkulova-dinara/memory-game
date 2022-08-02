import React, { useEffect, useState } from "react";
import { Cards } from "../Card/card";
import "./game.scss";
import { Images } from "../../data";
import FinishModal from "../modal/Finish-Modal";
import Header from "../Header/Header";

export const Game = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [finish, setFinish] = useState(false);
  const [newTime, setNewTime] = useState(false)
  const [saveTime, setSaveTime] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...Images, ...Images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    const aa = cards.map((e) => (e.matched == true ? true : false));
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.image === choiceTwo.image && choiceOne.id !== choiceTwo.id) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.image === choiceOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
    if (aa?.includes(true)) {
      if (aa?.every((el) => el == true)) {
        setSaveTime(true)
        setTimeout(() => {
          setFinish(true);
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const toggleModal = () => {
    setFinish(false);
    shuffleCards();
    setNewTime(true)
  };
  return (
    <section className="game">
      <Header turns={turns} newTime={newTime} saveTime={saveTime}/>
      <div className="game__container">
        <div className="cards">
          {cards?.map((card) => (
            <Cards
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      {finish && <FinishModal clickModal={toggleModal} />}
    </section>
  );
};
